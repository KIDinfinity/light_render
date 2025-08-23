import lodash from 'lodash';
import { ESiderPermissions } from 'basic/enum';
import { getIntegrationChecklist } from '@/services/navigatorIntegrationChecklistControllerService';
import { taskStatus } from 'bpm/enum';
import CallStatus from 'integration/Enum/CallStatus';

interface Action {
  type: string;
  payload: {
    businessNo: string;
    caseNo: string;
    caseCategory: string;
    taskDefKey: string;
  };
}

export default function* (action: Action, { call, put, select }: any) {
  const { businessNo, caseNo, caseCategory, taskDefKey } = lodash.pick(action.payload, [
    'businessNo',
    'caseNo',
    'caseCategory',
    'taskDefKey',
  ]);

  const commonAuthorityList = yield select(
    (state: any) => state.authController.commonAuthorityList
  );
  const hasAutority =
    commonAuthorityList
      .filter(
        (item: any) => item.result && item.authorityCode === ESiderPermissions.IntegrationChecklist
      )
      .map((item: any) => item.authorityCode).length > 0;

  if (!hasAutority) {
    return;
  }
  const response = yield call(getIntegrationChecklist, {
    businessNo,
    caseNo,
    caseCategory,
  });

  if (lodash.isPlainObject(response) && response.success && lodash.isArray(response.resultData)) {
    const integrationChecklist = response.resultData;
    yield put({
      type: 'saveIntegrationChecklist',
      payload: {
        integrationChecklist: integrationChecklist,
      },
    });

    const errorItem = lodash
      .chain(integrationChecklist)
      .find((panelItem) => {
        return (
          (panelItem.taskStatus === taskStatus.completed ||
            panelItem?.activityKey === taskDefKey) &&
          lodash.some(panelItem?.integrationCallRecordList, (item) => {
            return item?.callStatus === CallStatus.fail;
          })
        );
      })
      .value();
    if (errorItem) {
      const hightlightId = lodash.find(errorItem?.integrationCallRecordList, (item) => {
        return item.callStatus === CallStatus.fail;
      })?.integrationSessionId;
      yield put({
        type: 'integration/saveCurrentPanelId',
        payload: {
          currentPanelId: errorItem?.taskId,
        },
      });
      yield put({
        type: 'integration/saveCurrentIntegrationId',
        payload: {
          currentIntegrationId: hightlightId,
        },
      });
    } else {
      const hightlightItem = lodash.find(integrationChecklist, (panelItem) => {
        return panelItem?.activityKey === taskDefKey;
      });
      const hightlightId = (hightlightItem?.integrationCallRecordList || [])[0]
        ?.integrationSessionId;
      yield put({
        type: 'integration/saveCurrentPanelId',
        payload: {
          currentPanelId: hightlightItem?.taskId,
        },
      });
      yield put({
        type: 'integration/saveCurrentIntegrationId',
        payload: {
          currentIntegrationId: hightlightId,
        },
      });
    }
    const lastCurrentActivityItemIndex = lodash.findIndex(integrationChecklist, (item) => {
      return item?.activityKey === taskDefKey;
    });
    const filterActiveKey: any = lodash
      .chain(integrationChecklist)
      .filter((item, index) => {
        return (
          (item?.activityKey === taskDefKey && index === lastCurrentActivityItemIndex) ||
          lodash.some(item.integrationCallRecordList, (callItem) => {
            return callItem?.callStatus === CallStatus.fail;
          })
        );
      })
      .map((item) => {
        return item.taskId;
      })
      .value();

    yield put({
      type: 'saveIntegrationActivityKeys',
      payload: {
        integrationActivityKeys: filterActiveKey,
      },
    });
  }
}
