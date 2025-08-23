import React from 'react';
import { Form } from 'antd';
import { connect } from 'dva';
import { formUtils } from 'basic/components/Form';
import { OperationTypeEnum } from 'process/GeneralPOS/common/Enum';
import { NAMESPACE } from 'process/GeneralPOS/BaseProduct/activity.config';
import { NomineeOccupationSection } from 'process/GeneralPOS/BaseProduct/SectionComponents/CommonNominee';

const Occupation = ({ transactionId, clientSeq, form }: any) => {
  return (
    <NomineeOccupationSection
      formId={`NomineeOccupation${clientSeq}`}
      form={form}
      transactionId={transactionId}
      clientSeq={clientSeq}
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
            section: 'Nominee-Occupation',
          },
        });
      }
    },
    mapPropsToFields(props: any) {
      const { item } = props;

      return formUtils.mapObjectToFields(item);
    },
  })(Occupation)
);
