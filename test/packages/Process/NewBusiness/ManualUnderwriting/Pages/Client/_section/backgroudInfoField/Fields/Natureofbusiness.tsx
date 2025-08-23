import React, { useMemo } from 'react';
import { Col } from 'antd';
import { useSelector } from 'dva';
import { shallowEqual } from 'react-redux';
import lodash from 'lodash';
import { getDrowDownList } from '@/utils/dictFormatMessage';
import {
  Authority,
  Editable,
  FormItemSelect,
  Visible,
  RuleByForm,
  Rule,
} from 'basic/components/Form';
import { tenant, Region } from '@/components/Tenant';
import { NAMESPACE } from 'process/NewBusiness/ManualUnderwriting/activity.config';
import { fieldConfig } from './Natureofbusiness.config';
import useGetRequiredByRole from '../../../_hooks/useGetRequiredByRole';
import OccupationRiskLevel from 'process/NewBusiness/ManualUnderwriting/_enum/OccupationRiskLevel';
export { fieldConfig } from './Natureofbusiness.config';

const FormItem = ({ isShow, layout, form, editable, field, config, visible, id }: any) => {
  const fieldProps: any = fieldConfig['field-props'];
  const regionCode = tenant.region();
  const occupationFullList = useSelector(
    (state: any) => state[NAMESPACE].occupationFullList,
    shallowEqual
  );

  const dicts =
    regionCode === Region.VN
      ? occupationFullList?.Dropdown_IND_NatureofBusiness
      : getDrowDownList({ config, fieldProps });

  const cfgOccupationRiskLevel = useSelector(
    ({ [NAMESPACE]: model }: any) => model.cfgOccupationRiskLevel
  );
  const occupationCode = form.getFieldValue('occupationCode');
  const visibleConditions = useMemo(() => {
    return tenant.region({
      [Region.VN]: () => {
        const cfg = lodash.find(
          cfgOccupationRiskLevel,
          (cfgItem) => cfgItem.code === form.getFieldValue('occupationCode')
        );
        return cfg ? cfg.riskLevel === OccupationRiskLevel.HighRisk : false;
      },
      notMatch: true,
    });
  }, [occupationCode, cfgOccupationRiskLevel]);
  const editableConditions = !RuleByForm(config?.['editable-condition'], form);
  const requiredConditions = Rule(config?.['required-condition'], form, '');
  const requiredByRole = useGetRequiredByRole({
    requiredConditions,
    config,
    localConfig: fieldConfig,
    clientId: id,
  });
  const required = requiredByRole;

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
          labelId={config?.label?.dictCode || fieldProps.label.dictCode}
          labelTypeCode={config?.label?.dictTypeCode || fieldProps.label.dictTypeCode}
          required={required}
          hiddenPrefix
          precision={0}
        />
      </Col>
    )
  );
};

const Natureofbusiness = ({ form, editable, layout, isShow, id, config }: any) => {
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
      />
    </Authority>
  );
};

Natureofbusiness.displayName = 'natureOfBusiness';

export default Natureofbusiness;
