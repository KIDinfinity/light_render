import React from 'react';
import { Col } from 'antd';
import { useSelector,  } from 'dva';
import { shallowEqual } from 'react-redux';
import { includes } from 'lodash';
import { NAMESPACE } from 'process/NewBusiness/ManualUnderwriting/activity.config';
import {
  Authority,
  Editable,
  FormItemSelect,
  Required,
  Visible,
  RuleByForm,
} from 'basic/components/Form';
import UnderwriteDescrition from '@/auth/Constant/UnderwriteDescrition';
import useGetPolicyLevelDecisionDropdown from 'process/NewBusiness/ManualUnderwriting/Pages/Decision/_hooks/useGetPolicyLevelDecisionDropdown';
import useGetAuthEditable from 'process/NewBusiness/ManualUnderwriting/Pages/Decision/_hooks/useGetAuthEditable';
import useGetPreDefineDecision from 'process/NewBusiness/ManualUnderwriting/Pages/Decision/_hooks/useGetPreDefineDecision';
import useMYIsTriggerNTU from 'process/NewBusiness/ManualUnderwriting/Pages/Decision/_hooks/useMYIsTriggerNTU';
import useHancleDecisionChange from 'packages/Process/NewBusiness/ManualUnderwriting/Pages/Decision/_hooks/useHancleDecisionChange';
import useJudgeNTUWarningDisplay from 'basic/hooks/useJudgeNTUWarningDisplay';
export const fieldConfig = {
  section: 'UWDecision',
  field: 'decisionCode',
  'field-props': {
    label: {
      dictTypeCode: 'Label_BIZ_Underwriting',
      dictCode: 'PolicyLevelDecision',
    },
    'x-dict': { dictTypeCode: 'Dropdown_COM_UWDecision' },
    expand: 'Y',
    editable: 'C',
    required: 'Y',
    visible: 'Y',
    'x-layout': {
      // 480px
      xs: {
        span: 3,
        offset: 0,
        pull: 0,
        order: 1,
      },
      // 576px
      sm: {
        span: 3,
        offset: 0,
        pull: 0,
        order: 1,
      },
      // 768px
      md: {
        span: 3,
        offset: 0,
        pull: 0,
        order: 1,
      },
      // 992px
      lg: {
        span: 3,
        offset: 0,
        pull: 0,
        order: 1,
      },
      // 1200px
      xl: {
        span: 3,
        offset: 0,
        pull: 0,
        order: 1,
      },
      // 1600px
      xxl: {
        span: 3,
        offset: 0,
        pull: 0,
        order: 1,
      },
    },
  },
};

const FormItem = ({ isShow, layout, form, editable, field, config }: any) => {
  const taskDetail = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace.taskDetail,
    shallowEqual
  );
  const ntuDisableFlag = useJudgeNTUWarningDisplay({ taskDetail });
  const fieldProps: any = fieldConfig['field-props'];
  const withdraw = useSelector(
    ({ processTask }: any) => processTask.getTask?.withdraw,
    shallowEqual
  );
  const notWait = useSelector(({ processTask }: any) => processTask.getTask?.notWait, shallowEqual);
  const dicts = useGetPolicyLevelDecisionDropdown();
  const formName = config.name || field;
  const authEditable = useGetAuthEditable({
    currentAuthority: UnderwriteDescrition.underwriteDescrition,
  });
  const preDefineDecision = useGetPreDefineDecision();
  const UWNELinkRule = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace.displayUWMELink,
    shallowEqual
  );
  const visibleConditions = RuleByForm(fieldProps['visible-condition'], form) && !!UWNELinkRule;
  const requiredConditions =
    !includes([withdraw, notWait], true) || RuleByForm(fieldProps['required-condition'], form);
  const isMYTriggerNTU = useMYIsTriggerNTU();
  const handleChange = useHancleDecisionChange();

  const currentValue = form?.getFieldValue(formName);

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
            withdraw ||
            (config?.editable || fieldProps.editable) === Editable.No ||
            ntuDisableFlag
          }
          dicts={dicts}
          form={form}
          formName={formName}
          labelId={config.label?.dictCode || fieldProps.label.dictCode}
          labelTypeCode={config.label?.dictTypeCode || fieldProps.label.dictTypeCode}
          required={
            config?.required === Required.Conditions
              ? requiredConditions
              : (config.required || fieldProps.required) === Required.Yes
          }
          hiddenPrefix
          precision={0}
          onChange={(value: string) =>
            handleChange({
              form,
              fieldName: formName,
              dicts,
              uwDecision: value,
              previousDecision: currentValue,
            })
          }
          placeholder=" "
        />
      </Col>
    )
  );
};

const PolicyLevelDecision = ({
  field,
  config,
  form,
  editable,
  layout,
  isShow,
  decisionCode,
  caseCategory,
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
      />
    </Authority>
  );
};

PolicyLevelDecision.displayName = 'decisionCode';

export default PolicyLevelDecision;
