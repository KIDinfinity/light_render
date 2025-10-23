import React, { useState, useEffect } from 'react';
import { NAMESPACE } from 'opus/Pages/Process/Claim/ManualAssessment/activity.config';
import { FormLayoutContext } from 'basic/components/Form';
import { Row, Col } from 'antd';
import { useDispatch } from 'dva';
import ProcedureList from '../Therapies/List';
import Header from './Header';
import Basic from './Basic';
import TreatmentPayable from '../Payable/TreatmentPayable';
import styles from './TreatmentListItem.less';

const TreatmentItem = ({ treatmentId, incidentId, index, havePayable }: any) => {
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
        <Col span={10}>
          <FormLayoutContext.ExpandProvider>
            <div className={styles.treatmentContainer}>
              <Header treatmentId={treatmentId} incidentId={incidentId} />
              <Basic incidentId={incidentId} treatmentId={treatmentId} />
            </div>
          </FormLayoutContext.ExpandProvider>
        </Col>
        <Col span={14} className={styles.right}>
          {havePayable && <TreatmentPayable incidentId={incidentId} treatmentId={treatmentId} index={index} />}
        </Col>
      </Row>
      <ProcedureList
        treatmentId={treatmentId}
        incidentId={incidentId}
        procedureExpand={procedureExpand}
        havePayable={havePayable}
        arrowCallBack={async () => {
          await setSwitchOn(procedureExpand && !invoiceExpand ? false : switchOn);
          await setProcedureExpand(!procedureExpand);
        }}
      />

      {/* <InvoiceList
        treatmentId={treatmentId}
        incidentId={incidentId}
        invoiceExpand={invoiceExpand}
        arrowCallBack={async () => {
          await setSwitchOn(!procedureExpand && invoiceExpand ? false : switchOn);
          await setInvoiceExpand(!invoiceExpand);
        }}
      /> */}
    </div>
  );
};

export default TreatmentItem;
