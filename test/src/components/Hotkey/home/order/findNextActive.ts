/*
 * @Descripttion:
 * @Author: jack_huang
 * @Date: 2019-11-18 14:54:34
 * @LastEditors: jack_huang
 * @LastEditTime: 2019-11-28 12:11:06
 */
import lodash from 'lodash';
import OrderDirection from '../enum/orderDirection';

export default (list: any, item: any, nextActive: any, order: OrderDirection) => {
  let result = null;

  const activeItem = list.length && lodash.find(list, 'active');

  if (!activeItem) {
    // 设置默认选中为第一个(TODO:注意，这个应该根据的是model(不是根据第一个排序))
    nextActive = lodash.chain(list).orderBy('order', 'asc').first().value();
    return nextActive;
  }

  const enableNext = !lodash.get(nextActive, 'id') && item.active; // 要确保此时一定只有一个item.active

  if (enableNext) {
    if (order === OrderDirection.Next) {
      result =
        lodash
          .chain(list)
          .orderBy('order', 'asc')
          .find((d: any) => d.order > item.order)
          .value() || lodash.minBy(list, 'order');
    } else if (order === OrderDirection.Prev) {
      result =
        lodash
          .chain(list)
          .orderBy('order', 'desc')
          .find((d: any) => d.order < item.order)
          .value() || lodash.maxBy(list, 'order');
    } else {
      throw 'need params order: OrderDirection';
    }
  }

  return result || nextActive || {};
};
