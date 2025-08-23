/*
 * @Descripttion: 回调事件
 * @Author: jack_huang
 * @Date: 2019-11-18 14:54:34
 * @LastEditors: jack_huang
 * @LastEditTime: 2019-11-28 11:34:04
 */
import lodash from 'lodash';

/**
 * 找到configs中满足filter的第一个配置，执行其action方法
 *
 * @param {*} configs configs
 * @param {Function} filter filter
 *
 * @return:
 */
export default (configs: any = [], filter: Function = () => {}) => {
  const config = lodash.chain(configs).filter(filter).head().value();

  if (config && lodash.isFunction(config.action)) {
    config.action();
  }
};

const action1 = (config: any = {}, filter: Function = () => {}) => {
  if (config && lodash.isFunction(config.action)) {
    config.action();
  }
};

export { action1 };
