import React, { Component } from 'react';
import { connect } from 'dva';
import { Form } from 'antd';
import lodash from 'lodash';
import { formUtils } from 'basic/components/Form';
import CardOfClaim from 'basic/components/Form/FormCard';
import FormLayout from 'basic/components/Form/FormLayout';
import FormItemInput from 'basic/components/Form/FormItem/FormItemInput';
import FormItemSelect from 'basic/components/Form/FormItem/FormItemSelect';
import OPDFormSection from './OPDFormSection';
import { arrToObject, objectToKeyPath, fieldValue } from '../utils';
import json from '../layout.json';

interface IProps {
  dispatch: Function;
  form: any;
  idx: number;
  disabled: boolean;
  invoiceInforSelRows: any[];
  mainBenefitList: any[];
  mainBenefit: any;
}

// @ts-ignore
@connect(({ IdentifyHospitalBatchController }: any, { idx }: any) => ({
  invoiceInforSelRows: IdentifyHospitalBatchController?.claimProcessData?.invoiceInforSelRows,
  mainBenefitList:
    IdentifyHospitalBatchController?.claimProcessData?.invoiceInforData?.[idx]?.registration
      ?.incidentList?.[0]?.treatmentList?.[0]?.mainBenefitList || [],
  mainBenefit: IdentifyHospitalBatchController?.claimProcessData?.mainBenefit,
}))
// @ts-ignore
@Form.create<IProps>({
  async onValuesChange(props: any, changedFields: any) {
    const { dispatch, idx } = props;
    const keyPath = objectToKeyPath(changedFields);
    await dispatch({
      type: 'IdentifyHospitalBatchController/changeData',
      payload: {
        key: `claimProcessData.invoiceInforData[${idx}].registration.incidentList[0].treatmentList[0].${keyPath}`,
        value: fieldValue(changedFields),
        idx,
      },
    });
  },
  mapPropsToFields(props: IProps) {
    const { mainBenefitList } = props;
    const mainBenefitListObj = arrToObject('mainBenefitList', mainBenefitList);
    return formUtils.mapObjectToFields(mainBenefitListObj);
  },
})
class MainBenefitForm extends Component<IProps, any> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      formId: 'MAINBENEFITFORM',
    };
  }

  addMainBenefitItemFn = async () => {
    const { dispatch, idx } = this.props;
    await dispatch({
      type: 'IdentifyHospitalBatchController/addMainBenefitItem',
      payload: {
        idx,
      },
    });
  };

  delMainBenefitItemFn = async (itemIdx: number) => {
    const { dispatch, idx } = this.props;
    await dispatch({
      type: 'IdentifyHospitalBatchController/delMainBenefitItem',
      payload: {
        idx,
        itemIdx,
      },
    });
  };

  render() {
    const { form, disabled, mainBenefitList, mainBenefit } = this.props;

    return (
      <OPDFormSection
        titleText="Main Benefit"
        buttonText="Main Benefit"
        disabled={disabled}
        buttonClickFn={this.addMainBenefitItemFn}
      >
        {lodash.map(mainBenefitList, (_, idx) => (
          //@ts-ignore
          <CardOfClaim
            className="card"
            key={idx}
            showButton={!disabled && mainBenefitList.length > 1}
            handleClick={() => this.delMainBenefitItemFn(idx)}
          >
            <Form layout="vertical">
              <FormLayout json={json}>
                <FormItemSelect
                  form={form}
                  disabled={disabled}
                  dicts={mainBenefit}
                  formName={`mainBenefitList_${idx}_mainBenefit`}
                  name="row12"
                  labelId="Main Benefit"
                  allowClear={false}
                />
                <FormItemInput
                  form={form}
                  disabled={disabled}
                  formName={`mainBenefitList_${idx}_doctor`}
                  name="row12"
                  labelId="Name of Doctor"
                  maxLength={60}
                />
              </FormLayout>
            </Form>
          </CardOfClaim>
        ))}
      </OPDFormSection>
    );
  }
}

export default MainBenefitForm;
