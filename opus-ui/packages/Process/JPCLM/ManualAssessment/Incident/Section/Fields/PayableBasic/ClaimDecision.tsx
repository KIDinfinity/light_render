import React from 'react';
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
import { useDispatch } from 'dva';
import { tenant } from '@/components/Tenant';
import { useSelector } from 'dva';
import lodash from 'lodash';

import { ClaimDecision as ClaimDecisionEnum } from 'claim/pages/utils/claim';
import { VLD_000402 } from 'claim/pages/validators/fieldValidators';

const localFieldConfig = {
  atomGroupCode: 'JP_CLM_CTG001.JP_CLM_ACT003',
  caseCategory: 'JP_CLM_CTG001',
  activityCode: 'JP_CLM_ACT003',
  section: 'Incident.Payable.Basic',
  field: 'claimDecision',
  'field-props': {
    visible: 'Y',
    editable: 'Y',
    required: 'Y',
    label: {
      dictTypeCode: 'Label_BIZ_Claim',
      dictCode: 'app.navigator.task-detail-of-claim-assessment.label.claim-decision',
    },
    'x-dict': { dictTypeCode: 'Dropdown_CLM_ClaimDecision' },
    'x-layout': {
      //  TODO: 动态layout
      // 480px
      xs: {
        span: 8,
        offset: 0,
        pull: 0,
        order: 4,
      },
      // 576px
      sm: {
        span: 8,
        offset: 0,
        pull: 0,
        order: 4,
      },
      // 768px
      md: {
        span: 8,
        offset: 0,
        pull: 0,
        order: 4,
      },
      // 992px
      lg: {
        span: 8,
        offset: 0,
        pull: 0,
        order: 4,
      },
      // 1200px
      xl: {
        span: 8,
        offset: 0,
        pull: 0,
        order: 4,
      },
      // 1600px
      xxl: {
        span: 8,
        offset: 0,
        pull: 0,
        order: 4,
      },
    },
    'no-treatment-layout': {
      // 480px
      xs: {
        span: 24,
        offset: 0,
        pull: 0,
        order: 4,
      },
      // 576px
      sm: {
        span: 4,
        offset: 0,
        pull: 0,
        order: 4,
      },
      // 768px
      md: {
        span: 4,
        offset: 0,
        pull: 0,
        order: 4,
      },
      // 992px
      lg: {
        span: 4,
        offset: 0,
        pull: 0,
        order: 4,
      },
      // 1200px
      xl: {
        span: 4,
        offset: 0,
        pull: 0,
        order: 4,
      },
      // 1600px
      xxl: {
        span: 4,
        offset: 0,
        pull: 0,
        order: 4,
      },
    },
    'x-rules': ['VLD_000283', 'VLD_000402'],
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
  incidentPayableItem,
}: any) => {
  const dispatch = useDispatch();
  const fieldProps: any = localFieldConfig['field-props'];
  const dicts = useSelector(
    ({ dictionaryController }: any) =>
      dictionaryController[
        config['x-dict']?.dictTypeCode ||
          localFieldConfig?.['field-props']?.['x-dict']?.dictTypeCode
      ]
  );
  const listPolicy = useSelector(
    ({ JPCLMOfClaimAssessment }: any) => JPCLMOfClaimAssessment.listPolicy
  );

  const claimPayableListMap = useSelector(
    ({ JPCLMOfClaimAssessment }: any) => JPCLMOfClaimAssessment?.claimEntities?.claimPayableListMap
  );

  const serviceItemPayableListMap = useSelector(
    ({ JPCLMOfClaimAssessment }: any) =>
      JPCLMOfClaimAssessment?.claimEntities?.serviceItemPayableListMap
  );

  const Rules = {
    VLD_000283: Validator.VLD_000283(
      claimPayableListMap,
      serviceItemPayableListMap,
      incidentPayableItem?.id
    ),
    VLD_000402: VLD_000402(),
  };

  const decisionOnChange = async (value: any) => {
    const { policyNo, policyCurrency, exchangeRatePolicyPayout, id } = incidentPayableItem;
    const systemCurrency = tenant.currency();
    const currency =
      policyCurrency ||
      lodash.find(listPolicy, (item: any) => item.policyNo === formUtils.queryValue(policyNo))
        ?.policyCurrency;
    if (value !== ClaimDecisionEnum.deny && !exchangeRatePolicyPayout) {
      await dispatch({
        type: 'JPCLMOfClaimAssessment/getExchangeRateForPolicy',
        payload: {
          policyCurrency: currency || systemCurrency,
          payableId: id,
        },
      });
      await dispatch({
        type: 'JPCLMOfClaimAssessment/getExchangeRateForInvoice',
        payload: {
          policyCurrency: currency || systemCurrency,
          payableId: id,
        },
      });
    }
  };
  const visibleConditions = true;
  const editableConditions = true;
  const requiredConditions = true;

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
          onChange={decisionOnChange}
        />
      </Col>
    )
  );
};

const ClaimDecision = ({
  field,
  config,
  isShow,
  layout,
  form,
  editable,
  incidentPayableItem,
}: any) => (
  <Authority>
    <FormItem
      field={field}
      config={config}
      isShow={isShow}
      layout={layout}
      form={form}
      editable={editable}
      incidentPayableItem={incidentPayableItem}
    />
  </Authority>
);

ClaimDecision.displayName = 'ClaimDecision';

export default ClaimDecision;
