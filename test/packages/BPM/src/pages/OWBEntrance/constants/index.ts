// import ActionConfigObject from './ActionConfigObject';
// import ActionConfigService from './ActionConfigService';
// import ActionCustomConfig from './ActionCustomConfig';
import AfterType from './AfterType';
import ButtonCode from './ButtonCode';
import ButtonStatus from './ButtonStatus';
// import CommonActionLife from './CommonActionLife';
// import CustomizationButtonConfig from './CustomizationButtonConfig';
// import IButtonConfig from './IButtonConfig';
// import IButtonService from './IButtonService';
// import LifeConfig from './LifeConfig';
// import ServiceItem from './ServiceItem';


interface ActionConfigService {
  getDataForSubmit: Function;
}
interface ActionConfigObject {
  services: {
    1: ActionConfigService;
    2: ActionConfigService;
    3: ActionConfigService;
  };
}

interface ActionCustomConfig {
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

interface CommonActionLife {
  before: Function;
  after: Function;
  anywaw?: Function;
}

interface LifeConfig {
  before: Function;
  progress: Function;
  after: Function;
}

interface IButtonConfig {
  key: string;
  buttonCode: ButtonCode;
  title: string;
  icon: string;
  className: string;
  status: ButtonStatus;
  errorsCount: number;
  isShowNotice: boolean;
  timer: number;
  validate: Function;
  action: Function;
  after: Function;
  anyway: Function;
  buttonId: string;
  buttonName: string;
  afterHook: string;
  activityStatus: string;
  pageController: string;
  checkInformationApiUrl: string;
  activityButtonServiceList: IButtonService[];
}

interface IButtonService {
  activityButtonId: string;
  buttonParams: string;
  buttonServiceOrder: number;
  buttonServiceUrl: string;
  creator: string;
  deleted: number;
  gmtCreate: string;
  gmtModified: string;
  id: string;
  modifier: string;
  transId: string;
  triggerSnapshot: number;
}

interface ServiceItem {
  buttonParams: string;
  buttonId: string;
  buttonCode: string;
  buttonName: string;
  activityStatus: string;
  buttonServiceOrder: number;
  afterHook: string;
}

interface CustomizationButtonConfig {
  buttonCode: string;
  buttonId: string;
}


export {
  ActionConfigObject,
  ActionConfigService,
  ActionCustomConfig,
  AfterType,
  ButtonCode,
  ButtonStatus,
  CommonActionLife,
  CustomizationButtonConfig,
  IButtonConfig,
  IButtonService,
  LifeConfig,
  ServiceItem,
};
