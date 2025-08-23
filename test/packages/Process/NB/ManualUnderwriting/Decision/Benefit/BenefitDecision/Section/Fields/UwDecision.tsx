import React, { useMemo } from 'react';
import { Col } from 'antd';
import lodash from 'lodash';
import { useSelector,  } from 'dva';
import { shallowEqual } from 'react-redux';
import {
  Authority,
  Editable,
  FormItemSelect,
  Required,
  Visible,
  RuleByForm,
} from 'basic/components/Form';
import UnderwriteDescrition from '@/auth/Constant/UnderwriteDescrition';
import useGetDisabledByCoverageField from 'process/NB/ManualUnderwriting/_hooks/useGetDisabledByCoverageField';
import useGetBenefitDecisionDicts from 'process/NB/ManualUnderwriting/_hooks/useGetBenefitDecisionDicts';
import useGetAuthEditable from 'process/NB/ManualUnderwriting/_hooks/useGetAuthEditable';
import useGetDecisionDisabled from 'process/NB/ManualUnderwriting/_hooks/useGetDecisionDisabled';
import useGetPreDefineDecision from 'process/NB/ManualUnderwriting/_hooks/useGetPreDefineDecision';
import useChangeBenefitLevelDecisionCallback from 'process/NB/ManualUnderwriting/_hooks/useChangeBenefitLevelDecisionCallback';
import useGetDisabledByDecisionEditInd from 'process/NB/ManualUnderwriting/_hooks/useGetDisabledByDecisionEditInd';
import useExchangeUpdatedCoverageList from 'process/NB/ManualUnderwriting/_hooks/useExchangeUpdatedCoverageList';
import useHandleRemarkResetOnDecisionChange from 'process/NB/ManualUnderwriting/_hooks/useHandleRemarkResetOnDecisionChange';
import useGetSustainabilityCaseCheckStatus from 'process/NB/ManualUnderwriting/SustainabilityCaseModal/CheckingProvider/hooks/useGetSustainabilityCaseCheckStatus';

export const fieldConfig = {
  section: 'BenefitDecision',
  field: 'uwDecision',
  'field-props': {
    label: {
      dictTypeCode: 'Label_BIZ_Underwriting',
      dictCode: 'BenefitLevelDecision',
    },
    expand: 'Y',
    editable: 'C',
    required: 'C',
    visible: 'Y',
    'x-layout': {
      // 480px
      xs: {
        span: 24,
        offset: 0,
        pull: 0,
        order: 1,
      },
      // 576px
      sm: {
        span: 24,
        offset: 0,
        pull: 0,
        order: 1,
      },
      // 768px
      md: {
        span: 24,
        offset: 0,
        pull: 0,
        order: 1,
      },
      // 992px
      lg: {
        span: 24,
        offset: 0,
        pull: 0,
        order: 1,
      },
      // 1200px
      xl: {
        span: 24,
        offset: 0,
        pull: 0,
        order: 1,
      },
      // 1600px
      xxl: {
        span: 24,
        offset: 0,
        pull: 0,
        order: 1,
      },
    },
    'x-dict': {
      dictTypeCode: 'Dropdown_UW_BenefitDecision',
    },
  },
};

const FormItem = ({ isShow, layout, form, editable, field, config, id }: any) => {
  const fieldProps: any = fieldConfig['field-props'];
  const withdraw = useSelector(
    ({ processTask }: any) => processTask.getTask?.withdraw,
    shallowEqual
  );
  const notWait = useSelector(({ processTask }: any) => processTask.getTask?.notWait, shallowEqual);

  const benefitDecisionDicts = useGetBenefitDecisionDicts({
    dictTypeCode:
      config['x-dict']?.dictTypeCode || fieldConfig['field-props']['x-dict'].dictTypeCode,
  });
  const authEditable = useGetAuthEditable({
    currentAuthority: UnderwriteDescrition.underwriteDescrition,
  });
  const preDefineDecision = useGetPreDefineDecision();

  const visibleConditions = true;
  const disabledByCaseCategory = useGetDecisionDisabled();
  const disabledByProductFeature = useGetDisabledByDecisionEditInd({ id });
  const requiredConditions =
    !lodash.includes([withdraw, notWait], true) ||
    RuleByForm(fieldProps['required-condition'], form);
  const disabledByCoverage = useGetDisabledByCoverageField({
    form,
    id,
    dataBasicField: 'underwritingDecisionEditInd',
    dataBasicFieldValue: 'N',
  });
  const { checking } = useGetSustainabilityCaseCheckStatus();
  const disabled = useMemo(() => {
    return disabledByCaseCategory || disabledByCoverage || disabledByProductFeature || checking;
  }, [disabledByCoverage, disabledByCaseCategory, disabledByProductFeature, checking]);

  const handleChange = useChangeBenefitLevelDecisionCallback();
  const handleListReflesh = useExchangeUpdatedCoverageList();
  const handleResetRemark = useHandleRemarkResetOnDecisionChange();
  return (
    isShow &&
    ((config?.visible || fieldProps.visible) === Visible.Conditions
      ? visibleConditions
      : (config?.visible || fieldProps.visible) === Visible.Yes) && (
      <Col {...layout}>
        <FormItemSelect
          disabled={
            preDefineDecision ||
            !authEditable ||
            !editable ||
            ((config?.editable || fieldProps.editable) === Editable.Conditions
              ? disabled
              : (config?.editable || fieldProps.editable) === Editable.No)
          }
          dicts={benefitDecisionDicts}
          form={form}
          formName={config.name || field}
          labelId={config.label?.dictCode || fieldProps.label.dictCode}
          labelTypeCode={config.label?.dictTypeCode || fieldProps.label.dictTypeCode}
          required={
            config?.required === Required.Conditions
              ? requiredConditions
              : (config.required || fieldProps.required) === Required.Yes
          }
          labelType="inline"
          hiddenPrefix
          precision={0}
          placeholder=" "
          onChange={async (value: string) => {
            handleChange({
              uwDecision: value,
              id,
            });
            await handleListReflesh({ uwDecision: value, id });
            handleResetRemark({ uwDecision: value, id });
          }}
        />
      </Col>
    )
  );
};

const UwDecision = ({
  field,
  config,
  form,
  editable,
  isShow,
  decisionCode,
  caseCategory,
  isMain,
  id,
}: any) => {
  const localLayout = {
    lg: {
      span: 24,
      offset: 0,
      pull: 0,
      order: 54,
    },
    md: {
      span: 24,
      offset: 0,
      pull: 0,
      order: 54,
    },
    sm: {
      span: 24,
      offset: 0,
      pull: 0,
      order: 54,
    },
    xl: {
      span: 24,
      offset: 0,
      pull: 0,
      order: 54,
    },
    xs: {
      span: 24,
      offset: 0,
      pull: 0,
      order: 54,
    },
    xxl: {
      span: 24,
      offset: 0,
      pull: 0,
      order: 54,
    },
  };
  return (
    <Authority>
      <FormItem
        field={field}
        config={config}
        isShow={isShow}
        layout={localLayout}
        form={form}
        editable={editable}
        decisionCode={decisionCode}
        caseCategory={caseCategory}
        isMain={isMain}
        id={id}
      />
    </Authority>
  );
};

UwDecision.displayName = 'uwDecision';

export default UwDecision;
