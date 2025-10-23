import React from 'react';
import { Form } from 'antd';
import { connect } from 'dva';
import { formUtils } from 'basic/components/Form';
import Section, { Fields } from './Section';
import { NAMESPACE } from '../../activity.config';
import { EditSectionCodeEnum } from 'process/GeneralPOS/common/Enum';
import useSectionEditable from 'process/GeneralPOS/BaseProduct/_hooks/useSectionEditable';

const Item = ({ form }: any) => {
  const editable = useSectionEditable(EditSectionCodeEnum.USTaxDeclarations);

  return (
    <Section form={form} editable={editable} section="uSTaxDeclarations">
      <Fields.TaxDeclarationsFlag />
      <Fields.CardNo />
      <Fields.IdentificationNo />
      <Fields.ResidenceAddress />
    </Section>
  );
};

export default connect(
  ({ formCommonController, [NAMESPACE]: modelnamepsace }: any, { transactionId }: any) => ({
    validating: formCommonController.validating,
    usTaxInformation:
      modelnamepsace.entities?.transactionTypesMap?.[transactionId]?.usTaxInformation,
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
              target: 'uSTaxDeclarationsUpdate',
              payload: {
                changedFields,
                transactionId,
                validating,
              },
            });
          }, 0);
        } else {
          dispatch({
            type: `${NAMESPACE}/saveFormData`,
            target: 'uSTaxDeclarationsUpdate',
            payload: {
              changedFields,
              transactionId,
              validating,
            },
          });
        }
      }
    },
    mapPropsToFields(props) {
      const { usTaxInformation }: any = props;

      return formUtils.mapObjectToFields(usTaxInformation);
    },
  })(Item)
);
