import { Form } from 'antd';
import { formUtils } from 'basic/components/Form';
import { connect } from 'dva';
import useSectionEditable from 'process/GeneralPOS/BaseProduct/_hooks/useSectionEditable';
import { EditSectionCodeEnum } from 'process/GeneralPOS/common/Enum';
import React from 'react';
import { NAMESPACE } from '../../activity.config';
import Section, { Fields } from './Section';

const ReissueCheque = ({ transactionId, form }: any) => {
  const editable = useSectionEditable(EditSectionCodeEnum.ReissueCheque);
  return (
    <Section form={form} editable={editable} section="ReissueCheque">
      <Fields.ChequeCancelReasonCode />
      <Fields.ChequeTypeCode />
      <Fields.PayableAmount transactionId={transactionId} />
    </Section>
  );
};

export default connect(({ [NAMESPACE]: modelnamepsace }: any, { transactionId }: any) => ({
  reissueCheque: modelnamepsace.entities?.transactionTypesMap?.[transactionId]?.reissueCheque,
}))(
  Form.create({
    onFieldsChange(props: any, changedFields: any) {
      const { dispatch, transactionId }: any = props;

      if (formUtils.shouldUpdateState(changedFields)) {
        dispatch({
          type: `${NAMESPACE}/saveFormData`,
          target: 'reissueChequeUpdate',
          payload: {
            changedFields,
            transactionId,
          },
        });
      }
    },
    mapPropsToFields(props: any) {
      const { reissueCheque } = props;
      return formUtils.mapObjectToFields(reissueCheque);
    },
  })(ReissueCheque)
);
