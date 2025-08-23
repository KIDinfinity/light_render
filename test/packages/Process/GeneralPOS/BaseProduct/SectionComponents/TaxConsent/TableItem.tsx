import { Form } from 'antd';
import { formUtils } from 'basic/components/Form';
import { connect } from 'dva';
import useSectionEditable from 'process/GeneralPOS/BaseProduct/_hooks/useSectionEditable';
import { EditSectionCodeEnum } from 'process/GeneralPOS/common/Enum';
import React from 'react';
import { NAMESPACE } from '../../activity.config';
import Section, { Fields } from './TableSection';

const TableItem = ({ form, index }: any) => {
  const editable = useSectionEditable(EditSectionCodeEnum.Transaction);

  return (
    <Section form={form} editable={editable} section="TaxConsent-Table">
      <Fields.PolicyId index={index} />
      <Fields.TaxConsentOption index={index} />
    </Section>
  );
};

export default connect(({ [NAMESPACE]: modelnamepsace }: any, { transactionId }: any) => ({
  taxConsent: modelnamepsace?.entities?.transactionTypesMap?.[transactionId]?.taxConsent,
}))(
  Form.create({
    onFieldsChange(props: any, changedFields: any) {
      const { dispatch, transactionId, index }: any = props;

      if (formUtils.shouldUpdateState(changedFields)) {
        dispatch({
          type: `${NAMESPACE}/saveFormData`,
          target: 'taxConsentListUpdate',
          payload: {
            changedFields,
            transactionId,
            index,
          },
        });
      }
    },
    mapPropsToFields(props: any) {
      const { dateItem } = props;

      return formUtils.mapObjectToFields(dateItem);
    },
  })(TableItem)
);
