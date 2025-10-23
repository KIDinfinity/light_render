import React, { Component } from 'react';
import { connect } from 'dva';
import FormItemDatePicker from 'basic/components/Form/FormItem/FormItemDatePicker';
import FormSection from 'basic/components/Form/FormSection';
import { Form } from 'antd';
import { NAMESPACE } from 'opus/Pages/Process/Claim/NonOpusSupportedClaim/activity.config';
import { formUtils } from 'basic/components/Form';
import { shouldUpdateState } from 'claim/pages/utils/formUtils';
import styled from './informationPerfectionDate.less';
import moment from 'moment';
import { tenant } from '@/components/Tenant';
import lodash from 'lodash';
const FORMID = 'assessmentInformationPerfectionDate';

class InformationPerfectionDate extends Component {
  componentDidMount = () => {
    this.registeForm();
  };

  componentWillUnmount = () => {
    this.unRegisterForm();
  };

  registeForm = () => {
    const { dispatch, form }: any = this.props;

    dispatch({
      type: 'formCommonController/registerForm',
      payload: {
        form,
        formId: FORMID,
      },
    });
  };

  unRegisterForm = () => {
    const { dispatch, form }: any = this.props;

    dispatch({
      type: 'formCommonController/unRegisterForm',
      payload: {
        form,
        formId: FORMID,
      },
    });
  };

  render() {
    const { form, taskNotEditable, dispatch, claimTypeArray, policySource }: any = this.props;
    const inputLimitDate = tenant.getInputLimitDate();
    const allowFreeSelect = !lodash.isEmpty(inputLimitDate);

    const require =
      policySource === 'lifej' && formUtils.queryValue(claimTypeArray)?.includes('WOP');

    return (
      <div className={styled.informationPerfectionDate}>
        <FormSection
          form={form}
          formId="DataCapture_InformationPerfectionDate"
          isMargin={false}
          isPadding={false}
          title=""
          isHideBgColor
          layConf={24}
        >
          <FormItemDatePicker
            form={form}
            formName="informationPerfectionDate"
            disabled={taskNotEditable || !require}
            labelId="DocCompletionDate"
            required={require}
            getCalendarContainer={() => document.body}
            allowFreeSelect={allowFreeSelect}
            onChange={(value: any) => {
              const oldValue = moment(form.getFieldValue('informationPerfectionDate')).format(
                'YYYY/MM/DD'
              );
              if (oldValue !== moment(value).format('YYYY/MM/DD')) {
                dispatch({
                  type: `${NAMESPACE}/syncFieldData`,
                  payload: {
                    informationPerfectionDate: value,
                  },
                });
              }
            }}
          />
        </FormSection>
      </div>
    );
  }
}

export default connect(
  ({ claimEditable, formCommonController, [NAMESPACE]: modelnamepsace }: any) => ({
    validating: formCommonController.validating,
    taskNotEditable: claimEditable.taskNotEditable,
    informationPerfectionDate: modelnamepsace.businessData.informationPerfectionDate,
    policySource: modelnamepsace.businessData?.insured?.policySource,
    claimTypeArray: modelnamepsace?.businessData?.incidentList?.[0]?.claimTypeArray || [],
  })
)(
  Form.create({
    onFieldsChange(props, changedFields: any) {
      const { dispatch, validating }: any = props;
      if (shouldUpdateState(validating, changedFields)) {
        setTimeout(() => {
          dispatch({
            type: `${NAMESPACE}/saveFormData`,
            target: 'updateInformationPerfectionDate',
            payload: {
              changedFields,
            },
          });
        }, 0);
      }
    },
    mapPropsToFields(props) {
      const { informationPerfectionDate }: any = props;

      return formUtils.mapObjectToFields({
        informationPerfectionDate,
      });
    },
  })(InformationPerfectionDate)
);
