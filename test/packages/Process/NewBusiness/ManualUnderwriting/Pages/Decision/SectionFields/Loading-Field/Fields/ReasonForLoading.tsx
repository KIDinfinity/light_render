import React from 'react';
import { Col } from 'antd';
import {
  Authority,
  Editable,
  FormItemSelect,
  Required,
  Visible,
  RuleByForm,
} from 'basic/components/Form';
import useFilterCodeDicts from 'decision/components/Header/components/Actions/components/AddLoading/AddLoadingModal/AddLoadingForm/LoadingItems/_hooks/useFilterCodeDicts';
import useGetLoadingFunctionType from 'decision/_hooks/useGetLoadingFunctionType';
import { getDrowDownList } from '@/utils/dictFormatMessage';
import { fieldConfig } from './ReasonForLoading.config';
import useCopyLoadingJudgement from 'process/NewBusiness/ManualUnderwriting/Pages/Decision/_hooks/useCopyLoadingJudgement';

export { fieldConfig } from './ReasonForLoading.config';

const FormItem = ({ isShow, layout, form, editable, field, config, coverageId, id }: any) => {
  const fieldProps: any = fieldConfig['field-props'];
  const dicts: any = getDrowDownList({ config, fieldProps });
  const filterDicts = useFilterCodeDicts({ dicts, coverageId });
  const visibleConditions = RuleByForm(fieldProps['visible-condition'], form, '');
  const editableConditions = !RuleByForm(fieldProps['editable-condition'], form);
  const requiredConditions = RuleByForm(fieldProps['required-condition'], form, '');
  const loadingFunctionType = useGetLoadingFunctionType({
    coverageId,
    id,
  });

  const isCopyLoading = useCopyLoadingJudgement(coverageId, id);

  return (
    isShow &&
    ((config?.visible || fieldProps.visible) === Visible.Conditions
      ? visibleConditions
      : (config?.visible || fieldProps.visible) === Visible.Yes) && (
      <Col {...layout}>
        <FormItemSelect
          disabled={
            loadingFunctionType === 'C' ||
            !editable ||
            ((config?.editable || fieldProps.editable) === Editable.Conditions
              ? editableConditions
              : (config?.editable || fieldProps.editable) === Editable.No) ||
            isCopyLoading
          }
          labelType="inline"
          dicts={filterDicts}
          form={form}
          formName={config.name || field}
          labelId={config.label?.dictCode || fieldProps.label.dictCode}
          labelTypeCode={config.label?.dictTypeCode || fieldProps.label.dictTypeCode}
          required={
            config?.required === Required.Conditions
              ? requiredConditions
              : (config.required || fieldProps.required) === Required.Yes
          }
          hiddenPrefix
          precision={0}
          optionShowType="both"
          placeholder=" "
        />
      </Col>
    )
  );
};

const ReasonForLoading = ({
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

ReasonForLoading.displayName = 'code';

export default ReasonForLoading;
