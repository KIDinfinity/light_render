import { formUtils } from 'basic/components/Form';
import { produce } from 'immer';
import lodash from 'lodash';
import { v4 as uuid } from 'uuid';
import { filterShowReplacementInfo } from 'process/NewBusiness/ManualUnderwriting/Pages/PolicyReplacement/utils';

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
  const isFirstOriginReplacementInfoShow = filterShowReplacementInfo(firstOriginReplacementInfo);

  const processReplacementInfoList =
    state?.modalData?.policyReplacement?.replacementInfoList
      ?.filter(filterFields)
      .map((info: any) => formUtils.objectQueryValue(info))
      .map((item: any) => {
        return { ...item, policyReplacementFlag };
      }) || [];

  const replacementInfoList =
    lodash
      .chain(processReplacementInfoList)
      .map((info, index) => {
        if (index === 0) {
          if (isFirstOriginReplacementInfoShow) {
            return info;
          } else {
            return { ...firstOriginReplacementInfo, ...info };
          }
        }
        return info;
      })
      .value() || [];

  const nextState = produce(state, (draftState: any) => {
    draftState.modalData.processData.policyReplacement = {
      ...state?.modalData?.policyReplacement,
      replacementInfoList: replacementInfoList.length < 1 ? [{ id: uuid() }] : replacementInfoList,
      policyReplacementFlag,
      replacementFirstInfo,
      replacementLastInfo,
    };
  });
  return { ...nextState };
};
