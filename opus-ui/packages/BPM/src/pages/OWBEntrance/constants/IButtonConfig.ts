import type { ButtonCode } from './ButtonCode';
import type { ButtonStatus } from './ButtonStatus';
import type IButtonService from './IButtonService';

export default interface IButtonConfig {
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
