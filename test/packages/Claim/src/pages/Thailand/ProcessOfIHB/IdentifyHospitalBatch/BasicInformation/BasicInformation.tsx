import React, { Component } from 'react';
import { connect } from 'dva';
import lodash from 'lodash';
import { Card, Form } from 'antd';
import moment from 'moment';
import { formUtils } from 'basic/components/Form';
import { getMedicalProvider } from 'claim/pages/utils/claimUtils';
import FormLayout from 'basic/components/Form/FormLayout';
import FormItemDatePicker from 'basic/components/Form/FormItem/FormItemDatePicker';
import FormItemInput from 'basic/components/Form/FormItem/FormItemInput';
import FormItemNumber from 'basic/components/Form/FormItem/FormItemNumber';
import FormItemSelectPlus from 'basic/components/Form/FormItem/FormItemSelectPlus';
import { VLD_000418, VLD_000195 } from 'claim/pages/validators/fieldValidators';
import { handleMessageModal } from '@/utils/commonMessage';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import json from '../layout.json';

interface IProps {
  dispatch: Function;
  form: any;
  basicInforData: any;
  taskNotEditable: boolean;
  caseCategory: string;
}

interface IState {
  formId: string;
}

@connect(({ IdentifyHospitalBatchController, claimEditable }: any) => ({
  basicInforData: lodash.get(IdentifyHospitalBatchController, 'claimProcessData.basicInforData'),
  caseCategory: lodash.get(IdentifyHospitalBatchController, 'claimProcessData.caseCategory'),
  taskNotEditable: claimEditable.taskNotEditable,
  invoiceInforData: lodash.get(
    IdentifyHospitalBatchController,
    'claimProcessData.invoiceInforData'
  ),
}))
// @ts-ignore
@Form.create<IProps>({
  async onFieldsChange(props: any, changedFields: any) {
    const { dispatch, basicInforData } = props;
    await dispatch({
      type: 'IdentifyHospitalBatchController/saveData',
      payload: {
        basicInforData: {
          ...basicInforData,
          ...changedFields,
        },
      },
    });
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

  handleOnBlur = async (e: any) => {
    const { dispatch }: any = this.props;

    if (Number(e.target.value) > 500) {
      handleMessageModal([
        {
          content: formatMessageApi({ Label_COM_ErrorMessage: 'MSG_001029' }, 'Total Invoice', 500),
        },
      ]);
    } else {
      dispatch({
        type: 'IdentifyHospitalBatchController/handleTotalInvoice',
        payload: {},
      });
    }
  };

  render() {
    const { form, taskNotEditable, caseCategory } = this.props;
    return (
      <Card title={<>Basic Information</>}>
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
              rules={[
                {
                  validator: VLD_000195({
                    noOfIpdInvoice: form.getFieldValue('noOfIpdInvoice'),
                    noOfOpdInvoice: form.getFieldValue('noOfOpdInvoice'),
                    noOfGebInvoice: form.getFieldValue('noOfGebInvoice'),
                  }),
                },
              ]}
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
              rules={[
                {
                  validator: VLD_000418({
                    ipdInvoiceAmount: form.getFieldValue('ipdInvoiceAmount'),
                    opdInvoiceAmount: form.getFieldValue('opdInvoiceAmount'),
                    gebInvoiceAmount: form.getFieldValue('gebInvoiceAmount'),
                  }),
                },
              ]}
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
