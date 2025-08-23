import React from 'react';
import { Col } from 'antd';
import useJudgeULReserveUnitDateDisplay from 'process/NB/ManualUnderwriting/_hooks/useJudgeULReserveUnitDateDisplay';
import useGetVisibleByConfig from 'basic/hooks/useGetVisibleByConfig';
import {
  Authority,
  Editable,
  FormItemDatePicker,
  Required,
  Rule,
} from 'basic/components/Form';
import { fieldConfig } from './Ulreserveunitdate.config';

export { fieldConfig } from './Ulreserveunitdate.config';
import useGetCaseDetail from 'basic/components/CaseContainer/hooks/useGetCaseDetail';
import CaseCategory from 'enum/CaseCategory';

const FormItem = ({ isShow, layout, form, editable, field, config }: any) => {
  const fieldProps: any = fieldConfig['field-props'];
  const visibleConditions = useJudgeULReserveUnitDateDisplay();
  const editableConditions = !Rule(fieldProps['editable-condition'], form, '');
  const requiredConditions = true;
  const visible = useGetVisibleByConfig({
    config,
    visibleConditions,
  });
  const { caseCategory } = useGetCaseDetail();
  return (
    isShow &&
    visible &&
    caseCategory === CaseCategory.BP_AP_CTG02 && (
      <Col {...layout}>
        <FormItemDatePicker
          disabled={
            !editable ||
            ((config?.['field-props']?.editable || fieldProps.editable) === Editable.Conditions
              ? editableConditions
              : (config?.['field-props']?.editable || fieldProps.editable) === Editable.No)
          }
          form={form}
          formName={config.name || field}
          labelId={config?.['field-props']?.label?.dictCode || fieldProps.label.dictCode}
          labelTypeCode={
            config?.['field-props']?.label?.dictTypeCode || fieldProps.label.dictTypeCode
          }
          required={
            config?.['field-props']?.required === Required.Conditions
              ? requiredConditions
              : (config?.['field-props']?.required || fieldProps.required) === Required.Yes
          }
          hiddenPrefix
          precision={0}
        />
      </Col>
    )
  );
};

const Ulreserveunitdate = ({ form, editable, layout, isShow, config }: any) => (
  <Authority>
    <FormItem
      field={fieldConfig?.field}
      config={config}
      isShow={isShow}
      layout={layout}
      form={form}
      editable={editable}
    />
  </Authority>
);

Ulreserveunitdate.displayName = 'ulReserveUnitDate';

export default Ulreserveunitdate;
