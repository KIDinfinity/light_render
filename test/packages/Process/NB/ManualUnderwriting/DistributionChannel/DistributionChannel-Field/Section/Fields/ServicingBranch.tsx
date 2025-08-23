import React from 'react';
import { useSelector,  } from 'dva';
import { shallowEqual } from 'react-redux';
import { Col } from 'antd';
import { tenant, Region } from '@/components/Tenant';
import {
  Authority,
  Editable,
  FormItemSelect,
  FormItemInput,
  Visible,
  RuleByForm,
} from 'basic/components/Form';
import { NAMESPACE } from 'process/NB/ManualUnderwriting/activity.config';
import { fieldConfig } from './ServicingBranch.config';
import useGetDistributionRequiredByChannel from 'process/NB/ManualUnderwriting/_hooks/useGetDistributionRequiredByChannel';
import useGetFinalBranchCodeList from 'process/NB/ManualUnderwriting/_hooks/useGetFinalBranchCodeList';

export { fieldConfig } from './ServicingBranch.config';

const FormItem = ({ isShow, layout, form, editable, field, config, id }: any) => {
  const fieldProps: any = fieldConfig['field-props'];
  const branchCodeList = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace.branchCodeList,
    shallowEqual
  );
  const regionCode = tenant.region();
  const visibleConditions = true;
  const editableConditions = !RuleByForm(fieldProps['editable-condition'], form);
  const required = useGetDistributionRequiredByChannel({ id });
  const finalBranchCodeList = useGetFinalBranchCodeList({
    branchCodeList,
    id,
  });

  return (
    isShow &&
    ((config?.visible || fieldProps.visible) === Visible.Conditions
      ? visibleConditions
      : (config?.visible || fieldProps.visible) === Visible.Yes) && (
      <Col {...layout}>
        {regionCode === Region.KH ? (
          <FormItemSelect
            dicts={finalBranchCodeList}
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
            required={required}
            hiddenPrefix
            precision={0}
          />
        ) : (
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
            required={required}
            hiddenPrefix
            precision={0}
          />
        )}
      </Col>
    )
  );
};

const ServicingBranch = ({ field, config, form, editable, layout, isShow, id }: any) => (
  <Authority>
    <FormItem
      field={field}
      config={config}
      isShow={isShow}
      layout={layout}
      form={form}
      editable={editable}
      id={id}
    />
  </Authority>
);

ServicingBranch.displayName = 'servicingBranch';

export default ServicingBranch;
