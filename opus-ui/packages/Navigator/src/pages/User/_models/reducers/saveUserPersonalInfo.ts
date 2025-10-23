/* eslint-disable no-param-reassign */
import lodash from 'lodash';
import { produce } from 'immer';
import { formUtils } from 'basic/components/Form';
import { formatMessageApi } from '@/utils/dictFormatMessage';

export default (state: any, action: any) =>
  produce(state, (draftState: any) => {
    const {
      payload: { changedFields },
    } = action;

    const userPersonInfo = state.getUserManagement?.userPersonInfo;
    if (
      lodash.has(changedFields, 'phoneNo') &&
      changedFields.phoneNo.value &&
      changedFields.phoneNo.value === formUtils.queryValue(userPersonInfo?.emergencyContactNo)
    ) {
      changedFields.phoneNo.errors = [
        {
          message: formatMessageApi({ Label_COM_Message: 'MSG_000471' }),
          field: 'phoneNo',
        },
      ];
    }

    if (
      lodash.has(changedFields, 'emergencyContactNo') &&
      changedFields.emergencyContactNo.value &&
      changedFields.emergencyContactNo.value === formUtils.queryValue(userPersonInfo?.phoneNo)
    ) {
      changedFields.emergencyContactNo.errors = [
        {
          message: formatMessageApi({ Label_COM_Message: 'MSG_000472' }),
          field: 'emergencyContactNo',
        },
      ];
    }

    draftState.getUserManagement.userPersonInfo = {
      ...draftState.getUserManagement.userPersonInfo,
      ...changedFields,
    };

    draftState.getUserManagement.organizationList = {
      ...draftState.getUserManagement.organizationList,
      ...changedFields,
    };
  });
