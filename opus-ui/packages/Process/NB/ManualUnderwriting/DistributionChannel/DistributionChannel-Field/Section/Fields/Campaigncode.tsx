import React from 'react';
import { Col } from 'antd';
import { useSelector } from 'dva';
import { shallowEqual } from 'react-redux';
import lodash from 'lodash';
import {
  Authority,
  Editable,
  FormItemInput,
  Required,
  Visible,
  RuleByForm,
  FormItemSelect,
} from 'basic/components/Form';
import { tenant, Region } from '@/components/Tenant';
import useGetCampaignList from 'process/NB/ManualUnderwriting/_hooks/useGetCampaignList';
import { NAMESPACE } from 'process/NB/ManualUnderwriting/activity.config';
import { fieldConfig } from './Campaigncode.config';

export { fieldConfig } from './Campaigncode.config';

const FormItem = ({ isShow, layout, form, editable, field, config }: any) => {
  const businessData = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace.businessData,
    shallowEqual
  );
  const gsIndicator = lodash.get(businessData, 'policyList[0].gsIndicator');

  const campaignList = useGetCampaignList();
  const fieldProps: any = fieldConfig['field-props'];
  const visibleConditions = true;
  const editableConditions = !RuleByForm(fieldProps['editable-condition'], form);
  const requiredConditions = true;

  const dicts: any[] = lodash
    .chain(campaignList)
    .filter((item) => gsIndicator !== 'S' || item.gsIndicator === 'S')
    .map((item) => ({ dictName: item.campaignName, dictCode: item.campaignCode }))
    .value();

  return (
    isShow &&
    ((config?.visible || fieldProps.visible) === Visible.Conditions
      ? visibleConditions
      : (config?.visible || fieldProps.visible) === Visible.Yes) && (
      <Col {...layout}>
        {[Region.MY, Region.VN].includes(tenant.region()) ? (
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
            labelId={config.label?.dictCode || fieldProps.label.dictCode}
            labelTypeCode={config.label?.dictTypeCode || fieldProps.label.dictTypeCode}
            required={
              config?.required === Required.Conditions
                ? requiredConditions
                : (config.required || fieldProps.required) === Required.Yes
            }
            hiddenPrefix
            precision={0}
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
            labelId={config.label?.dictCode || fieldProps.label.dictCode}
            labelTypeCode={config.label?.dictTypeCode || fieldProps.label.dictTypeCode}
            required={
              config?.required === Required.Conditions
                ? requiredConditions
                : (config.required || fieldProps.required) === Required.Yes
            }
            hiddenPrefix
            precision={0}
          />
        )}
      </Col>
    )
  );
};

const Campaigncode = ({ field, config, form, editable, layout, isShow }: any) => (
  <Authority>
    <FormItem
      field={field}
      config={config}
      isShow={isShow}
      layout={layout}
      form={form}
      editable={editable}
    />
  </Authority>
);

Campaigncode.displayName = 'campaignCode';

export default Campaigncode;
