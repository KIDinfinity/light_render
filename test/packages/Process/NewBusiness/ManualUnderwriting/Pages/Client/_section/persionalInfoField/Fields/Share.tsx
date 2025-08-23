import React from 'react';
import { Col } from 'antd';
import lodash from 'lodash';
import { useSelector } from 'dva';
import { shallowEqual } from 'react-redux';

import { tenant, Region } from '@/components/Tenant';
import {
  Authority,
  Visible,
  Editable,
  FormItemNumber,
  RuleByForm,
  Validator,
} from 'basic/components/Form';
import { NAMESPACE } from 'process/NewBusiness/ManualUnderwriting/activity.config';

import useGetRequiredByRole from '../../../_hooks/useGetRequiredByRole';

import { fieldConfig } from './Share.config';
export { fieldConfig } from './Share.config';

export const FormItem = ({ isShow, layout, form, editable, field, config, id, readOnly }: any) => {
  const fieldProps: any = fieldConfig['field-props'];
  const clientMap = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) =>
      readOnly ? modelnamepsace.entities?.clientMap : modelnamepsace.modalData?.entities?.clientMap,
    shallowEqual
  );
  const clientInfoList = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) =>
      readOnly
        ? modelnamepsace.processData?.clientInfoList
        : modelnamepsace.modalData?.processData?.clientInfoList,
    shallowEqual
  );
  const list = lodash.map(clientInfoList, (id: string) => clientMap?.[id]);

  const visibleConditions = true;
  const editableConditions = !RuleByForm(
    config?.['editable-condition'] || fieldProps['editable-condition'],
    form
  );
  const requiredConditions = false;
  const requiredByRole = useGetRequiredByRole({
    requiredConditions,
    config,
    localConfig: fieldConfig,
    clientId: id,
  });
  const beneficiaryType = form.getFieldValue('beneficiaryType');

  const Rules = tenant.region({
    [Region.ID]: {
      VLD_000715: Validator.VLD_000715({ beneficiaryType, id }),
    },
    notMatch: {},
  });

  return (
    isShow &&
    ((config?.visible || fieldProps.visible) === Visible.Conditions
      ? visibleConditions
      : (config?.visible || fieldProps.visible) === Visible.Yes) && (
      <Col {...layout}>
        <FormItemNumber
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
          rules={lodash.compact(
            (config?.rules || fieldProps['x-rules'])?.map((rule: string) => Rules[rule])
          )}
          hiddenPrefix
          precision={0}
        />
      </Col>
    )
  );
};

const Share = ({ form, editable, layout, isShow, config, id }: any) => {
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

Share.displayName = 'share';

export default Share;
