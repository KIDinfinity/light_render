import React from 'react';
import { Form } from 'antd';
import { connect } from 'dva';
import { formUtils } from 'basic/components/Form';
import Section, { Fields } from './Section';
import { NAMESPACE } from 'process/GeneralPOS/BaseProduct/activity.config';
import { EditSectionCodeEnum } from 'process/GeneralPOS/common/Enum';
import useSectionEditable from 'process/GeneralPOS/BaseProduct/_hooks/useSectionEditable';

const Suitability = ({ form, transactionId }: any) => {
  const editable = useSectionEditable(EditSectionCodeEnum.Suitability);
  return (
    <Section form={form} editable={editable} section="Suitability" formId={'Suitability'}>
      <Fields.ValidSuitability />
      <Fields.SuitabilityDate />
      <Fields.SuitabilityScore transactionId={transactionId} />
      <Fields.RiskToleranceLevel />
    </Section>
  );
};

export default connect(({ [NAMESPACE]: modelnamepsace }: any, { transactionId }: any) => ({
  suitability: modelnamepsace?.entities?.transactionTypesMap?.[transactionId]?.suitability,
  UIConfig: modelnamepsace?.UIConfig,
}))(
  Form.create<any>({
    onFieldsChange(props, changedFields) {
      const { dispatch, transactionId }: any = props;

      if (formUtils.shouldUpdateState(changedFields)) {
        dispatch({
          type: `${NAMESPACE}/saveFormData`,
          target: 'suitabilityUpdate',
          payload: {
            changedFields,
            transactionId,
          },
        });
      }
    },
    mapPropsToFields(props) {
      const { suitability }: any = props;

      return formUtils.mapObjectToFields({
        ...suitability,
        validSuitability: suitability?.validSuitability === 'Y' ? 1 : 0,
      });
    },
  })(Suitability)
);
