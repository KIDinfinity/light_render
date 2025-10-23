import React, { useEffect } from 'react';
import lodash from 'lodash';
import { Col } from 'antd';
import { useSelector } from 'dva';
import { RuleByData } from 'basic/components/Form/Rule';
import { getDrowDownList } from '@/utils/dictFormatMessage';
import { tenant, Region } from '@/components/Tenant';

import { NAMESPACE } from 'opus/NewBusiness/ManualUnderwriting/activity.config';

import {
  Authority,
  Editable,
  FormItemInput,
  FormItemSelect,
  Visible,
  RuleByForm,
  formUtils,
} from 'basic/components/Form';
import { fieldConfig } from './Reason.config';

import useGetRequiredByRole from '../../../_hooks/useGetRequiredByRole';
export { fieldConfig } from './Reason.config';

const FormItem = ({ isShow, layout, form, editable, field, config, id, crtItemId }: any) => {
  const fieldProps: any = fieldConfig['field-props'];
  const dicts = getDrowDownList({ config, fieldProps });
  const newCrs = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) =>
      modelnamepsace.modalData.entities?.clientMap?.[id]?.newCrs
  );
  const ctfId = form.getFieldValue('ctfId');

  const visibleConditions = RuleByForm(fieldProps['visible-condition'], form);
  const editableConditions = !RuleByForm(config?.['editable-condition'], form);

  const requiredConditions = RuleByData(config?.['required-condition'], {
    newCrs: formUtils.queryValue(newCrs),
    ctfId,
  });
  const requiredByRole = useGetRequiredByRole({
    requiredConditions,
    config,
    localConfig: fieldConfig,
    clientId: id,
  });
  useEffect(() => {
    form.validateFields({ force: true });
  }, [newCrs, ctfId]);

  return (
    isShow &&
    ((config?.visible || fieldProps.visible) === Visible.Conditions
      ? visibleConditions
      : (config?.visible || fieldProps.visible) === Visible.Yes) && (
      <Col {...layout}>
        {lodash.includes([Region.ID, Region.MY, Region.TH], tenant.region()) ? (
          <FormItemSelect
            dicts={dicts}
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
            required={requiredConditions}
            hiddenPrefix
            precision={0}
            placeholder=""
          />
        ) : (
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
            required={requiredByRole}
            hiddenPrefix
            precision={0}
            placeholder=""
          />
        )}
      </Col>
    )
  );
};

const Reason = ({ form, editable, layout, isShow, config, id, crtItemId }: any) => {
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
        crtItemId={crtItemId}
      />
    </Authority>
  );
};

Reason.displayName = 'reason';

export default Reason;
