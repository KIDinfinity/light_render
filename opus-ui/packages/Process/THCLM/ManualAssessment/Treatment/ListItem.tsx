import React, { useState, useEffect } from 'react';
import { NAMESPACE } from '../activity.config';

import { Row, Col } from 'antd';
import { useDispatch } from 'dva';
import SummaryTreatmentPayable from '../SummaryTreatmentPayable';
import ProcedureList from '../Procedure/List';
import InvoiceList from '../Invoice/List';
import ShrinkInvoiceList from '../Invoice/ShrinkList';
import Header from './Header';
import Basic from './Basic';
import Check from './Check';
import ButtonGroup from './ButtonGroup';
import styles from './TreatmentListItem.less';

const TreatmentItem = ({ treatmentId, incidentId }: any) => {
  const dispatch = useDispatch();
  const [expand, setExpand] = useState(false);

  useEffect(() => {
    dispatch({
      type: `${NAMESPACE}/registerExpand`,
      payload: { setExpand },
    });
  }, []);

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
          <div className={styles.content}>
            <ProcedureList treatmentId={treatmentId} incidentId={incidentId} />
            {!expand && (
              <ShrinkInvoiceList
                treatmentId={treatmentId}
                incidentId={incidentId}
                setExpand={setExpand}
                expand={expand}
              />
            )}
          </div>
        </Col>
        <Col span={14} className={styles.right}>
          <ButtonGroup
            incidentId={incidentId}
            treatmentId={treatmentId}
            setExpand={setExpand}
            expand={expand}
          />
          {!expand && <SummaryTreatmentPayable incidentId={incidentId} treatmentId={treatmentId} />}
        </Col>
      </Row>
      {expand && (
        <InvoiceList
          treatmentId={treatmentId}
          incidentId={incidentId}
          setExpand={setExpand}
          expand={expand}
        />
      )}
    </div>
  );
};

export default TreatmentItem;
