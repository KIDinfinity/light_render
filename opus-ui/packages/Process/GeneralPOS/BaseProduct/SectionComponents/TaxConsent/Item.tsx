import { Form } from 'antd';
import { formUtils } from 'basic/components/Form';
import { connect } from 'dva';
import useSectionEditable from 'process/GeneralPOS/BaseProduct/_hooks/useSectionEditable';
import { EditSectionCodeEnum } from 'process/GeneralPOS/common/Enum';
import React from 'react';
import { NAMESPACE } from '../../activity.config';
import Section, { Fields } from './Section';

const Item = ({ form, transactionId }: any) => {
  const editable = useSectionEditable(EditSectionCodeEnum.Transaction);

  return (
    <Section form={form} editable={editable} section="TaxConsent">
      <Fields.TaxConsentOption />
    </Section>
  );
};

export default connect(
  ({ formCommonController, [NAMESPACE]: modelnamepsace }: any, { transactionId }: any) => ({
    validating: formCommonController.validating,
    taxConsent: modelnamepsace?.entities?.transactionTypesMap?.[transactionId]?.taxConsent,
  })
)(
  Form.create({
    onFieldsChange(props: any, changedFields: any) {
      const { dispatch, validating, transactionId }: any = props;

      if (formUtils.shouldUpdateState(changedFields)) {
        if (validating) {
          setTimeout(() => {
            dispatch({
              type: `${NAMESPACE}/saveEntry`,
              target: 'taxConsentUpdate',
              payload: {
                changedFields,
                transactionId,
              },
            });
          }, 0);
        } else {
          dispatch({
            type: `${NAMESPACE}/saveFormData`,
            target: 'taxConsentUpdate',
            payload: {
              changedFields,
              transactionId,
            },
          });
        }
      }
    },
    mapPropsToFields(props: any) {
      const { taxConsent } = props;

      return formUtils.mapObjectToFields(taxConsent);
    },
  })(Item)
);
