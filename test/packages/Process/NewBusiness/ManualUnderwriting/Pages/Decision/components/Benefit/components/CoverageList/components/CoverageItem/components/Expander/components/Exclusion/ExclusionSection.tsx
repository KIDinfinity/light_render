import React from 'react';
import { Form } from 'antd';
import { connect, useSelector } from 'dva';
import lodash from 'lodash';
import { formUtils } from 'basic/components/Form';
import useGetDisabledByCoverageField from 'process/NewBusiness/ManualUnderwriting/Pages/Decision/_hooks/useGetDisabledByCoverageField';
import { NAMESPACE } from 'process/NewBusiness/ManualUnderwriting/activity.config';
import Section, {
  Fields,
} from 'process/NewBusiness/ManualUnderwriting/Pages/Decision/SectionFields/Exclusion-Field';

const ExclusionSection = ({
  form,
  editable,
  editableOfSustainability,
  productCode,
}: any) => {
  const sectionEditable =
    !useSelector(({ claimEditable }: any) => claimEditable.taskNotEditable) && editable;

  return (
    <Section
      form={form}
      editable={sectionEditable && editableOfSustainability}
      section="Exclusion-Field"
    >
      <Fields.Code productCode={productCode} labelType="inline" />
      <Fields.ShortName productCode={productCode} labelType="inline" />
      <Fields.LongDescription labelType="inline" />
      <Fields.Reason labelType="inline" />
      <Fields.ExclusionReason productCode={productCode} labelType="inline" />
      <Fields.Exclusionuwdecisionreason labelType="inline" />
    </Section>
  );
};

export default connect()(
  Form.create<any>({
    onFieldsChange(props, changedFields) {
      const { dispatch, id, coverageId, productCode }: any = props;
      if (formUtils.shouldUpdateState(changedFields)) {
        dispatch({
          type: `${NAMESPACE}/saveFormData`,
          target: 'saveExclusion',
          payload: {
            id,
            changedFields,
            productCode,
            coverageId,
          },
        });
        if (lodash.size(changedFields) === 1 && changedFields.code) {
          dispatch({
            type: `${NAMESPACE}/supplyUwDecisionEditInd`,
          });
        }
      }
    },
    mapPropsToFields(props: any) {
      const { exclusionField } = props;
      return formUtils.mapObjectToFields(exclusionField);
    },
  })(ExclusionSection)
);
