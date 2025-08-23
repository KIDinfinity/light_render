import React from 'react';
import { Form } from 'antd';
import { connect } from 'dva';
import { formUtils } from 'basic/components/Form';
import { OperationTypeEnum } from 'process/GeneralPOS/common/Enum';
import { NAMESPACE } from 'process/GeneralPOS/BaseProduct/activity.config';
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
  ({ [NAMESPACE]: modelnamepsace }: any, { transactionId, clientIndex, addressIndex }: any) => ({
    policyAddr:
      modelnamepsace.entities?.transactionTypesMap?.[transactionId]?.clientInfoList?.[clientIndex]
        ?.addressList?.[addressIndex],
  })
)(
  Form.create({
    onFieldsChange(props: any, changedFields: any) {
      const { dispatch, transactionId, clientIndex, addressIndex }: any = props;

      if (formUtils.shouldUpdateState(changedFields)) {
        dispatch({
          type: `${NAMESPACE}/saveFormData`,
          rget: 'nomineeUpdate',
          payload: {
            changedFields,
            tansactionId,
            tpe: OperationTypeEnum.LISTINFOUPDATE,
            cangeType: 'addressList',
            modalType: OperationTypeEnum.LISTINFOUPDATE,
            lidating,
            clientIndex,
            angeTypeIndex: addressIndex,
            sction: 'Nominee-Address',
          },
        });
      }
    },
    mapPropsToFields(props: any) {
      const { policyAddr } = props;

      return formUtils.mapObjectToFields(policyAddr);
    },
  })(AddressInfo)
);
