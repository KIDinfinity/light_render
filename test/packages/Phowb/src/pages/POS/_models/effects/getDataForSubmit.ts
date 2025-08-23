import lodash from 'lodash';
import { formUtils } from 'basic/components/Form';
import { generatePosNo } from '@/services/posControllerService';
import TaskDefKey from 'enum/TaskDefKey';
import CreateLocation from 'enum/CreateLocation';
import { Modal } from 'antd';

export default function* ({ payload }: any, { select, call }: any) {
  const { operationType } = payload;
  const { taskDetail, claimProcessData } = yield select((state: any) => ({
    claimProcessData: state.phowbDataCaptureController.claimProcessData,
    taskDetail: state.processTask.getTask,
  }));

  const {
    taskId,
    processInstanceId,
    caseCategory,
    submissionDate,
    businessNo,
    inquiryBusinessNo,
    taskDefKey,
    assessmentType,
    createLocation,
  } = taskDetail;

  const claimDatas: any = formUtils.formatFlattenValue(formUtils.cleanValidateData(claimProcessData));

  const policyNo = claimDatas?.posDataDetail?.posRequestInformation?.policyNo || '';
  const transactionType = claimDatas?.posDataDetail?.posRequestInformation?.transactionType || '';

  const dataForSubmit = {
    caseNo: processInstanceId,
    taskId,
    caseCategory,
    businessNo,
    inquiryBusinessNo,
    submissionDate,
    activityKey: taskDefKey,
    operationType,
    assessmentType,
    businessData: {
      ...claimDatas,
      taskId,
      caseNo: processInstanceId,
      caseCategory,
      policyNo,
      businessNo,
      transactionType,
      submissionDate,
      posNo: inquiryBusinessNo,
      posDataDetail: {
        submissionChannel: claimDatas.submissionChannel,
        ...claimDatas?.posDataDetail,
      },
      originalSectionData: claimDatas.originalSectionData,
      activityKey: taskDefKey,
    },
  };

  // 当datacapture节点，没有posNo时,  智能环创建, 重新生成posNo提交到后端
  if (
    taskDefKey === TaskDefKey.PH_POS_ACT001 &&
    !inquiryBusinessNo &&
    createLocation === CreateLocation['01']
  ) {
    const posNoResponse = yield call(generatePosNo, {
      submissionChannel: claimDatas.submissionChannel || '',
      transactionTypes: new Array(transactionType),
    });
    if (
      lodash.isPlainObject(posNoResponse) &&
      posNoResponse.success &&
      !lodash.isEmpty(posNoResponse.resultData)
    ) {
      return {
        ...dataForSubmit,
        businessData: {
          ...dataForSubmit.businessData,
          posNo: posNoResponse.resultData.posNum || '',
          posDataDetail: {
            ...dataForSubmit.businessData.posDataDetail,
            posNo: posNoResponse.resultData.posNum || '',
          },
        },
      };
    }
    if (!posNoResponse?.success && posNoResponse?.promptMessages?.[0]?.content) {
      Modal.error({ title: posNoResponse?.promptMessages?.[0]?.content });
    }
    return;
  }

  return {
    ...dataForSubmit,
    businessData: {
      ...dataForSubmit.businessData,
      posDataDetail: dataForSubmit.businessData.posDataDetail,
    },
  };
}
