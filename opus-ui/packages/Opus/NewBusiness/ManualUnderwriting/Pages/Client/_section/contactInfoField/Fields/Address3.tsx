import React from 'react';
import useGetRequiredByRole from '../../../_hooks/useGetRequiredByRole';
import { Col } from 'antd';

import {
  Authority,
  Editable,
  FormItemSelect,
  FormItemInput,
  Visible,
  RuleByForm,
  formUtils,
} from 'basic/components/Form';
import { tenant, Region } from '@/components/Tenant';

import useSubAddressList from '../../../_hooks/useSubAddressList';
import useGetCurrentRegion from '../../../_hooks/useGetCurrentRegion';
import { fieldConfig } from './Address3.config';
export { fieldConfig } from './Address3.config';

const FormItem = ({ isShow, layout, form, editable, field, config, id, isDropEmptyData }: any) => {
  const fieldProps: any = fieldConfig['field-props'];
  const { dicts } = useSubAddressList({ form, field });

  const currentCountry = formUtils.queryValue(form.getFieldValue('country'));
  const isCurrentRegion = useGetCurrentRegion({
    currentCountry,
  });
  const visibleConditions = !isDropEmptyData || RuleByForm(fieldProps['visible-condition'], form);
  const editableConditions = !RuleByForm(config?.['editable-condition'], form);
  const requiredConditions = false;
  const requiredByRole = useGetRequiredByRole({
    requiredConditions,
    config,
    localConfig: fieldConfig,
    clientId: id,
  });
  const regionCode = tenant.region();

  return (
    isShow &&
    ((config?.visible || fieldProps.visible) === Visible.Conditions
      ? visibleConditions
      : (config?.visible || fieldProps.visible) === Visible.Yes) && (
      <Col {...layout}>
        {isCurrentRegion && ![Region.TH, Region.MY, Region.ID].includes(regionCode) ? (
          <FormItemSelect
            dicts={dicts}
            dictCode="subCode"
            dictName="subName"
            disabled={
              !editable ||
              ((config?.editable || fieldProps.editable) === Editable.Conditions
                ? editableConditions
                : (config?.editable || fieldProps.editable) === Editable.No)
            }
            form={form}
            formName={config.name || field}
            labelId={config?.label?.dictCode || fieldProps.label.dictCode}
            labelTypeCode={config?.label?.dictTypeCode || fieldProps.label.dictTypeCode}
            required={requiredByRole}
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
            labelId={config?.label?.dictCode || fieldProps.label.dictCode}
            labelTypeCode={config?.label?.dictTypeCode || fieldProps.label.dictTypeCode}
            required={requiredByRole}
            hiddenPrefix
            precision={0}
          />
        )}
      </Col>
    )
  );
};

const Address3 = ({ form, editable, layout, isShow, id, config, isDropEmptyData }: any) => {
  return (
    <Authority>
      <FormItem
        field={fieldConfig?.field}
        config={config}
        isShow={isShow}
        layout={layout}
        form={form}
        editable={editable}
        id={id}
        isDropEmptyData={isDropEmptyData}
      />
    </Authority>
  );
};

Address3.displayName = 'address3';

export default Address3;
