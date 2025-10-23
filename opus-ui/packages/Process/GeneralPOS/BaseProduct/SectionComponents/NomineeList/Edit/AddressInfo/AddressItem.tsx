import React from 'react';
import { Form } from 'antd';
import { connect } from 'dva';
import { formUtils } from 'basic/components/Form';
import { OperationTypeEnum } from 'process/GeneralPOS/common/Enum';
import { NAMESPACE } from 'process/GeneralPOS/BaseProduct/activity.config';
import lodash from 'lodash';
import { NomineeAddressInfoSection } from 'process/GeneralPOS/BaseProduct/SectionComponents/CommonNominee/NomineeAddressSection';

const AddressInfo = ({
  transactionId,
  clientSeq,
  form,
  clientIndex,
  addressIndex,
  removeHandle,
  formId,
}: any) => {
  return (
    <NomineeAddressInfoSection
      icon={null}
      form={form}
      transactionId={transactionId}
      clientSeq={clientSeq}
      clientIndex={clientIndex}
      addressIndex={addressIndex}
      remove={removeHandle}
      formId={formId}
    />
  );
};
export default connect(
  (
    { formCommonController, [NAMESPACE]: modelnamepsace }: any,
    { transactionId, clientIndex, addressIndex }: any
  ) => ({
    validating: formCommonController.validating,
    policyAddr:
      modelnamepsace.entities?.transactionTypesMap?.[transactionId]?.clientInfoList?.[clientIndex]
        ?.addressList?.[addressIndex],
  })
)(
  Form.create({
    onFieldsChange(props: any, changedFields: any) {
      const { dispatch, validating, transactionId, clientIndex, addressIndex }: any = props;

      if (formUtils.shouldUpdateState(changedFields)) {
        if (validating) {
          const noErrors = lodash.every(changedFields, (field: any) => !field.errors);
          if (noErrors) return;
          setTimeout(() => {
            dispatch({
              type: `${NAMESPACE}/saveEntry`,
              target: 'nomineeUpdate',
              payload: {
                changedFields,
                transactionId,
                type: OperationTypeEnum.LISTINFOUPDATE,
                changeType: 'addressList',
                modalType: OperationTypeEnum.LISTINFOUPDATE,
                validating,
                clientIndex,
                changeTypeIndex: addressIndex,
                section: 'Nominee-Address',
              },
            });
          }, 0);
        } else {
          dispatch({
            type: `${NAMESPACE}/saveFormData`,
            target: 'nomineeUpdate',
            payload: {
              changedFields,
              transactionId,
              type: OperationTypeEnum.LISTINFOUPDATE,
              changeType: 'addressList',
              modalType: OperationTypeEnum.LISTINFOUPDATE,
              validating,
              clientIndex,
              changeTypeIndex: addressIndex,
              section: 'Nominee-Address',
            },
          });
        }
      }
    },
    mapPropsToFields(props: any) {
      const { policyAddr } = props;

      return formUtils.mapObjectToFields(policyAddr);
    },
  })(AddressInfo)
);
