import React, { PureComponent } from 'react';
import ServiceListItemOfBasicInfo from './ServiceListItemOfBasicInfo';
import ServiceItemPayableList from './ServiceItemPayableList';
import styles from './ServiceListItem.less';

class ServiceListItem extends PureComponent {
  render() {
    const { incidentId, treatmentId, invoiceId, serviceItemId } = this.props;

    return (
      <div className={styles.serviceItem}>
        <ServiceListItemOfBasicInfo
          incidentId={incidentId}
          treatmentId={treatmentId}
          invoiceId={invoiceId}
          serviceItemId={serviceItemId}
        />
        <ServiceItemPayableList
          incidentId={incidentId}
          treatmentId={treatmentId}
          invoiceId={invoiceId}
          serviceItemId={serviceItemId}
        />
      </div>
    );
  }
}

export default ServiceListItem;
