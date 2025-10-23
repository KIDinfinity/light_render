import React from 'react';
import { Col } from 'antd';
import lodash from 'lodash';
import {
  Authority,
  FormItemSelect,
  Required,
  RuleByForm,
} from 'basic/components/Form';
import useHandleGetBenefitClientNameDropdown from 'opus/NewBusiness/ManualUnderwriting/Pages/Decision/_hooks/useHandleGetBenefitClientNameDropdown';
import useLodaRiderRequiredInd from 'opus/NewBusiness/ManualUnderwriting/Pages/Decision/_hooks/useLodaRiderRequiredInd';
import useSetClientIdDisable from 'opus/NewBusiness/ManualUnderwriting/Pages/Decision/_hooks/useSetClientIdDisable';
import { tenant, Region } from '@/components/Tenant';
import { fieldConfig } from './Clientid.config';
import useGetFieldConfig from 'opus/NewBusiness/ManualUnderwriting/_hooks/useGetFieldConfig';

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
  const id = lodash.get(item, 'id');
  const riderRequiredInd = useLodaRiderRequiredInd({ id });
  const deletedClient = useSetClientIdDisable({ id });

  const propsConfig = {
    field,
    editable: !disabled && editable && !riderRequiredInd && !(disabledForMain && tenant.region() === Region.VN),
    isShow,
    form,
    propsVisibleCondition: true, // 保留true作为override
    propsRequiredCondition: true, // 保留true作为override
  };
  const { calculatedEditable, calculatedVisible, calculatedRequired, label, name } =
    useGetFieldConfig(propsConfig, config, fieldProps);

  return calculatedVisible ? (
    <Col {...layout}>
      <FormItemSelect
        dicts={dicts}
        disabled={!calculatedEditable && !deletedClient}
        form={form}
        formName={name}
        labelId={label.dictCode}
        labelTypeCode={label.dictTypeCode}
        required={calculatedRequired}
        rules={[]}
        labelType="inline"
        hiddenPrefix
        precision={0}
        placeholder=" "
        getPopupContainer={() => document.body}
      />
    </Col>
  ) : null;
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
      config={config}
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
