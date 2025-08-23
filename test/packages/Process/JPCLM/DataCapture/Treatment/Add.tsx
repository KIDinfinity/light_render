import React, { useEffect, useMemo } from 'react';
import { connect, useSelector } from 'dva';
import lodash, { find } from 'lodash';
import { Row, Col, Form } from 'antd';
import {v4 as uuidv4 } from 'uuid';
import { FormAntCard } from 'basic/components/Form';
import { isExistSectionData } from 'claim/pages/utils/isExistSectionData';
import { TREATMENTITEM } from '@/utils/claimConstant';
import { formUtils } from 'basic/components/Form';
import Section, { AddFields, SectionTitle } from './Section';
import styles from './Item.less';

const Add = ({ form, incidentId }: any) => {
  const editable = !useSelector(({ claimEditable }: any) => claimEditable.taskNotEditable);

  useEffect(() => {
    form.resetFields();
  }, [form]);
  const incidentListMap = useSelector(
    ({ JPCLMOfDataCapture }: any) => JPCLMOfDataCapture.claimEntities?.incidentListMap
  );

  const treatmentListMap = useSelector(
    ({ JPCLMOfDataCapture }: any) => JPCLMOfDataCapture.claimEntities?.treatmentListMap
  );
  const incidentItem = find(incidentListMap, { id: incidentId });

  const existInvoiceListMap = useMemo(
    () => isExistSectionData(incidentItem.treatmentList, treatmentListMap, 'invoiceList'),
    [incidentItem.treatmentList, treatmentListMap]
  );
  return (
    <Row type="flex" gutter={16}>
      <Col span={existInvoiceListMap ? 12 : 24}>
        <div className={styles.incidentItem}>
          <FormAntCard>
            <div className={styles.add}>
              <div className={styles.title}>
                {<SectionTitle suffix={` ${lodash.size(incidentItem?.treatmentList) + 1}`} />}
              </div>
              <div className={styles.claimTypeArrayAdd}>
                <Section
                  form={form}
                  editable={editable}
                  section="treatment.Add"
                  layoutName="no-invoice-layout"
                  register={false}
                >
                  <AddFields.TreatmentTypeAdd incidentId={incidentId} />
                </Section>
              </div>
            </div>
          </FormAntCard>
        </div>
      </Col>
    </Row>
  );
};

export default connect(({ JPCLMOfDataCapture }: any, { incidentId }: any) => ({
  treatmentList: JPCLMOfDataCapture.claimEntities?.incidentListMap?.[incidentId].treatmentList,
  claimNo: JPCLMOfDataCapture.claimProcessData.claimNo,
}))(
  Form.create<any>({
    onValuesChange: (props: any, changedValues: any) => {
      const { dispatch, treatmentList, incidentId, claimNo }: any = props;
      const treatmentId = uuidv4();

      let treatmentNo = 1;
      if (lodash.isArray(treatmentList)) {
        treatmentNo = treatmentList.length + 1;
      }

      const treatmentAdd = {
        ...TREATMENTITEM,
        claimNo,
        id: treatmentId,
        incidentId,
        treatmentNo,
        ...changedValues,
      };

      dispatch({
        type: 'JPCLMOfDataCapture/treatmentAdd',
        payload: {
          incidentId,
          treatmentAdd,
        },
      });
    },
    mapPropsToFields() {
      return formUtils.mapObjectToFields({});
    },
  })(Add)
);
