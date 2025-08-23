import React from 'react';
import { Row, Col } from 'antd';
import lodash from 'lodash';
import { useSelector } from 'dva';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import { eBenefitCategory } from 'claim/enum/BenefitCategory';
import { NAMESPACE } from '../activity.config';
import Treament from './Treament';
import ServiceList from './ServiceList';
import ProcedureList from './ProcedureList';
import OtherProcedureList from './OtherProcedureList';
import PayableList from './PayableList';

import styles from './index.less';

const TreatmentItem = ({ totalPayableList, treatmentItem }: any) => {
  const { benefitCategory } = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace?.PopUpEditPayable?.data
  );

  const { id: treatmentId, treatmentNo }: any = treatmentItem;

  const getComponents = () => {
    switch (benefitCategory) {
      case eBenefitCategory.Reimbursement:
        return <ServiceList treatmentId={treatmentId} />;
      case eBenefitCategory.S:
        return <ProcedureList treatmentId={treatmentId} />;
      case eBenefitCategory.Crisis:
        return <OtherProcedureList treatmentId={treatmentId} />;
      default:
        return <Treament treatmentItem={treatmentItem} />;
    }
  };
  const payableList = lodash.filter(totalPayableList, { treatmentId });

  return (
    <div className={styles.itemWrap}>
      <Row type="flex" gutter={0}>
        <Col span={10} className={styles.left}>
          <div className={styles.wrap}>
            <div className={styles.title}>
              {`${formatMessageApi({
                Label_BIZ_Claim: 'app.navigator.task-detail-of-data-capture.label.treatment-no',
              })} ${treatmentNo}`}
            </div>
            <div className={styles.basic}>{getComponents()}</div>
          </div>
        </Col>
        <Col span={14} className={styles.right}>
          <PayableList payableList={payableList} />
        </Col>
      </Row>
    </div>
  );
};

export default TreatmentItem;
