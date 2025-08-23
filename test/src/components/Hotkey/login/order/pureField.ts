/*
 * @Descripttion:
 * @Author: jack_huang
 * @Date: 2019-12-07 13:30:03
 * @LastEditors: jack_huang
 * @LastEditTime: 2019-12-07 15:48:54
 */
import lodash from 'lodash';
import OrderDataType from '../../common/enum/OrderDataType';
import orderDirection from '../../common/enum/orderDirection';
import initData from './initData';

interface IProps {
  list: any;
  order?: orderDirection;
}

const order = ({ list = [], order = orderDirection.Next }: IProps) => {
  let nextActive = {};

  const filterdList = lodash.filter(list, (item: any) => item.keyboardType === OrderDataType.Field);
  let hasActive = !!lodash.find(filterdList, 'active');

  if (!hasActive) {
    // 初始化
    list = initData(list);
    hasActive = true;
  }

  return lodash
    .chain(list)
    .cloneDeep()
    .filter((item: any) => item.keyboardType === OrderDataType.Field)
    .map((item: any) => {
      if (!hasActive) {
        if (lodash.find(filterdList, ['id', item.id])) {
          hasActive = true;

          return {
            ...item,
            active: 1,
          };
        }
      }

      return item;
    })
    .map((item: any) => {
      if (item.active) {
        const a = document.getElementById(item.id);
        if (a) {
          a.focus();
        }
      }

      return item;
    })
    .map((item: any, index: number, collection: lodash.ListIterator<any, any>) => {
      const enableNext = !lodash.get(nextActive, 'id') && item.active; // 要确保此时一定只有一个item.active

      if (enableNext) {
        if (order === orderDirection.Next) {
          nextActive =
            lodash.find(collection, (d: any) => d.order > item.order) ||
            lodash.find(collection, (d: any) => d.order);
        } else if (order === orderDirection.Prev) {
          nextActive =
            lodash.find(collection, (d: any) => d.order < item.order) ||
            lodash.findLast(collection, (d: any) => d.order);
        }
      }

      return item;
    })
    .map((item: any) => {
      return {
        ...item,
        active: lodash.get(nextActive, 'id') === item.id ? 1 : 0,
      };
    })
    .value();
};

export default order;
