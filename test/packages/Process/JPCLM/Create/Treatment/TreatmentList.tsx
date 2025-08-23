import React, { Component } from 'react';
import { connect } from 'dva';
import lodash from 'lodash';
import {v4 as uuidv4 } from 'uuid';
import { Row, Col } from 'antd';
import moment from 'moment';
import { tenant } from '@/components/Tenant';
import { TREATMENTITEM, INVOICEITEM, SERVICEITEM } from '@/utils/claimConstant';
import ButtonOfClaim from 'claim/components/ButtonOfClaim';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import TreatmentListItem from './TreatmentListItem';
import styles from './TreatmentList.less';

@connect(({ JPCLMProcessCreate }, { incidentId }) => ({
  treatmentList: JPCLMProcessCreate.claimEntities.incidentListMap[incidentId].treatmentList,
}))
class TreatmentList extends Component {
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
      exchangeDate: moment().format(),
      invoiceCurrency: tenant.region(),
    };
    const addServiceItem = {
      ...SERVICEITEM,
      claimNo,
      id: serviceItemId,
      invoiceId,
    };

    dispatch({
      type: 'JPCLMProcessCreate/addTreatmentItem',
      payload: {
        incidentId,
        addTreatmentItem,
        addInvoiceItem,
        addServiceItem,
      },
    });
  };

  render() {
    const { treatmentList, incidentId } = this.props;

    return (
      <div className={styles.treatmentListWrap}>
        {lodash.isArray(treatmentList) &&
          lodash.map(treatmentList, (item, index) => (
            <TreatmentListItem
              incidentId={incidentId}
              treatmentId={item}
              treatmentNo={index + 1}
              key={item}
            />
          ))}
        <Row type="flex" gutter={16}>
          <Col span={12}>
            <ButtonOfClaim
              handleClick={this.handleAdd}
              buttonText={formatMessageApi({
                Label_BIZ_Claim: 'app.navigator.task-detail-of-data-capture.title.treatment',
              })}
              buttonStyle={{ width: '100%', height: '36px' }}
            />
          </Col>
        </Row>
      </div>
    );
  }
}

export default TreatmentList;
