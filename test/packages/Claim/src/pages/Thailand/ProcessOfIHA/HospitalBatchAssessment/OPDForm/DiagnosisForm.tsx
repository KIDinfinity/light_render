import React, { Component } from 'react';
import { connect } from 'dva';
import { Form } from 'antd';
import lodash from 'lodash';
import { formUtils } from 'basic/components/Form';
import CardOfClaim from 'basic/components/Form/FormCard';
import FormLayout from 'basic/components/Form/FormLayout';
import FormItemSelect from 'basic/components/Form/FormItem/FormItemSelect';
import FormItemSelectPlus from 'basic/components/Form/FormItem/FormItemSelectPlus';
import FormItemCheckbox from 'basic/components/Form/FormItem/FormItemCheckbox';
import OPDFormSection from './OPDFormSection';
import json from '../layout.json';
import { arrToObject, objectToKeyPath, fieldValue } from '../utils';

interface IProps {
  dispatch: Function;
  form: any;
  idx: number;
  disabled: boolean;
  diagnosisList: any[];
  diagnosisType: any;
  invoiceInforData: any;
}

// @ts-ignore
@connect(({ IdentifyHospitalBatchController }: any, { idx }: any) => ({
  invoiceInforSelRows: IdentifyHospitalBatchController?.claimProcessData?.invoiceInforSelRows,

  diagnosisList:
    IdentifyHospitalBatchController?.claimProcessData?.invoiceInforData?.[idx]?.registration
      ?.incidentList?.[0]?.diagnosisList || [],
  invoiceInforData:
    IdentifyHospitalBatchController?.claimProcessData?.invoiceInforData?.[idx] || {},
  diagnosisType: IdentifyHospitalBatchController?.claimProcessData?.diagnosisType,
}))
// @ts-ignore
@Form.create<IProps>({
  async onValuesChange(props: any, changedFields: any) {
    const { dispatch, idx } = props;
    const keyPath = objectToKeyPath(changedFields);
    await dispatch({
      type: 'IdentifyHospitalBatchController/changeData',
      payload: {
        key: `claimProcessData.invoiceInforData[${idx}].registration.incidentList[0].${keyPath}`,
        value: fieldValue(changedFields),
        idx,
      },
    });
  },
  mapPropsToFields(props: IProps) {
    const { diagnosisList } = props;
    const diagnosisListObj = arrToObject('diagnosisList', diagnosisList);
    return formUtils.mapObjectToFields(diagnosisListObj);
  },
})
class DiagnosisForm extends Component<IProps> {
  addDiagnosisItemFn = async () => {
    const { dispatch, idx } = this.props;
    await dispatch({
      type: 'IdentifyHospitalBatchController/addDiagnosisItem',
      payload: {
        idx,
      },
    });
  };

  delDiagnosisItemFn = async (itemIdx: number) => {
    const { dispatch, idx } = this.props;
    await dispatch({
      type: 'IdentifyHospitalBatchController/delDiagnosisItem',
      payload: {
        idx,
        itemIdx,
      },
    });
  };

  render() {
    const { form, disabled, diagnosisList, diagnosisType } = this.props;

    return (
      <OPDFormSection
        titleText={<>Diagnosis</>}
        buttonText="Diagnosis"
        disabled={disabled}
        buttonClickFn={this.addDiagnosisItemFn}
      >
        {lodash.map(diagnosisList, (_, idx) => (
          // @ts-ignore
          <CardOfClaim
            className="card"
            key={idx}
            showButton={!disabled && diagnosisList.length > 1}
            handleClick={() => this.delDiagnosisItemFn(idx)}
          >
            <Form layout="vertical">
              <FormLayout json={json}>
                <FormItemSelectPlus
                  form={form}
                  // required={isNeedValidate}
                  disabled={disabled}
                  formName={`diagnosisList_${idx}_diagnosisCode`}
                  searchName="diagnosis"
                  name="row12"
                  labelId="app.navigator.task-detail-of-data-capture.label.icd10-code-name"
                  dropdownCode="claim_dict004"
                  // @ts-ignore
                  allowClear={false}
                />
                <FormItemSelect
                  form={form}
                  disabled={disabled}
                  dicts={diagnosisType}
                  formName={`diagnosisList_${idx}_diagnosisType`}
                  labelId="Diagnosis Type"
                  allowClear={false}
                />
                <FormItemCheckbox
                  form={form}
                  disabled={disabled}
                  formName={`diagnosisList_${idx}_criticalIllness`}
                  labelId="Critical Illness Indicator"
                />
              </FormLayout>
            </Form>
          </CardOfClaim>
        ))}
      </OPDFormSection>
    );
  }
}

export default DiagnosisForm;
