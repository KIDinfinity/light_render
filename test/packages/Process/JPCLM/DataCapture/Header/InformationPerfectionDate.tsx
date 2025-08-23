import React, { Component } from 'react';
import { connect } from 'dva';
import FormItemDatePicker from 'basic/components/Form/FormItem/FormItemDatePicker';
import FormSection from 'basic/components/Form/FormSection';
import { Form } from 'antd';
import { formUtils } from 'basic/components/Form';
import styled from './informationPerfectionDate.less';
import { tenant } from '@/components/Tenant';
import lodash from 'lodash';

class InformationPerfectionDate extends Component {
  componentDidMount = () => {
    this.initInformationPerfectionDate();
  };

  initInformationPerfectionDate = () => {
    const { dispatch, bpmSubmissionDate, informationPerfectionDate }: any = this.props;

    if (lodash.isEmpty(informationPerfectionDate)) {
      dispatch({
        type: 'JPCLMOfDataCapture/updateInformationPerfectionDate',
        payload: {
          bpmSubmissionDate,
        },
      });
    }
  };

  render() {
    const { form, taskNotEditable }: any = this.props;
    const inputLimitDate = tenant.getInputLimitDate();
    const allowFreeSelect = !lodash.isEmpty(inputLimitDate);
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
            disabled={taskNotEditable}
            labelId="DocCompletionDate"
            getCalendarContainer={() => document.body}
            allowFreeSelect={allowFreeSelect}
          />
        </FormSection>
      </div>
    );
  }
}

export default connect(({ claimEditable, formCommonController, JPCLMOfDataCapture }: any) => ({
  validating: formCommonController.validating,
  taskNotEditable: claimEditable.taskNotEditable,
  informationPerfectionDate: JPCLMOfDataCapture.claimProcessData.informationPerfectionDate,
}))(
  Form.create({
    onFieldsChange(props, changedFields: any) {
      const { dispatch, validating }: any = props;
      if (formUtils.shouldUpdateState(changedFields)) {
        if (validating) {
          setTimeout(() => {
            dispatch({
              type: 'JPCLMOfDataCapture/saveEntry',
              target: 'updateInformationPerfectionDate',
              payload: {
                changedFields,
              },
            });
          }, 0);
        } else {
          setTimeout(() => {
            dispatch({
              type: 'JPCLMOfDataCapture/saveFormData',
              target: 'updateInformationPerfectionDate',
              payload: {
                changedFields,
              },
            });
          }, 0);
        }
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
