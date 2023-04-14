
/**
 * 输入pushed = [1,2,3,4,5]，poped = [4,5,3,2,1] 输出true
 * 输入pushed = [1,2,3,4,5]，poped = [4,3,5,1,2] 输出false
 */

function checkIsCorrect(pushed, poped) {
    if (pushed.length != poped.length) return false;
    let pendingPush = pushed
    let firstPop = poped[0];
    pushed = pendingPush.splice(0, pushed.indexOf(firstPop) + 1)
    //遍历弹出队列,依次操作弹出
    for (let i = 0; i < poped.length; i++) {
        let popVal = poped[i];
        let find = false;
        //弹出正确
        if (pushed[pushed.length - 1] == popVal) {
            pushed.pop();
            find = true;
            continue;
        } else {
            //从待添加遍历，遍历一个，push一个
            let j = 0;
            for (; j < pendingPush.length; j++) {
                let val = pendingPush[j];
                if (val == popVal) {
                    find = true
                    break;
                } else {
                    pushed.push(val);
                }
            }
            pendingPush.splice(0, j+1)
        }

        if (!find) {
            return false
        }
    }
    return true;
}


let pushed = [1,3,2,0], poped = [1,3,2,0]



let rst = checkIsCorrect(pushed, poped);
console.log('rst: ', rst);