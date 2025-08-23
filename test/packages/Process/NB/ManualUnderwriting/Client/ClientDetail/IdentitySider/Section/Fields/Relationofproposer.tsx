import React from 'react';
import useGetRequiredByRole from 'process/NB/ManualUnderwriting/_hooks/useGetRequiredByRole';
import lodash from 'lodash';
import { Col } from 'antd';
import { Authority, Editable, FormItemSelect, Visible } from 'basic/components/Form';
import useExistEntityPolicyOwner from 'process/NB/ManualUnderwriting/_hooks/useExistEntityPolicyOwner';
import useGetRoleListById from 'process/NB/ManualUnderwriting/_hooks/useGetRoleListById';
import CustomerRole from 'process/NB/Enum/CustomerRole';
import useClearRelatedData from 'process/NB/ManualUnderwriting/_hooks/useClearRelatedData';
import { fieldConfig } from './Relationofproposer.config';
import useJudgeNewClientDisabled from 'process/NB/ManualUnderwriting/_hooks/useJudgeNewClientDisabled';
export { fieldConfig } from './Relationofproposer.config';
import { getDrowDownList } from '@/utils/dictFormatMessage';

const FormItem = ({ isShow, layout, form, editable, field, config, id }: any) => {
  const fieldProps: any = fieldConfig['field-props'];
  const dicts = getDrowDownList({ config, fieldProps });

  const relationshipPOEntityDicts = getDrowDownList('Dropdown_IND_Relationship_POEntity');
  const roleList = useGetRoleListById({ id });
  const customerRoleList = lodash.map(roleList, (role) => role.customerRole);
  const existEntityPolicyOwner = useExistEntityPolicyOwner();
  const clearRelatedData = useClearRelatedData({ clientId: id });
  const visibleConditions = true;
  const editableConditions = useJudgeNewClientDisabled({
    config,
    localConfig: {},
    editableConditions: true,
  });
  const requiredConditions = false;
  const requiredByRole = useGetRequiredByRole({
    requiredConditions,
    config,
    localConfig: fieldConfig,
  });
  const includesPolicyOwner = lodash.includes(customerRoleList, CustomerRole.PolicyOwner);
  return (
    isShow &&
    ((config?.['field-props']?.visible || fieldProps.visible) === Visible.Conditions
      ? visibleConditions
      : (config?.['field-props']?.visible || fieldProps.visible) === Visible.Yes) && (
      <Col {...layout}>
        <FormItemSelect
          dicts={existEntityPolicyOwner ? relationshipPOEntityDicts : dicts}
          disabled={
            !editable ||
            includesPolicyOwner ||
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
          required={requiredByRole}
          onChange={clearRelatedData}
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

Relationofproposer.displayName = 'relationOfProposer';

export default Relationofproposer;
