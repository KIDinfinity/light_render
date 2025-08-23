import React, { Component } from 'react';
import { Card, Form } from 'antd';
import type { FormComponentProps } from 'antd/es/form';
import { connect } from 'dva';
import type { Dispatch } from 'redux';
import lodash from 'lodash';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import FormLayout from 'basic/components/Form/FormLayout';
import { FormItemInput, formUtils } from 'basic/components/Form';
import layout from './Layout';
import styles from './ClaimantInfo.less';

const FORMID = 'claimant';

interface IProps extends FormComponentProps {
  registeForm: Function;
  unRegisterForm: Function;
  dispatch: Dispatch<any>;
  claimant: any;
}
@connect(({ JPCLMOfClaimRegistrationController, formCommonController }: any) => ({
  claimant: lodash.get(JPCLMOfClaimRegistrationController, 'claimProcessData.claimant'),
  validating: formCommonController.validating,
}))
// @ts-ignore
@Form.create<IProps>({
  onFieldsChange(props, changedFields) {
    const { dispatch, validating } = props;
    if (formUtils.shouldUpdateState(changedFields)) {
      if (validating) {
        setTimeout(() => {
          dispatch({
            type: 'JPCLMOfClaimRegistrationController/saveEntry',
            target: 'saveClaimant',
            payload: {
              changedFields,
            },
          });
        }, 0);
      } else {
        dispatch({
          type: 'JPCLMOfClaimRegistrationController/saveFormData',
          target: 'saveClaimant',
          payload: {
            changedFields,
          },
        });
      }
    }
  },
  mapPropsToFields(props) {
    const { claimant } = props;

    return formUtils.mapObjectToFields(claimant, {
      claimant: (value: string | object) => value,
      relationshipWithInsured: (value: string | object) => value,
      firstName: (value: string | object) => value,
    });
  },
})
class ClaimantInfo extends Component<IProps> {
  componentDidMount = () => {
    this.registeForm();
  };

  componentWillUnmount = () => {
    this.unRegisterForm();
  };

  registeForm = () => {
    const { dispatch, form } = this.props;

    dispatch({
      type: 'formCommonController/registerForm',
      payload: {
        form,
        formId: FORMID,
      },
    });
  };

  unRegisterForm = () => {
    const { dispatch, form } = this.props;

    dispatch({
      type: 'formCommonController/unRegisterForm',
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
      <div className={styles.claimant}>
        <Card
          title={formatMessageApi({
            Label_BIZ_Claim:
              'app.navigator.task-detail-of-claim-assessment.title.claimant-information',
          })}
        >
          <Form layout="vertical">
            <FormLayout json={layout}>
              <FormItemInput
                form={form}
                disabled={dataNotEditable}
                formName="claimant"
                labelId="app.navigator.task-detail-of-data-capture.label.claimant"
              />
              <FormItemInput
                form={form}
                disabled={dataNotEditable}
                formName="relationshipWithInsured"
                labelId="app.navigator.task-detail-of-data-capture.label.relationship-with-insured"
              />
              <FormItemInput
                form={form}
                disabled={dataNotEditable}
                formName="firstName"
                maxLength={30}
                labelId="app.navigator.task-detail-of-data-capture.label.first-name"
              />
            </FormLayout>
          </Form>
        </Card>
      </div>
    );
  }
}

export default ClaimantInfo;
