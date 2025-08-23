import React from 'react';
import lodash from 'lodash';

import { tenant, Region } from '@/components/Tenant';
import { getDrowDownList } from '@/utils/dictFormatMessage';
import { Col } from 'antd';
import { Authority, Editable, FormItemSelect, Visible, RuleByForm } from 'basic/components/Form';
import CustomerRole from 'process/NewBusiness/Enum/CustomerRole';
import { RelationOfProposer } from 'process/NewBusiness/ManualUnderwriting/_enum/relationOfProposerMapEnum';

import useGetRequiredByRole from '../../../_hooks/useGetRequiredByRole';
import { fieldConfig } from './Relationofinsured.config';
import useGetIsCustomerEntity from 'process/NewBusiness/ManualUnderwriting/_hooks/useGetIsCustomerEntity';

export { fieldConfig } from './Relationofinsured.config';

const useGetRelationOfInsuredDict = ({ form, config }: any) => {
  const dicts = getDrowDownList({ config, fieldProps: fieldConfig['field-props'] });

  const isCompany = useGetIsCustomerEntity({
    customerType: form.getFieldValue('customerType'),
  });

  return tenant.region({
    [Region.PH]: () => {
      const {
        Dropdown_IND_Relationship_POEntity_EM: relationshipPOEntityEMDicts,
        Dropdown_IND_Relationship_POEntity_BP: relationshipPOEntityBPDicts,
        Dropdown_IND_Relationship_PIEntity: relationshipPIEntityDicts,
      } = getDrowDownList([
        'Dropdown_IND_Relationship_POEntity_EM',
        'Dropdown_IND_Relationship_POEntity_BP',
        'Dropdown_IND_Relationship_PIEntity',
      ]);
      const isPolicyOwner = lodash.includes(
        form.getFieldValue('customerRole'),
        CustomerRole.PolicyOwner
      );
      const relationOfProposer = form.getFieldValue('relationOfProposer');

      if (isPolicyOwner && isCompany) {
        if (relationOfProposer === RelationOfProposer.Employee) {
          return relationshipPIEntityDicts;
        }
        if (relationOfProposer === RelationOfProposer.EmployeeKeyman) {
          return relationshipPOEntityEMDicts;
        }
        if (relationOfProposer === RelationOfProposer.BusinessPartner) {
          return relationshipPOEntityBPDicts;
        }
      }
      return dicts;
    },
    notMatch: () => dicts,
  });
};

const FormItem = ({ isShow, layout, form, editable, field, config, id }: any) => {
  const fieldProps: any = fieldConfig['field-props'];
  const relationOfInsuredDict = useGetRelationOfInsuredDict({ form, config });
  const visibleConditions = true;
  const editableConditions = !RuleByForm(config?.['editable-condition'], form);
  const requiredConditions = false;
  const requiredByRole = useGetRequiredByRole({
    requiredConditions,
    config,
    localConfig: fieldConfig,
    clientId: id,
  });

  return (
    isShow &&
    ((config?.visible || fieldProps.visible) === Visible.Conditions
      ? visibleConditions
      : (config?.visible || fieldProps.visible) === Visible.Yes) && (
      <Col {...layout}>
        <FormItemSelect
          dicts={relationOfInsuredDict}
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
      </Col>
    )
  );
};

const Relationofinsured = ({ field, config, form, editable, layout, isShow, id }: any) => (
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

Relationofinsured.displayName = 'relationOfInsured';

export default Relationofinsured;
