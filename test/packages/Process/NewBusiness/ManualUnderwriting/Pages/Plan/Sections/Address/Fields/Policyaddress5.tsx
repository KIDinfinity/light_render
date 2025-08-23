import React from 'react';
import { Col } from 'antd';
import {
  Authority,
  Editable,
  FormItemSelect,
  FormItemInput,
  Required,
  Visible,
  RuleByForm,
} from 'basic/components/Form';
import { useDispatch } from 'dva';
import { tenant, Region } from '@/components/Tenant';

import { NAMESPACE } from 'process/NewBusiness/ManualUnderwriting/activity.config';
import AddressLevel from 'process/NewBusiness/ManualUnderwriting/_enum/AddressLevel';
import {
  useGetCurrentRegion,
  useGetCurrentLevelAddress,
} from 'process/NewBusiness/ManualUnderwriting/Pages/Plan/_hooks';

import { fieldConfig } from './Policyaddress5.config';

export { fieldConfig } from './Policyaddress5.config';

const FormItem = ({ isShow, layout, form, editable, field, config, id }: any) => {
  const dispatch = useDispatch();
  const fieldProps: any = fieldConfig['field-props'];
  const regionCode = tenant.region();
  const dicts = useGetCurrentLevelAddress({ addressLevel: AddressLevel.City });

  const isCurrentRegion = useGetCurrentRegion();

  const visibleConditions = true;
  const editableConditions = !RuleByForm(fieldProps['editable-condition'], form);
  const requiredConditions = true;

  const handleLoadSubAddress = (parentCode: string) => {
    dispatch({
      type: `${NAMESPACE}/getAddressSubListV3`,
      payload: {
        parentCode,
        addressLevel: AddressLevel.City,
      },
    });
  };

  return (
    isShow &&
    ((config?.visible || fieldProps.visible) === Visible.Conditions
      ? visibleConditions
      : (config?.visible || fieldProps.visible) === Visible.Yes) && (
      <Col {...layout}>
        {regionCode !== Region.ID && isCurrentRegion ? (
          <FormItemSelect
            dicts={dicts}
            dictCode="subCode"
            dictName="subName"
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
            required={
              config?.required === Required.Conditions
                ? requiredConditions
                : (config?.required || fieldProps.required) === Required.Yes
            }
            hiddenPrefix
            precision={0}
            onChange={handleLoadSubAddress}
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
            required={
              config?.required === Required.Conditions
                ? requiredConditions
                : (config?.required || fieldProps.required) === Required.Yes
            }
            hiddenPrefix
            precision={0}
          />
        )}
      </Col>
    )
  );
};

const Policyaddress5 = ({
  form,
  editable,
  layout,
  isShow,
  id,
  addressInfoList,

  config,
}: any) => {
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
        addressInfoList={addressInfoList}
      />
    </Authority>
  );
};

Policyaddress5.displayName = 'PolicyAddress5';

export default Policyaddress5;
