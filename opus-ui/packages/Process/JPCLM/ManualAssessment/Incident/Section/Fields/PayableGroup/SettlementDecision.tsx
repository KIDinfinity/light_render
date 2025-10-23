import React, { useEffect } from 'react';
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
import { useSelector } from 'dva';

const localFieldConfig = {
  atomGroupCode: 'JP_CLM_CTG001.JP_CLM_ACT003',
  caseCategory: 'JP_CLM_CTG001',
  activityCode: 'JP_CLM_ACT003',
  section: 'Incident.Payable.Group',
  field: 'settlementDecision',
  'field-props': {
    visible: 'Y',
    editable: 'Y',
    required: 'Y',
    label: {
      dictTypeCode: 'Label_BIZ_Claim',
      dictCode: 'SettlementDecision',
    },
    'x-dict': { dictCode: 'dictCode', dictName: 'dictName', dictTypeCode: 'paymentAcceptedResult' },
    'x-layout': {
      //  TODO: 动态layout
      // 480px
      xs: {
        span: 8,
        offset: 0,
        pull: 0,
        order: 3,
      },
      // 576px
      sm: {
        span: 8,
        offset: 0,
        pull: 0,
        order: 3,
      },
      // 768px
      md: {
        span: 8,
        offset: 0,
        pull: 0,
        order: 3,
      },
      // 992px
      lg: {
        span: 8,
        offset: 0,
        pull: 0,
        order: 3,
      },
      // 1200px
      xl: {
        span: 8,
        offset: 0,
        pull: 0,
        order: 3,
      },
      // 1600px
      xxl: {
        span: 8,
        offset: 0,
        pull: 0,
        order: 3,
      },
    },
    'x-rules': ['VLD_000576'],
  },
};

export { localFieldConfig };

export const FormItem = ({ isShow, layout, form, editable, field, config, targets }: any) => {
  const fieldProps: any = localFieldConfig['field-props'];

  const visibleConditions = true;
  const editableConditions = true;
  const requiredConditions = true;
  const dicts = useSelector(
    ({ dictionaryController }: any) =>
      dictionaryController[
        config['x-dict']?.dictTypeCode ||
          localFieldConfig?.['field-props']?.['x-dict']?.dictTypeCode
      ]
  );
  const assessmentDecision = useSelector(
    ({ JPCLMOfClaimAssessment }: any) =>
      JPCLMOfClaimAssessment.claimProcessData.claimDecision.assessmentDecision
  );

  const claimPayableListMap = useSelector(
    ({ JPCLMOfClaimAssessment }: any) => JPCLMOfClaimAssessment?.claimEntities?.claimPayableListMap
  );

  useEffect(() => {
    form.validateFields(['settlementDecision', 'detailedAssessmentDecision'], { force: true });
  }, [assessmentDecision]);

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

const SettlementDecision = ({ field, config, isShow, layout, form, editable, targets }: any) => (
  <Authority>
    <FormItem
      field={field}
      config={config}
      isShow={isShow}
      layout={layout}
      form={form}
      editable={editable}
      targets={targets}
    />
  </Authority>
);

SettlementDecision.displayName = 'SettlementDecision';

export default SettlementDecision;
