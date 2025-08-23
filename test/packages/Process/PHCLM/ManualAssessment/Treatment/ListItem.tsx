import React, { useState, useEffect } from 'react';
import { NAMESPACE } from '../activity.config';

import { Row, Col } from 'antd';
import { useDispatch } from 'dva';
import SubSummary from '../SubSummary';
import InvoiceList from '../Invoice/List';
import ProcedureList from '../Therapies/List';
import Header from './Header';
import Basic from './Basic';
import Check from './Check';
import ButtonGroup from './ButtonGroup';
import styles from './TreatmentListItem.less';

const TreatmentItem = ({ treatmentId, incidentId }: any) => {
  const dispatch = useDispatch();
  const [switchOn, setSwitchOn] = useState(false);
  const [invoiceExpand, setInvoiceExpand] = useState(false);
  const [procedureExpand, setProcedureExpand] = useState(false);

  useEffect(() => {
    dispatch({
      type: `${NAMESPACE}/registerExpand`,
      payload: { incidentId, setSwitchOn, setInvoiceExpand, setProcedureExpand },
    });
    setInvoiceExpand(switchOn);
    setProcedureExpand(switchOn);
  }, [switchOn]);
  return (
    <div className={styles.treatmentItem}>
      <Row type="flex" gutter={0}>
        <Col span={10} className={styles.left}>
          <Header treatmentId={treatmentId} incidentId={incidentId} />
          <div className={styles.basicLayout}>
            <div className={styles.basic}>
              <Basic incidentId={incidentId} treatmentId={treatmentId} />
            </div>
            <Check incidentId={incidentId} treatmentId={treatmentId} />
          </div>
          <div className={styles.content} />
        </Col>
        <Col span={14} className={styles.right}>
          <ButtonGroup
            incidentId={incidentId}
            treatmentId={treatmentId}
            switchOn={switchOn}
            setSwitchOn={setSwitchOn}
          />
          {!switchOn && <SubSummary incidentId={incidentId} treatmentId={treatmentId} />}
        </Col>
      </Row>
      <ProcedureList
        treatmentId={treatmentId}
        incidentId={incidentId}
        procedureExpand={procedureExpand}
        arrowCallBack={async () => {
          await setSwitchOn(procedureExpand && !invoiceExpand ? false : switchOn);
          await setProcedureExpand(!procedureExpand);
        }}
      />
      <InvoiceList
        treatmentId={treatmentId}
        incidentId={incidentId}
        invoiceExpand={invoiceExpand}
        arrowCallBack={async () => {
          await setSwitchOn(!procedureExpand && invoiceExpand ? false : switchOn);
          await setInvoiceExpand(!invoiceExpand);
        }}
      />
    </div>
  );
};

export default TreatmentItem;
