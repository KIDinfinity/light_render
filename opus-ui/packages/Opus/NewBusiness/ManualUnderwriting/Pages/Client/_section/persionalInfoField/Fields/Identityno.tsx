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
import useGetRequiredByRole from '../../../_hooks/useGetRequiredByRole';
import { useSelector } from 'dva';
import { shallowEqual } from 'react-redux';
import { tenant, Region } from '@/components/Tenant';
import { getAuth } from '@/auth/Utils';

export { fieldConfig } from './Identityno.config';

const FormItem = ({ isShow, layout, form, editable, field, config, id }: any) => {
  const fieldProps: any = fieldConfig['field-props'];
  const commonAuthorityList = useSelector(
    (state: any) => state.authController.commonAuthorityList,
    shallowEqual
  );

  const visibleConditions = true;
  const editableConditions = tenant.region({
    [Region.TH]: getAuth(commonAuthorityList, {
      authorityCode: 'PrimaryIDNo',
    }),
    noMatch: RuleByForm(config?.['editable-condition'], form),
  });
  const requiredConditions = false;

  const Rules = {
    VLD_000269: Validator.VLD_000269(form.getFieldValue('identityType') === 'ID', 16),
  };

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
        <FormItemInput
          disabled={
            !editable ||
            ((config?.editable || fieldProps.editable) === Editable.Conditions
              ? !editableConditions
              : (config?.editable || fieldProps.editable) === Editable.No)
          }
          form={form}
          formName={config.name || field}
          labelId={config?.label?.dictCode || fieldProps.label.dictCode}
          labelTypeCode={config?.label?.dictTypeCode || fieldProps.label.dictTypeCode}
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

const Identityno = ({ form, editable, layout, isShow, config, id }: any) => {
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

Identityno.displayName = 'identityNo';

export default Identityno;
