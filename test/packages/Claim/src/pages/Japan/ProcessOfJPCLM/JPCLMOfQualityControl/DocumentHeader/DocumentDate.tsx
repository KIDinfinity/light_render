import React, { Component } from 'react';
import { connect } from 'dva';
import { Form } from 'antd';
import moment from 'moment';
import type { Dispatch } from 'redux';
import { formUtils } from 'basic/components/Form';
import lodash from 'lodash';
import FormSection, { FormItemDatePicker } from 'basic/components/Form/FormSection';
import styles from './index.less';
import Layout from './Layout';

interface IProps {
  dispatch: Dispatch;
  applicationItem: any;
  form?: any;
  applicationNo: string;
}

class DocumentDate extends Component<IProps> {
  render() {
    const { form, applicationNo } = this.props;
    return (
      <div className={styles.documentDate}>
        <FormSection
          form={form}
          formId={`DocumentDate_${applicationNo}`}
          layout={Layout}
          isMargin={false}
          isHideBgColor
        >
          {/* 書類受付日 */}
          <FormItemDatePicker
            form={form}
            disabled
            required
            formName="firstFormReceiveDate"
            labelId="venus_claim.label.arrivalDate"
            format="L"
          />
          {/* 書類完備日 */}
          <FormItemDatePicker
            form={form}
            disabled
            required
            formName="lastFormReceiveDate"
            labelId="venus_claim.label.informationPerfectionDate"
            format="L"
          />
          {/* <FormItemDatePicker
            form={form}
            disabled
            required
            formName="firstMcReceiveDate"
            labelId="venus_claim.label.certificateDate"
            format="L"
          /> */}
        </FormSection>
      </div>
    );
  }
}

export default connect(
  ({ JPCLMOfQualityController, formCommonController }: any, { applicationNo }: any) => ({
    applicationItem: lodash.get(
      JPCLMOfQualityController,
      `claimProcessData.claimEntities.claimApplicationDocList.${applicationNo}`,
      {}
    ),
    validating: formCommonController.validating,
  })
)(
  Form.create({
    onFieldsChange(props: any, changedFields: any) {
      const { dispatch, applicationNo, validating } = props;
      // @ts-ignore
      const finalChangedFields = formUtils.onFieldsChangeOfDate(changedFields, [
        'firstFormReceiveDate',
        'lastFormReceiveDate',
        'firstMcReceiveDate',
      ]);
      if (formUtils.shouldUpdateState(changedFields)) {
        if (validating) {
          setTimeout(() => {
            dispatch({
              type: 'JPCLMOfQualityController/saveFormDataEntry',
              target: 'JPCLMOfQualityController/saveReceiveDate',
              payload: {
                changedFields: finalChangedFields,
                applicationNo,
              },
            });
          }, 0);
        } else {
          dispatch({
            type: 'JPCLMOfQualityController/saveReceiveDate',
            payload: {
              changedFields: finalChangedFields,
              applicationNo,
            },
          });
        }
      }
    },
    mapPropsToFields(props: any) {
      return formUtils.mapObjectToFields(props.applicationItem, {
        // @ts-ignore
        firstFormReceiveDate: (value: any) => (value ? moment(value) : null),
        lastFormReceiveDate: (value: any) => (value ? moment(value) : null),
        firstMcReceiveDate: (value: any) => (value ? moment(value) : null),
      });
    },
  })(DocumentDate)
);
