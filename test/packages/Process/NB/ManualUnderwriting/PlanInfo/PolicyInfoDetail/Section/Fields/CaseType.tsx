import React from 'react';
import lodash from 'lodash';
import useGetCaseTypeDicts from 'process/NB/ManualUnderwriting/_hooks/useGetCaseTypeDicts';
import { Col } from 'antd';
import { Authority, Editable, FormItemSelect, Required, Visible } from 'basic/components/Form';
import useGetCoverageList from 'process/NB/ManualUnderwriting/_hooks/useGetCoverageList';
import { tenant, Region } from '@/components/Tenant';
import { fieldConfig } from './CaseType.config';

export { fieldConfig } from './CaseType.config';

const FormItem = ({ isShow, layout, form, editable, field, config }: any) => {
  const fieldProps: any = fieldConfig['field-props'];
  const coverageList = useGetCoverageList();
  const dicts = useGetCaseTypeDicts();

  const mainCoverage = lodash.find(coverageList, (item) => item.isMain === 'Y');
  const disabledForMain = tenant.region({
    [Region.TH]: mainCoverage?.productCategory === 'UL',
    noMatch: false,
  });

  const visibleConditions = true;
  const editableConditions = disabledForMain;
  const requiredConditions = true;

  return (
    isShow &&
    ((config?.visible || fieldProps.visible) === Visible.Conditions
      ? visibleConditions
      : (config?.visible || fieldProps.visible) === Visible.Yes) && (
      <Col {...layout}>
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
      </Col>
    )
  );
};

const CaseType = ({ field, config, form, editable, layout, isShow }: any) => (
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

CaseType.displayName = 'caseType';

export default CaseType;
