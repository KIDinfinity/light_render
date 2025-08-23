import React from 'react';
import { connect } from 'dva';
import { Form } from 'antd';
import { tenant, Region } from '@/components/Tenant';
import { formUtils } from 'basic/components/Form';
import FormLayout from 'basic/components/Form/FormLayout';
import FormItemInput from 'basic/components/Form/FormItem/FormItemInput';
import FormItemSelect from 'basic/components/Form/FormItem/FormItemSelect';
import FormItemSelectPlus from 'basic/components/Form/FormItem/FormItemSelectPlus';
import { incidentInfolayout as json } from './FormLayout.json';
import styles from './styles.less';

const TreatmentInfo = ({ form, dictsOfTreatmentType }: any) => {
  return (
    <Form layout="vertical" className={styles.treatmentInfo}>
      <FormLayout json={json}>
        <FormItemSelect
          form={form}
          disabled
          formName="treatmentType"
          labelId="app.navigator.task-detail-of-data-capture.label.treatment-type"
          dicts={dictsOfTreatmentType}
        />
        <FormItemInput form={form} disabled formName="admissionPeriod" labelId="AdmissionPeriod" />
        <FormItemInput
          form={form}
          disabled
          formName="dateOfConsultation"
          labelId="app.navigator.task-detail-of-data-capture.label.date-of-consultation"
        />
        <FormItemSelectPlus
          form={form}
          disabled
          formName="medicalProvider"
          searchName="medicalProvider"
          labelId="app.navigator.task-detail-of-data-capture.label.medical-provider"
          dropdownCode="claim_dict005"
          optionShowType="both"
        />
        {tenant.remoteRegion() === Region.HK && (
          <FormItemInput
            form={form}
            disabled
            formName="operationDate"
            labelId="app.navigator.task-detail-of-data-capture.label.date-of-operation"
          />
        )}
      </FormLayout>
    </Form>
  );
};

const FormWrap = Form.create({
  mapPropsToFields(props) {
    const { treatment }: any = props;

    return formUtils.mapObjectToFields(treatment);
  },
})(TreatmentInfo);

export default connect(({ dictionaryController }: any) => ({
  dictsOfTreatmentType: dictionaryController.TreatmentType,
}))(FormWrap);
