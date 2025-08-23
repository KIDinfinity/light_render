import React from 'react';
import { Col } from 'antd';
import lodash from 'lodash';
import {
  Authority,
  Editable,
  FormItemInput,
  Visible,
  RuleByForm,
  Validator,
} from 'basic/components/Form';
import { fieldConfig } from './Identityno.config';
import { useSelector } from 'dva';
import { shallowEqual } from 'react-redux';
import useGetRequiredByRole from 'process/NB/ManualUnderwriting/_hooks/useGetRequiredByRole';
import useCheckIdentityTypeIsID from 'process/NB/ManualUnderwriting/_hooks/useCheckIdentityTypeIsID';
import { tenant, Region } from '@/components/Tenant';
import { getAuth } from '@/auth/Utils';

export { fieldConfig } from './Identityno.config';

const FormItem = ({ isShow, layout, form, editable, field, config }: any) => {
  const fieldProps: any = fieldConfig['field-props'];
  const regionCode = tenant.region();
  const commonAuthorityList = useSelector(
    (state: any) => state.authController.commonAuthorityList,
    shallowEqual
  );

  const visibleConditions = true;
  const editableConditions =
    regionCode === Region.TH
      ? !getAuth(commonAuthorityList, {
          authorityCode: 'PrimaryIDNo',
        })
      : !RuleByForm(fieldProps['editable-condition'], form);
  const requiredConditions = false;
  const valueIsID = useCheckIdentityTypeIsID({ monitorValue: form.getFieldValue('identityType') });

  const Rules = {
    VLD_000269: Validator.VLD_000269(valueIsID, 16),
  };

  const requiredByRole = useGetRequiredByRole({
    requiredConditions,
    config,
    localConfig: fieldConfig,
  });

  return (
    isShow &&
    ((config?.['field-props']?.visible || fieldProps.visible) === Visible.Conditions
      ? visibleConditions
      : (config?.['field-props']?.visible || fieldProps.visible) === Visible.Yes) && (
      <Col {...layout}>
        <FormItemInput
          disabled={
            !editable ||
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
          hiddenPrefix
          precision={0}
          rules={lodash.compact(
            (config?.rules || fieldProps['x-rules'])?.map((rule: string) => Rules[rule])
          )}
        />
      </Col>
    )
  );
};

const Identityno = ({ form, editable, layout, isShow, config }: any) => {
  return (
    <Authority>
      <FormItem
        field={fieldConfig?.field}
        config={config}
        isShow={isShow}
        layout={layout}
        form={form}
        editable={editable}
      />
    </Authority>
  );
};

Identityno.displayName = 'identityNo';

export default Identityno;
