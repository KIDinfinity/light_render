import React from 'react';
import { Form } from 'antd';
import { connect } from 'dva';
import { formUtils } from 'basic/components/Form';
import Section, { Fields } from './Section';
import { NAMESPACE } from '../../activity.config';
import { EditSectionCodeEnum } from 'process/GeneralPOS/common/Enum';
import useSectionEditable from 'process/GeneralPOS/BaseProduct/_hooks/useSectionEditable';

const Item = ({ form, transactionId }: any) => {
  const editable = useSectionEditable(EditSectionCodeEnum.Transaction);

  return (
    <div>
      <Section form={form} editable={editable} section="IssuanceOfDuplicatePolicy">
        <Fields.RegenContract transactionId={transactionId} />
        <Fields.SendTo transactionId={transactionId} />
        <Fields.BranchCode transactionId={transactionId} />
      </Section>
      <Section form={form} editable={editable} section="IssuanceOfDuplicatePolicy">
        <Fields.ChargeFee transactionId={transactionId} />
        <Fields.TimesOfReplacement transactionId={transactionId} />
        <Fields.Freeofcharge transactionId={transactionId} />
        <Fields.PayinStatus transactionId={transactionId} />
        <Fields.FeeCurrency transactionId={transactionId} />
      </Section>
    </div>
  );
};

export default connect(({ [NAMESPACE]: modelnamepsace }: any, { transactionId }: any) => ({
  duplicatePolicy: modelnamepsace.entities?.transactionTypesMap?.[transactionId]?.duplicatePolicy,
  paymentStatus:
    modelnamepsace.entities?.transactionTypesMap?.[transactionId]?.payInDetailList?.[0]
      ?.paymentStatus,
  chargeFee: modelnamepsace.entities?.transactionTypesMap?.[transactionId]?.chargeFee,
  feeCurrency: modelnamepsace.entities?.transactionTypesMap?.[transactionId]?.feeCurrency,
}))(
  Form.create({
    onFieldsChange(props: any, changedFields: any) {
      const { dispatch, transactionId }: any = props;

      if (formUtils.shouldUpdateState(changedFields)) {
        dispatch({
          type: `${NAMESPACE}/saveFormData`,
          target: 'duplicatePolicyUpdate',
          payload: {
            changedFields,
            transactionId,
          },
        });
      }
    },
    mapPropsToFields(props: any) {
      const { duplicatePolicy, paymentStatus, feeCurrency, chargeFee } = props;
      return formUtils.mapObjectToFields({
        ...duplicatePolicy,
        freeOfCharge: duplicatePolicy?.freeOfCharge === 'Y' ? 1 : 0,
        paymentStatus: duplicatePolicy?.paymentStatus || paymentStatus,
        chargeFee,
        feeCurrency,
      });
    },
  })(Item)
);
