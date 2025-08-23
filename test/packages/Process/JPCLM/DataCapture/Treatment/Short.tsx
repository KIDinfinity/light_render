import React from 'react';
import { connect, useSelector } from 'dva';
import { Form } from 'antd';
import { formUtils, FormAntCard } from 'basic/components/Form';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import ButtonOfSmall from 'claim/components/ButtonOfSmall';
import Section, { ShortFields } from './Section';
import styles from './Item.less';

const TreatmentShort = ({ form, total, onOpen, treatmentItem }: any) => {
  const editable = !useSelector(({ claimEditable }: any) => claimEditable.taskNotEditable);

  return (
    <FormAntCard
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
      <Section form={form} editable={editable} section="treatment.short">
        <ShortFields.TreatmentType />
        <ShortFields.Department />
        <ShortFields.DateOfConsultation />
      </Section>
    </FormAntCard>
  );
};

export default connect(({ JPCLMOfDataCapture }: any, { treatmentId }: any) => ({
  treatmentItem: JPCLMOfDataCapture.claimEntities.treatmentListMap[treatmentId],
}))(
  Form.create<any>({
    mapPropsToFields(props: any) {
      return formUtils.mapObjectToFields(props.treatmentItem);
    },
  })(TreatmentShort)
);
