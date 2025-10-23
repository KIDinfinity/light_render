import React, { useState, useEffect } from 'react';
import { Row, Col } from 'antd';
import { useDispatch } from 'dva';
import Treatment from 'process/Components/BussinessControls/Treatment';
import LTHeader from './LTHeader';

import styles from './LYMA.less';

interface IProps {
  namespaceType: string;
  NAMESPACE: string;
  editable: string;
  incidentId: string;
  treatmentId: string;
  Procedure: Function;
  ButtonGroup: Function;
  Invoice: Function;
  ShrinkInvoiceList: Function;
  SummaryTreatmentPayable: Function;
}
const LYMAItem = ({
  NAMESPACE,
  namespaceType,
  editable,
  incidentId,
  treatmentId,
  Invoice,
  Procedure,
  ButtonGroup,
  ShrinkInvoiceList,
  SummaryTreatmentPayable,
}: IProps) => {
  const dispatch = useDispatch();
  const [expand, setExpand] = useState(false);

  useEffect(() => {
    dispatch({
      type: `${NAMESPACE}/registerExpand`,
      payload: { setExpand },
    });
  }, []);

  const defaultProps = {
    NAMESPACE,
    namespaceType,
    editable,
    incidentId,
    treatmentId,
  };

  return (
    <div className={styles.Item}>
      <Row type="flex" gutter={0}>
        <Col span={10} className={styles.left}>
          <LTHeader {...defaultProps} />
          <div className={styles.basicLayout}>
            <div className={styles.basic}>
              <Treatment.SectionBasic {...defaultProps} />
            </div>
            <Treatment.SectionCheck {...defaultProps} />
          </div>
          <div className={styles.content}>
            <Procedure {...defaultProps} />
            {!expand && (
              <ShrinkInvoiceList {...defaultProps} setExpand={setExpand} expand={expand} />
            )}
          </div>
        </Col>
        <Col span={14} className={styles.right}>
          <ButtonGroup {...defaultProps} setExpand={setExpand} expand={expand} />
          {!expand && <SummaryTreatmentPayable {...defaultProps} />}
        </Col>
      </Row>
      {expand && <Invoice {...defaultProps} setExpand={setExpand} expand={expand} />}
    </div>
  );
};

export default LYMAItem;
