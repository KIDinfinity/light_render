import React, { useMemo } from 'react';
import { Col } from 'antd';
import { useSelector } from 'dva';

import {
  Authority,
  Editable,
  FormItemInput,
  Required,
  Visible,
  RuleByForm,
  formUtils,
} from 'basic/components/Form';
import CustomerRole from 'process/NewBusiness/Enum/CustomerRole';
import { NAMESPACE } from 'process/NewBusiness/ManualUnderwriting/activity.config';
import { fieldConfig } from './Reasonforpaying.config';

export { fieldConfig } from './Reasonforpaying.config';

const FormItem = ({ isShow, layout, form, editable, field, config, id, readOnly }: any) => {
  const fieldProps: any = fieldConfig['field-props'];
  const customerRole = useSelector(({ [NAMESPACE]: modelnamepsace }: any) => readOnly ?
    modelnamepsace.entities.clientMap?.[id].personalInfo?.customerRole :
    modelnamepsace.modalData.entities.clientMap?.[id].personalInfo?.customerRole
  );
  const roles = formUtils.queryValue(customerRole);
  const visibleConditions = useMemo(() => {
    return (roles || []).includes(CustomerRole.Payor) && !roles.includes(CustomerRole.PolicyOwner);
  }, [roles]);
  const editableConditions = !RuleByForm(config?.['editable-condition'], form);
  const requiredConditions = false;

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
              : (config?.editable || fieldProps.editable) === Editable.No)
          }
          form={form}
          formName={config.name || field}
          labelId={config?.label?.dictCode || fieldProps.label.dictCode}
          labelTypeCode={
            config?.label?.dictTypeCode || fieldProps.label.dictTypeCode
          }
          required={
            config?.required === Required.Conditions
              ? requiredConditions
              : (config?.required || fieldProps.required) === Required.Yes
          }
          hiddenPrefix
          precision={0}
        />
      </Col>
    )
  );
};

const Reasonforpaying = ({ form, editable, layout, isShow, id, config, roles, readOnly }: any) => {
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
        roles={roles}
        readOnly={readOnly}
      />
    </Authority>
  );
};

Reasonforpaying.displayName = 'reasonForPaying';

export default Reasonforpaying;
