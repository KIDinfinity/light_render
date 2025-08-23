import lodash from 'lodash';
import { getMultipleOverallSideBarInfo } from '@/services/c360SideBarControllerService';

export default function* getMultipleOverallSideBar(_: any, { call, put, select }: any) {
  // @ts-ignore
  const sideBarQOList: any = yield put.resolve({
    type: 'getClientIdList',
  });

  if (lodash.size(sideBarQOList) === 0) {
    yield put.resolve({
      type: 'clearInsured',
    });
  } else {
    // @ts-ignore
    const { businessNo, businessCode }: any = yield select(
      ({ insured360 }: any) => insured360?.taskInfo
    ) || {};
    const multipleOverallSideBarInfoController = new AbortController();

    const prevMultipleOverallSideBarInfoController =  yield select(
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
    // @ts-ignore
    const infoResponse: any = yield call(getMultipleOverallSideBarInfo, {
      businessNo: businessNo || inquiryBusinessNo,
      businessCode,
      sideBarQOList,
    }, {signal: multipleOverallSideBarInfoController.signal});

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
