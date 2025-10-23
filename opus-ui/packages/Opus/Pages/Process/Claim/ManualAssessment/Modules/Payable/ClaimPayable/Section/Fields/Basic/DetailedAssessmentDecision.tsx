import React, { useMemo } from 'react';
import { Col } from 'antd';
import { Authority, Visible, Editable, Required, FormItemSelect } from 'basic/components/Form';
import { useSelector } from 'dva';
import { SourceSystem } from 'process/Enum';
import lodash from 'lodash';
import { getDrowDownList } from '@/utils/dictFormatMessage';
import { localFieldConfig } from './DetailedAssessmentDecision.config';
import { NAMESPACE } from 'opus/Pages/Process/Claim/ManualAssessment/activity.config';
import { settlementDecision as settlementDecisionEnum } from 'claim/pages/Enum';

export { localFieldConfig };

export const FormItem = ({
  isShow,
  layout,
  form,
  editable,
  field,
  config,
  policyNo,
  incidentId,
}: any) => {
  const fieldProps: any = localFieldConfig['field-props'];

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

  const decisionMapping = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace.decisionMapping
  );
  const settlementDecision = form.getFieldValue('settlementDecision');

  const dicts = useMemo(() => {
    const assessmentResultMapping = lodash.filter(decisionMapping, {
      settlementDecision,
    });
    const result = lodash.map(assessmentResultMapping, (item) => {
      return lodash.filter(getDrowDownList('assessmentResult') || [], (resultItem) => {
        if (resultItem.dictCode === item.detailedAssessmentDecision) {
          return resultItem;
        }
      });
    });
    const AssessmentResult = lodash.chain(result).compact().flatten().value();
    return lodash.orderBy(AssessmentResult, ['dictCode']);
  }, [decisionMapping, settlementDecision]);

  const visibleConditions = true;
  const editableConditions = policySource === SourceSystem.Klip;
  const requiredConditions = settlementDecision !== settlementDecisionEnum['01'];

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
        />
      </Col>
    )
  );
};

const DetailedAssessmentDecision = ({
  field,
  config,
  isShow,
  layout,
  form,
  editable,
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
      policyNo={policyNo}
      incidentId={incidentId}
    />
  </Authority>
);

DetailedAssessmentDecision.displayName = localFieldConfig.field;

export default DetailedAssessmentDecision;
