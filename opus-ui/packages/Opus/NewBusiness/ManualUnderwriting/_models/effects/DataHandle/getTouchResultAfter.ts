import lodash from 'lodash';
import wrapTouch from 'process/_modal/Assessment/functions/wrapTouch';
import { NAMESPACE } from '../../../activity.config';
import { CustomerIdentificationModalVisibleOptions } from 'opus/NewBusiness/ManualUnderwriting/Pages/CustomerIdentification';
import { OptionType } from 'opus/NewBusiness/ManualUnderwriting/_enum';

function* getTouchResultAfter({ payload }: any, { select, put }: any): Generator<any, any, any> {
  const { response, submitBusinessData, type } = payload || {};
  const applicationNo = yield select(
    ({ newBusinessManualUnderwriting }: any) =>
      newBusinessManualUnderwriting?.businessData?.applicationNo
  );
  const loadFacutativeInfoChangeFlag = yield select(
    ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace.loadFacutativeInfoChangeFlag
  );

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
    }

    yield put.resolve({
      type: `getRiskIndicator`,
      payload: { applicationNo },
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
      // eslint-disable-next-line require-atomic-updates
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
    yield put({
      type: `${NAMESPACE}/saveIsSaveDataComplete`,
      payload: {
        isSaveDataComplete: true,
      },
    });

    if (!newBusinessData?.policyList?.[0]?.policyDecision?.facultativePackageCode) {
      yield put({
        type: 'setLoadFacutativeInfoChangeFlag',
        payload: {
          loadFacutativeInfoChangeFlag: !loadFacutativeInfoChangeFlag,
        },
      });
    }

    return response;
  }
}

export default wrapTouch(getTouchResultAfter, { showLoading: false, onCancel: function*(action, effects) {
  yield effects.put({
    type: 'clearProgressData',
  });
} })