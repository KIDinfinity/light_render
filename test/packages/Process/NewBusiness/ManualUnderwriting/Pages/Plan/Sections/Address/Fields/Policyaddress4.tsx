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
import { useGetCurrentLevelAddress } from 'process/NewBusiness/ManualUnderwriting/Pages/Plan/_hooks';
import AddressLevel from 'process/NewBusiness/ManualUnderwriting/_enum/AddressLevel';
import { fieldConfig } from './Policyaddress4.config';
import { useGetCurrentRegion } from 'process/NewBusiness/ManualUnderwriting/Pages/Plan/_hooks';
import { tenant, Region } from '@/components/Tenant';

import { NAMESPACE } from 'process/NewBusiness/ManualUnderwriting/activity.config';

export { fieldConfig } from './Policyaddress4.config';

const FormItem = ({ isShow, layout, form, editable, field, config, id }: any) => {
  const dispatch = useDispatch();
  const fieldProps: any = fieldConfig['field-props'];
  const dicts = useGetCurrentLevelAddress({
    addressLevel: AddressLevel.District,
  });
  const handleLoadSubAddress = (parentCode: string) => {
    dispatch({
      type: `${NAMESPACE}/getAddressSubListV3`,
      payload: {
        parentCode,
        addressLevel: AddressLevel.District,
      },
    });
  };

  const isCurrentRegion = useGetCurrentRegion();
  const visibleConditions = true;
  const editableConditions = !RuleByForm(fieldProps['editable-condition'], form);
  const requiredConditions = true;
  const regionCode = tenant.region();

  return (
    isShow &&
    ((config?.visible || fieldProps.visible) === Visible.Conditions
      ? visibleConditions
      : (config?.visible || fieldProps.visible) === Visible.Yes) && (
      <Col {...layout}>
        {isCurrentRegion && regionCode !== Region.TH ? (
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

const Policyaddress4 = ({
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
        addressInfoList={addressInfoList}
        id={id}
      />
    </Authority>
  );
};

Policyaddress4.displayName = 'PolicyAddress4';

export default Policyaddress4;
