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

@connect(({ bpOfDataCaptureController }: any, { incidentId }: any) => ({
  incidentItem: bpOfDataCaptureController.claimEntities.incidentListMap[incidentId],
  incidentItemExpandStatus: lodash.get(
    bpOfDataCaptureController,
    `incidentItemExpandStatus.id_${incidentId}`
  ),
}))
class IncidentItem extends PureComponent<IncidentItemProps> {
  domRef = React.createRef();

  render() {
    const { incidentItem, total, incidentId, incidentItemExpandStatus }: any = this.props;
    const hasTreatment = !lodash.isEmpty(incidentItem.treatmentList);

    return (
      <div className={styles.incidentItem} ref={this.domRef}>
        {/* incidentItemExpandStatus 为 false， 显示缩略模式 */}
        {!incidentItemExpandStatus && (
          <IncidentListItemOfShort
            incidentId={incidentId}
            incidentItem={incidentItem}
            total={total}
          />
        )}

        {/* incidentItemExpandStatus 为 true，且 treatment 为空， 显示基础信息 */}
        {incidentItemExpandStatus && !hasTreatment && (
          <IncidentListItemOfExpend {...this.props} domRef={this.domRef} />
        )}

        {/* incidentItemExpandStatus 为 true，且 treatment 不为空， 展开 treatment */}
        {incidentItemExpandStatus && hasTreatment && (
          <Row type="flex" gutter={16}>
            <Col span={8}>
              <IncidentListItemOfExpend {...this.props} domRef={this.domRef} />
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
