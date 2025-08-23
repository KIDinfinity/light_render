import mapObjectToFields from './mapObjectToFields';
import queryObjByFlattenPathAndMapObjToFields from './queryObjByFlattenPathAndMapObjToFields';
import mapFieldsToObj from './mapFieldsToObj';
import mapFieldsToStandardObj from './mapFieldsToStandardObj';
import cleanValidateData from './cleanValidateData';
import cleanValidateDataOfDataCapture from './cleanValidateDataOfDataCapture';
import registerForm from './registerForm';
import unRegisterForm from './unRegisterForm';
import updateForm from './updateForm';
import queryValue from './queryValue';
import objectQueryValue from './objectQueryValue';
import cleanFieldsValue from './cleanFieldsValue';
import formatFlattenValue from './formatFlattenValue';
import onFieldsChangeOfDate from './onFieldsChangeOfDate';
import onFieldsChangeOfDateOrgin from './onFieldsChangeOfDateOrgin';
import compareCurrentTimeEarlierThanTargetTime from './compareCurrentTimeEarlierThanTargetTime';
import compareNowDateTimeEarlierThanTargetTime from './compareNowDateTimeEarlierThanTargetTime';
import compareCurrentTimeLatterThanTargetTime from './compareCurrentTimeLatterThanTargetTime';
import toThousandsString from './toThousandsString';
import getErrorArray from './getErrorArray';
import transfersParams from './transfersParams';
import rangeDateTransferParams from './rangeDateTransferParams';
import rangeDateTransferParamsStandard from './rangeDateTransferParamsStandard';
import validateFormsAndGetErrors from './validateFormsAndGetErrors';
import validateFormsAndGetErrorsAsync from './validateFormsAndGetErrorsAsync';
import getErrorNode from './getErrorNode';
import scrollToError from './scrollToError';
import saveErrorRef from './saveErrorRef';
import removeErrorRef from './removeErrorRef';
import removeUndefined from './removeUndefined';
import shouldUpdateState from './shouldUpdateState';
import useMergeFieldConfig from './useMergeFieldConfig';
import useFieldConfig from './useFieldConfig';
// antd4需要的表单数据转换， object -> array
import { validateFormsAndGetErrors_v4, getFields, getChangedFields } from './v4';
import validateFormsAndGetErrorsByRequired from './validateFormsAndGetErrorsByRequired';

export default {
  getFields,
  getChangedFields,
  validateFormsAndGetErrors_v4,
  shouldUpdateState,
  mapObjectToFields,
  queryObjByFlattenPathAndMapObjToFields,
  mapPropsToFields: queryObjByFlattenPathAndMapObjToFields,
  mapFieldsToObj,
  mapFieldsToStandardObj,
  onFieldsChange: mapFieldsToStandardObj,
  cleanValidateData,
  cleanValidateDataOfDataCapture,
  registerForm,
  unRegisterForm,
  updateForm,
  queryValue,
  objectQueryValue,
  cleanFieldsValue,
  formatFlattenValue,
  onFieldsChangeOfDate,
  onFieldsChangeOfDateOrgin,
  compareCurrentTimeEarlierThanTargetTime,
  compareNowDateTimeEarlierThanTargetTime,
  compareCurrentTimeLatterThanTargetTime,
  toThousandsString,
  getErrorArray,
  transfersParams,
  rangeDateTransferParams,
  rangeDateTransferParamsStandard,
  validateFormsAndGetErrors,
  validateFormsAndGetErrorsAsync,
  getErrorNode,
  scrollToError,
  saveErrorRef,
  removeErrorRef,
  removeUndefined,
  useMergeFieldConfig,
  useFieldConfig,
  validateFormsAndGetErrorsByRequired,
};
