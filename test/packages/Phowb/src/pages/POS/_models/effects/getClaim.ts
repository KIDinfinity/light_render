import lodash from 'lodash';
import { queryData } from '@/services/dcSnapshotService';
import { findBizData } from '@/services/bpmBusinessProcessService';
import { safeParseUtil } from '@/utils/utils';
import TaskDefKey from 'enum/TaskDefKey';
import { ActivityStatus } from 'bpm/pages/Information/enum/index';
import CreateLocation from 'enum/CreateLocation';

export default function* ({ payload }: any, { call, put }: any) {
  const {
    taskId,
    createLocation,
    inquiryBusinessNo,
    processInstanceId,
    taskDefKey,
    taskStatus,
    posHistory,
  } = payload;

  const snapShot = yield call(queryData, {
    dataType: 'mainPage',
    taskId,
  });

  const snapShotData = safeParseUtil(lodash.get(snapShot, 'resultData.dataValue', '{}'), {});

  if (!lodash.isEmpty(snapShotData)) {
    yield put({
      type: 'saveClaimProcessData',
      payload: {
        claimProcessData: {
          ...snapShotData,
        },
      },
    });
    yield put.resolve({
      type: 'getQueryPayInStatus',
      payload: { posDataDetail: snapShotData?.posDataDetail, taskDefKey },
    });

    if (taskStatus.toLowerCase() !== ActivityStatus.Completed) {
      yield put({
        type: 'getUsTaxInformationByPosNo',
        payload: { posNo: inquiryBusinessNo },
      });
    }

    return;
  }

  // 智能环创建，不用调接口，页面policyNo, transactionType可编辑
  if (
    createLocation === CreateLocation['01'] &&
    taskDefKey === TaskDefKey.PH_POS_ACT001 &&
    !inquiryBusinessNo
  ) {
    return;
  }

  // batch create fail， 获取bpm存储的policyNo, transactionType，重新获取数据
  // (dataCapture)
  if (createLocation === CreateLocation['02'] && taskDefKey === TaskDefKey.PH_POS_ACT001) {
    const BizData = yield call(findBizData, { processInstanceId });
    if (lodash.isPlainObject(BizData) && BizData?.success && BizData?.resultData) {
      const businessData = safeParseUtil(BizData?.resultData?.businessData, {});
      const { policyNo, transactionType } = businessData;
      yield put.resolve({
        type: 'getPolicyInfoByPolicyNo',
        payload: {
          policyNo,
          transactionType,
        },
      });
      if (taskStatus.toLowerCase() !== ActivityStatus.Completed) {
        yield put({
          type: 'getUsTaxInformationByPosNo',
          payload: { posNo: inquiryBusinessNo },
        });
      }
    }
    return;
  }

  yield put.resolve({
    type: 'getPosDataCapture',
  });
  if (taskStatus.toLowerCase() !== ActivityStatus.Completed) {
    yield put({
      type: 'getUsTaxInformationByPosNo',
      payload: { posNo: inquiryBusinessNo },
    });
  }
}
