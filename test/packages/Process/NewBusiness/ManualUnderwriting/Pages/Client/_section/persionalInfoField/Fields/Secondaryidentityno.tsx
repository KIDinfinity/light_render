import React, { useMemo } from 'react';
import { Col } from 'antd';

import {
  Authority,
  Editable,
  FormItemInput,
  Visible,
  RuleByForm,
  Required,
} from 'basic/components/Form';
import { NAMESPACE } from 'process/NewBusiness/ManualUnderwriting/activity.config';
import { formUtils } from 'basic/components/Form';

import useRequiredByNationality from '../../../_hooks/useRequiredByNationality';
import useGetRequiredByRole from '../../../_hooks/useGetRequiredByRole';

import { fieldConfig } from './Secondaryidentityno.config';
import { tenant, Region } from '@/components/Tenant';
import lodash from 'lodash';
import { useSelector } from 'dva';
import { shallowEqual } from 'react-redux';

export { fieldConfig } from './Secondaryidentityno.config';

const FormItem = ({ isShow, layout, form, editable, field, config, id, readOnly }: any) => {
  const fieldProps: any = fieldConfig['field-props'];
  const nationality = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) =>
      readOnly
        ? modelnamepsace.entities?.clientMap[id]?.nationalityInfo.nationality
        : modelnamepsace.modalData.entities?.clientMap[id]?.nationalityInfo.nationality,
    shallowEqual
  );
  const editableConditions = !RuleByForm(fieldConfig?.['editable-condition'], form);
  const requiredConditions = useRequiredByNationality({
    nationality: formUtils.queryValue(nationality),
  });
  const visibleConditions = requiredConditions;

  const requiredByRole = useGetRequiredByRole({
    requiredConditions,
    config,
    localConfig: fieldConfig,
    clientId: id,
  });

  const requiredConfig = lodash.get(config, 'required');

  const nationalityValue = formUtils.queryValue(nationality);

  const requiredCondition = useMemo(() => {
    return requiredConfig === Required.Conditions
      ? tenant.region({
          [Region.ID]: nationalityValue !== Region.RI,
          notMatch: requiredByRole,
        })
      : requiredConfig === Required.Yes;
  }, [nationalityValue, requiredByRole, requiredConfig]);

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
          labelTypeCode={config?.label?.dictTypeCode || fieldProps.label.dictTypeCode}
          required={requiredCondition}
          hiddenPrefix
          precision={0}
        />
      </Col>
    )
  );
};

const Secondaryidentityno = ({ form, editable, layout, isShow, config, readOnly, id }: any) => {
  return (
    <Authority>
      <FormItem
        field={fieldConfig?.field}
        config={config}
        isShow={isShow}
        layout={layout}
        form={form}
        readOnly={readOnly}
        editable={editable}
        id={id}
      />
    </Authority>
  );
};

Secondaryidentityno.displayName = 'SecondaryIdentityNo';

export default Secondaryidentityno;
