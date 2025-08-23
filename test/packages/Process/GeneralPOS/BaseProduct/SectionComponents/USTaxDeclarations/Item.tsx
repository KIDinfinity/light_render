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

export default connect(({ [NAMESPACE]: modelnamepsace }: any, { transactionId }: any) => ({
  usTaxInformation: modelnamepsace.entities?.transactionTypesMap?.[transactionId]?.usTaxInformation,
}))(
  Form.create({
    onFieldsChange(props: any, changedFields: any) {
      const { dispatch, transactionId }: any = props;

      if (formUtils.shouldUpdateState(changedFields)) {
        dispatch({
          type: `${NAMESPACE}/saveFormData`,
          target: 'uSTaxDeclarationsUpdate',
          payload: {
            changedFields,
            transactionId,
          },
        });
      }
    },
    mapPropsToFields(props) {
      const { usTaxInformation }: any = props;

      return formUtils.mapObjectToFields(usTaxInformation);
    },
  })(Item)
);
