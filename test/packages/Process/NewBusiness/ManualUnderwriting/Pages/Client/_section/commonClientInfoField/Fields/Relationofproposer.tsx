import React from 'react';
import lodash from 'lodash';
import { Col } from 'antd';
import { Authority, Editable, FormItemSelect, Visible, RuleByForm } from 'basic/components/Form';
import { tenant, Region } from '@/components/Tenant';

import CustomerRole from 'process/NewBusiness/Enum/CustomerRole';

import useGetRequiredByRole from '../../../_hooks/useGetRequiredByRole';
import { fieldConfig } from './Relationofproposer.config';

export { fieldConfig } from './Relationofproposer.config';
import { getDrowDownList } from '@/utils/dictFormatMessage';
import useGetIsCustomerEntity from 'process/NewBusiness/ManualUnderwriting/_hooks/useGetIsCustomerEntity';

const FormItem = ({ isShow, layout, form, editable, field, config, id }: any) => {
  const fieldProps: any = fieldConfig['field-props'];
  const dicts = getDrowDownList({ config, fieldProps });

  const relationshipPOEntityDicts = getDrowDownList('Dropdown_IND_Relationship_POEntity');

  const roleList = form.getFieldValue('customerRole');
  const includesPolicyOwner = lodash.includes(roleList, CustomerRole.PolicyOwner);

  const customerType = form.getFieldValue('customerType');
  const isCustomerEntity = useGetIsCustomerEntity({customerType});
  const existEntityPolicyOwner = tenant.region({[Region.PH]: () => {
    return isCustomerEntity && includesPolicyOwner;
  }, notMatch: false});

  // const clearRelatedData = useClearRelatedData({ clientId: id });
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
          dicts={existEntityPolicyOwner ? relationshipPOEntityDicts : dicts}
          disabled={
            !editable ||
            includesPolicyOwner ||
            ((config?.editable || fieldProps.editable) === Editable.Conditions
              ? editableConditions
              : (config?.editable || fieldProps.editable) === Editable.No)
          }
          form={form}
          formName={config.name || field}
          labelId={config?.label?.dictCode || fieldProps.label.dictCode}
          labelTypeCode={
            config?.label?.dictTypeCode || fieldProps.label.dictTypeCode
          }
          required={requiredByRole}
          // onChange={clearRelatedData}
          hiddenPrefix
          precision={0}
        />
      </Col>
    )
  );
};

const Relationofproposer = ({ field, config, form, editable, layout, isShow, id }: any) => (
  <Authority>
    <FormItem
      field={fieldConfig.field}
      config={config}
      isShow={isShow}
      layout={layout}
      form={form}
      editable={editable}
      id={id}
    />
  </Authority>
);

Relationofproposer.displayName = 'relationOfProposer';

export default Relationofproposer;
