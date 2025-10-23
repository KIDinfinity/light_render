import React from 'react';
import { Form } from 'antd';
import { connect, useSelector } from 'dva';
import lodash from 'lodash';
import { formUtils } from 'basic/components/Form';
import { NAMESPACE } from 'opus/NewBusiness/ManualUnderwriting/activity.config';

import { Section, Fields } from '../../../../_section/corporateContactInfoField';

const ContactItem = ({ clientId, form, id }: any) => {
  const editable = !useSelector(({ claimEditable }: any) => claimEditable.taskNotEditable);

  return (
    <Section
      form={form}
      editable={editable}
      clientId={clientId}
      readOnly={false}
      contactId={id}
      condition="proposal"
      itemTable
      icon=""
    >
      <Fields.Contacttype />
      <Fields.Countrycode />
      <Fields.Contactno />
    </Section>
  );
};

export default connect(({ [NAMESPACE]: modelnamepsace, login }: any, { clientId, id }: any) => ({
  item: modelnamepsace.modalData.entities?.contactInfoMap?.[id],
  customerRole:
    modelnamepsace.modalData.entities?.clientMap?.[clientId]?.personalInfo?.customerRole,
  customerType:
    modelnamepsace.modalData.entities?.clientMap?.[clientId]?.personalInfo?.customerType,
  loadingStatus: login.loadingStatus,
}))(
  Form.create({
    onFieldsChange(props: any, changedFields: any) {
      const { dispatch, clientId, id, loadingStatus } = props;
      if (formUtils.shouldUpdateState(changedFields)) {
        if (loadingStatus) {
          const noErrors = lodash.every(changedFields, (field: any) => !field.errors);
          if (noErrors) return;
        }
        dispatch({
          type: `${NAMESPACE}/saveFormData`,
          target: 'saveContactInfoList',
          payload: {
            changedFields,
            id: clientId,
            contactId: id,
            errorId: clientId + '_' + id,
          },
        });
        const contactType = props?.item?.contactType;
        if (contactType && formUtils.queryValue(contactType) === 'MB' && changedFields?.contactNo) {
          dispatch({
            type: `${NAMESPACE}/saveContactInfo`,
            payload: {
              changedFields: { phoneNo: formUtils.queryValue(changedFields?.contactNo) },
              id: clientId,
            },
          });
        }
      }
    },
    mapPropsToFields(props: any) {
      const { item } = props;
      return formUtils.mapObjectToFields({
        ...item,
      });
    },
  })(ContactItem)
);
