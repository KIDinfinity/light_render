import React from 'react';
import { Col } from 'antd';

import { Authority, FormItemInput, Visible } from 'basic/components/Form';
import { tenant, Region } from '@/components/Tenant';

import { fieldConfig } from './Ustn.config';
import useGetRequiredByRole from '../../../_hooks/useGetRequiredByRole';
export { fieldConfig } from './Ustn.config';

const FormItem = ({ isShow, layout, form, field, config, id }: any) => {
  const regionCode = tenant.region();
  const usTaxFlag = form.getFieldValue('usTaxFlag') === 'Y';

  const fieldProps: any = fieldConfig['field-props'];
  const visibleConditions = true;
  const editableConditions = regionCode === Region.PH ? !usTaxFlag : true;
  const requiredConditions = regionCode === Region.PH ? usTaxFlag : true;
  const requiredByRole = useGetRequiredByRole({
    requiredConditions,
    config,
    localConfig: fieldConfig,
    clientId: id
    });
  return (
    isShow &&
    ((config?.visible || fieldProps.visible) === Visible.Conditions
      ? visibleConditions
      : (config?.visible || fieldProps.visible) === Visible.Yes) && (
      <Col {...layout}>
        <FormItemInput
          disabled={editableConditions}
          form={form}
          formName={config.name || field}
          labelId={config?.label?.dictCode || fieldProps.label.dictCode}
          labelTypeCode={
            config?.label?.dictTypeCode || fieldProps.label.dictTypeCode
          }
          required={requiredByRole}
          hiddenPrefix
          precision={0}
        />
      </Col>
    )
  );
};

const Ustn = ({ form, editable, layout, isShow, id, config }: any) => {
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
      />
    </Authority>
  );
};

Ustn.displayName = 'usTn';

export default Ustn;
