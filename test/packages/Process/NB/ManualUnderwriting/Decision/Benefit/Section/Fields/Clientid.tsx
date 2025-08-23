import React from 'react';
import { Col } from 'antd';
import lodash from 'lodash';
import {
  Authority,
  Editable,
  FormItemSelect,
  Required,
  Visible,
  RuleByForm,
} from 'basic/components/Form';
import useHandleGetBenefitClientNameDropdown from 'process/NB/ManualUnderwriting/_hooks/useHandleGetBenefitClientNameDropdown';
import useLodaRiderRequiredInd from 'process/NB/ManualUnderwriting/_hooks/useLodaRiderRequiredInd';
import useSetClientIdDisable from 'process/NB/ManualUnderwriting/_hooks/useSetClientIdDisable';
import { tenant, Region } from '@/components/Tenant';
import { fieldConfig } from './Clientid.config';

export { fieldConfig } from './Clientid.config';

const FormItem = ({
  isShow,
  layout,
  form,
  editable,
  field,
  config,
  disabled,
  disabledForMain,
  item,
}: any) => {
  const fieldProps: any = fieldConfig['field-props'];
  const dicts: any = useHandleGetBenefitClientNameDropdown();
  const visibleConditions = true;
  const editableConditions = !RuleByForm(fieldProps['editable-condition'], form);
  const requiredConditions = true;
  const id = lodash.get(item, 'id');
  const riderRequiredInd = useLodaRiderRequiredInd({ id });
  const Rules = {};
  const deletedClient = useSetClientIdDisable({ id });
  return (
    isShow &&
    ((config?.visible || fieldProps.visible) === Visible.Conditions
      ? visibleConditions
      : (config?.visible || fieldProps.visible) === Visible.Yes) && (
      <Col {...layout}>
        <FormItemSelect
          dicts={dicts}
          disabled={
            (!editable ||
              disabled ||
              riderRequiredInd ||
              (disabledForMain && tenant.region() === Region.VN) ||
              ((config?.editable || fieldProps.editable) === Editable.Conditions
                ? editableConditions
                : (config?.editable || fieldProps.editable) === Editable.No)) &&
            !deletedClient
          }
          form={form}
          formName={config.name || field}
          labelId={config.label?.dictCode || fieldProps.label.dictCode}
          labelTypeCode={config.label?.dictTypeCode || fieldProps.label.dictTypeCode}
          required={
            config?.required === Required.Conditions
              ? requiredConditions
              : (config.required || fieldProps.required) === Required.Yes
          }
          rules={lodash.compact(
            (config?.rules || fieldProps['x-rules'])?.map((rule: string) => Rules[rule])
          )}
          labelType="inline"
          hiddenPrefix
          precision={0}
          placeholder=" "
          getPopupContainer={() => document.body}
        />
      </Col>
    )
  );
};

const Clientname = ({
  field,
  config,
  form,
  editable,
  layout,
  isShow,
  id,
  disabled,
  disabledForMain,
  item,
}: any) => (
  <Authority>
    <FormItem
      field={field}
      config={config?.['field-props']}
      isShow={isShow}
      layout={layout}
      form={form}
      editable={editable}
      id={id}
      disabled={disabled}
      disabledForMain={disabledForMain}
      item={item}
    />
  </Authority>
);

Clientname.displayName = 'clientId';

export default Clientname;
