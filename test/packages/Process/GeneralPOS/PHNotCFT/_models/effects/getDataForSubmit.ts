import lodash from 'lodash';
import { formUtils } from 'basic/components/Form';
// import { generatePosNo } from '@/services/posControllerService';
// import TaskDefKey from 'enum/TaskDefKey';
// import CreateLocation from 'enum/CreateLocation';
// import { Modal } from 'antd';
import cleanPosDetail from '../../Utils/cleanPosDetail';
import mutateFlag from '../../Utils/mutateFlag';

export default function* ({ payload }: any, { select }: any) {
  const { operationType } = payload || {};
  const taskDetail = yield select((state: any) => state.processTask.getTask);

  const {
    taskId,
    processInstanceId,
    caseCategory,
    submissionDate,
    businessNo,
    inquiryBusinessNo,
    taskDefKey,
    assessmentType,
    // createLocation,
  } = taskDetail;

  const claimProcessData = yield select(
    (state: any) => state.GeneralPOSPHNotCFTController.claimProcessData
  );

  const cleanData = formUtils.cleanValidateData(claimProcessData);
  mutateFlag(cleanData.businessData);
  cleanData.businessData.transactionTypes[0] = cleanPosDetail(
    cleanData.businessData.transactionTypes[0]
  );

  const claimDatas: any = formUtils.formatFlattenValue(cleanData);

  const commonFields = [
    'mainCompanyCode',
    'mainInsuredClientId',
    'mainOwnerClientId',
    'mainPayorClientId',
    'mainPolicyId',
    'sourceSystem',
  ];

  if (claimDatas.businessData?.policyInfo?.applyToPolicyInfoList) {
    lodash.set(
      claimDatas.businessData,
      'policyInfo.policyInfoList',
      claimDatas.businessData?.policyInfo?.applyToPolicyInfoList || []
    );
  }

  claimDatas.businessData = {
    ...claimDatas.businessData,
    ...lodash.pick(claimDatas?.businessData.policyInfo, commonFields),
    submissionDate,
  };

  // 当datacapture节点，没有posNo时,  智能环创建, 重新生成posNo提交到后端
  // 后端给的数据结构中不存在posNo，不能确定posNo应该塞哪一层，暂时废弃
  // if (
  //   taskDefKey === TaskDefKey.PH_POS_ACT001 &&
  //   !inquiryBusinessNo &&
  //   createLocation === CreateLocation['01']
  // ) {
  //   const posNoResponse = yield call(generatePosNo, {
  //     submissionChannel: claimDatas.submissionChannel || '',
  //     transactionTypes: [claimDatas?.transactionTypes?.[0]?.transactionTypeCode],
  //   });
  //   if (
  //     lodash.isPlainObject(posNoResponse) &&
  //     posNoResponse.success &&
  //     !lodash.isEmpty(posNoResponse.resultData)
  //   ) {

  //     return {
  //       ...claimDatas,
  //       businessData: {
  //         ...claimDatas.businessData,
  //         posNo: posNoResponse.resultData.posNum || '',
  //         posDataDetail: {
  //           ...claimDatas.businessData.posDataDetail,
  //           posNo: posNoResponse.resultData.posNum || '',
  //         },
  //       },
  //     };
  //   }
  //   if (!posNoResponse?.success && posNoResponse?.promptMessages?.[0]?.content) {
  //     Modal.error({ title: posNoResponse?.promptMessages?.[0]?.content });
  //   }
  //   return;
  // }

  return {
    caseNo: processInstanceId,
    taskId,
    caseCategory,
    businessNo,
    inquiryBusinessNo,
    submissionDate,
    activityKey: taskDefKey,
    operationType,
    assessmentType,
    ...claimDatas,
  };
}
