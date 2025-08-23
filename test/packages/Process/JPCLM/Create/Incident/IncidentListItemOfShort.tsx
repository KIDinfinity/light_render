import React, { PureComponent } from 'react';
import { connect } from 'dva';
import moment from 'moment';
import { Card, Form } from 'antd';
import { formUtils } from 'basic/components/Form';
import type { FormComponentProps } from 'antd/lib/form';
import ButtonOfSmall from 'claim/components/ButtonOfSmall';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import FormLayout from 'basic/components/Form/FormLayout';
import FormItemDatePicker from 'basic/components/Form/FormItem/FormItemDatePicker';
import FormItemSelect from 'basic/components/Form/FormItem/FormItemSelect';
import styles from './IncidentListItem.less';
import { incidentListItemOfShortLayout as json } from '../FormLayout.json';

interface IProps {
  total: number;
  incidentId: string;
  form?: any;
}

@connect(({ JPCLMProcessCreate, dictionaryController }: any) => ({
  dictsOfClaimType: dictionaryController.ClaimType,
  dictsOfCauseOfIncident: dictionaryController.CauseOfIncident,
}))
// @ts-ignore
@Form.create<FormComponentProps>({
  mapPropsToFields(props) {
    const { incidentItem }: any = props;
    return formUtils.mapObjectToFields(incidentItem, {
      claimTypeArray: (value: any) => (value === null ? [] : value),
      causeOfIncident: (value: any) => value,
      incidentDate: (value: any) => (value ? moment(value) : null),
    });
  },
})
class IncidentListItemOfShort extends PureComponent<IProps> {
  onOpen = () => {
    const { dispatch, incidentId }: any = this.props;

    dispatch({
      type: 'JPCLMProcessCreate/setIncidentItemExpandStatus',
      payload: {
        id: incidentId,
        status: true,
      },
    });
  };

  render() {
    const { form, total, incidentItem, dictsOfClaimType, dictsOfCauseOfIncident }: any = this.props;

    return (
      <Card
        title={`${formatMessageApi({
          Label_BIZ_Claim: 'app.navigator.task-detail-of-data-capture.title.incident',
        })} No. ${incidentItem.incidentNo}`}
        bordered={false}
        extra={
          <div className={styles.cardExtra}>
            <ButtonOfSmall icon="plus" handleClick={this.onOpen} />
            <span className={styles.currentNo}>
              {incidentItem.incidentNo}/{total}
            </span>
          </div>
        }
      >
        <Form layout="vertical">
          <FormLayout json={json}>
            <FormItemSelect
              form={form}
              mode="multiple"
              disabled
              dicts={dictsOfClaimType}
              formName="claimTypeArray"
              labelId="app.navigator.task-detail-of-claim-assessment.label.claim-type"
            />
            <FormItemSelect
              form={form}
              disabled
              dicts={dictsOfCauseOfIncident}
              formName="causeOfIncident"
              labelId="app.navigator.task-detail-of-data-capture.label.case-of-incident"
            />
            <FormItemDatePicker
              form={form}
              disabled
              formName="incidentDate"
              labelId="app.navigator.task-detail-of-claim-assessment.label.date-of-incident"
            />
          </FormLayout>
        </Form>
      </Card>
    );
  }
}

export default IncidentListItemOfShort;
