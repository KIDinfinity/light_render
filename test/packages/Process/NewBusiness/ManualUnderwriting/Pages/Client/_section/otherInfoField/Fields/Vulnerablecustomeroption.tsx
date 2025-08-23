import React from 'react';
import { Col } from 'antd';
import lodash from 'lodash';

import { Authority, Editable, FormItemSelect, Visible, RuleByForm } from 'basic/components/Form';
import { getDrowDownList } from '@/utils/dictFormatMessage';

import VulnerableCustomer from 'process/NewBusiness/Enum/VulnerableCustomer';
import useGetRequiredByRole from '../../../_hooks/useGetRequiredByRole';

import { fieldConfig } from './Vulnerablecustomeroption.config';
export { fieldConfig } from './Vulnerablecustomeroption.config';

const useGetVulnerableCustomerOption = ({config, fieldProps, form }: any) => {
  const dicts = getDrowDownList({ config, fieldProps });

  const vulnerableCustomerTag = form.getFieldValue('vulnerableCustomerTag');
  if (vulnerableCustomerTag === 'Y') {
    return lodash.filter(dicts, (item) => item?.dictCode !== VulnerableCustomer.NotApplicable);
  } else if (vulnerableCustomerTag === 'N') {
    return lodash.filter(dicts, (item) => item?.dictCode === VulnerableCustomer.NotApplicable);
  }
}

const FormItem = ({ isShow, layout, form, editable, field, config, id }: any) => {
  const fieldProps: any = fieldConfig['field-props'];
  const dicts = useGetVulnerableCustomerOption({ config, fieldConfig, form });

  const visibleConditions = true;
  const editableConditions = !RuleByForm(config?.['editable-condition'], form);
  const requiredConditions = false;
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
        <FormItemSelect
          dicts={dicts}
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
          required={requiredByRole}
          hiddenPrefix
          precision={0}
        />
      </Col>
    )
  );
};

const Vulnerablecustomeroption = ({ form, editable, layout, isShow, config }: any) => (
  <Authority>
    <FormItem
      isShow={isShow}
      layout={layout}
      form={form}
      editable={editable}
      config={config}
      field={fieldConfig?.field}
    />
  </Authority>
);

Vulnerablecustomeroption.displayName = 'vulnerableCustomerOption';

export default Vulnerablecustomeroption;
