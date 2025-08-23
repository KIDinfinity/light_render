import React, { PureComponent } from 'react';
import { connect } from 'dva';
import lodash from 'lodash';
import InvoiceEntireItem from './InvoiceEntireItem';
import SwitchBtn from '../_components/SwitchBtn';
import styles from './InvoiceEntireList.less';

interface IProps {
  handleSwitch: Function;
  treatmentList?: string[];
  treatmentListMap?: object;
  incidentId: string;
  showPrimary: boolean;
}

@connect(({ daOfClaimAssessmentController }: any, { incidentId }: any) => ({
  treatmentList: lodash.get(
    daOfClaimAssessmentController,
    `claimEntities.incidentListMap.${incidentId}.treatmentList`
  ),
  treatmentListMap: lodash.get(daOfClaimAssessmentController, 'claimEntities.treatmentListMap'),
}))
class InvoiceEntireList extends PureComponent<IProps> {
  render() {
    const {
      treatmentListMap = {},
      treatmentList,
      incidentId,
      handleSwitch,
      showPrimary,
    } = this.props;
    const treatmentId = lodash.get(lodash.compact(treatmentList), 0);
    const invoiceList: string[] = lodash.get(treatmentListMap[treatmentId], 'invoiceList');

    return (
      <div className={showPrimary ? styles.InvoiceEntireList : ''}>
        {lodash.map(lodash.compact(invoiceList), (item, index) => (
          <div key={`${item}-${index}`}>
            <InvoiceEntireItem incidentId={incidentId} treatmentId={treatmentId} invoiceId={item} />
            <SwitchBtn.SwitchLeft onClick={() => handleSwitch(incidentId)} />
          </div>
        ))}
      </div>
    );
  }
}

export default InvoiceEntireList;
