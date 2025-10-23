import React, { useState, useEffect } from 'react';
import { Col } from 'antd';
import { useSelector } from 'dva';
import lodash from 'lodash';
import {
  Authority,
  Visible,
  Editable,
  Required,
  FormItemSelect,
  formUtils,
} from 'basic/components/Form';
import { eBenefitCategory } from 'claim/enum/BenefitCategory';

const localFieldConfig = {
  atomGroupCode: 'JP_CLM_CTG001.JP_CLM_ACT003',
  caseCategory: 'JP_CLM_CTG001',
  activityCode: 'JP_CLM_ACT003',
  section: 'Procedure.Payable.Add',
  field: 'policyNo',
  'field-props': {
    visible: 'Y',
    editable: 'Y',
    required: 'N',
    label: {
      type: 'inline',
      dictTypeCode: 'Label_BIZ_Claim',
      dictCode: 'app.navigator.task-detail-of-claim-assessment.beneficiary.label.policy-no',
    },
    'x-dict': { dictCode: 'policyNo', dictName: 'policyNo' },
    'x-layout': {
      // 480px
      xs: {
        span: 12,
        offset: 0,
        pull: 0,
        order: 4,
      },
      // 576px
      sm: {
        span: 12,
        offset: 0,
        pull: 0,
        order: 4,
      },
      // 768px
      md: {
        span: 12,
        offset: 0,
        pull: 0,
        order: 4,
      },
      // 992px
      lg: {
        span: 12,
        offset: 0,
        pull: 0,
        order: 4,
      },
      // 1200px
      xl: {
        span: 12,
        offset: 0,
        pull: 0,
        order: 4,
      },
      // 1600px
      xxl: {
        span: 12,
        offset: 0,
        pull: 0,
        order: 4,
      },
    },
  },
};

export { localFieldConfig };

export const FormItem = ({ isShow, layout, form, editable, field, config, incidentId }: any) => {
  const fieldProps: any = localFieldConfig['field-props'];

  const visibleConditions = true;
  const editableConditions = true;
  const requiredConditions = true;

  const [dicts, setDicts] = useState([]);

  const claimPayableListMap = useSelector(
    ({ JPCLMOfClaimAssessment }: any) => JPCLMOfClaimAssessment.claimEntities?.claimPayableListMap
  );

  useEffect(() => {
    const data = lodash
      .chain(formUtils.cleanValidateData(claimPayableListMap))
      .filter(
        (item: any) =>
          item?.incidentId === incidentId && item?.benefitCategory === eBenefitCategory.S
      )
      .map((item: any) => ({ policyNo: item?.policyNo }))
      .uniqWith(lodash.isEqual)
      .compact()
      .value();

    setDicts(data);
  }, [claimPayableListMap]);

  return (
    isShow &&
    ((config?.visible || fieldProps.visible) === Visible.Conditions
      ? visibleConditions
      : (config?.visible || fieldProps.visible) === Visible.Yes) && (
      <Col {...layout}>
        <FormItemSelect
          dicts={dicts}
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
          labelType={config.label?.type || fieldProps.label.type}
          required={
            config?.required === Required.Conditions
              ? requiredConditions
              : (config.required || fieldProps.required) === Required.Yes
          }
        />
      </Col>
    )
  );
};

const PolicyNoAdd = ({ field, config, isShow, layout, form, editable, incidentId }: any) => (
  <Authority>
    <FormItem
      field={field} config={config} isShow={isShow}
      layout={layout}
      form={form}
      editable={editable}
      incidentId={incidentId}
    />
  </Authority>
);

PolicyNoAdd.displayName = localFieldConfig.field;

export default PolicyNoAdd;
