/**
 * 将大数字转换为更易读的格式，例如 1000 -> 1.00k, 10000 -> 1.00w, 100000000 -> 1.00亿
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

    // 定义单位和对应的阈值
    const units = [
        { threshold: 1000000000000, unit: '万亿' }, // 1万亿
        { threshold: 100000000, unit: '亿' }, // 1亿
        { threshold: 10000, unit: 'w' }, // 1万
        { threshold: 1000, unit: 'k' }, // 1千
    ];

    // 遍历单位，找到合适的单位
    for (const unit of units) {
        if (num >= unit.threshold) {
            return (num / unit.threshold).toFixed(2) + unit.unit; // 转换为对应单位，保留两位小数
        }
    }

    // 如果数字小于 1000，直接返回原数字
    return num.toString();
}