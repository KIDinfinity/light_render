import React, { Component } from 'react';
import { connect } from 'dva';
import lodash from 'lodash';
import { Card, Form } from 'antd';
import moment from 'moment';
import { formUtils, Validator } from 'basic/components/Form';
import FormLayout from 'basic/components/Form/FormLayout';
import FormItemDatePicker from 'basic/components/Form/FormItem/FormItemDatePicker';
import FormItemInput from 'basic/components/Form/FormItem/FormItemInput';
import FormItemNumber from 'basic/components/Form/FormItem/FormItemNumber';
import { getMedicalProvider } from 'claim/pages/utils/claimUtils';
import FormItemSelectPlus from 'basic/components/Form/FormItem/FormItemSelectPlus';
import json from '../FormLayout.json';
import styles from './BasicInformation.less';

const FORMID = 'basicInformation';

interface IProps {
  dispatch: Function;
  form: any;
  basicInforData: any;
  basicInforTip: string;
  taskNotEditable: boolean;
}

interface IState {
  formId: string;
}

@connect(({ dictionaryController, loading, daProcessController, formCommonController }: any) => ({
  basicInformation: lodash.get(daProcessController, 'claimProcessData.hospitalBillCoverPage'),
  caseCategory: lodash.get(daProcessController, 'claimProcessData.caseCategory'),
  validating: formCommonController.validating,
}))
// @ts-ignore
@Form.create<IProps>({
  onFieldsChange(props, changedFields) {
    const { dispatch, validating } = props;
    if (!formUtils.shouldUpdateState(changedFields)) return;
    dispatch({
      type: 'daProcessController/saveBasicInformation',
      payload: {
        changedFields,
      },
    });
  },
  mapPropsToFields(props) {
    const { basicInformation } = props;
    return formUtils.mapObjectToFields(basicInformation, {
      coverPageNo: (value: string | object) => value,
      medicalProvider: (value: string | object) => value,
      coverPageDate: (value: string | object) => value,
      scanDate: (value: any) => (value ? moment(value) : null),
      totalCase: (value: string | object) => value,
      totalAmount: (value: string | object) => value,
    });
  },
})
class BasicInformation extends Component<IProps> {
  componentDidMount = () => {
    this.registeForm();
  };

  componentWillUnmount = () => {
    this.unRegisterForm();
  };

  registeForm = () => {
    const { dispatch, form } = this.props;

    (dispatch as Dispatch)({
      type: 'formCommonController/registerForm',
      payload: {
        form,
        formId: FORMID,
      },
    });
  };

  unRegisterForm = () => {
    const { dispatch, form } = this.props;

    (dispatch as Dispatch)({
      type: 'formCommonController/unRegisterForm',
      payload: {
        form,
        formId: FORMID,
      },
    });
  };

  render() {
    const { form, caseCategory } = this.props;

    return (
      <div className={styles.basicInfo}>
        <Card title="Basic Information">
          <Form layout="vertical">
            <FormLayout json={json}>
              <FormItemInput
                form={form}
                required
                formName="coverPageNo"
                labelId="app.navigator.hospitalDetail.table-column.cover-page-no"
              />
            </FormLayout>
            <FormLayout json={json}>
              <FormItemSelectPlus
                form={form}
                required
                formName="medicalProvider"
                searchName="medicalProviderth"
                searchCustom={getMedicalProvider(formUtils.queryValue(caseCategory))}
                labelId="Hospital Name"
                dropdownCode="claim_dict005"
                optionShowType="both"
                name="fieldTwo"
                allowClear={false}
              />
              <FormItemDatePicker
                form={form}
                required
                formName="coverPageDate"
                format="L"
                labelId="Invoice Date"
              />
              <FormItemDatePicker
                form={form}
                required
                formName="scanDate"
                format="L"
                labelId="Create Date"
              />
              <FormItemNumber
                form={form}
                required
                formName="totalCase"
                labelId="Total Invoice"
                precision={0}
                rules={[
                  {
                    validator: Validator.VLD_000976('Total Invoice', 500),
                  },
                ]}
              />
              <FormItemNumber
                form={form}
                required
                formName="totalAmount"
                labelId="Total Invoice Amount"
              />
            </FormLayout>
          </Form>
        </Card>
      </div>
    );
  }
}

export default BasicInformation;
