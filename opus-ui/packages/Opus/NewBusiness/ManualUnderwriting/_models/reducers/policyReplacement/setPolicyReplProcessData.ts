import { formUtils } from 'basic/components/Form';
import { produce } from 'immer';

function filterFields(rowData: any) {
  const notLast = !rowData?.isLast;
  return notLast;
}
export default (state: any) => {
  const replacementFirstInfo = state?.modalData?.policyReplacement?.replacementFirstInfo;
  const replacementLastInfo = state?.modalData?.policyReplacement?.replacementLastInfo;
  const policyReplacementFlag = state?.modalData?.policyReplacement?.policyReplacementFlag;
  const firstOriginReplacementInfo =
    state?.processData?.policyReplacement?.replacementInfoList?.[0];
  const replacementInfoList =
    state?.modalData?.policyReplacement?.replacementInfoList
      ?.filter(filterFields)
      .map((info: any) => formUtils.objectQueryValue(info))
      .map((item: any) => {
        return { ...item, policyReplacementFlag };
      }) || [];
  const nextState = produce(state, (draftState: any) => {
    draftState.modalData.processData.policyReplacement = {
      replacementInfoList: [firstOriginReplacementInfo, ...replacementInfoList],
      policyReplacementFlag,
      replacementFirstInfo,
      replacementLastInfo,
    };
  });
  return { ...nextState };
};
