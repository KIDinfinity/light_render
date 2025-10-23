import { Order } from '@/enum/Sorter';

interface Sorter {
  order: Order;
  field: string;
}
/**
 * 转换排序值格式
 * @param {String} sorter.order
 * @param {String} sorter.sortName
 */
export const transSorter = (sorter: Sorter) => {
  const { order, field: sortName } = sorter;
  return {
    sortOrder: Order[order],
    sortName,
  };
};
