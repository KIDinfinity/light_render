import React from 'react';
import { Form } from 'antd';
import { connect, useSelector } from 'dva';
import lodash from 'lodash';

import { formUtils } from 'basic/components/Form';

import { NAMESPACE } from 'process/NewBusiness/ManualUnderwriting/activity.config';

import { Section, Fields } from '../../../../_section/contactInfoField';

const ContactInfo = ({ clientId, form }: any) => {
  const editable = !useSelector(({ claimEditable }: any) => claimEditable.taskNotEditable);

  return (
    <Section
      form={form}
      editable={editable}
      clientId={clientId}
      readOnly={false}
      condition="proposal"
    >
      <Fields.Telegram />
      <Fields.Whatsapp />
      <Fields.Phoneno />
      <Fields.Worknumber />
      <Fields.Language />
      <Fields.Homenumber />
      <Fields.Email />
      <Fields.CommunicationLane />
      <Fields.CorrespondenceViaEmail />
    </Section>
  );
};

export default connect(
  ({ [NAMESPACE]: modelnamepsace, login }: any, { clientId }: any) => ({
    contactInfoKHData: modelnamepsace.modalData.entities?.clientMap?.[clientId]?.contactInfoKH,
    customerRole:
      modelnamepsace.modalData.entities?.clientMap?.[clientId]?.personalInfo?.customerRole,
    customerType:
      modelnamepsace.modalData.entities?.clientMap?.[clientId]?.personalInfo?.customerType,
    loadingStatus: login.loadingStatus,
  })
)(
  Form.create({
    onFieldsChange(props: any, changedFields: any) {
      const { dispatch, clientId, loadingStatus } = props;
      if (formUtils.shouldUpdateState(changedFields)) {
        if (loadingStatus) {
          const noErrors = lodash.every(changedFields, (field: any) => !field.errors);
          if (noErrors) return;
        }
        dispatch({
          type: `${NAMESPACE}/saveFormData`,
          target: 'saveContactInfo',
          payload: {
            changedFields,
            id: clientId,
            errorId: clientId,
          },
        });
      }
    },
    mapPropsToFields(props: any) {
      const { contactInfoKHData } = props;
      return formUtils.mapObjectToFields(contactInfoKHData);
    },
  })(ContactInfo)
);
