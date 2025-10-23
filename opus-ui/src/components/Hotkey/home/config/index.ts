/*
 * @Descripttion: 配置入口
 * @Author: jack_huang
 * @Date: 2019-11-27 10:13:48
 * @LastEditors: jack_huang
 * @LastEditTime: 2019-11-28 10:54:57
 */
import lodash from 'lodash';
import defaultConfig from './defaultConfig';
import sidebarConfig from './sidebarConfig';

// TODO，如果嵌套层次里，有id重复，怎么办
const configs = [...defaultConfig, ...sidebarConfig];
const configsCompared = lodash.uniqBy(configs, 'id');

if (configs.length !== configsCompared.length) {
  throw 'hotkey config is duplicated';
}

export default configs;
