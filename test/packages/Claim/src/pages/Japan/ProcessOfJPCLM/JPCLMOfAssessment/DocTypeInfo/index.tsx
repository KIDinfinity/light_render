import React, { PureComponent } from 'react';
import { connect } from 'dva';
import type { Dispatch } from 'redux';
import moment from 'moment';
import { Card, Form } from 'antd';
import { get, pick } from 'lodash';
import memo from 'memoize-one';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import type { FormComponentProps } from 'antd/es/form';
import { formUtils } from 'basic/components/Form';
import FormLayout from 'basic/components/Form/FormLayout';
import FormItemDatePicker from 'basic/components/Form/FormItem/FormItemDatePicker';
import json from '../FormLayout.json';
import styles from './docTypeInfo.less';

const FORMID = 'claimant';

interface IProps extends FormComponentProps {
  docReceiveDate: any;
  validating: boolean;
  pendingConfirm: boolean;
  dispatch: Dispatch<any>;
}
const memoPick = memo(pick);
const docReceiveDate = ['firstFormReceiveDate', 'lastFormReceiveDate', 'firstMcReceiveDate'];
class DocTypeInfo extends PureComponent<IProps> {
  componentDidMount = () => {
    this.registeForm();
    this.truthPendingConfirmInit();
  };

  componentWillUnmount = () => {
    this.unRegisterForm();
  };

  truthPendingConfirmInit = () => {
    const { dispatch } = this.props;
    dispatch({
      type: 'JPCLMOfClaimAssessmentController/truthPendingConfirm',
    });
  };

  registeForm = () => {
    const { dispatch, form } = this.props;

    setTimeout(() => {
      dispatch({
        type: 'formCommonController/registerForm',
        payload: {
          form,
          formId: FORMID,
        },
      });
    });
  };

  unRegisterForm = () => {
    const { dispatch, form } = this.props;

    setTimeout(() => {
      dispatch({
        type: 'formCommonController/unRegisterForm',
        payload: {
          form,
          formId: FORMID,
        },
      });
    });
  };

  render() {
    const { form } = this.props;

    return (
      <div className={styles.document_type_information}>
        <Card
          title={formatMessageApi({
            Label_BIZ_Claim: 'venus.claim.label.document-type-information',
          })}
        >
          <Form layout="vertical">
            <FormLayout json={json}>
              <FormItemDatePicker
                form={form}
                disabled
                formName="firstFormReceiveDate"
                labelId="venus.navigator.label.arrival-date"
              />
              <FormItemDatePicker
                form={form}
                disabled
                formName="lastFormReceiveDate"
                labelId="venus_claim.label.informationPerfectionDate"
              />
              <FormItemDatePicker
                form={form}
                disabled
                formName="firstMcReceiveDate"
                labelId="venus_claim.label.certificateDate"
              />
            </FormLayout>
          </Form>
        </Card>
      </div>
    );
  }
}

const DocTypeInfoWrap = Form.create<IProps>({
  onFieldsChange(props, changedFields) {
    const { dispatch, validating } = props;
    if (formUtils.shouldUpdateState(changedFields)) {
      if (validating) {
        setTimeout(() => {
          dispatch({
            type: 'JPCLMOfClaimAssessmentController/saveEntry',
            target: 'saveClaimant',
            payload: {
              changedFields,
            },
          });
        }, 0);
      } else {
        dispatch({
          type: 'JPCLMOfClaimAssessmentController/saveFormData',
          target: 'saveClaimant',
          payload: {
            changedFields,
          },
        });
      }
    }
  },
  mapPropsToFields(props) {
    const { docReceiveDate, pendingConfirm } = props;

    return formUtils.mapObjectToFields(docReceiveDate, {
      firstFormReceiveDate: (value: Date) => (value ? moment(value) : null),
      lastFormReceiveDate: (value: Date) => (value ? moment(value) : null),
      firstMcReceiveDate: (value: Date) => (value && pendingConfirm ? moment(value) : null),
    });
  },
})(DocTypeInfo);

export default connect(({ JPCLMOfClaimAssessmentController, formCommonController }: any) => ({
  docReceiveDate: memoPick(
    get(JPCLMOfClaimAssessmentController, 'claimProcessData'),
    docReceiveDate
  ),
  validating: formCommonController.validating,
  pendingConfirm: JPCLMOfClaimAssessmentController.pendingConfirm,
}))(DocTypeInfoWrap);
