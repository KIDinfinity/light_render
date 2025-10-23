import React from 'react';
import { Form } from 'antd';
import { connect } from 'dva';
import lodash from 'lodash';
import { formUtils } from 'basic/components/Form';
import { NAMESPACE } from 'process/GeneralPOS/BaseProduct/activity.config';
import { OperationTypeEnum } from 'process/GeneralPOS/common/Enum';
import { NomineeAddressHeaderSection } from 'process/GeneralPOS/BaseProduct/SectionComponents/CommonNominee/NomineeAddressSection';

const Item = ({ transactionId, clientSeq, form, clientIndex, addressIndex, formId }: any) => {
  return (
    <NomineeAddressHeaderSection
      icon={null}
      form={form}
      transactionId={transactionId}
      clientSeq={clientSeq}
      clientIndex={clientIndex}
      addressIndex={addressIndex}
      formId={formId}
    />
  );
};

export default connect(
  (
    { formCommonController, [NAMESPACE]: modelnamepsace }: any,
    { transactionId, clientIndex }: any
  ) => ({
    validating: formCommonController.validating,
    clientItem:
      modelnamepsace.entities?.transactionTypesMap?.[transactionId]?.clientInfoList?.[clientIndex],
  })
)(
  Form.create({
    onFieldsChange(props: any, changedFields: any) {
      const { dispatch, validating, transactionId, clientIndex }: any = props;

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
                modalType: OperationTypeEnum.UPDATE,
                validating,
                clientIndex,
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
              modalType: OperationTypeEnum.UPDATE,
              validating,
              clientIndex,
              section: 'Nominee-Address',
            },
          });
        }
      }
    },
    mapPropsToFields(props: any) {
      const { clientItem } = props;
      return formUtils.mapObjectToFields(clientItem);
    },
  })(Item)
);
