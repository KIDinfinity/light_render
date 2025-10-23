import React, { PureComponent } from 'react';
import { connect } from 'dva';
import lodash from 'lodash';
import moment from 'moment';
import { Card, Form } from 'antd';

import { formatMessageApi } from '@/utils/dictFormatMessage';
import ButtonOfSmall from 'claim/components/ButtonOfSmall';
import FormLayout from 'basic/components/Form/FormLayout';
import {
  FormItemDatePicker,
  FormItemSelect,
  FormItemSelectPlus,
  formUtils,
} from 'basic/components/Form';
import styles from './TreatmentListItem.less';

const json = {
  fieldLayout: {
    xs: { span: 8 },
    sm: { span: 8 },
    md: { span: 8 },
    lg: { span: 8 },
  },
};

@connect(({ bpOfDataCaptureController, dictionaryController }: any, { treatmentId }: any) => ({
  treatmentItem: bpOfDataCaptureController.claimEntities.treatmentListMap[treatmentId],
  dictsOfTreatmentType: dictionaryController.TreatmentType,
}))
@Form.create({
  mapPropsToFields(props) {
    const { treatmentItem } = props;

    return formUtils.mapObjectToFields(treatmentItem, {
      treatmentType: (value) =>
        lodash.isString(value) && value.length > 0 ? value.split(',') : [],
      department: (value) => value,
      dateOfConsultation: (value) => (value ? moment(value) : null),
    });
  },
})
class TreatmentListItemOfShort extends PureComponent {
  render() {
    const { form, total, onOpen, dictsOfTreatmentType, treatmentItem } = this.props;

    return (
      <Card
        title={`${formatMessageApi({
          Label_BIZ_Claim: 'app.navigator.task-detail-of-data-capture.title.treatment',
        })} ${treatmentItem.treatmentNo}`}
        bordered={false}
        extra={
          <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
            <ButtonOfSmall icon="plus" handleClick={onOpen} />
            <span className={styles.currentNo}>
              {treatmentItem.treatmentNo}/{total}
            </span>
          </div>
        }
      >
        <Form layout="vertical">
          <FormLayout json={json}>
            <FormItemSelect
              form={form}
              disabled
              dicts={dictsOfTreatmentType}
              formName="treatmentType"
              labelId="app.navigator.task-detail-of-data-capture.label.treatment-type"
            />
            <FormItemSelectPlus
              form={form}
              disabled
              dropdownCode="misc_dict006"
              optionShowType="both"
              searchName="dictionary"
              formName="department"
              labelId="app.navigator.task-detail-of-data-capture.label.department-of-treatment"
            />
            <FormItemDatePicker
              form={form}
              disabled
              formName="dateOfConsultation"
              labelId="app.navigator.task-detail-of-data-capture.label.date-of-consultation"
            />
          </FormLayout>
        </Form>
      </Card>
    );
  }
}

export default TreatmentListItemOfShort;
