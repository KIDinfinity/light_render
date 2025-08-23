import React from 'react';
import { useSelector, useDispatch } from 'dva';
import { Form } from 'antd';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import { formUtils, FormAntCard } from 'basic/components/Form';
import ButtonOfSmall from 'claim/components/ButtonOfSmall';
import Section, { ShortFields } from './Section';
import styles from './Item.less';

interface IProps {
  form?: any;
  incidentId?: string;
  incidentItem: any;
  total: number;
}

const Short = ({ form, incidentId, incidentItem, total }: IProps) => {
  const dispatch = useDispatch();

  const editable = !useSelector(({ claimEditable }: any) => claimEditable.taskNotEditable);

  const onOpen = () => {
    dispatch({
      type: 'JPCLMOfDataCapture/setIncidentItemExpandStatus',
      payload: {
        id: incidentId,
        status: true,
      },
    });
  };

  return (
    <FormAntCard
      title={`${formatMessageApi({
        Label_BIZ_Claim: 'app.navigator.task-detail-of-data-capture.title.incident',
      })} No. ${incidentItem.incidentNo}`}
      bordered={false}
      extra={
        <div className={styles.cardExtra}>
          <ButtonOfSmall icon="plus" handleClick={onOpen} />
          <span className={styles.currentNo}>
            {incidentItem.incidentNo}/{total}
          </span>
        </div>
      }
    >
      <Section form={form} editable={editable} section="incident.short">
        <ShortFields.ClaimTypeArray />
        <ShortFields.CauseOfIncident />
        <ShortFields.IncidentDate />
      </Section>
    </FormAntCard>
  );
};

export default Form.create<any>({
  mapPropsToFields(props: any) {
    return formUtils.mapObjectToFields(props?.incidentItem);
  },
})(Short);
