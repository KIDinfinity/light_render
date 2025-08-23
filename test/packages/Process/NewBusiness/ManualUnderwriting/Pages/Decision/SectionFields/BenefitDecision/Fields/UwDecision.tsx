import React, { useMemo } from 'react';
import { Col } from 'antd';
import lodash from 'lodash';
import { useSelector, useDispatch } from 'dva';
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
import useGetDisabledByCoverageField from 'process/NewBusiness/ManualUnderwriting/Pages/Decision/_hooks/useGetDisabledByCoverageField';
import useGetBenefitDecisionDicts from 'process/NewBusiness/ManualUnderwriting/Pages/Decision/_hooks/useGetBenefitDecisionDicts';
import useGetAuthEditable from 'process/NewBusiness/ManualUnderwriting/Pages/Decision/_hooks/useGetAuthEditable';
import useGetDecisionDisabled from 'process/NewBusiness/ManualUnderwriting/Pages/Decision/_hooks/useGetDecisionDisabled';
import useGetPreDefineDecision from 'process/NewBusiness/ManualUnderwriting/Pages/Decision/_hooks/useGetPreDefineDecision';
import useGetDisabledByDecisionEditInd from 'process/NewBusiness/ManualUnderwriting/Pages/Decision/_hooks/useGetDisabledByDecisionEditInd';
import useExchangeUpdatedCoverageList from 'process/NewBusiness/ManualUnderwriting/Pages/Decision/_hooks/useExchangeUpdatedCoverageList';
import useHandleRemarkResetOnDecisionChange from 'process/NewBusiness/ManualUnderwriting/Pages/Decision/_hooks/useHandleRemarkResetOnDecisionChange';
import useGetSustainabilityCaseCheckStatus from 'process/NewBusiness/ManualUnderwriting/Pages/SustainabilityCaseModal/CheckingProvider/hooks/useGetSustainabilityCaseCheckStatus';
import useMYIsTriggerNTU from 'process/NewBusiness/ManualUnderwriting/Pages/Decision/_hooks/useMYIsTriggerNTU';
import { fieldConfig } from './UwDecision.config';
import BenefitLevelDecision from 'process/NewBusiness/Enum/BenefitLevelDecision.ts';
import { NAMESPACE } from 'process/NewBusiness/ManualUnderwriting/activity.config';
import useJudgeNTUWarningDisplay from 'basic/hooks/useJudgeNTUWarningDisplay';

export { fieldConfig } from './UwDecision.config';

const FormItem = ({ isShow, layout, form, editable, field, config, id, record }: any) => {
  const taskDetail = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace.taskDetail,
    shallowEqual
  );
  const dispatch = useDispatch();
  const ntuDisableFlag = useJudgeNTUWarningDisplay({ taskDetail });
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

  const handleListReflesh = useExchangeUpdatedCoverageList();
  const handleResetRemark = useHandleRemarkResetOnDecisionChange();
  const coverageListHeight = document.getElementById('coverageListArea')?.clientHeight || 0;
  const isMYTriggerNTU = useMYIsTriggerNTU();
  return (
    isShow &&
    ((config?.visible || fieldProps.visible) === Visible.Conditions
      ? visibleConditions
      : (config?.visible || fieldProps.visible) === Visible.Yes) && (
      <Col {...layout}>
        <FormItemSelect
          disabled={
            isMYTriggerNTU ||
            preDefineDecision ||
            !authEditable ||
            !editable ||
            ntuDisableFlag ||
            withdraw ||
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
            await handleListReflesh({ uwDecision: value, id });
            handleResetRemark({ uwDecision: value, id });

            if(value === BenefitLevelDecision.Standard)
              dispatch({
                type: `${NAMESPACE}/clearAttachedLoadingAndExclusion`,
                payload: {
                  coverageItem: record
                }
              })
          }}
          getPopupContainer={() =>
            coverageListHeight < 370
              ? document.getElementById('layoutContent')
              : document.getElementById('coverageListArea')
          }
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
  record,
  id,
  layout,
}: any) => {
  return (
    <Authority>
      <FormItem
        field={field}
        config={config}
        isShow={isShow}
        layout={layout}
        form={form}
        editable={editable}
        decisionCode={decisionCode}
        caseCategory={caseCategory}
        isMain={isMain}
        record={record}
        id={id}
      />
    </Authority>
  );
};

UwDecision.displayName = 'uwDecision';

export default UwDecision;
