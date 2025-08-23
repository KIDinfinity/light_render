import React, { PureComponent } from 'react';
import { connect } from 'dva';
import{ v4 as  uuidv4 } from 'uuid';
import lodash from 'lodash';
import { Row, Col } from 'antd';
import { TREATMENTITEM, INVOICEITEM, SERVICEITEM } from '@/utils/claimConstant';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import ButtonOfClaim from 'claim/components/ButtonOfClaim';
import TreatmentListItem from './TreatmentListItem';
import styles from './TreatmentList.less';

@connect(({ bpOfDataCaptureController, claimEditable }: any, { incidentId }: any) => ({
  claimNo: bpOfDataCaptureController.claimProcessData.claimNo,
  treatmentList: bpOfDataCaptureController.claimEntities.incidentListMap[incidentId].treatmentList,
  taskNotEditable: claimEditable.taskNotEditable,
}))
class TreatmentList extends PureComponent {
  handleAdd = () => {
    const { dispatch, incidentId, claimNo, treatmentList } = this.props;
    const treatmentId = uuidv4();
    const invoiceId = uuidv4();
    const serviceItemId = uuidv4();
    let treatmentNo = 1;
    if (lodash.isArray(treatmentList)) {
      treatmentNo = treatmentList.length + 1;
    }

    const addTreatmentItem = {
      ...TREATMENTITEM,
      claimNo,
      id: treatmentId,
      incidentId,
      invoiceList: [invoiceId],
      treatmentNo,
    };
    const addInvoiceItem = {
      ...INVOICEITEM,
      claimNo,
      id: invoiceId,
      serviceItemList: [serviceItemId],
      treatmentId,
    };
    const addServiceItem = {
      ...SERVICEITEM,
      claimNo,
      id: serviceItemId,
      invoiceId,
    };

    dispatch({
      type: 'bpOfDataCaptureController/addTreatmentItem',
      payload: {
        incidentId,
        addTreatmentItem,
        addInvoiceItem,
        addServiceItem,
      },
    });
  };

  render() {
    const { treatmentList, incidentId, taskNotEditable } = this.props;
    const total = treatmentList.length;

    return (
      <div className={styles.treatmentListWrap}>
        {lodash.isArray(treatmentList) &&
          lodash.map(treatmentList, (item) => (
            <TreatmentListItem
              incidentId={incidentId}
              treatmentId={item}
              total={total}
              key={item}
            />
          ))}
        <Row type="flex" gutter={16}>
          <Col span={12}>
            {!taskNotEditable && (
              <ButtonOfClaim
                handleClick={this.handleAdd}
                buttonText={formatMessageApi({
                  Label_BIZ_Claim: 'app.navigator.task-detail-of-data-capture.title.treatment',
                })}
                buttonStyle={{ width: '100%', height: '36px' }}
              />
            )}
          </Col>
        </Row>
      </div>
    );
  }
}

export default TreatmentList;
