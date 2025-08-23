import { produce } from 'immer';
import { has } from 'lodash';
import { formUtils } from 'basic/components/Form';

const updateErrorInfo = (state: any, action: any) => {
  const { changedFields, index, oldErrorInfo, integrationIndex } = action.payload;

  const nextState = produce(state, (draftState: any) => {
    let otherFields;
    if (Object.keys(changedFields).length === 1) {
      if (has(changedFields, 'exceptionCategory')) {
        otherFields = {
          returnCode: null,
          messageCode: null,
        };
      }
      if (has(changedFields, 'returnCode')) {
        const fieldExceptionCategory = formUtils.queryValue(
          draftState.claimProcessData.integrationExceptionHandlingDataList[integrationIndex]
            .errorInfoList[index].errorInfo?.exceptionCategory
        );
        const errorMessage = draftState.errorCodeMapMessageCode?.[fieldExceptionCategory]?.find(
          (item: any) => item.errorCode === formUtils.queryValue(changedFields.returnCode)
        );
        if (errorMessage) {
          otherFields = {
            messageCode: errorMessage.messageCode,
          };
        }
      }
    }
    // eslint-disable-next-line
    draftState.claimProcessData.integrationExceptionHandlingDataList[
      integrationIndex
    ].errorInfoList = draftState.claimProcessData.integrationExceptionHandlingDataList[
      integrationIndex
    ].errorInfoList || [{ errorInfo: oldErrorInfo }];

    // eslint-disable-next-line
    draftState.claimProcessData.integrationExceptionHandlingDataList[
      integrationIndex
    ].errorInfoList[index].errorInfo = {
      ...draftState.claimProcessData.integrationExceptionHandlingDataList[integrationIndex]
        .errorInfoList[index].errorInfo,
      ...changedFields,
      ...otherFields,
    };
    // eslint-disable-next-line no-param-reassign
    draftState.claimProcessData.integrationExceptionHandlingDataList[integrationIndex].errorInfo = {
      ...draftState.claimProcessData.integrationExceptionHandlingDataList[integrationIndex]
        .errorInfoList[0].errorInfo,
    };
  });

  return { ...nextState };
};

export default updateErrorInfo;
