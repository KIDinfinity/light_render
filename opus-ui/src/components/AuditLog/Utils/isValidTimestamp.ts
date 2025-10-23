/**
 * num:待判断时间戳数字
 * TODO：可以加判断根据位数，大小判断等，目前只要是大于0整数即可，有format已经表示该值是日期相关
 */
export default (value) => {
  return typeof value === 'number' && value > 0 && value % 1 === 0;
};
