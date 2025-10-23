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
  field: 'benefitTypeCode',
  'field-props': {
    visible: 'Y',
    editable: 'Y',
    required: 'Y',
    label: {
      dictTypeCode: 'Label_BIZ_Claim',
      dictCode: 'app.navigator.task-detail-of-claim-assessment.label.benefit-type',
    },
    'x-dict': { dictCode: 'benefitTypeCode', dictName: 'benefitTypeName' },
    'x-layout': {
      // 480px
      xs: {
        span: 12,
        offset: 0,
        pull: 0,
        order: 6,
      },
      // 576px
      sm: {
        span: 12,
        offset: 0,
        pull: 0,
        order: 6,
      },
      // 768px
      md: {
        span: 12,
        offset: 0,
        pull: 0,
        order: 6,
      },
      // 992px
      lg: {
        span: 12,
        offset: 0,
        pull: 0,
        order: 6,
      },
      // 1200px
      xl: {
        span: 12,
        offset: 0,
        pull: 0,
        order: 6,
      },
      // 1600px
      xxl: {
        span: 12,
        offset: 0,
        pull: 0,
        order: 6,
      },
    },
  },
};

export { localFieldConfig };

export const FormItem = ({ isShow, layout, form, editable, field, config }: any) => {
  const fieldProps: any = localFieldConfig['field-props'];

  const visibleConditions = true;
  const editableConditions = true;
  const requiredConditions = true;

  const [dicts, setDicts] = useState([]);
  const listPolicy = useSelector(
    ({ JPCLMOfClaimAssessment }: any) => JPCLMOfClaimAssessment.listPolicy
  );
  const claimPayableListMap = useSelector(
    ({ JPCLMOfClaimAssessment }: any) => JPCLMOfClaimAssessment.claimEntities?.claimPayableListMap
  );
  useEffect(() => {
    const claimPayableListMapValue: any = formUtils.cleanValidateData(claimPayableListMap);

    const data = lodash
      .chain(listPolicy)
      .filter(
        (item: any) =>
          item?.policyNo === form.getFieldValue('policyNo') &&
          item?.coreProductCode === form.getFieldValue('productCode') &&
          lodash.some(
            claimPayableListMapValue,
            (s) => s?.benefitTypeCode === item?.benefitTypeCode
          ) &&
          item?.benefitCategory === eBenefitCategory.S
      )
      .uniqBy('benefitTypeCode')
      .value();

    setDicts(data as any);
  }, [listPolicy, claimPayableListMap, form]);

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
          required={
            config?.required === Required.Conditions
              ? requiredConditions
              : (config.required || fieldProps.required) === Required.Yes
          }
          dictTypeCode="Dropdown_PRD_BenefitType"
        />
      </Col>
    )
  );
};

const BenefitTypeCode = ({ field, config, isShow, layout, form, editable, }: any) => (
  <Authority>
    <FormItem field={field} config={config} isShow={isShow} layout={layout} form={form} editable={editable} />
  </Authority>
);

BenefitTypeCode.displayName = 'BenefitTypeCode';

export default BenefitTypeCode;
