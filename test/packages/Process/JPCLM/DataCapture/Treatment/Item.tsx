import React, { useState } from 'react';
import { useSelector } from 'dva';
import { Row, Col } from 'antd';
import { isEmpty } from 'lodash';
import { FormAntCard } from 'basic/components/Form';
import EIsAdjustment from 'process/JPCLM/ManualAssessment/_models/enum/isAdjustment';
import Short from './Short';
import Basic from './Basic';
import ItemExtra from './ItemExtra';
import { SectionTitle } from './Section';
import styles from './Item.less';

const TreatmentItem = ({ treatmentId, incidentId, total }: any) => {
  const [cardStatus, setCardStatus] = useState(true);

  const treatmentNo = useSelector(
    ({ JPCLMOfDataCapture }: any) =>
      JPCLMOfDataCapture.claimEntities.treatmentListMap[treatmentId].treatmentNo
  );
  const invoiceList = useSelector(
    ({ JPCLMOfDataCapture }: any) =>
      JPCLMOfDataCapture.claimEntities.treatmentListMap[treatmentId].invoiceList
  );
  const treatmentListMap = useSelector(
    ({ JPCLMOfDataCapture }: any) => JPCLMOfDataCapture.claimEntities?.treatmentListMap
  );

  const existInvoiceList = !isEmpty(invoiceList);

  const isAdjustment = treatmentListMap?.[treatmentId]?.isAdjustment === EIsAdjustment.Y;

  return (
    <div className={styles.treatmentItem}>
      {!cardStatus && !isAdjustment && (
        <Short treatmentId={treatmentId} total={total} onOpen={() => setCardStatus(true)} />
      )}
      {cardStatus && !isAdjustment && (
        <Row type="flex" gutter={16}>
          <Col span={24}>
            <FormAntCard
              title={<SectionTitle suffix={` ${treatmentNo}`} />}
              bordered={false}
              extra={
                <ItemExtra {...{ incidentId, existInvoiceList, setCardStatus, treatmentId }} />
              }
            >
              <Basic incidentId={incidentId} treatmentId={treatmentId} />
            </FormAntCard>
          </Col>
        </Row>
      )}
    </div>
  );
};

export default TreatmentItem;
