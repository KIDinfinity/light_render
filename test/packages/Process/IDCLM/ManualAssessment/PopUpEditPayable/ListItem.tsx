import React from 'react';
import { NAMESPACE } from '../activity.config';

import { Row, Col } from 'antd';
import { useSelector } from 'dva';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import { eBenefitCategory } from 'claim/enum/BenefitCategory';
import Treament from './Treament';
import ServiceList from './ServiceList';
import PayableList from './PayableList';
import styles from './index.less';

const TreatmentItem = ({ treatmentId, index }: any) => {
  const { benefitCategory } = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace?.PopUpEditPayable?.data
  );
  return (
    <div className={styles.itemWrap}>
      <Row type="flex" gutter={0}>
        <Col span={10} className={styles.left}>
          <div className={styles.wrap}>
            <div className={styles.title}>
              {`${formatMessageApi({
                Label_BIZ_Claim: 'app.navigator.task-detail-of-data-capture.label.treatment-no',
              })} ${Number(index) + 1}`}
            </div>
            <div className={styles.basic}>
              {benefitCategory === eBenefitCategory.Reimbursement ? (
                <ServiceList treatmentId={treatmentId} />
              ) : (
                <Treament treatmentId={treatmentId} />
              )}
            </div>
          </div>
        </Col>
        <Col span={14} className={styles.right}>
          <PayableList />
        </Col>
      </Row>
    </div>
  );
};

export default TreatmentItem;
