import React from 'react';
import { Form } from 'antd';
import { connect, useSelector } from 'dva';
import { formUtils } from 'basic/components/Form';
import useGetDisabledByCoverageField from 'process/NB/ManualUnderwriting/_hooks/useGetDisabledByCoverageField';
import { NAMESPACE } from 'process/NB/ManualUnderwriting/activity.config';
import Section, { Fields } from './Section';

const ExclusionSection = ({
  form,
  coverageId,
  editable,
  editableOfSustainability,
  productCode,
}: any) => {
  const sectionEditable =
    !useSelector(({ claimEditable }: any) => claimEditable.taskNotEditable) && editable;
  const disabled = useGetDisabledByCoverageField({
    id: coverageId,
    dataBasicField: 'exclusionEditInd',
    dataBasicFieldValue: 'N',
  });
  return (
    <Section
      form={form}
      editable={sectionEditable && !disabled && editableOfSustainability}
      section="Exclusion-Field"
    >
      <Fields.Code productCode={productCode} />
      <Fields.ShortName productCode={productCode} />
      <Fields.LongDescription />
      <Fields.Reason />
      <Fields.ExclusionReason productCode={productCode} />
      <Fields.Exclusionuwdecisionreason />
    </Section>
  );
};

export default connect(({ formCommonController }: any) => ({
  validating: formCommonController.validating,
}))(
  Form.create<any>({
    onFieldsChange(props, changedFields) {
      const { dispatch, validating, id, coverageId, productCode }: any = props;
      if (formUtils.shouldUpdateState(changedFields)) {
        if (validating) {
          setTimeout(() => {
            dispatch({
              type: `${NAMESPACE}/saveEntry`,
              target: 'saveExclusion',
              payload: {
                id,
                changedFields,
                productCode,
                coverageId,
              },
            });
          }, 0);
        } else {
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
        }
      }
    },
    mapPropsToFields(props: any) {
      const { exclusionField } = props;
      return formUtils.mapObjectToFields(exclusionField);
    },
  })(ExclusionSection)
);
