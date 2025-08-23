import React from 'react';
import { useSelector } from 'dva';
import { Col, Row } from 'antd';
import lodash from 'lodash';
import Expand from './Expand';
import Short from './Short';
import TreatmentList from '../Treatment/List';
import styles from './Item.less';

const Item = ({ incidentId, total }: { incidentId: string; total: number }) => {
  const incidentItem = useSelector(
    ({ JPCLMOfDataCapture }: any) => JPCLMOfDataCapture.claimEntities?.incidentListMap?.[incidentId]
  );
  const incidentItemExpandStatus = useSelector(
    ({ JPCLMOfDataCapture }: any) =>
      JPCLMOfDataCapture.incidentItemExpandStatus?.[`id_${incidentId}`]
  );

  const hasTreatment = !lodash.isEmpty(incidentItem.treatmentList);

  return (
    <div className={styles.incidentItem}>
      {/* incidentItemExpandStatus 为 false， 显示缩略模式 */}
      {!incidentItemExpandStatus && (
        <Short incidentId={incidentId} incidentItem={incidentItem} total={total} />
      )}

      {/* incidentItemExpandStatus 为 true，且 treatment 为空， 显示基础信息 */}
      {incidentItemExpandStatus && !hasTreatment && (
        <Expand {...{ incidentId, incidentItem, incidentItemExpandStatus }} />
      )}

      {/* incidentItemExpandStatus 为 true，且 treatment 不为空， 展开 treatment */}
      {incidentItemExpandStatus && hasTreatment && (
        <Row type="flex" gutter={16}>
          <Col span={12}>
            <Expand {...{ incidentId, incidentItem, incidentItemExpandStatus }} />
          </Col>
          <Col span={12}>
            <TreatmentList incidentId={incidentId} />
          </Col>
        </Row>
      )}
    </div>
  );
};

export default Item;
