import React from 'react';
import { Col } from 'antd';
import { Authority, Editable, FormItemInput, Required, Visible } from 'basic/components/Form';
import { fieldConfig } from './LoadingReason.config';
import { NAMESPACE } from 'opus/NewBusiness/ManualUnderwriting/activity.config';
export { fieldConfig } from './LoadingReason.config';
import { useSelector } from 'dva';
import { shallowEqual } from 'react-redux';
import useJudgeIsCopyLoading from 'decision/components/Benefit/components/CoverageList/components/CoverageItem/components/Expander/components/Loading/_hooks/useJudgeIsCopyLoading';

const FormItem = ({ isShow, layout, form, editable, field, config, id, coverageId }: any) => {
  const fieldProps: any = fieldConfig['field-props'];
  const displayUWMELink = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace.displayUWMELink,
    shallowEqual
  );

  const visibleConditions = !!displayUWMELink;
  const editableConditions = false;
  const requiredConditions = false;

  const isCopyLoading = useJudgeIsCopyLoading({ loadingId: id, coverageId });

  return (
    isShow &&
    ((config?.visible || fieldProps.visible) === Visible.Conditions
      ? visibleConditions
      : (config?.visible || fieldProps.visible) === Visible.Yes) && (
      <Col {...layout}>
        <FormItemInput
          disabled={
            !editable ||
            ((config?.editable || fieldProps.editable) === Editable.Conditions
              ? editableConditions
              : (config?.editable || fieldProps.editable) === Editable.No) ||
            isCopyLoading
          }
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
          labelType="inline"
          placeholder=" "
        />
      </Col>
    )
  );
};

const Reason = ({ field, config, form, editable, layout, isShow, id, coverageId }: any) => (
  <Authority>
    <FormItem
      field={field}
      config={config}
      isShow={isShow}
      layout={layout}
      form={form}
      editable={editable}
      id={id}
      coverageId={coverageId}
    />
  </Authority>
);

Reason.displayName = 'reason';

export default Reason;
