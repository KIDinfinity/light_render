import React from 'react';
import { Form } from 'antd';
import { connect, useSelector } from 'dva';
import lodash from 'lodash';

import { formUtils } from 'basic/components/Form';

import { NAMESPACE } from 'process/NewBusiness/ManualUnderwriting/activity.config';

import Section from '../../../../_section/otherInfoField';

const OtherInfo = ({ clientId, form }: any) => {
  const editable = !useSelector(({ claimEditable }: any) => claimEditable.taskNotEditable);

  return (
    <Section
      form={form}
      editable={editable}
      clientId={clientId}
      readOnly={false}
      condition="proposal"
    />
  );
};

export default connect(({ [NAMESPACE]: modelnamepsace, login }: any, { clientId }: any) => ({
  otherInfoData: modelnamepsace.modalData.entities?.clientMap?.[clientId]?.otherInfo,
  customerRole:
    modelnamepsace.modalData.entities?.clientMap?.[clientId]?.personalInfo?.customerRole,
  customerType:
    modelnamepsace.modalData.entities?.clientMap?.[clientId]?.personalInfo?.customerType,
  loadingStatus: login.loadingStatus,
}))(
  Form.create({
    onFieldsChange(props: any, changedFields: any) {
      const { dispatch, clientId, loadingStatus } = props;
      if (changedFields?.sourceOfFundList?.value?.length === 0) {
        changedFields.sourceOfFundList.value = [''];
      }
      if (changedFields?.sourceOfWealthList?.value?.length === 0) {
        changedFields.sourceOfWealthList.value = [''];
      }
      if (formUtils.shouldUpdateState(changedFields)) {
        if (loadingStatus) {
          const noErrors = lodash.every(changedFields, (field: any) => !field.errors);
          if (noErrors) return;
        }
        dispatch({
          type: `${NAMESPACE}/saveFormData`,
          target: 'saveOtherInfo',
          payload: {
            changedFields,
            id: clientId,
            errorId: clientId,
          },
        });
      }
    },
    mapPropsToFields(props: any) {
      const { otherInfoData } = props;
      let sourceOfFundList = formUtils.queryValue(otherInfoData.sourceOfFundList);
      let sourceOfWealthList = formUtils.queryValue(otherInfoData.sourceOfWealthList);
      if (sourceOfFundList?.length === 1 && sourceOfFundList?.[0] === '') {
        sourceOfFundList = [];
      }
      if (sourceOfWealthList?.length === 1 && sourceOfWealthList?.[0] === '') {
        sourceOfWealthList = [];
      }
      return formUtils.mapObjectToFields({
        ...otherInfoData,
        sourceOfFundList,
        sourceOfWealthList,
      });
    },
  })(OtherInfo)
);
