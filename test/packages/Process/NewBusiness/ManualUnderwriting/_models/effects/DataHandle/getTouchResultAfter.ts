import lodash from 'lodash';
import wrapTouch from 'process/_modal/Assessment/functions/wrapTouch';
import { NAMESPACE } from '../../../activity.config';
import { CustomerIdentificationModalVisibleOptions } from 'process/NewBusiness/ManualUnderwriting/Pages/CustomerIdentification';
import { OptionType } from 'process/NewBusiness/ManualUnderwriting/_enum';
import { getProcessJobInfo } from '@/services/owbNbProposalControllerService';

function* getTouchResultAfter({ payload }: any, { select, put, call }: any): Generator<any, any, any> {
  const { response, submitBusinessData, type, setOverdueTime, overdueTimedispatch } = payload || {};

  const applicationNo = yield select(
    ({ newBusinessManualUnderwriting }: any) =>
      newBusinessManualUnderwriting?.businessData?.applicationNo
  );
  const taskDetail = yield select(({ processTask }: any) => processTask.getTask) || {};
  if (lodash.isPlainObject(response) && !lodash.isEmpty(response?.resultData?.businessData)) {
    const newBusinessData = response?.resultData?.businessData;
    newBusinessData.operationType = response?.resultData?.operationType;

    if (type === OptionType.coverage) {
      yield put({
        type: 'loadProposalFlags',
        payload: {
          applicationNo,
        },
      });
      const overdueResult = yield call(getProcessJobInfo, {
        caseNo: taskDetail?.processInstanceId,
      });
      setOverdueTime(overdueResult?.resultData?.overdueTime);
      overdueTimedispatch({
        type: 'setOverdueTime',
        payload: {
          overdueTimeRender: overdueResult?.resultData?.overdueTime,
        },
      });
    }

    yield put.resolve({
      type: `getRiskIndicator`,
      payload: { applicationNo },
    });

    yield put({
      type: `setIsRefreshBpm`,
      payload: new Date().getTime(),
    });

    if (newBusinessData?.operationType === 'case.change.customer.information') {
      yield put({
        type: 'login/saveLoadingStatus',
        payload: {
          loadingStatus: false,
        },
      });

      yield put({
        type: 'clearProgressData',
      });

      const clientInfoListUpdated = lodash.map(
        submitBusinessData?.policyList?.[0]?.clientInfoList,
        (item) => {
          const updatedClientInfo = lodash.find(newBusinessData?.policyList?.[0]?.clientInfoList, {
            id: item.id,
          });
          if (updatedClientInfo) {
            return { ...updatedClientInfo };
          }
          return { ...item, oldClient: true };
        }
      );
      newBusinessData.policyList[0].clientInfoList = clientInfoListUpdated;

      yield put({
        type: 'customerIdentification/saveClaimProcessData',
        payload: {
          claimProcessData: newBusinessData,
        },
      });

      yield put({
        type: 'customerIdentification/saveShow',
        payload: {
          show: CustomerIdentificationModalVisibleOptions.VisibleAndCloseClientWhenClose,
        },
      });
    } else {
      yield put.resolve({
        type: 'getBEToFE',
        payload: {
          businessData: newBusinessData,
          needUpdataModal: !response.success && lodash.isPlainObject(response.resultData),
        },
      });
      yield put({
        type: 'setShouldCheckAMLOrCRRHighlight',
      });

      yield put({
        type: 'claimCaseController/saveSnapshot',
        payload: {
          postData: newBusinessData,
        },
      });

      // 刷新侧边栏信息显示
      yield put({
        type: 'navigatorInformationController/loadAllCategoryInformation',
      });

      yield put({
        type: 'saveHiddenModal',
      });

      //  TODO:这个代码之后要去掉
      yield put({
        type: 'login/saveLoadingStatus',
        payload: {
          loadingStatus: false,
        },
      });
    }
    yield put.resolve({
      type: `${NAMESPACE}/loadChequeInfoList`,
      payload: {
        showOnly: true,
      },
    });
    return response;
  }
}
export default wrapTouch(getTouchResultAfter, { showLoading: false, onCancel: function*(action, effects) {
  yield effects.put({
    type: 'clearProgressData',
  });
} })