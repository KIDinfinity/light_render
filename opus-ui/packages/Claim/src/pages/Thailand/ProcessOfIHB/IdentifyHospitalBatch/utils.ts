import lodash from 'lodash';
import { formUtils } from 'basic/components/Form';

const isScannedOrError = (status: string) => {
  return formUtils.queryValue(status) === 'Scanned' || formUtils.queryValue(status) === 'Error';
};

const arrToObject = (str: string, arr: any[]) => {
  const obj = {};
  lodash.forEach(arr, (item, idx) => {
    lodash.mapValues(item, (value, key) => {
      obj[`${str}_${idx}_${key}`] = value;
    });
  });
  return obj;
};

const objectToKeyPath = (obj: any) => {
  const key = lodash.keys(obj)[0];
  const keyArr = key.split('_');
  const keyPath = `${keyArr[0]}.[${keyArr[1]}].${keyArr[2]}`;
  return keyPath;
};

const fieldValue = (field: any) => {
  const key = lodash.keys(field)[0];
  let value = formUtils.queryValue(field[key]);
  if (lodash.isBoolean(value)) {
    value = value ? 1 : 0;
  }
  return value;
};

const formRegisterOrUn = async (props: any, formId: string) => {
  const { dispatch, form, idx, invoiceInforSelRows } = props;
  const currentInvoiceInfo = lodash.filter(invoiceInforSelRows, (item: any) => item.key === idx);
  if (lodash.get(currentInvoiceInfo, 'length') && currentInvoiceInfo[0].type === 'OPD') {
    await dispatch({
      type: 'IdentifyHospitalBatchController/registerForm',
      payload: {
        form,
        formId,
      },
    });
  } else {
    await dispatch({
      type: 'IdentifyHospitalBatchController/unRegisterForm',
      payload: {
        form,
        formId,
      },
    });
  }
};

const dateForUpdateChange = (invoiceInforData: any[], basicInforData: any) =>
  lodash.map(invoiceInforData, (item: any) => {
    const oldRegistrionObj = item.registration;
    const recordInfo: any = formUtils.objectQueryValue(item);
    recordInfo.registration = oldRegistrionObj;
    recordInfo.medicalProvider = basicInforData.medicalProvider;
    recordInfo.coverPageNo = formUtils.queryValue(basicInforData.coverPageNo);
    return recordInfo;
  });

export {
  isScannedOrError,
  arrToObject,
  objectToKeyPath,
  fieldValue,
  formRegisterOrUn,
  dateForUpdateChange,
};
