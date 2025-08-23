import React, { Component } from 'react';
import { Form } from 'antd';
import type { FormComponentProps } from 'antd/es/form';
import { connect } from 'dva';
import type { Dispatch } from 'redux';
import lodash from 'lodash';

import FormLayout from 'basic/components/Form/FormLayout';
import { FormItemInput, formUtils } from 'basic/components/Form';
import { basicLayout } from './Layout';

interface IProps {
  dispatch?: Dispatch<any>;
  ruleSetInfo?: any;
  info?: any;
  form?: any;
  condition?: any;
  inputInfo?: any;
}

interface IFormProps extends FormComponentProps {
  dispatch: Dispatch<any>;
  validating: boolean;
}

// @ts-ignore
@Form.create<IFormProps>({
  mapPropsToFields(props) {
    const { info }: any = props;

    return formUtils.mapObjectToFields(info, {});
  },
})
class ScenarioInfoController extends Component<IProps> {
  render() {
    const { form } = this.props;

    return (
      <Form layout="vertical">
        <FormLayout json={basicLayout}>
          <FormItemInput
            form={form}
            disabled
            required
            formName="name"
            labelId="venus_claim.rules.scenario.label.title"
          />
          <FormItemInput
            form={form}
            disabled
            formName="description"
            labelId="venus_claim.rules.basicInfo.label.description"
          />
        </FormLayout>
      </Form>
    );
  }
}

export default connect(({ ruleEngineController }: any) => ({
  ruleSetInfo: lodash.get(ruleEngineController, 'ruleSetModalData.ruleSetInfo', {}),
  condition: lodash.get(ruleEngineController, 'scenarioInfo.condition', {}),
  inputInfo: lodash.get(ruleEngineController, 'scenarioInfo.inputInfo', {}),
}))(ScenarioInfoController);
