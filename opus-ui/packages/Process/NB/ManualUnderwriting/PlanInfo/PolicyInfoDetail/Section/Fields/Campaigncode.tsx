import React from 'react';
import lodash from 'lodash';
import { Col } from 'antd';
import {
  Authority,
  Editable,
  FormItemInput,
  FormItemSelect,
  Required,
  Visible,
  RuleByForm,
  formUtils,
} from 'basic/components/Form';
import useGetCurrentRegion from 'process/NB/ManualUnderwriting/_hooks/useGetCurrentRegion';
import useGetPolicyCountry from 'process/NB/ManualUnderwriting/_hooks/useGetPolicyCountry';
import { tenant, Region } from '@/components/Tenant';
import { fieldConfig } from './Campaigncode.config';
import useGetCampaignList from 'process/NB/ManualUnderwriting/_hooks/useGetCampaignList';

export { fieldConfig } from './Campaigncode.config';

const FormItem = ({ isShow, layout, form, editable, field, config }: any) => {
  const fieldProps: any = fieldConfig['field-props'];
  const campaignList = useGetCampaignList();
  const gsIndicator = formUtils.queryValue(form.getFieldValue('gsIndicator'));

  const currentCountry = useGetPolicyCountry();
  const isCurrentRegion = useGetCurrentRegion({
    currentCountry,
  });
  const regionCode = tenant.region();

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
        {isCurrentRegion && regionCode !== Region.VN ? (
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
        ) : (
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
        )}
      </Col>
    )
  );
};

const Campaigncode = ({ field, config, form, editable, layout, isShow }: any) => (
  <Authority>
    <FormItem
      field={field}
      config={lodash.get(config, 'field-props')}
      isShow={isShow}
      layout={layout}
      form={form}
      editable={editable}
    />
  </Authority>
);

Campaigncode.displayName = 'campaignCode';

export default Campaigncode;
