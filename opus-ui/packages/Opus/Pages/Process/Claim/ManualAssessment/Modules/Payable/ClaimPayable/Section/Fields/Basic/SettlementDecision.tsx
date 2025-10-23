import React from 'react';
import { Col } from 'antd';
import lodash from 'lodash';
import {
  Authority,
  Visible,
  Editable,
  Required,
  FormItemSelect,
  Validator,
} from 'basic/components/Form';
import { SourceSystem } from 'process/Enum';
import { useSelector } from 'dva';

import { getDrowDownList } from '@/utils/dictFormatMessage';

import { NAMESPACE } from 'opus/Pages/Process/Claim/ManualAssessment/activity.config';

import { localFieldConfig } from './SettlementDecision.config';

export { localFieldConfig };

export const FormItem = ({
  isShow,
  layout,
  form,
  editable,
  field,
  config,
  targets,
  policyNo,
  incidentId,
}: any) => {
  const fieldProps: any = localFieldConfig['field-props'];

  const visibleConditions = true;
  const editableConditions = true;
  const requiredConditions = true;

  const policySource = useSelector(({ [NAMESPACE]: modelnamepsace }: any) => {
    return (
      lodash.find(modelnamepsace.claimEntities?.beneficiaryListMap, { policyNo: policyNo })
        ?.sourceSystem ||
      lodash.find(modelnamepsace.claimEntities?.incidentListMap?.[incidentId]?.klipCaseInfoList, {
        policyId: policyNo,
      })?.sourceSystem ||
      modelnamepsace.claimProcessData?.insured?.policySource
    );
  });

  // 根据policy source区分dropdown type code
  const dicts = getDrowDownList({
    fieldProps: {
      ...fieldProps,
      'x-dict': {
        dictCode: 'dictCode',
        dictName: 'dictName',
        dictTypeCode:
          policySource === SourceSystem.Lifej
            ? 'Dropdown_CLM_settlementDecisionLifeJ'
            : policySource === SourceSystem.Klip
              ? 'Dropdown_CLM_settlementDecisionKlip'
              : (fieldProps?.['field-props'] ?? fieldProps)?.['x-dict']?.dictTypeCode,
      },
    },
  });

  const assessmentDecision = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) =>
      modelnamepsace.claimProcessData.claimDecision.assessmentDecision
  );

  const claimPayableListMap = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace?.claimEntities?.claimPayableListMap
  );

  // useEffect(() => {
  //   form.validateFields(['settlementDecision', 'detailedAssessmentDecision'], { force: true });
  // }, [assessmentDecision]);

  const Rules = {
    VLD_000576: {
      validator: Validator.VLD_000576({ assessmentDecision, claimPayableListMap, targets }),
    },
  };

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
          optionShowType="both"
          rules={lodash.compact(
            (config?.rules || fieldProps['x-rules']).map((rule: any) => Rules[rule])
          )}
        />
      </Col>
    )
  );
};

const SettlementDecision = ({
  field,
  config,
  isShow,
  layout,
  form,
  editable,
  targets,
  policyNo,
  incidentId,
}: any) => (
  <Authority>
    <FormItem
      field={field}
      config={config}
      isShow={isShow}
      layout={layout}
      form={form}
      editable={editable}
      targets={targets}
      policyNo={policyNo}
      incidentId={incidentId}
    />
  </Authority>
);

SettlementDecision.displayName = localFieldConfig.field;

export default SettlementDecision;
