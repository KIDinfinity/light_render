import {
  CLM,
  MedicalConfirm,
  PA,
  ProductCancellation,
  ClaimPaymentCheck,
} from 'claim/pages/taskDefKey';

// 医长意见
const medicalTaskDefKey: string[] = [MedicalConfirm.JP_MC_ACT001];

// 事前决裁
const preApprovalTaskDefKey: string[] = [PA.JP_PA_ACT001, PA.JP_PA_ACT002];

// 契約/特約消滅サブプロセスの作成
const cancelTaskDefKey: string[] = [
  ProductCancellation.JP_CP_ACT001,
  ProductCancellation.JP_CP_ACT002,
  ProductCancellation.JP_CP_ACT003,
];

// 支払後検証
const paymentCheckTaskDefKey: string[] = [ClaimPaymentCheck.JP_PC_ACT001];

// submit时不需要检验数据的task
const dontValidateTaskDefKey: string[] = [...medicalTaskDefKey, ...preApprovalTaskDefKey];

// 需要获取preApproval的节点
const requirePreApprovalTaskDefKey: string[] = [
  CLM.JP_CLM_ACT004,
  ...medicalTaskDefKey,
  ...preApprovalTaskDefKey,
];

// 使用processInstanceId获取数据的节点(其实就是取快照数据),注意这几个节点getTask获取回来的businessNo是特殊的，不能正常使用，要使用businessNo的时候需要从快照接口获取
const userProIdGetDataTaskdefKey: string[] = [
  ...preApprovalTaskDefKey,
  ...cancelTaskDefKey,
  ...paymentCheckTaskDefKey,
];

export {
  medicalTaskDefKey,
  preApprovalTaskDefKey,
  cancelTaskDefKey,
  paymentCheckTaskDefKey,
  dontValidateTaskDefKey,
  requirePreApprovalTaskDefKey,
  userProIdGetDataTaskdefKey,
};
