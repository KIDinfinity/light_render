import React from 'react';
import { Form } from 'antd';
import lodash from 'lodash';
import { connect, useSelector } from 'dva';
import { formUtils } from 'basic/components/Form';
import { NAMESPACE } from 'opus/NewBusiness/ManualUnderwriting/activity.config';
import Section from '../../../../_section/corporateInfoField';
import CustomerRole from 'basic/enum/CustomerRole';
import CustomerType from 'opus/NewBusiness/Enum/CustomerType';
import useRetrieveExistCorpFromLAToggle from '../../../../_hooks/useRetrieveExistCorpFromLAToggle';

const Personalinfo = ({ clientId, form }: any) => {
  const customerRole = useSelector(
    ({ [NAMESPACE]: modelnamespace }: any) =>
      modelnamespace.modalData.entities.clientMap[clientId].personalInfo.customerRole
  );
  const customerType = useSelector(
    ({ [NAMESPACE]: modelnamespace }: any) =>
      modelnamespace.modalData.entities.clientMap[clientId].personalInfo.customerType
  );
  const retrieveExistCorpFromLAToggle = useRetrieveExistCorpFromLAToggle();

  const isExistRole = lodash.includes(formUtils.queryValue(customerRole), CustomerRole.Payor);
  const isShowSection =
    formUtils.queryValue(customerType) === CustomerType.Entity &&
    isExistRole &&
    retrieveExistCorpFromLAToggle;

  const editable = !useSelector(({ claimEditable }: any) => claimEditable.taskNotEditable);

  return (
    isShowSection && (
      <Section
        form={form}
        editable={editable}
        clientId={clientId}
        readOnly={false}
        condition="proposal"
      />
    )
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
          target: 'savePersonalInfo',
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
      return formUtils.mapObjectToFields({ ...personalInfoData });
    },
  })(Personalinfo)
);
