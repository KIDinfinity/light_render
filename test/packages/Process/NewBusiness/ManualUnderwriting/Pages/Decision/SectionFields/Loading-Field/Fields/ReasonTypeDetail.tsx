import React from 'react';
import { Col } from 'antd';
import {
  Authority,
  Editable,
  FormItemSelect,
  Required,
  Visible,
  RuleByForm,
  FormItemInput,
} from 'basic/components/Form';
import { getDrowDownList } from '@/utils/dictFormatMessage';
import { fieldConfig } from './ReasonTypeDetail.config';
export { fieldConfig } from './ReasonTypeDetail.config';
import useCopyLoadingJudgement from 'process/NewBusiness/ManualUnderwriting/Pages/Decision/_hooks/useCopyLoadingJudgement';

const FormItem = ({ isShow, layout, form, editable, field, config, coverageId, id }: any) => {
  const fieldProps: any = fieldConfig['field-props'];
  const dicts: any = getDrowDownList({ config, fieldProps });
  const reasonType = form.getFieldValue('reasonType');
  const visibleConditions = RuleByForm(fieldProps['visible-condition'], form, '');
  const editableConditions = !RuleByForm(fieldProps['editable-condition'], form);
  const requiredConditions = RuleByForm(fieldProps['required-condition'], form, '');

  const isCopyLoading = useCopyLoadingJudgement(coverageId, id);

  return (
    isShow &&
    ((config?.visible || fieldProps.visible) === Visible.Conditions
      ? visibleConditions
      : (config?.visible || fieldProps.visible) === Visible.Yes) && (
      <Col {...layout}>
        {reasonType === 'health_reason' && (
          <FormItemSelect
            disabled={
              !editable ||
              ((config?.editable || fieldProps.editable) === Editable.Conditions
                ? editableConditions
                : (config?.editable || fieldProps.editable) === Editable.No) ||
              isCopyLoading
            }
            dicts={dicts}
            form={form}
            formName={config.name || field}
            labelId="healthReason"
            labelTypeCode={config.label?.dictTypeCode || fieldProps.label.dictTypeCode}
            required={
              config?.required === Required.Conditions
                ? requiredConditions
                : (config.required || fieldProps.required) === Required.Yes
            }
            labelType="inline"
            hiddenPrefix
            precision={0}
            placeholder=" "
          />
        )}
        {reasonType === 'other' && (
          <FormItemInput
            disabled={
              !editable ||
              ((config?.editable || fieldProps.editable) === Editable.Conditions
                ? editableConditions
                : (config?.editable || fieldProps.editable) === Editable.No)
            }
            form={form}
            formName={config.name || field}
            labelId={config.label?.dictCode || fieldProps.label.dictCode}
            labelTypeCode={config.label?.dictTypeCode || fieldProps.label.dictTypeCode}
            required={false}
            hiddenPrefix
            labelType="inline"
            placeholder="Please enter."
          />
        )}
      </Col>
    )
  );
};

const ReasonTypeDetail = ({
  field,
  config,
  form,
  editable,
  isShow,
  coverageId,
  id,
  layout,
}: any) => {
  return (
    <Authority>
      <FormItem
        field={field}
        config={config}
        isShow={isShow}
        layout={layout}
        form={form}
        editable={editable}
        coverageId={coverageId}
        id={id}
      />
    </Authority>
  );
};

ReasonTypeDetail.displayName = 'reasonTypeDetail';

export default ReasonTypeDetail;
