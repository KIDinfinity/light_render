/*
 * @Descripttion: 筛选 - 主模块
 * @Author: jack_huang
 * @Date: 2019-11-18 14:54:34
 * @LastEditors: jack_huang
 * @LastEditTime: 2019-12-09 17:04:56
 */
import lodash from 'lodash';
import KeyboardType from '../../common/enum/OrderDataType';
import ActionType from '../enum/actionType';
import findNextActive from './findNextActive';

interface IProps {
  list: any;
  order: any;
  keyboardType?: KeyboardType;
}

const orderModule = ({ list = [], order }: IProps) => {
  let nextActive = {};
  let selectModule = null;

  return {
    orderConfig: lodash
      .chain(list)
      // filter - need revert
      .filter((item) => item.orderDataType === KeyboardType.Module && !item.actionType)
      // Module - nextActive
      .map((item: any, index, filterdList) => {
        nextActive = findNextActive(filterdList, item, nextActive, order);

        return item;
      })
      // Module - active
      .map((item) => ({
        ...item,
        active: lodash.get(nextActive, 'id') === item.id ? 1 : 0,
      }))
      // Module - focus
      .map((item: any) => {
        if (item.active) {
          if (item.actionType === ActionType.NextPrevFunc) {
          } else {
            selectModule = item.id;
          }
        }

        return item;
      })
      // filter revert -- TODO order
      .concat(
        list.filter(
          (item: any) => !(item.orderDataType === KeyboardType.Module && !item.actionType)
        )
      )
      .value(),
    selectModule,
  };
};

export default orderModule;
