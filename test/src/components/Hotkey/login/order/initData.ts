/*
 * @Descripttion: 初始化配置
 * @Author: jack_huang
 * @Date: 2019-12-07 13:51:53
 * @LastEditors: jack_huang
 * @LastEditTime: 2019-12-07 13:52:27
 */
import lodash from 'lodash';

export default (list: any) => {
  const cloneList = lodash
    .chain(list)
    .cloneDeep()
    .filter(() => location.href.match(/user\/login/))
    .orderBy('order', 'asc')
    .value();

  const hasActive = lodash.find(cloneList, 'active');
  if (!hasActive && cloneList.length) {
    lodash.set(cloneList, '0.active', 1);
  }

  return cloneList;
};
