var UZip = (function() {
    var WIN_SIZE = 16384,
        MIN_MATCH = 3, // do not modify
        MAX_MATCH = 127 + MIN_MATCH, // must be less than or equals to 127
        HASH_MASK = 0x3FFF; // must match butcket size
    var B64_CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_";
    /*
     var DECODE_TABLE = [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 62, -1, 62, -1, 63, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, -1, -1, -1, -2, -1, -1, -1, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11,
     12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, -1, -1, -1, -1, 63, -1, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39,
     40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, -1, -1, -1, -1
     ];
     */
    var DECODE_TABLE = [];
    for (var i = 0; i < 64; i++) {
        DECODE_TABLE[B64_CHARS.charCodeAt(i)] = i;
    }

    function compress(input) {
        var head = [],
            prev = [],
            directInputPos = -1,
            nextMatchTestPos = 0,
            pos = 0,
            remain = 0,
            remainBits = 0,
            out = [];

        write(0x13); // header: version = 1, min match = 3

        for (var winStart = 0; winStart < input.length && pos < input.length; winStart += WIN_SIZE) {
            // prepare window;
            if (winStart > 0) {
                prev = prev.slice(WIN_SIZE);
            }

            // compress
            doWindowCompress();
        }

        if (directInputPos != -1) {
            writeDirectInput();
        }

        return finish();

        /* window compress */
        function doWindowCompress() {
            var winEnd = min(winStart + WIN_SIZE * 2, input.length);
            var hashStop = min(winEnd, input.length - MIN_MATCH + 1);

            for (; pos < winEnd; pos++) {
                var matchLen = 0;
                var distance = 0;

                if (pos < hashStop) {
                    var h = hash();
                    if (pos >= nextMatchTestPos) {
                        var pendingMatchPos = head[h] - 1;
                        while (matchLen != MAX_MATCH && pendingMatchPos >= 0 && pendingMatchPos >= pos - WIN_SIZE) {
                            var len = matchTest(pendingMatchPos);
                            if (len >= MIN_MATCH && len > matchLen) {
                                matchLen = len;
                                distance = pos - pendingMatchPos - matchLen;
                            }
                            pendingMatchPos = prev[pendingMatchPos - winStart];
                        }
                    }

                    // add to hash chain
                    prev[pos - winStart] = head[h] - 1;
                    head[h] = pos + 1;
                }

                if (matchLen >= MIN_MATCH) { // matched
                    nextMatchTestPos = pos + matchLen;

                    if (directInputPos != -1) {
                        writeDirectInput();
                        directInputPos = -1;
                    }
                    write(matchLen - MIN_MATCH);
                    while (distance > 127) { // Little Endian, variant length (highest bit = 0 means the last byte)
                        write((distance & 0x7F | 0x80) & 0xFF);
                        distance >>= 7;
                    }
                    write(distance);

                } else if (pos >= nextMatchTestPos) { // not matched
                    if (directInputPos == -1) {
                        directInputPos = pos;
                    }
                }
            }
        }

        function min(a, b) {
            return Math.min(a, b);
        }

        function hash() {
            var h = 0;
            for (var i = pos; i < pos + MIN_MATCH; i++) {
                h *= 16777619;
                h ^= input[i];
            }
            return h & HASH_MASK;
        }

        function matchTest(pendingMatchPos) {
            var p1, p2, matchEnd = min(pendingMatchPos + MAX_MATCH, pos);
            for (p1 = pendingMatchPos, p2 = pos; p1 < matchEnd && p2 < input.length; p1++, p2++) {
                if (input[p1] != input[p2]) {
                    break;
                }
            }
            return p1 - pendingMatchPos;
        }

        function writeDirectInput() {
            for (var i = directInputPos; i < pos; i += 127) {
                var block = min(127, pos - i);
                var b = (-block) & 0xFF;
                write(b);
                for (var j = i; j < pos && j < i + block; j++) {
                    write(input[j]);
                }
            }
        }

        function write(b) {
            var b64idx = remain << (6 - remainBits);
            remain = b & 0xFF;
            remainBits += 2; // remainBits = 8 - (6 - remainBits);
            b64idx |= remain >> remainBits;
            push(b64idx & 0x3F);
            if (remainBits >= 6) {
                remainBits -= 6;
                b64idx = remain >> remainBits;
                push(b64idx & 0x3F);
            }
        }

        function finish() {
            if (remainBits == 2) {
                var idx = (remain << 4) & 0x3F;
                push(idx);
                if (B64_CHARS.length == 65) {
                    push(64);
                    push(64);
                }

            } else if (remainBits == 4) {
                var idx = (remain << 2) & 0x3F;
                push(idx);
                if (B64_CHARS.length == 65) {
                    push(64);
                }
            }
            return out.join("");
        }

        function push(idx) {
            out.push(B64_CHARS.charAt(idx));
        }
    }

    function decompress(input) {
        var pos = 0,
            currentInput = 0,
            remainBits = 0,
            out = [],
            data;

        var header = read();
        if (header >> 4 > 1) {
            throw "Unsupported version.";
        }
        var minMatch = header & 0xF;

        while ((data = read()) != -1) {
            if (data <= 127) { // dict match
                var len = data + minMatch;
                var distance = 0;
                for (var i = 0;; i++) {
                    data = read();
                    if (data == -1) {
                        throw "Unexpected end.";
                    }
                    distance |= (data & 0x7F) << (7 * i);
                    if (data <= 127) {
                        break;
                    }
                }
                out.push.apply(out, out.slice(out.length - distance - len, out.length - distance));

            } else {
                var len = 256 - data;
                for (var i = 0; i < len; i++) {
                    data = read();
                    if (data == -1) {
                        throw "Unexpected end.";
                    }
                    out.push(String.fromCharCode(data & 0xFF));
                }
            }
        }

        return out.join("");

        function read() {
            if (pos >= input.length) {
                return -1;
            }

            var newByte = currentInput << (8 - remainBits);

            currentInput = map(pos++);
            if (currentInput < 0) {
                pos = input.length;
                return -1;
            }
            remainBits -= 2; // remainBits + 6 - 8;

            if (remainBits >= 0) {
                newByte |= currentInput >> remainBits;
            } else {
                newByte |= currentInput << -remainBits;
                if (pos >= input.length || (currentInput = map(pos++)) < 0) {
                    throw "Invalid input.";
                }
                remainBits += 6;
                newByte |= currentInput >> remainBits;
            }

            return newByte & 0xFF;
        }

        function map(idx) {
            return DECODE_TABLE[input.charCodeAt(idx)];
        }
    }

    return {
        compress: function(inputStr) {
            var data = [];
            inputStr = unescape(encodeURIComponent(inputStr));
            for (var i = 0; i < inputStr.length; i++) data.push(inputStr.charCodeAt(i));
            return compress(data);
        },
        decompress: function(input) {
            return decodeURIComponent(escape(decompress(input)));
        }
    }

})();

module.exports =  UZip;
