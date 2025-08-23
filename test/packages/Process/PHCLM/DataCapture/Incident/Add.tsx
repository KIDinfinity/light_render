import React, { useEffect } from 'react';
import { NAMESPACE } from '../activity.config';

import { connect, useSelector } from 'dva';
import { Form } from 'antd';
import { formUtils, FormAntCard } from 'basic/components/Form';
import lodash from 'lodash';
import {v4 as uuidv4 } from 'uuid';
import classNames from 'classnames';
import { IncidentCode } from 'claim/pages/Enum';

import { INCIDENTITEM, DIAGNOSISITEM } from '@/utils/claimConstant';
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
        <div className={styles.section}>
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
      const { dispatch, claimNo, incidentList }: any = props;
      const incidentId = uuidv4();
      const diagnosisId = uuidv4();
      let incidentNo = 1;
      if (lodash.isArray(incidentList)) {
        incidentNo = incidentList.length + 1;
      }

      const addIncidentItem = {
        ...INCIDENTITEM,
        claimNo,
        diagnosisList: [],
        id: incidentId,
        incidentNo,
        isManualAdd: true,
        ...changedValues,
        causeOfIncident: lodash.includes(
          formUtils.queryValue(changedValues.claimTypeArray),
          IncidentCode.Crisis
        )
          ? 'I'
          : '',
      };
      const addDiagnosisItem = {
        ...DIAGNOSISITEM,
        claimNo,
        id: diagnosisId,
        incidentId,
        isManualAdd: true,
      };

      dispatch({
        type: `${NAMESPACE}/addIncidentItem`,
        payload: {
          addIncidentItem,
          addDiagnosisItem,
        },
      });
    },

    mapPropsToFields() {
      return formUtils.mapObjectToFields({});
    },
  })(Add)
);
