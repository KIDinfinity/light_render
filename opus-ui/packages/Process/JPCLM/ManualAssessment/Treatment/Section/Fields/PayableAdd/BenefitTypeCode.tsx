import React, { useMemo } from 'react';
import { Col } from 'antd';
import {
  Authority,
  Visible,
  Editable,
  Required,
  FormItemSelect,
  Validator,
  formUtils,
} from 'basic/components/Form';
import lodash from 'lodash';
import { useSelector } from 'dva';
import { BenefitSubCategory, TreatmentType } from 'claim/pages/utils/claim';
import { eBenefitCategory } from 'claim/enum/BenefitCategory';

const localFieldConfig = {
  atomGroupCode: 'JP_CLM_CTG001.JP_CLM_ACT003',
  caseCategory: 'JP_CLM_CTG001',
  activityCode: 'JP_CLM_ACT003',
  section: 'Treatment.Payable.Add',
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
    'x-rules': ['checkTretmentPayableListByTypeCode'],
  },
};

export { localFieldConfig };

export const FormItem = ({
  isShow,
  layout,
  form,
  editable,
  field,
  config,
  treatmentPayableItemDetail,
  curTreatmentPayableList,
}: any) => {
  const fieldProps: any = localFieldConfig['field-props'];

  const visibleConditions = true;
  const editableConditions = true;
  const requiredConditions = true;

  const claimPayableListMap = useSelector(
    ({ JPCLMOfClaimAssessment }: any) => JPCLMOfClaimAssessment?.claimEntities.claimPayableListMap
  );

  const listPolicy = useSelector(
    ({ JPCLMOfClaimAssessment }: any) => JPCLMOfClaimAssessment.listPolicy
  );

  const treatmentType = formUtils.queryValue(
    useSelector(
      ({ JPCLMOfClaimAssessment }: any) =>
        JPCLMOfClaimAssessment?.claimEntities?.treatmentListMap?.[
          treatmentPayableItemDetail?.treatmentId
        ]?.treatmentType
    )
  );

  const selectablePolicyList = useMemo(() => {
    const { incidentId } = treatmentPayableItemDetail;
    const selectedBenefitType: any = [];
    lodash.map(claimPayableListMap, (item) => {
      if (
        item.incidentId === incidentId &&
        !lodash.isEmpty(item.benefitCategory) &&
        (item.benefitCategory === eBenefitCategory.Cashless ||
          item.benefitCategory === eBenefitCategory.LumpSum)
      ) {
        selectedBenefitType.push(formUtils.queryValue(item.benefitTypeCode));
      }
    });
    return lodash.filter(
      listPolicy,
      (policy) =>
        lodash.includes(selectedBenefitType, policy.benefitTypeCode) &&
        (treatmentType === TreatmentType.OutPatient
          ? policy.benefitSubCategory === BenefitSubCategory.OP
          : true)
    );
  }, [claimPayableListMap, treatmentPayableItemDetail, treatmentType]);

  const policyNo = form.getFieldValue('policyNo');
  const productCode = form.getFieldValue('productCode');
  const benefitTypeList = useMemo(() => {
    const selectablePolicy = selectablePolicyList;

    const policyGrouped = lodash.groupBy(selectablePolicy, 'policyNo');
    const filteredList = policyGrouped[policyNo];

    const productGrouped = lodash.groupBy(filteredList, 'coreProductCode');
    const productFilteredList = productGrouped[productCode];

    const benefitTypeListTemp = lodash.uniqBy(productFilteredList, 'benefitTypeCode');

    return benefitTypeListTemp;
  }, [treatmentPayableItemDetail, productCode, policyNo, selectablePolicyList]);

  const Rules = {
    checkPayableList: Validator.checkTretmentPayableListByTypeCode(
      listPolicy,
      curTreatmentPayableList,
      treatmentPayableItemDetail
    ),
  };

  return (
    isShow &&
    ((config?.visible || fieldProps.visible) === Visible.Conditions
      ? visibleConditions
      : (config?.visible || fieldProps.visible) === Visible.Yes) && (
      <Col {...layout}>
        <FormItemSelect
          dicts={benefitTypeList} // TODO: 动态下拉
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
          rules={lodash.compact(
            (config?.rules || fieldProps['x-rules'])?.map((rule: string) => Rules[rule])
          )}
          dictTypeCode="Dropdown_PRD_BenefitType"
        />
      </Col>
    )
  );
};

const BenefitTypeCode = ({ field, config,
  isShow,
  layout,
  form,
  editable,
  treatmentPayableItemDetail,
  curTreatmentPayableList,
  treatmentType,
}: any) => (
  <Authority>
    <FormItem
      field={field} config={config} isShow={isShow}
      layout={layout}
      form={form}
      editable={editable}
      treatmentPayableItemDetail={treatmentPayableItemDetail}
      curTreatmentPayableList={curTreatmentPayableList}
      treatmentType={treatmentType}
    />
  </Authority>
);

BenefitTypeCode.displayName = 'BenefitTypeCode';

export default BenefitTypeCode;
