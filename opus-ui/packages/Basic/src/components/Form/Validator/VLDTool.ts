import lodash from 'lodash';
import moment from 'moment';
import { formatMessageApi } from '@/utils/dictFormatMessage';

interface CheckProps {
  checkValue: string;
  isCheck?: boolean;
  value?: string;
  isShowErrors?: boolean;
}

export const format = (message: string, dic?: string) =>
  formatMessageApi({ Label_COM_WarningMessage: message }, dic);

class VLDTool {
  // 获取必填校验
  getRequiredVLD = (
    dictCode: string,
    factor: Function = (dictCode: string, checkValue: string) => checkValue === dictCode
  ) => ({ checkValue, isCheck = false, value, isShowErrors = false }: CheckProps) => {
    const isPassRules = factor(dictCode, checkValue);
    const ErrorMessage = format('ERR_000001');
    if (isShowErrors) {
      return ErrorMessage;
    }
    if (!isCheck) {
      return isPassRules;
    }
    return isPassRules && lodash.isEmpty(value) ? ErrorMessage : false;
  };

  // 获取日期区间-开始校验
  getStartDateVLD = (errorCode: string) => ({
    checkValue,
    isCheck = false,
    value: reduxValue,
    isShowErrors = false,
  }: CheckProps) => {
    const ErrorMessage = format(errorCode);
    if (isShowErrors) {
      return ErrorMessage;
    }
    if (!isCheck) {
      return (rule: any, value: any, callback: Function) => {
        if (moment(value).startOf('day').valueOf() > moment(checkValue).startOf('day').valueOf()) {
          callback(ErrorMessage);
        }
        callback();
      };
    }
    return moment(checkValue).startOf('day').valueOf() >
      moment(reduxValue).startOf('day').valueOf() && !lodash.isEmpty(reduxValue)
      ? ErrorMessage
      : false;
  };

  // 获取日期区间-结束校验
  getEndDateVLD = (errorCode: string) => ({
    checkValue,
    isCheck = false,
    value: reduxValue,
    isShowErrors = false,
  }: CheckProps) => {
    const ErrorMessage = format(errorCode);
    if (isShowErrors) {
      return ErrorMessage;
    }
    if (!isCheck) {
      return (rule: any, value: any, callback: Function) => {
        if (moment(checkValue).startOf('day').valueOf() > moment(value).startOf('day').valueOf()) {
          callback(ErrorMessage);
        }
        callback();
      };
    }
    return moment(reduxValue).startOf('day').valueOf() >
      moment(checkValue).startOf('day').valueOf() && !lodash.isEmpty(reduxValue)
      ? ErrorMessage
      : false;
  };

  compareNameVLD = (errorCode: string) => ({
    checkValue,
    isCheck = false,
    value: reduxValue,
    isShowErrors = false,
  }: any) => {
    const ErrorMessage = format(errorCode);
    if (isShowErrors) {
      return ErrorMessage;
    }
    if (!isCheck) {
      return (rule: any, value: any, callback: Function) => {
        if (!lodash.every(checkValue, (item) => item === value)) {
          callback(ErrorMessage);
        }
        callback();
      };
    }
    return lodash.every(checkValue, (item) => item === reduxValue) ? false : ErrorMessage;
  };

  expectPolicyVLD = (errorCode: string) => ({
    expectPolicyList,
    isCheck = false,
    value: reduxValue,
    isShowErrors = false,
  }: any) => {
    const ErrorMessage = format(errorCode, reduxValue);
    if (isShowErrors) {
      return ErrorMessage;
    }
    if (!isCheck) {
      return (rule: any, value: any, callback: Function) => {
        if (lodash.includes(expectPolicyList, value)) {
          callback(format(errorCode, value));
        }
        callback();
      };
    }
    return lodash.includes(expectPolicyList, reduxValue) ? false : ErrorMessage;
  };
}

export const {
  getRequiredVLD,
  getStartDateVLD,
  getEndDateVLD,
  compareNameVLD,
  expectPolicyVLD,
} = new VLDTool();
