import React, { useEffect } from 'react';
import { connect, useSelector } from 'dva';
import { Form } from 'antd';
import lodash from 'lodash';
import { formUtils, FormAntCard } from 'basic/components/Form';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import Section, { AddFields } from './Section';
import styles from './Item.less';

const Add = ({ form }: any) => {
  const editable = !useSelector(({ claimEditable }: any) => claimEditable.taskNotEditable);

  const incidentListMap = useSelector(
    ({ JPCLMOfDataCapture }: any) => JPCLMOfDataCapture.claimEntities?.incidentListMap
  );

  useEffect(() => {
    form.resetFields();
  }, [form]);

  return (
    <div className={styles.incidentItem}>
      <FormAntCard>
        <div className={styles.add}>
          <div className={styles.title}>
            {`${formatMessageApi({
              Label_BIZ_Claim: 'app.navigator.task-detail-of-data-capture.title.incident',
            })} No. ${lodash.size(incidentListMap) + 1}`}
          </div>
          <div className={styles.claimTypeArrayAdd}>
            <Section form={form} editable={editable} section="incident.Add" register={false}>
              <AddFields.ClaimTypeArrayAdd />
            </Section>
          </div>
        </div>
      </FormAntCard>
    </div>
  );
};

export default connect()(
  Form.create<any>({
    onValuesChange: (props: any, changedValues: any) => {
      const { dispatch }: any = props;
      dispatch({
        type: 'JPCLMOfDataCapture/incidentAdd',
        payload: {
          changedValues,
        },
      });
    },
    mapPropsToFields() {
      return formUtils.mapObjectToFields({});
    },
  })(Add)
);
