import React from 'react';
import lodash from 'lodash';
import { Col } from 'antd';
import { useSelector } from 'dva';
import {
  Authority,
  Editable,
  FormItemSelect,
  Required,
  Visible,
} from 'basic/components/Form';
import { tenant, Region } from '@/components/Tenant';
import { fieldConfig } from './CaseType.config';

export { fieldConfig } from './CaseType.config';

import { NAMESPACE } from 'process/NewBusiness/ManualUnderwriting/activity.config';
import { useGetCoverageList } from 'process/NewBusiness/ManualUnderwriting/_hooks';

const FormItem = ({ isShow, layout, form, editable, field, config }: any) => {
  const fieldProps: any = fieldConfig['field-props'];
  const coverageList = useGetCoverageList();

  const dicts = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace.contractTypeList
  );

  const mainCoverage = lodash.find(coverageList, (item) => item.isMain === 'Y');
  const disabledForMainCoverage = tenant.region({
    [Region.TH]: mainCoverage?.productCategory === 'UL',
    noMatch: false,
  });

  const visibleConditions = true;
  const editableConditions = disabledForMainCoverage;
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

const CaseType = ({ field, config, form, editable, layout, isShow }: any) => {
  return (
    <Authority>
      <FormItem
        field={fieldConfig?.field}
        config={config}
        isShow={isShow}
        layout={layout}
        form={form}
        editable={editable}
      />
    </Authority>
  );
};

CaseType.displayName = 'caseType';

export default CaseType;
