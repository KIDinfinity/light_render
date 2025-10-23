import React from 'react';
import { Form } from 'antd';
import { connect } from 'dva';
import { formUtils } from 'basic/components/Form';
import { OperationTypeEnum } from 'process/GeneralPOS/common/Enum';
import { NAMESPACE } from 'process/GeneralPOS/BaseProduct/activity.config';
import lodash from 'lodash';
import { NomineeUserSection } from 'process/GeneralPOS/BaseProduct/SectionComponents/CommonNominee';

const UserInfo = ({ transactionId, clientSeq, form, item }: any) => {
  return (
    <NomineeUserSection
      formId={`NomineeUser${clientSeq}`}
      form={form}
      transactionId={transactionId}
      clientSeq={clientSeq}
      item={item}
    />
  );
};

export default connect(
  (
    { formCommonController, [NAMESPACE]: modelnamepsace }: any,
    { transactionId, clientIndex }: any
  ) => ({
    validating: formCommonController.validating,
    item: modelnamepsace.entities?.transactionTypesMap?.[transactionId]?.clientInfoList?.[
      clientIndex
    ],
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
                section: 'Nominee-User',
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
              section: 'Nominee-User',
            },
          });
        }
      }
    },
    mapPropsToFields(props: any) {
      const { item } = props;

      return formUtils.mapObjectToFields(item);
    },
  })(UserInfo)
);
