import React, { Component } from 'react';
import { connect } from 'dva';
import { Row, Col, Form } from 'antd';
import { formUtils } from 'basic/components/Form';
import FormLayout from 'basic/components/Form/FormLayout';
import { FormItemSelect, FormItemInput, FormItemCheckbox } from 'basic/components/Form/FormItem';
import { keys } from 'lodash';
import DiagnosisForm from './DiagnosisForm';
import MainBenefitForm from './MainBenefitForm';
import { fieldValue } from '../utils';
import { InvoiceType } from '../Enum';
import styles from './index.less';

interface IProps {
  dispatch: Function;
  form: any;
  idx: number;
  isShowMore: boolean;
  disabled: boolean;
  causeOfIncident: string;
  causeOfIncidentList: any[];
  invoiceInforData: any;
  type: string;
  remark: any;
  needAssessment: any;
}

// @ts-ignore
@connect(({ IdentifyHospitalBatchController }: any, { idx }: { idx: string | number }) => ({
  causeOfIncident:
    IdentifyHospitalBatchController?.claimProcessData?.invoiceInforData?.[idx]?.registration
      ?.incidentList?.[0]?.causeOfIncident,
  remark: IdentifyHospitalBatchController?.claimProcessData?.invoiceInforData?.[idx]?.remark,
  needAssessment: IdentifyHospitalBatchController?.claimProcessData?.invoiceInforData?.[idx]?.needAssessment,
  causeOfIncidentList: IdentifyHospitalBatchController?.claimProcessData?.causeOfIncident,
  invoiceInforData: IdentifyHospitalBatchController?.claimProcessData?.invoiceInforData[idx] || {},
}))
// @ts-ignore
@Form.create<IProps>({
  async onFieldsChange(props: any, changedFields: any) {
    const { dispatch, idx } = props;
    const key = keys(changedFields)?.[0];
    await dispatch({
      type: 'IdentifyHospitalBatchController/changeData',
      payload: {
        key: `claimProcessData.invoiceInforData[${idx}].registration.incidentList[0].${key}`,
        value: fieldValue(changedFields),
        idx,
        isRemark: key !== 'causeOfIncident',
        changedFields,
      },
    });
  },
  mapPropsToFields(props: IProps) {
    const { causeOfIncident, remark, needAssessment } = props;
    return formUtils.mapObjectToFields({ causeOfIncident, remark, needAssessment });
  },
})
class OPDForm extends Component<IProps, IState> {
  render() {
    const {
      form,
      idx,
      isShowMore,
      disabled,
      causeOfIncidentList,
      // invoiceInforData,
      type,
      needAssessment
    } = this.props;
    // const matchResult = invoiceInforData?.matchResult;
    const isOPD = type === InvoiceType.OPD;
    return (
      <Row
        className={styles.opdForm + (isShowMore ? '' : ` ${styles.hideView}`)}
        type="flex"
        gutter={16}
      >
        <Col span={24}>
          <Form layout="vertical">
            <FormLayout layConf={{ default: 6, remark: 21, needAssessment: 3 }}>
              <FormItemCheckbox
                form={form}
                name="needAssessment"
                formName="needAssessment"
                labelId="NeedAssessment"
              />
              <FormItemInput
                form={form}
                maxLength={250}
                name="remark"
                required={fieldValue(needAssessment)}
                formName="remark"
                labelId="Remark"
              />
              {isOPD && (
                <FormItemSelect
                  form={form}
                  disabled={disabled}
                  dicts={causeOfIncidentList}
                  // required={isNeedValidate}
                  formName="causeOfIncident"
                  labelId="Cause of Incident"
                  allowClear={false}
                />
              )}
            </FormLayout>
          </Form>
        </Col>
        {isOPD && (
          <>
            <Col span={14}>
              {/**
              @ts-ignore */}
              <DiagnosisForm idx={idx} disabled={disabled} />
            </Col>
            <Col span={10}>
              {/**
              @ts-ignore */}
              <MainBenefitForm idx={idx} disabled={disabled} />
            </Col>
          </>
        )}
      </Row>
    );
  }
}

export default OPDForm;
