/**
 * 防抖
 * 每次调用都会判断创建一个计时器，并清除上一个计时器。
 * 只有计数器时间到了，才会执行cb
 * @param {*} cb 
 * @param {*} delay 
 * @returns 
 */
 function debouce(cb, delay) {
    let timeout;
    return (...args) => {
        clearTimeout(timeout);
        timeout = setTimeout(() => {
            cb(...args);
        }, delay);
    }
}