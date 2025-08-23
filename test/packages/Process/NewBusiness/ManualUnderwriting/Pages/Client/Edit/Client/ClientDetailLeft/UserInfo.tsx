import React from 'react';
import { Form } from 'antd';
import { connect, useSelector } from 'dva';
import lodash from 'lodash';

import { formUtils } from 'basic/components/Form';

import { NAMESPACE } from 'process/NewBusiness/ManualUnderwriting/activity.config';

import Section, { Fields } from '../../../_section/commonClientInfoField';

const UserInfo = ({ clientId, form, config }: any) => {
  const editable = !useSelector(({ claimEditable }: any) => claimEditable.taskNotEditable);

  return (
    <Section form={form} editable={editable} clientId={clientId} readOnly={false} config={config}>
      <Fields.Title />
      <Fields.Firstname />
      <Fields.Middlename />
      <Fields.Surname />
      <Fields.Extensionname />
      <Fields.Customerenextensionname />
      <Fields.Customerenmiddlename />
      <Fields.Customerensurname />
      <Fields.Customerenfirstname />
      <Fields.Customerrole />
      <Fields.Relationofinsured />
      <Fields.Relationofproposer />
      <Fields.Relationofbeneficiary />
      <Fields.Customertype />
      <Fields.Childrelationshiptype />
    </Section>
  );
};

export default connect(({ [NAMESPACE]: modelnamepsace, login }: any, { clientId }: any) => ({
  personalInfoData: modelnamepsace.modalData.entities?.clientMap?.[clientId]?.personalInfo,
  loadingStatus: login.loadingStatus,
}))(
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
          target: 'saveCommonClientInfo',
          payload: {
            changedFields,
            id: clientId,
            errorId: clientId,
          },
        });
      }
    },
    mapPropsToFields(props: any) {
      const { personalInfoData } = props;

      return formUtils.mapObjectToFields(personalInfoData);
    },
  })(UserInfo)
);
