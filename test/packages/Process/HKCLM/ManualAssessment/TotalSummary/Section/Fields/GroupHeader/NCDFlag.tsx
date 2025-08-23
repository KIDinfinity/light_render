import React from 'react';
import { Col } from 'antd';
import { useSelector } from 'dva';
import {
  Authority,
  Editable,
  FormItemCheckbox,
  Required,
  Visible,
  Validator,
} from 'basic/components/Form';
import { localFieldConfig } from './NCDFlag.config';
import getPolicyYearValue from '../../../../_models/functions/getPolicyYearValue';
import { NAMESPACE } from '../../../../activity.config';
import lodash from 'lodash';
import { eClaimDecision } from 'claim/enum/claimDecision';
import styles from './index.less';

export { localFieldConfig } from './NCDFlag.config';

export const FormItem = ({
  isShow,
  layout,
  form,
  editable,
  field,
  config,
  policyYear,
  policyNo,
}: any) => {
  const fieldProps: any = localFieldConfig['field-props'];

  const claimPayableListMap = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace?.claimEntities?.claimPayableListMap
  );

  const claimPolicyPayableList = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) =>
      modelnamepsace?.claimProcessData?.claimPolicyPayableList
  );

  const claimWithOther = useSelector(({ [NAMESPACE]: modelnamepsace }: any) => {
    const firstIncidentId = modelnamepsace.claimProcessData.incidentList;
    const firstIncident = modelnamepsace.claimEntities.incidentListMap[firstIncidentId];
    const firstTreatmentId = firstIncident?.treatmentList?.[0];
    if (!firstTreatmentId) return false;
    return modelnamepsace.claimEntities.treatmentListMap?.[firstTreatmentId]
      ?.isClaimWithOtherInsurer;
  });

  const claimPayableListMapBypolicyNo = lodash.filter(claimPayableListMap, { policyNo: policyNo });

  // 当同一个policy下部分claimPayable不存在policyYear时，没有policyYear的优先级最低，因此设为Infinity。但如果是0，那依然是0。如果是其他空值，也视为Infinity。
  // 当CalculateByPolicyYear不为Y或F时，即便policyYear正常有值，也视为不存在。
  const minPolicyYear = Math.min(...claimPayableListMapBypolicyNo.map(item => {
    const policyYear = getPolicyYearValue(item);
    if(!policyYear && policyYear !== 0)
      return Infinity;

    return policyYear;
  }))

  let visibleConditions = false;

  const currentPolicyYear = !policyYear && policyYear !== 0? Infinity : policyYear;
  if (currentPolicyYear === minPolicyYear) {
    const ncdFlag = lodash.find(claimPolicyPayableList, { policyNo: policyNo })?.ncdFlag || null;
    if (ncdFlag) {
      visibleConditions = true;
    }
  }

  const editableConditions = true;
  const requiredConditions = true;
  const isAllDecline = claimPayableListMapBypolicyNo.every(
    (item) => item.claimDecision === eClaimDecision.deny
  );

  // 这个校验暂时后端去做
  const Rules = {
    VLD_001099: Validator.VLD_001099(claimWithOther),
    VLD_001100: Validator.VLD_001100(isAllDecline),
  };

  return (
    isShow &&
    ((config?.visible || fieldProps.visible) === Visible.Conditions
      ? visibleConditions
      : (config?.visible || fieldProps.visible) === Visible.Yes) && (
      <Col {...layout}>
        <FormItemCheckbox
          className={styles.NCDFlag}
          valueType="letter"
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
            (config.required || fieldProps.required) === Required.Conditions
              ? requiredConditions
              : (config.required || fieldProps.required) === Required.Yes
          }
          labelType="inline"
          // rules={lodash.compact(
          //   (config?.rules || fieldProps['x-rules'])?.map((rule: string) => Rules[rule])
          // )}
        />
      </Col>
    )
  );
};

const NCDFlag = ({ field, config, isShow, layout, form, editable, policyYear, policyNo }: any) => (
  <Authority>
    <FormItem
      field={field}
      config={config}
      isShow={isShow}
      layout={layout}
      form={form}
      editable={editable}
      policyYear={policyYear}
      policyNo={policyNo}
    />
  </Authority>
);

NCDFlag.displayName = localFieldConfig.field;

export default NCDFlag;
