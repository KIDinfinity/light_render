import lodash, { isPlainObject, isFunction } from 'lodash';
import { serialize as objectToFormData } from 'object-to-formdata';
import claimJp360ControllerService from '@/services/claimJp360ControllerService';

interface ISParams {
  claimNo?: string;
  policyNo?: string;
  identityType?: any;
  identityNo?: any;
}

export default function* getInsuredId({ payload }: any, { call, put, select }: any) {
  const {
    claimNo,
    policyNo,
    indentityId,
    indentityType,
    caseCategory,
    customerType,
  } = lodash.pick(payload, [
    'claimNo',
    'policyNo',
    'indentityId',
    'indentityType',
    'caseCategory',
    'customerType',
  ]);

  let params: ISParams = {};
  let url: any = '';
  if (claimNo) {
    params = {
      claimNo,
    };
    url = claimJp360ControllerService.getInsuredIdByClaimNo;
  }
  if (policyNo) {
    params = {
      policyNo,
    };
    url = claimJp360ControllerService.getInsured;
  }
  if (!!indentityId && !!indentityType) {
    // TODO:这个貌似没有用到,考虑删除
    params = {
      identityType: indentityType,
      identityNo: indentityId,
    };
    url = claimJp360ControllerService.getInsured;
  }
  let response;

  if (isFunction(url)) response = yield call(url, objectToFormData(params));
  const insuredIdExist = yield select((state: any) => state?.insured360?.insuredId);
  if (isPlainObject(response) && response.success) {
    const { resultData: insuredId } = response;

    if (insuredId !== insuredIdExist) {
      yield put({
        type: 'saveInsuredId',
        payload: {
          insuredId,
          caseCategory,
          customerType,
        },
      });
    }
  }
}
