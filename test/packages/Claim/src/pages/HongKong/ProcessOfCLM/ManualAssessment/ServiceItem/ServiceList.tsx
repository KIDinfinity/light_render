import React, { PureComponent } from 'react';
import { connect } from 'dva';
import lodash from 'lodash';
import { Collapse } from 'antd';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import ServiceListItemOfHeader from './ServiceListItemOfHeader';
import ServiceListItem from './ServiceListItem';
import styles from './ServiceList.less';

@connect(({ HKCLMOfClaimAssessmentController, claimEditable }: any, { invoiceId }: any) => ({
  serviceItemList:
    HKCLMOfClaimAssessmentController.claimEntities.invoiceListMap[invoiceId].serviceItemList,
  taskNotEditable: claimEditable.taskNotEditable,
  serviceItemListMap: HKCLMOfClaimAssessmentController.claimEntities.serviceItemListMap,
}))
class ServiceItemList extends PureComponent {
  get sortServiceList() {
    const { serviceItemListMap, serviceItemList } = this.props;
    return lodash
      .chain(serviceItemListMap)
      .orderBy(['orderNum'])
      .map((item) => {
        if (lodash.includes(serviceItemList, item.id)) {
          return item.id;
        }
        return '';
      })
      .compact()
      .value();
  }

  render() {
    const { serviceItemList, incidentId, treatmentId, invoiceId, taskNotEditable } = this.props;
    const isShow = lodash.compact(serviceItemList).length > 0 || !taskNotEditable;
    return (
      <div className={isShow ? styles.serviceCard : ''}>
        {isShow && (
          <>
            <h3 className={styles.title}>
              {formatMessageApi({
                Label_BIZ_Claim: 'app.navigator.task-detail-of-data-capture.title.service-item',
              })}
            </h3>
            <Collapse bordered={false}>
              {lodash.map(lodash.compact(this.sortServiceList), (item) => (
                <Collapse.Panel
                  header={
                    <div
                      onClick={(e) => {
                        e.stopPropagation();
                      }}
                    >
                      <ServiceListItemOfHeader
                        incidentId={incidentId}
                        treatmentId={treatmentId}
                        invoiceId={invoiceId}
                        serviceItemId={item}
                        key={item}
                      />
                    </div>
                  }
                  key={item}
                >
                  <ServiceListItem
                    incidentId={incidentId}
                    treatmentId={treatmentId}
                    invoiceId={invoiceId}
                    serviceItemId={item}
                    key={item}
                  />
                </Collapse.Panel>
              ))}
            </Collapse>
          </>
        )}
      </div>
    );
  }
}

export default ServiceItemList;
