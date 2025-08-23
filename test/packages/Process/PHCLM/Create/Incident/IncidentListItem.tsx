import React, { PureComponent } from 'react';
import { connect } from 'dva';
import lodash from 'lodash';
import { Col, Row } from 'antd';
import TreatmentList from '../Treatment/TreatmentList';
import IncidentListItemOfShort from './IncidentListItemOfShort';
import IncidentListItemOfExpend from './IncidentListItemOfExpend';
import styles from './IncidentListItem.less';

interface IncidentItemProps {
  total: number;
  incidentNo: number;
  incidentId: string;
}

@connect(({ hkProcessController }: any, { incidentId }: any) => ({
  incidentItem: hkProcessController.claimEntities.incidentListMap[incidentId],
  incidentItemExpandStatus: lodash.get(
    hkProcessController,
    `incidentItemExpandStatus.id_${incidentId}`
  ),
}))
class IncidentItem extends PureComponent<IncidentItemProps> {
  render() {
    const { incidentItem, total, incidentId, incidentItemExpandStatus }: any = this.props;
    const hasTreatment = !lodash.isEmpty(incidentItem.treatmentList);

    return (
      <div className={styles.incidentItem}>
        {/* incidentItemExpandStatus 为 false， 显示缩略模式 */}
        {!incidentItemExpandStatus && (
          <IncidentListItemOfShort
            incidentId={incidentId}
            incidentItem={incidentItem}
            total={total}
          />
        )}

        {/* incidentItemExpandStatus 为 true，且 treatment 为空， 显示基础信息 */}
        {incidentItemExpandStatus && !hasTreatment && <IncidentListItemOfExpend {...this.props} />}

        {/* incidentItemExpandStatus 为 true，且 treatment 不为空， 展开 treatment */}
        {incidentItemExpandStatus && hasTreatment && (
          <Row type="flex" gutter={16}>
            <Col span={8}>
              <IncidentListItemOfExpend {...this.props} />
            </Col>
            <Col span={16}>
              <TreatmentList incidentId={incidentId} />
            </Col>
          </Row>
        )}
      </div>
    );
  }
}

export default IncidentItem;
