import React from 'react';
import { Form } from 'antd';
import { connect, useSelector } from 'dva';
import lodash from 'lodash';
import { formUtils } from 'basic/components/Form';
import { NAMESPACE } from 'opus/NewBusiness/ManualUnderwriting/activity.config';
import Section from '../../../../_section/backgroudInfoField';
import CustomerType from 'opus/NewBusiness/Enum/CustomerType';
import CustomerRole from 'basic/enum/CustomerRole';

const BackgroundInfo = ({ clientId, form }: any) => {
  const editable = !useSelector(({ claimEditable }: any) => claimEditable.taskNotEditable);

  const customerType = useSelector(
    ({ [NAMESPACE]: modelnamespace }: any) =>
      modelnamespace.modalData.entities.clientMap[clientId].personalInfo.customerType
  );
  const customerRole = useSelector(
    ({ [NAMESPACE]: modelnamespace }: any) =>
      modelnamespace.modalData.entities.clientMap[clientId].personalInfo.customerRole
  );
  const isShowOccupation =
    !lodash.isEqual(formUtils.queryValue(customerRole), [CustomerRole.Beneficiary]) &&
    formUtils.queryValue(customerType) === CustomerType.Individual;

  return (
    <>
      {isShowOccupation && (
        <Section
          form={form}
          editable={editable}
          clientId={clientId}
          readOnly={false}
          condition="cid"
        />
      )}
    </>
  );
};

export default connect(({ [NAMESPACE]: modelnamepsace, login }: any, { clientId }: any) => ({
  backgroundInfoData: modelnamepsace.modalData.entities?.clientMap?.[clientId]?.backgroundInfo,
  customerRole:
    modelnamepsace.modalData.entities?.clientMap?.[clientId]?.personalInfo?.customerRole,
  customerType:
    modelnamepsace.modalData.entities?.clientMap?.[clientId]?.personalInfo?.customerType,
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
          target: 'saveBackgroundInfo',
          payload: {
            changedFields,
            id: clientId,
            errorId: clientId,
          },
        });
      }
    },
    mapPropsToFields(props: any) {
      const { backgroundInfoData } = props;
      return formUtils.mapObjectToFields(backgroundInfoData);
    },
  })(BackgroundInfo)
);
