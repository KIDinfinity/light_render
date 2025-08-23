import React, { Component } from 'react';
import { Form } from 'antd';
import type { FormComponentProps } from 'antd/es/form';
import moment from 'moment';
import { connect } from 'dva';
import type { Dispatch } from 'redux';
import lodash from 'lodash';
import { formUtils } from 'basic/components/Form';
import FormSection, {
  FormItemInput,
  FormItemSelect,
  FormItemTimePicker,
  FormItemDatePicker,
} from 'basic/components/Form/FormSection';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import mockSetType from './mockSetType';
import styles from './BasciInfo.less';

interface IProps {
  dispatch?: Dispatch<any>;
  ruleSetInfo?: any;
  ruleModules?: any;
  form?: any;
}

interface IFormProps extends FormComponentProps {
  dispatch: Dispatch<any>;
  validating: boolean;
}

// @ts-ignore
@Form.create<IFormProps>({
  mapPropsToFields(props) {
    const { ruleSetInfo }: any = props;

    return formUtils.mapObjectToFields(ruleSetInfo, {
      effectiveDate: (value: any) => (value ? moment(value) : value),
      expectedPublishDate: (value: any) => (value ? moment(value) : value),
      expiredDate: (value: any) => (value ? moment(value) : value),
      incidentTime: (value: any) => (value ? moment(value) : value),
    });
  },
})
class BasciInfoController extends Component<IProps> {
  render() {
    const { form, ruleModules }: any = this.props;

    return (
      <div className={styles.basicInfoWrap}>
        <FormSection
          form={form}
          formId="FormRuleSetModalData"
          title={formatMessageApi({
            Label_BIZ_Claim: 'venus_claim.rules.basicInfo.label.title',
          })}
          layConf={{
            default: 6,
            description: 24,
          }}
          isMargin
        >
          <FormItemInput
            form={form}
            formName="ruleSetName"
            maxLength={30}
            disabled
            required
            labelId="venus_claim.rules.basicInfo.label.name"
          />

          <FormItemSelect
            form={form}
            dicts={ruleModules}
            formName="moduleCode"
            dictCode="moduleCode"
            dictName="moduleName"
            disabled
            required
            labelId="venus_claim.rules.basicInfo.label.model"
          />
          <FormItemSelect
            form={form}
            dicts={mockSetType}
            disabled
            formName="ruleSetType"
            required
            labelId="Rule Set Type"
          />
          <FormItemDatePicker
            form={form}
            formName="effectiveDate"
            required
            // @ts-ignore
            allowFreeSelect
            disabled
            labelId="venus_claim.rules.basicInfo.label.effective_date"
            format="L"
          />
          <FormItemDatePicker
            form={form}
            formName="expiredDate"
            // @ts-ignore
            allowFreeSelect
            disabled
            labelId="venus_claim.rules.basicInfo.label.expired_date"
            format="L"
          />
          <FormItemTimePicker
            form={form}
            disabled
            formName="incidentTime"
            labelId="venus_claim.rules.basicInfo.label.actual_publish_time"
            format="LT"
          />
          <FormItemInput
            form={form}
            formName="description"
            name="description"
            disabled
            maxLength={30}
            labelId="venus_claim.rules.basicInfo.label.description"
          />
        </FormSection>
      </div>
    );
  }
}

export default connect(({ ruleEngineController }: any) => ({
  ruleSetInfo: lodash.get(ruleEngineController, 'ruleSetModalData.ruleSetInfo', {}),
  ruleModules: lodash.get(ruleEngineController, 'dropDown.ruleModules', []),
}))(BasciInfoController);
