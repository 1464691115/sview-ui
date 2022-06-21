/** number 转化成 css 的单位字符串 */
export function Px(num: number | string = 0, isStr: 'rpx' | 'px' | 'vw' | 'upx' = 'rpx') {
    return !isNaN(+num) || typeof num == 'number' ? num + isStr : num
}


/** 是否为圆角 */
export function isCircle(bol: string | boolean) {
    return bol === 'circle' || bol === true ? '51%' : '0'
}

/** 提示框 */
export function showToast(content, icon: UniApp.ShowToastOptions['icon'] = 'none', ait = 1000) {
    return new Promise((resolve) => {
        uni.showToast({
            icon,
            title: content,
            duration: ait - 50,
            mask: true,
        });
        setTimeout(() => {
            resolve(true);
        }, ait);
    });
}
