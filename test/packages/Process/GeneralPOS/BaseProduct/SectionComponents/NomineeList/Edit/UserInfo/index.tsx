import React from 'react';
import { Form } from 'antd';
import { connect } from 'dva';
import { formUtils } from 'basic/components/Form';
import { OperationTypeEnum } from 'process/GeneralPOS/common/Enum';
import { NAMESPACE } from 'process/GeneralPOS/BaseProduct/activity.config';
import { NomineeUserSection } from 'process/GeneralPOS/BaseProduct/SectionComponents/CommonNominee';

const UserInfo = ({ transactionId, clientSeq, form, item, disabled }: any) => {
  return (
    <NomineeUserSection
      disabled={disabled}
      formId={`NomineeUser${clientSeq}`}
      form={form}
      transactionId={transactionId}
      clientSeq={clientSeq}
      item={item}
    />
  );
};

export default connect(
  ({ [NAMESPACE]: modelnamepsace }: any, { transactionId, clientIndex }: any) => ({
    item: modelnamepsace.entities?.transactionTypesMap?.[transactionId]?.clientInfoList?.[
      clientIndex
    ],
  })
)(
  Form.create({
    onFieldsChange(props: any, changedFields: any) {
      const { dispatch, transactionId, clientIndex }: any = props;

      if (formUtils.shouldUpdateState(changedFields)) {
        dispatch({
          type: `${NAMESPACE}/saveFormData`,
          target: 'nomineeUpdate',
          payload: {
            changedFields,
            transactionId,
            type: OperationTypeEnum.LISTINFOUPDATE,
            modalType: OperationTypeEnum.UPDATE,
            clientIndex,
            section: 'Nominee-User',
          },
        });
      }
    },
    mapPropsToFields(props: any) {
      const { item } = props;

      return formUtils.mapObjectToFields(item);
    },
  })(UserInfo)
);
