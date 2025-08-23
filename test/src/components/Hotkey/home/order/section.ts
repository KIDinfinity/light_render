/*
 * @Descripttion:
 * @Author: jack_huang
 * @Date: 2019-11-18 14:54:34
 * @LastEditors: jack_huang
 * @LastEditTime: 2019-12-02 15:30:21
 */
import lodash from 'lodash';
import type KeyboardType from '../../common/enum/orderDataType';
import OrderType from '../enum/orderDirection';
import findNextActive from './findNextActive';

interface IProps {
  list: any;
  order?: OrderType;
  keyboardType?: KeyboardType;
  hotkeysConfig?: [];
}

const orderSection = ({ list = [], order = OrderType.Next }: IProps) => {
  let nextActive = {};
  let selectSection = null;
  return {
    orderConfig: lodash
      .chain(list)
      // filter - need revert
      .filter((item) => item.active && item.sections)
      // section - nextActive - 只有一条数据
      .map((item: any) => {
        nextActive = findNextActive(
          item.sections,
          lodash.find(item.sections, 'active'),
          nextActive,
          order
        );

        return item;
      })
      // section - active
      .map((item) => ({
        ...item,
        sections: lodash.map(item.sections, (s) => ({
          ...s,
          active: lodash.get(nextActive, 'id') === s.id ? 1 : 0,
        })),
      }))
      // section - focus
      .map((item: any) => {
        item.sections.map((s: any) => {
          if (s.active) {
            selectSection = s.id;
          }
        });

        return item;
      })
      // filter revert -- TODO order
      .concat(list.filter((item: any) => !(item.active && item.sections)))
      .value(),
    selectSection,
  };
};

export default orderSection;
