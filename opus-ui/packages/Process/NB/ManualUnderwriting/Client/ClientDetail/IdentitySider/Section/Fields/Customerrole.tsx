import React, { useState, useMemo, useEffect } from 'react';
import useGetRequiredByRole from 'process/NB/ManualUnderwriting/_hooks/useGetRequiredByRole';
import { Col } from 'antd';
import { Authority, Editable, FormItemCheckboxGroup, Visible } from 'basic/components/Form';
import { fieldConfig } from './Customerrole.config';

export { fieldConfig } from './Customerrole.config';
import CustomerRoleType from 'process/NB/Enum/CustomerRole';
import useFilterAuthorisedSignatoryClientDetailList from 'process/NB/ManualUnderwriting/_hooks/useFilterAuthorisedSignatoryClientDetailList';
import useJudgeNewClientDisabled from 'process/NB/ManualUnderwriting/_hooks/useJudgeNewClientDisabled';

const FormItem = ({ isShow, layout, form, editable, field, config, roleDicts, isSubCard }: any) => {
  const fieldProps: any = fieldConfig['field-props'];
  const visibleConditions = true;
  const disabled = useJudgeNewClientDisabled({
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
  const list = useFilterAuthorisedSignatoryClientDetailList();

  const [filterRoleDicts, setRoleDicts] = useState([]);
  const isHaveWitnessRole = useMemo(() => {
    return !!list?.some(
      (item) =>
        item &&
        !item.deleted &&
        item.roleList?.some(
          (role) => role && !role.deleted && role.customerRole === CustomerRoleType.Witness
        )
    );
  }, [list]);

  useEffect(() => {
    if (filterRoleDicts?.length !== 0) return;
    setRoleDicts(roleDicts);
    const customerRole = form.getFieldValue('customerRole');
    // 如果没有witnessRole
    if (!isHaveWitnessRole) {
      // 当前client 角色不为空,过滤witness role
      if (customerRole.length !== 0)
        setRoleDicts(roleDicts.filter((item) => item.dictCode !== CustomerRoleType.Witness));
    } else {
      const isIncludeWitness = customerRole.includes(CustomerRoleType.Witness);
      // 当前client包含witness
      if (isIncludeWitness) {
        setRoleDicts(roleDicts.filter((item) => item.dictCode === CustomerRoleType.Witness));
      } else {
        setRoleDicts(roleDicts.filter((item) => item.dictCode !== CustomerRoleType.Witness));
      }
    }
  }, [roleDicts, isHaveWitnessRole]);

  const handleChange = (values: string[]) => {
    // witness role 和其他role互斥
    // 查看是否有witness角色，判断当前用户是否是wintness
    // 如果前流程没有witness角色->显示witness角色
    // 如果当前流程有witness角色，且当前角色不是witness ->不显示witness角色
    if (values.includes(CustomerRoleType.Witness)) {
      // 隐藏其他role
      setRoleDicts(roleDicts.filter((item) => item.dictCode === CustomerRoleType.Witness));
    } else {
      setRoleDicts(
        values.length
          ? roleDicts.filter((item) => item.dictCode !== CustomerRoleType.Witness)
          : roleDicts
      );
    }
  };
  return (
    isShow &&
    ((config?.['field-props']?.visible || fieldProps.visible) === Visible.Conditions
      ? visibleConditions
      : (config?.['field-props']?.visible || fieldProps.visible) === Visible.Yes) && (
      <Col {...layout}>
        <FormItemCheckboxGroup
          dicts={filterRoleDicts}
          onChange={handleChange}
          disabled={
            isSubCard ||
            !editable ||
            ((config?.['field-props']?.editable || fieldProps.editable) === Editable.Conditions
              ? disabled
              : (config?.['field-props']?.editable || fieldProps.editable) === Editable.No)
          }
          form={form}
          formName={config.name || field}
          labelId={config?.['field-props']?.label?.dictCode || fieldProps.label.dictCode}
          labelTypeCode={
            config?.['field-props']?.label?.dictTypeCode || fieldProps.label.dictTypeCode
          }
          required={requiredByRole}
          hiddenPrefix
          precision={0}
        />
      </Col>
    )
  );
};

const Customerrole = ({
  field,
  config,
  form,
  editable,
  layout,
  isShow,
  roleDicts,
  isSubCard,
}: any) => (
  <Authority>
    <FormItem
      field={field}
      config={config}
      isShow={isShow}
      layout={layout}
      form={form}
      editable={editable}
      roleDicts={roleDicts}
      isSubCard={isSubCard}
    />
  </Authority>
);

Customerrole.displayName = 'customerRole';

export default Customerrole;
