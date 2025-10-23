import type { LifeConfig } from './LifeConfig';
import type ActionConfigObject from './ActionConfigObject';

export default interface ActionCustomConfig {
  // 前置于action 的校验钩子
  validate: Function | LifeConfig;
  // 点击button 会触发的函数
  action: Function | ActionConfigObject;
  // 定时执行的间隔，缺省则不放入定时队列
  timer: number;
  // action 完成之后是否弹出通知
  isShowNotice: boolean;
  // action 执行成功之后的回调
  after: Function | LifeConfig;
  // button 是否隐藏
  hidden: boolean | Function;
  // button 是否不可点击
  disabled: boolean | Function;
}
