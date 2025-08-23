import React, { Component } from 'react';
import { connect } from 'dva';
import { Card, Form } from 'antd';
import { formatMessageApi } from '@/utils/dictFormatMessage';

import FormLayout from 'basic/components/Form/FormLayout';
import { FormItemCheckbox, formUtils } from 'basic/components/Form';
import layout from './Layout';
import styles from './Agent.less';

const FORMID = 'agentNotification';

@connect(({ JPCLMOfClaimRegistrationController, formCommonController }) => ({
  claimProcessData: JPCLMOfClaimRegistrationController.claimProcessData,
  validating: formCommonController.validating,
}))
// @ts-ignore
@Form.create({
  onFieldsChange(props, changedFields) {
    const { dispatch, validating } = props;
    if (formUtils.shouldUpdateState(changedFields)) {
      if (validating) {
        setTimeout(() => {
          dispatch({
            type: 'JPCLMOfClaimRegistrationController/saveEntry',
            target: 'saveClaimData',
            payload: {
              changedFields,
            },
          });
        }, 0);
      } else {
        dispatch({
          type: 'JPCLMOfClaimRegistrationController/saveFormData',
          target: 'saveClaimData',
          payload: {
            changedFields,
          },
        });
      }
    }
  },
  mapPropsToFields(props) {
    const { claimProcessData } = props;
    return formUtils.mapObjectToFields(claimProcessData, {
      agentNotification: (value: string | object) => value,
    });
  },
})
class AgentNotification extends Component {
  componentDidMount = () => {
    this.registeForm();
  };

  componentWillUnmount = () => {
    this.unRegisterForm();
  };

  registeForm = () => {
    const { dispatch, form } = this.props;

    dispatch({
      type: 'JPCLMOfClaimRegistrationController/registerForm',
      payload: {
        form,
        formId: FORMID,
      },
    });
  };

  unRegisterForm = () => {
    const { dispatch, form } = this.props;

    dispatch({
      type: 'JPCLMOfClaimRegistrationController/unRegisterForm',
      payload: {
        form,
        formId: FORMID,
      },
    });
  };

  render() {
    const { form, dataEditable } = this.props;
    const dataNotEditable = !dataEditable;

    return (
      <div className={styles.agentNotification}>
        <Card
          title={formatMessageApi({
            Label_BIZ_Claim:
              'app.navigator.task-detail-of-data-capture.title.agentNotification-information',
          })}
        >
          <Form layout="vertical">
            <FormLayout json={layout}>
              <FormItemCheckbox
                form={form}
                disabled={dataNotEditable}
                formName="agentNotification"
                labelId="app.navigator.task-detail-of-data-capture.label.agent-notification"
              />
            </FormLayout>
          </Form>
        </Card>
      </div>
    );
  }
}

export default AgentNotification;
