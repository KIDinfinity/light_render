import React, { Component } from 'react';
import { connect } from 'dva';
import lodash from 'lodash';
import { Card, Form } from 'antd';
import moment from 'moment';
import { formUtils, Validator } from 'basic/components/Form';
import { getMedicalProvider } from 'claim/pages/utils/claimUtils';
import FormLayout from 'basic/components/Form/FormLayout';
import FormItemDatePicker from 'basic/components/Form/FormItem/FormItemDatePicker';
import FormItemInput from 'basic/components/Form/FormItem/FormItemInput';
import FormItemNumber from 'basic/components/Form/FormItem/FormItemNumber';
import FormItemSelectPlus from 'basic/components/Form/FormItem/FormItemSelectPlus';
import ErrorTooltipManual from 'claim/components/ErrorTooltipManual';
import json from '../layout.json';

const fieldKeys = [
  'coverPageNo',
  'medicalProvider',
  'coverPageDate',
  'scanDate',
  'totalNoOfInvoice',
  'totalInvoiceAmount',
];

interface IProps {
  dispatch: Function;
  form: any;
  basicInforData: any;
  basicInforTip: string;
  taskNotEditable: boolean;
  caseCategory: string;
  assessmentDecision: any;
}

interface IState {
  formId: string;
}

@connect(({ IdentifyHospitalBatchController, claimEditable }: any) => ({
  basicInforData: lodash.get(IdentifyHospitalBatchController, 'claimProcessData.basicInforData'),
  basicInforTip: lodash.get(IdentifyHospitalBatchController, 'claimProcessData.basicInforTip'),
  caseCategory: lodash.get(IdentifyHospitalBatchController, 'claimProcessData.caseCategory'),
  taskNotEditable: claimEditable.taskNotEditable,
  invoiceInforData: lodash.get(
    IdentifyHospitalBatchController,
    'claimProcessData.invoiceInforData'
  ),
  assessmentDecision: lodash.get(IdentifyHospitalBatchController, "claimProcessData.claimDecision.assessmentDecision"),
}))
// @ts-ignore
@Form.create<IProps>({
  async onValuesChange(props: any, changedFields: any) {
    const { dispatch, basicInforData } = props;
    const key = lodash.chain(changedFields).keys().first().value();
    const isIncluded = lodash.includes(fieldKeys, key);
    if (isIncluded) {
      basicInforData[key] = changedFields[key];
      await dispatch({
        type: 'IdentifyHospitalBatchController/saveData',
        payload: {
          basicInforData,
        },
      });
    }
  },
  mapPropsToFields(props: IProps) {
    const { basicInforData } = props;
    return formUtils.mapObjectToFields(basicInforData, {
      coverPageDate: (value: any) => (value ? moment(value) : null),
      scanDate: (value: any) => (value ? moment(value) : null),
    });
  },
})
class BasicInformation extends Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      formId: 'BASICINFORMATIONFORM',
    };
  }

  componentDidMount() {
    const { dispatch, form } = this.props;
    const { formId } = this.state;
    dispatch({
      type: 'IdentifyHospitalBatchController/registerForm',
      payload: {
        form,
        formId,
      },
    });
    // dispatch({
    //   type: 'dictionaryController/medicalProviderDropdown',
    // });
  }

  componentWillUnmount = () => {
    const { dispatch, form } = this.props;
    const { formId } = this.state;
    dispatch({
      type: 'IdentifyHospitalBatchController/unRegisterForm',
      payload: {
        form,
        formId,
      },
    });
  };

  handleOnBlur = () => {
    const { dispatch }: any = this.props;
    dispatch({
      type: 'IdentifyHospitalBatchController/handleTotalInvoice',
      payload: {},
    });
  };

  render() {
    const { form, basicInforTip, taskNotEditable, caseCategory, assessmentDecision } = this.props;
    return (
      <Card
        title={
          <>
            Basic Information
            {basicInforTip && basicInforTip !== '' ? (
              <ErrorTooltipManual manualErrorMessage={basicInforTip} />
            ) : null}
          </>
        }
      >
        <Form layout="vertical">
          <FormLayout json={json}>
            <FormItemInput
              form={form}
              disabled={taskNotEditable}
              formName="coverPageNo"
              labelId="app.navigator.hospitalDetail.table-column.cover-page-no"
            />
            <FormItemInput form={form} disabled formName="status" labelId="batchStatus" />
          </FormLayout>
          <FormLayout json={json}>
            <FormItemSelectPlus
              form={form}
              required
              disabled={taskNotEditable}
              formName="medicalProvider"
              searchName="medicalProviderth"
              searchCustom={getMedicalProvider(caseCategory)}
              labelId="Hospital Name"
              optionShowType="both"
              name="fieldTwo"
              allowClear={false}
              rules={[
                {
                  validator: Validator.VLD_000271(
                    formUtils.queryValue(assessmentDecision)
                  ),
                },
              ]}
            />
            <FormItemInput
              form={form}
              disabled
              formName="hospitalName"
              labelId="OCR Hosipital Name"
            />
            <FormItemDatePicker
              form={form}
              disabled={taskNotEditable}
              formName="coverPageDate"
              format="L"
              labelId="Invoice Date"
            />
            <FormItemDatePicker
              form={form}
              disabled={taskNotEditable}
              formName="scanDate"
              format="L"
              labelId="Scan Date"
            />
            <FormItemNumber
              form={form}
              onBlur={this.handleOnBlur}
              disabled={taskNotEditable}
              formName="totalNoOfInvoice"
              labelId="Total Invoice"
              precision={0}
            />
            <FormItemInput form={form} disabled formName="noOfIpdInvoice" labelId="IPD Invoice" />
            <FormItemInput form={form} disabled formName="noOfOpdInvoice" labelId="OPD Invoice" />
            <FormItemInput form={form} disabled formName="noOfGebInvoice" labelId="GEB Invoice" />
            <FormItemNumber
              form={form}
              disabled={taskNotEditable}
              formName="totalInvoiceAmount"
              labelId="Total Invoice Amount"
            />
            <FormItemNumber
              form={form}
              disabled
              formName="ipdInvoiceAmount"
              labelId="Total IPD Amount"
            />
            <FormItemNumber
              form={form}
              disabled
              formName="opdInvoiceAmount"
              labelId="Total OPD Amount"
            />
            <FormItemNumber
              form={form}
              disabled
              formName="gebInvoiceAmount"
              labelId="Total GEB Amount"
            />
            <FormItemNumber
              form={form}
              disabled
              formName="totalFinalAmount"
              labelId="Final Invoice Amount"
            />
            <FormItemNumber
              form={form}
              disabled
              formName="finalIpdInvoiceAmount"
              labelId="Final IPD Invoice Amount"
            />
            <FormItemNumber
              form={form}
              disabled
              formName="finalOpdInvoiceAmount"
              labelId="Final OPD Invoice Amount"
            />
            <FormItemNumber
              form={form}
              disabled
              formName="finalGebInvoiceAmount"
              labelId="Final GEB Invoice Amount"
            />
          </FormLayout>
        </Form>
      </Card>
    );
  }
}

export default BasicInformation;
