import React, { useEffect } from 'react';
import { NAMESPACE } from '../activity.config';

import { connect, useSelector } from 'dva';
import { Form } from 'antd';
import lodash from 'lodash';
import {v4 as uuidv4 } from 'uuid';
import moment from 'moment';
import { tenant } from '@/components/Tenant';
import { TREATMENTITEM, INVOICEITEM, SERVICEITEM } from '@/utils/claimConstant';
import { formUtils, SectionCard } from 'basic/components/Form';
import Section, { SectionTitle, HeaderFields as Fields } from './Section';
import styles from './index.less';

const Add = ({ form, treatmentList }: any) => {
  const editable = !useSelector(({ claimEditable }: any) => claimEditable.taskNotEditable);

  useEffect(() => {
    form.resetFields();
  }, [form]);

  const newNumber = (treatmentList?.length || 0) + 1;
  return (
    <SectionCard
      title={
        <div className={styles.header}>
          <SectionTitle suffix={` ${newNumber}`} />
          <div className={styles.section}>
            <Section form={form} editable={editable} section="Treatment.Header" register={false}>
              <Fields.TreatmentType isAdd />
            </Section>
          </div>
        </div>
      }
      className={styles.AddTreatmentType}
    />
  );
};

export default connect(({ [NAMESPACE]: modelnamepsace }: any, { incidentId }: any) => ({
  claimNo: modelnamepsace.claimProcessData?.claimNo,
  treatmentList: modelnamepsace.claimEntities.incidentListMap[incidentId].treatmentList,
}))(
  Form.create<any>({
    onValuesChange: (props: any, changedValues: any) => {
      const { dispatch, claimNo, treatmentList, incidentId } = props;
      const treatmentId = uuidv4();
      // const invoiceId = uuidv4();
      const serviceItemId = uuidv4();
      let treatmentNo = 1;
      if (lodash.isArray(treatmentList)) {
        treatmentNo = treatmentList.length + 1;
      }

      const addTreatmentItem = {
        ...TREATMENTITEM,
        claimNo,
        id: treatmentId,
        incidentId,
        // invoiceList: [invoiceId],
        treatmentNo,
        ...changedValues,
      };
      const addInvoiceItem = {
        ...INVOICEITEM,
        claimNo,
        // id: invoiceId,
        serviceItemList: [],
        treatmentId,
        exchangeDate: moment().format(),
        invoiceCurrency: tenant.currency(),
      };
      const addServiceItem = {
        ...SERVICEITEM,
        claimNo,
        id: serviceItemId,
        // invoiceId,
      };

      dispatch({
        type: `${NAMESPACE}/addTreatmentItem`,
        payload: {
          incidentId,
          addTreatmentItem,
          // addInvoiceItem,
          addServiceItem,
        },
      });
    },
    mapPropsToFields(props: any) {
      const { treatmentItem } = props;
      return formUtils.mapObjectToFields(treatmentItem);
    },
  })(Add)
);
