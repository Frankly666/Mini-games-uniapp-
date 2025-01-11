/**
 * 将大数字转换为更易读的格式，例如 1000 -> 1.00k, 10000 -> 1.00w
 * @param {number | string} number - 输入的数字（可以是数字或字符串）
 * @returns {string} 格式化后的字符串
 */
export function formatLargeNumber(number) {
    // 将输入转换为数字类型
    const num = typeof number === 'string' ? parseFloat(number) : number;

    // 检查是否为有效数字
    if (isNaN(num)) {
        throw new Error('Invalid input: input must be a number or a string representing a number');
    }

    if (num >= 10000) {
        return (num / 10000).toFixed(2) + 'w'; // 转换为 "w" 单位，保留两位小数
    } else if (num >= 1000) {
        return (num / 1000).toFixed(2) + 'k'; // 转换为 "k" 单位，保留两位小数
    } else {
        return num.toString(); // 小于 1000 直接返回原数字
    }
}