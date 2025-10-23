import React, { useMemo } from 'react';
import { Col } from 'antd';
import {
  Authority,
  Visible,
  Editable,
  Required,
  FormItemSelect,
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
  field: 'productCode',
  'field-props': {
    visible: 'Y',
    editable: 'Y',
    required: 'Y',
    label: {
      dictTypeCode: 'Label_BIZ_Claim',
      dictCode: 'app.navigator.task-detail-of-claim-assessment.label.product',
    },
    'x-dict': { dictCode: 'coreProductCode', dictName: 'productName' },
    'x-layout': {
      // 480px
      xs: {
        span: 12,
        offset: 0,
        pull: 0,
        order: 5,
      },
      // 576px
      sm: {
        span: 12,
        offset: 0,
        pull: 0,
        order: 5,
      },
      // 768px
      md: {
        span: 12,
        offset: 0,
        pull: 0,
        order: 5,
      },
      // 992px
      lg: {
        span: 12,
        offset: 0,
        pull: 0,
        order: 5,
      },
      // 1200px
      xl: {
        span: 12,
        offset: 0,
        pull: 0,
        order: 5,
      },
      // 1600px
      xxl: {
        span: 12,
        offset: 0,
        pull: 0,
        order: 5,
      },
    },
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
}: any) => {
  const fieldProps: any = localFieldConfig['field-props'];

  const visibleConditions = true;
  const editableConditions = true;
  const requiredConditions = true;

  const listPolicy = useSelector(
    ({ JPCLMOfClaimAssessment }: any) => JPCLMOfClaimAssessment.listPolicy
  );
  const claimPayableListMap = useSelector(
    ({ JPCLMOfClaimAssessment }: any) => JPCLMOfClaimAssessment?.claimEntities?.claimPayableListMap
  );

  const treatmentType = formUtils.queryValue(
    useSelector(
      ({ JPCLMOfClaimAssessment }: any) =>
        JPCLMOfClaimAssessment?.claimEntities?.treatmentListMap?.[
          treatmentPayableItemDetail?.treatmentId
        ]?.treatmentType
    )
  );

  const policyNo = form.getFieldValue('policyNo');
  const productNoList = useMemo(() => {
    const incidentId = treatmentPayableItemDetail?.incidentId;
    const selectedProduct: any = [];
    lodash.forEach(claimPayableListMap, (item: any) => {
      if (
        item.incidentId === incidentId &&
        formUtils.queryValue(item.policyNo) === policyNo &&
        (item.benefitCategory === eBenefitCategory.Cashless ||
          item.benefitCategory === eBenefitCategory.LumpSum)
      ) {
        selectedProduct.push(formUtils.queryValue(item.productCode));
      }
    });
    const selectablePolicy = lodash.filter(
      listPolicy,
      (policy) =>
        lodash.includes(selectedProduct, policy.coreProductCode) &&
        (treatmentType === TreatmentType.OutPatient
          ? policy.benefitSubCategory === BenefitSubCategory.OP
          : true)
    );
    const productNoListTemp = lodash.uniqBy(selectablePolicy, 'coreProductCode');

    return productNoListTemp;
  }, [policyNo, listPolicy, claimPayableListMap, treatmentPayableItemDetail, treatmentType]);

  return (
    isShow &&
    ((config?.visible || fieldProps.visible) === Visible.Conditions
      ? visibleConditions
      : (config?.visible || fieldProps.visible) === Visible.Yes) && (
      <Col {...layout}>
        <FormItemSelect
          dicts={productNoList} // TODO: 动态下拉
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
          dictTypeCode="Dropdown_PRD_Product"
        />
      </Col>
    )
  );
};

const ProductCode = ({ field, config,
  isShow,
  layout,
  form,
  editable,
  treatmentPayableItemDetail,
}: any) => (
  <Authority>
    <FormItem
      field={field} config={config} isShow={isShow}
      layout={layout}
      form={form}
      editable={editable}
      treatmentPayableItemDetail={treatmentPayableItemDetail}
    />
  </Authority>
);

ProductCode.displayName = 'ProductCode';

export default ProductCode;
