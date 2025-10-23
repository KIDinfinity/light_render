import React from 'react';
import { connect } from 'dva';
import { Form } from 'antd';
import moment from 'moment';
import { formUtils } from 'basic/components/Form';
import FormLayout from 'basic/components/Form/FormLayout';
import FormItemInput from 'basic/components/Form/FormItem/FormItemInput';
import FormItemSelectPlus from 'basic/components/Form/FormItem/FormItemSelectPlus';
import FormItemSelect from 'basic/components/Form/FormItem/FormItemSelect';

import { incidentInfolayout as json } from './FormLayout.json';

import styles from './styles.less';

const IncidentInfo = ({ form, dictsOfCauseOfIncident }: any) => {
  return (
    <Form layout="vertical" className={styles.incidentInfo}>
      <FormLayout json={json}>
        <FormItemInput
          form={form}
          disabled
          formName="incidentDate"
          labelId="app.navigator.task-detail-of-claim-assessment.label.date-of-incident"
        />
        <FormItemSelect
          form={form}
          disabled
          dicts={dictsOfCauseOfIncident}
          formName="causeOfIncident"
          labelId="app.navigator.task-detail-of-data-capture.label.case-of-incident"
        />
        <FormItemSelectPlus
          form={form}
          disabled
          searchName="diagnosis"
          dropdownCode="claim_dict004"
          optionShowType="both"
          formName="diagnosisCode"
          labelId="app.navigator.task-detail-of-data-capture.label.diagnosis-code-name"
        />
      </FormLayout>
    </Form>
  );
};

const FormWrap = Form.create({
  mapPropsToFields(props) {
    const { incident }: any = props;

    return formUtils.mapObjectToFields(incident, {
      incidentDate: (value: string) => value && moment(value).format('L'),
    });
  },
})(IncidentInfo);

export default connect(({ dictionaryController }: any) => ({
  dictsOfCauseOfIncident: dictionaryController.CauseOfIncident,
}))(FormWrap);
