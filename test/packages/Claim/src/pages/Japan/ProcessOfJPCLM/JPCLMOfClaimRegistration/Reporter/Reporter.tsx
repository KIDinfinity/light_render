import React, { Component } from 'react';
import { Card, Form } from 'antd';
import { connect } from 'dva';

import { formatMessageApi } from '@/utils/dictFormatMessage';
import FormLayout from 'basic/components/Form/FormLayout';
import { FormItemInput, formUtils } from 'basic/components/Form';
import layout from './Layout';
import styles from './Reporter.less';

const FORMID = 'reporterInfo';

@connect(({ JPCLMOfClaimRegistrationController, formCommonController }) => ({
  claimProcessData: JPCLMOfClaimRegistrationController.claimProcessData,
  validating: formCommonController.validating,
}))
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
      sfdcNo: (value: string | object) => value,
      reporter: (value: string | object) => value,
    });
  },
})
class ReporterInfo extends Component {
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
      <div className={styles.reporterInfo}>
        <Card
          title={formatMessageApi({
            Label_BIZ_Claim: 'app.navigator.task-detail-of-data-capture.title.reporter-information',
          })}
        >
          <Form layout="vertical">
            <FormLayout json={layout}>
              <FormItemInput
                form={form}
                disabled={dataNotEditable}
                formName="sfdcNo"
                labelId="app.navigator.task-detail-of-data-capture.label.SFDC-no"
              />
              <FormItemInput
                form={form}
                disabled={dataNotEditable}
                formName="reporter"
                labelId="app.navigator.task-detail-of-data-capture.label.reporter"
              />
            </FormLayout>
          </Form>
        </Card>
      </div>
    );
  }
}

export default ReporterInfo;
