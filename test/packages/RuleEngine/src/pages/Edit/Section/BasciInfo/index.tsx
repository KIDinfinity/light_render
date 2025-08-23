import React from 'react';
import { connect } from 'dva';
import { Form } from 'antd';
import type { FormComponentProps } from 'antd/es/form';
import type { Dispatch } from 'redux';
import lodash from 'lodash';
import { formUtils } from 'basic/components/Form';
import FormSection, {
  FormItemInput,
  FormItemSelect,
  FormItemDatePicker,
} from 'basic/components/Form/FormSection';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import { CaseCategory } from 'claim/pages/CaseCategory';
import { FormKeyEnum } from '../../Enum';
import setType from './setType';
import styles from './index.less';

interface IProps {
  ruleModules: any[];
  businessNo: string;
  caseCategory: string;
  taskNotEditable: boolean;
  ruleSetS: any[];
  form: any;
}

interface IRuleSetInfo {
  ruleSetName: string;
  moduleCode: string;
  ruleSetType: string;
  effectiveDate: string;
  expiredDate: string;
  description: string;
}

interface IFormProps extends FormComponentProps {
  dispatch: Dispatch<any>;
  validating: boolean;
  ruleSetInfo: IRuleSetInfo;
}

const BasicInfo: React.FC<IProps> = ({
  form,
  ruleModules,
  businessNo,
  caseCategory,
  taskNotEditable,
  ruleSetS,
}) => {
  const isSmart =
    businessNo && businessNo?.indexOf('-') < 0 && caseCategory === CaseCategory.RulesChange;

  return (
    <div className={styles.basicInfoWrap}>
      <FormSection
        form={form}
        formId={FormKeyEnum.BASICINFO}
        title={formatMessageApi({
          Label_BIZ_Claim: 'venus_claim.rules.basicInfo.label.title',
        })}
        layConf={{
          default: 4,
          description: 24,
        }}
        isMargin
      >
        {isSmart && (
          <FormItemSelect
            form={form}
            dicts={ruleSetS}
            formName="versionId"
            dictCode="versionId"
            disabled={taskNotEditable}
            dictName="ruleSetName"
            required
            labelId="venus_claim.rules.basicInfo.label.name"
          />
        )}
        {!isSmart && (
          <FormItemInput
            form={form}
            formName="ruleSetName"
            maxLength={30}
            disabled={taskNotEditable}
            required
            labelId="venus_claim.rules.basicInfo.label.name"
          />
        )}

        <FormItemSelect
          form={form}
          dicts={ruleModules}
          formName="moduleCode"
          dictCode="moduleCode"
          dictName="moduleName"
          disabled={taskNotEditable}
          required
          labelId="venus_claim.rules.basicInfo.label.model"
        />
        <FormItemSelect
          form={form}
          dicts={setType}
          disabled={caseCategory === CaseCategory.RulesChange || taskNotEditable}
          formName="ruleSetType"
          required
          labelTypeCode="Label_RUL_Engine"
          labelId="RuleSetType"
        />
        <FormItemDatePicker
          form={form}
          formName="effectiveDate"
          required
          // @ts-ignore
          allowFreeSelect
          disabled={taskNotEditable}
          labelId="venus_claim.rules.basicInfo.label.effective_date"
          format="L"
        />
        <FormItemDatePicker
          form={form}
          formName="expiredDate"
          // @ts-ignore
          allowFreeSelect
          disabled={taskNotEditable}
          labelId="venus_claim.rules.basicInfo.label.expired_date"
          format="L"
        />
        <FormItemInput
          form={form}
          formName="description"
          name="description"
          disabled={taskNotEditable}
          labelId="venus_claim.rules.basicInfo.label.description"
        />
      </FormSection>
    </div>
  );
};

export default connect(
  ({ ruleEngineController, processTask, claimEditable, formCommonController }: any) => ({
    ruleSetInfo: lodash.get(ruleEngineController, 'submitRuleSet.ruleSetInfo', {}),
    ruleModules: lodash.get(ruleEngineController, 'dropDown.ruleModules', []),
    ruleSetS: lodash.get(ruleEngineController, 'dropDown.ruleSetS', []),
    taskNotEditable: claimEditable.taskNotEditable,
    businessNo: lodash.get(processTask, 'getTask.businessNo'),
    caseCategory: lodash.get(processTask, 'getTask.caseCategory'),
    validating: formCommonController.validating,
  })
)(
  Form.create<IFormProps>({
    async onFieldsChange(props, changedFields) {
      const { dispatch, validating } = props;
      if (!formUtils.shouldUpdateState(changedFields)) return;
      const moduleCode = formUtils.queryValue(changedFields.moduleCode);
      const versionId = formUtils.queryValue(changedFields?.versionId);
      if (!validating) {
        if (versionId) {
          dispatch({
            type: 'ruleEngineController/queryRuleSetByVersionId',
            payload: {
              value: versionId,
            },
          });
        }
      }
      dispatch({
        type: 'ruleEngineController/saveBasicInfoFormData',
        payload: {
          changedFields,
        },
      });

      if (moduleCode) {
        dispatch({
          type: 'ruleEngineController/getAtomConfig',
        });
      }
    },
    mapPropsToFields(props) {
      const { ruleSetInfo } = props;
      return formUtils.mapObjectToFields(ruleSetInfo, {});
    },
  })(BasicInfo)
);
