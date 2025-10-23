import React, { useMemo } from 'react';
import { NAMESPACE } from 'opus/Pages/Process/Claim/NonOpusSupportedClaim/activity.config';
import { useDispatch } from 'dva';

import { Col } from 'antd';
import {
  Authority,
  Visible,
  Editable,
  Required,
  FormItemSelect,
  Rule,
} from 'basic/components/Form';
import lodash from 'lodash';
import { useSelector } from 'dva';
import { localFieldConfig } from './PolicyNo.config';

export { localFieldConfig } from './PolicyNo.config';

export const FormItem = ({ isShow, layout, form, editable, field, config }: any) => {
  const dispatch = useDispatch();
  const fieldProps: any = localFieldConfig['field-props'];

  const visibleConditions = Rule(fieldProps['visible-condition'], form, '');
  const editableConditions = Rule(fieldProps['editable-condition'], form, '');
  const requiredConditions = Rule(fieldProps['required-condition'], form, '');

  const { policyCoverageList = [], policyContractList = [] } = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace.businessData?.c360PolicyInfo || {}
  );

  const dicts = useMemo(() => {
    return (
      lodash
        .chain(policyContractList)
        .filter(
          ({ policyId }: any) =>
            !!lodash.find(policyCoverageList, { policyId, coverageKey: '010100' })
        )
        .map(({ policyId }: any) => ({ policyId }))
        .uniq()
        .value() || []
    );
  }, [policyContractList, policyCoverageList]);

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
          formName={config.name || localFieldConfig?.field}
          labelId={config.label?.dictCode || fieldProps.label.dictCode}
          labelTypeCode={config.label?.dictTypeCode || fieldProps.label.dictTypeCode}
          required={
            config?.required === Required.Conditions
              ? requiredConditions
              : (config.required || fieldProps.required) === Required.Yes
          }
          onSelect={(policyId: string) => {
            dispatch({
              type: `${NAMESPACE}/claimEstimateResultUpdate`,

              payload: {
                changedFields: {
                  productCode:
                    lodash
                      .chain(policyCoverageList)
                      .find({ policyId, coverageKey: '010100' })
                      .get('productCode')
                      .value() || '',

                  sourceSystem:
                    lodash
                      .chain(policyContractList)
                      .find({ policyId })
                      .get('sourceSystem')
                      .value() || '',
                },
              },
            });
          }}
        />
      </Col>
    )
  );
};

const PolicyNo = ({ field, config, isShow, layout, form, editable }: any) => (
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

PolicyNo.displayName = localFieldConfig.field;

export default PolicyNo;
