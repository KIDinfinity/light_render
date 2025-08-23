import React from 'react';
import { useSelector } from 'dva';
import { shallowEqual } from 'react-redux';
import lodash from 'lodash';
import { Col } from 'antd';

import { NAMESPACE } from 'process/NewBusiness/ManualUnderwriting/activity.config';
import {
  Authority,
  FormItemDatePicker,
  Visible,
  Editable,
} from 'basic/components/Form';

import useGetRequiredByRole from '../../../_hooks/useGetRequiredByRole';
import { fieldConfig } from './Fatcadate.config';
export { fieldConfig } from './Fatcadate.config';

const FormItem = ({ isShow, layout, form, field, config, id, editable, readOnly }: any) => {
  const fieldProps: any = fieldConfig['field-props'];
  const fatca = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) =>
      lodash.get(
        modelnamepsace,
        readOnly ? `entities.clientMap.${id}.fatca` : `modalData.entities.clientMap.${id}.fatca`
      ),
    shallowEqual
  );

  const visibleConditions = true;
  const editableConditions = lodash.isEmpty(fatca) || !fatca ? true : fatca === 'Y';
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
        <FormItemDatePicker
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
          allowFreeSelect
          hiddenPrefix
          precision={0}
        />
      </Col>
    )
  );
};

const Fatcadate = ({ form, editable, layout, isShow, id, config }: any) => {
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

Fatcadate.displayName = 'fatcaDate';

export default Fatcadate;
