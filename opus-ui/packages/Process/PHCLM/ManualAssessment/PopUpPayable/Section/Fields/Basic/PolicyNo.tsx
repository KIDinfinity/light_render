import React, { useMemo } from 'react';
import { NAMESPACE } from '../../../../activity.config';

import { Col } from 'antd';
import { Authority, Visible, Editable, Required, FormItemSelect } from 'basic/components/Form';
import lodash from 'lodash';
import { getPolicyList } from 'basic/utils/PolicyUtils';
import { localFieldConfig } from './PolicyNo.config';

export { localFieldConfig } from './PolicyNo.config';

export const FormItem = ({ isShow, layout, form, editable, field, config, noPolicyNo }: any) => {
  const fieldProps: any = localFieldConfig['field-props'];

  const visibleConditions = !noPolicyNo;
  const editableConditions = true;
  const requiredConditions = true;
  const listPolicy = getPolicyList(NAMESPACE);

  const dicts = useMemo(() => {
    return lodash.uniqBy(listPolicy, 'policyNo');
  }, [listPolicy]);

  return (
    isShow &&
    ((config?.visible || fieldProps.visible) === Visible.Conditions
      ? visibleConditions
      : (config?.visible || fieldProps.visible) === Visible.Yes) && (
      <Col {...layout}>
        <FormItemSelect
          dicts={dicts} // TODO: 动态下拉
          dictCode={config?.['x-dict']?.dictCode || fieldProps['x-dict'].dictCode}
          dictName={config?.['x-dict']?.dictName || fieldProps['x-dict'].dictName}
          disabled={
            !editable ||
            ((config?.editable || fieldProps.editable) === Editable.Conditions
              ? !editableConditions
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
          getPopupContainer={() => document.body}
        />
      </Col>
    )
  );
};

const PolicyNo = ({ field, config, isShow, layout, form, editable, noPolicyNo }: any) => (
  <Authority>
    <FormItem
      field={field}
      config={config}
      isShow={isShow}
      layout={layout}
      form={form}
      editable={editable}
      noPolicyNo={noPolicyNo}
    />
  </Authority>
);

PolicyNo.displayName = 'PolicyNo';

export default PolicyNo;
