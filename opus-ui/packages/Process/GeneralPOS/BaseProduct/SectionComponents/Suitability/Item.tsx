import React from 'react';
import { Form } from 'antd';
import { connect } from 'dva';
import { formUtils } from 'basic/components/Form';
import Section, { Fields } from './Section';
import { NAMESPACE } from 'process/GeneralPOS/BaseProduct/activity.config';
import { EditSectionCodeEnum } from 'process/GeneralPOS/common/Enum';
import useSectionEditable from 'process/GeneralPOS/BaseProduct/_hooks/useSectionEditable';

const Suitability = ({ form }: any) => {
  const editable = useSectionEditable(EditSectionCodeEnum.Suitability);
  return (
    <Section form={form} editable={editable} section="Suitability">
      <Fields.ValidSuitability />
      <Fields.SuitabilityDate />
      <Fields.SuitabilityScore />
      <Fields.RiskToleranceLevel />
    </Section>
  );
};

export default connect(
  ({ formCommonController, [NAMESPACE]: modelnamepsace }: any, { transactionId }: any) => ({
    validating: formCommonController.validating,
    suitability: modelnamepsace?.entities?.transactionTypesMap?.[transactionId]?.suitability,
    UIConfig: modelnamepsace?.UIConfig,
  })
)(
  Form.create<any>({
    onFieldsChange(props, changedFields) {
      const { dispatch, validating, transactionId }: any = props;
      if (formUtils.shouldUpdateState(changedFields)) {
        if (validating) {
          setTimeout(() => {
            dispatch({
              type: `${NAMESPACE}/saveEntry`,
              target: 'suitabilityUpdate',
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
            target: 'suitabilityUpdate',
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
      const { suitability }: any = props;

      return formUtils.mapObjectToFields({
        ...suitability,
        validSuitability: suitability?.validSuitability === 'Y' ? 1 : 0,
      });
    },
  })(Suitability)
);
