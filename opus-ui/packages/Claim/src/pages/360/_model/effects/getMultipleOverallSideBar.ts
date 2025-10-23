import lodash from 'lodash';
import { getMultipleOverallSideBarInfo } from '@/services/c360SideBarControllerService';
import { queryCfgBizPageAtom } from '@/services/miscCfgInquiryControllerService';
import { LS, LSKey } from '@/utils/cache';
import type { FieldsConfigResponse } from '../../dtos/360CfgBizPageAtom';
import type { InsuredPolicyResponseData } from '../../dtos/360InfoResponse';

export default function* getMultipleOverallSideBar({ payload }: any, { call, put, select }: any) {
  const businessCode = LS.getItem(LSKey.CURRENTUSER).businessCode;
  const { caseDetail, customerType } = payload || {};
  const { businessNo, caseNo } = caseDetail || {};

  // @ts-ignore
  const sideBarQOList: any = yield put.resolve({
    type: 'getClientIdList',
    payload: { caseDetail, customerType },
  });

  if (lodash.size(sideBarQOList) === 0) {
    yield put.resolve({
      type: 'clearInsured',
    });
  } else {
    const multipleOverallSideBarInfoController = new AbortController();

    const prevMultipleOverallSideBarInfoController = yield select(
      ({ insured360 }: any) => insured360?.multipleOverallSideBarInfoController
    );

    if (prevMultipleOverallSideBarInfoController) {
      prevMultipleOverallSideBarInfoController?.abort();
    }

    yield put({
      type: 'saveMultipleOverallSideBarInfoController',
      payload: { multipleOverallSideBarInfoController },
    });

    const inquiryBusinessNo = yield select(
      ({ processTask }: any) => processTask.getTask?.inquiryBusinessNo
    ) || {};

    const infoPromise = getMultipleOverallSideBarInfo(
      {
        caseNo,
        businessNo: businessNo || inquiryBusinessNo,
        businessCode,
        sideBarQOList,
      },
      {
        signal: multipleOverallSideBarInfoController.signal,
      }
    );
    const params = new FormData();
    params.set('businessCode', businessCode);
    const atomPromise = queryCfgBizPageAtom(params);

    const [infoResponse, atomResponse]: [InsuredPolicyResponseData, FieldsConfigResponse] =
      yield Promise.all([infoPromise, atomPromise]);

    if (atomResponse?.success) {
      yield put({
        type: 'saveFieldConfig',
        payload: { fieldConfig: atomResponse.resultData },
      });
    }

    if (
      lodash.isPlainObject(infoResponse) &&
      infoResponse?.success &&
      infoResponse.resultData.sideBarOverallList &&
      lodash.isArray(infoResponse.resultData.sideBarOverallList)
    ) {
      const { sideBarOverallList } = infoResponse.resultData;
      const activeClientInfo = lodash.chain(sideBarOverallList).first().value();

      yield put.resolve({
        type: 'saveSideBarOverallList',
        payload: {
          sideBarOverallList,
        },
      });

      yield put({
        type: 'saveActive360Info',
        payload: {
          activeClientId: activeClientInfo?.keyClientId,
        },
      });

      yield put({
        type: 'getCheckExistDoc',
        payload: {
          businessNos: lodash.map(activeClientInfo?.claimHistoryList, (item) => {
            return item?.claimNo;
          }),
        },
      });
    }
  }
}
