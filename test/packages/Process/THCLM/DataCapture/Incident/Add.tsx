import React, { useEffect } from 'react';
import { NAMESPACE } from '../activity.config';

import { connect, useSelector } from 'dva';
import { Form } from 'antd';
import { formUtils, FormAntCard } from 'basic/components/Form';
import lodash from 'lodash';
import {v4 as uuidv4 } from 'uuid';
import classNames from 'classnames';
import { INCIDENTITEM } from '@/utils/claimConstant';
import Section, { AddFields as Fields, SectionTitle } from './Section';
import styles from './Header.less';

const Add = ({ form }: any) => {
  const editable = !useSelector(({ claimEditable }: any) => claimEditable.taskNotEditable);
  const incidentList = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace.claimProcessData?.incidentList
  );
  useEffect(() => {
    form.resetFields();
  }, [form]);

  const incidentNo = (incidentList?.length || 0) + 1;
  return (
    <FormAntCard>
      <div className={classNames(styles.header, styles.add)}>
        <div className={styles.title}>
          <SectionTitle suffix={` No. ${incidentNo}`} />
        </div>
        <div className={classNames(styles.section, styles.incidentAdd)}>
          <Section form={form} editable={editable} section="Incident.Add" register={false}>
            <Fields.ClaimTypeArray />
          </Section>
        </div>
      </div>
    </FormAntCard>
  );
};

export default connect(({ [NAMESPACE]: modelnamepsace }: any) => ({
  claimNo: modelnamepsace.claimProcessData?.claimNo,
  incidentList: modelnamepsace.claimProcessData?.incidentList,
}))(
  Form.create<any>({
    onValuesChange: (props: any, changedValues: any) => {
      const { dispatch, claimNo }: any = props;
      const incidentId = uuidv4();
      // 新增一条incident数据
      dispatch({
        type: `${NAMESPACE}/addIncidentItem`,
        payload: {
          incidentItem: {
            ...INCIDENTITEM,
            claimNo,
            diagnosisList: [],
            id: incidentId,
            incidentNo: 1,
            isManualAdd: true,
            ...changedValues,
          },
        },
      });

      // 新增一条treatment数据
      const { claimTypeArray } = changedValues;
      if (
        lodash.isArray(claimTypeArray) &&
        claimTypeArray.length === 1 &&
        ['OP', 'IP'].includes(claimTypeArray[0])
      ) {
        dispatch({
          type: `${NAMESPACE}/addTreatmentItem`,
          payload: {
            incidentId,
            claimNo,
            treatmentType: claimTypeArray[0],
          },
        });
      }
    },

    mapPropsToFields() {
      return formUtils.mapObjectToFields({});
    },
  })(Add)
);
