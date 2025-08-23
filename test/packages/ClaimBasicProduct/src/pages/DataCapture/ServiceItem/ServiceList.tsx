import React, { PureComponent } from 'react';
import { connect } from 'dva';
import{ v4 as  uuidv4 } from 'uuid';
import lodash from 'lodash';
import { formUtils } from 'basic/components/Form';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import { SERVICEITEM } from '@/utils/claimConstant';
import ButtonOfClaim from 'claim/components/ButtonOfClaim';
import ErrorTooltipManual from 'claim/components/ErrorTooltipManual';
import ServiceListItem from './ServiceListItem';
import styles from './ServiceList.less';

@connect(
  ({ bpOfDataCaptureController, formCommonController, claimEditable }: any, { invoiceId }) => ({
    submited: formCommonController.submited,
    claimNo: bpOfDataCaptureController.claimProcessData.claimNo,
    serviceItemList:
      bpOfDataCaptureController.claimEntities.invoiceListMap[invoiceId].serviceItemList,
    serviceItemListMap: bpOfDataCaptureController.claimEntities.serviceItemListMap,
    taskNotEditable: claimEditable.taskNotEditable,
  })
)
class ServiceItemList extends PureComponent {
  handleAdd = () => {
    const { dispatch, claimNo, invoiceId } = this.props;
    const serviceItemId = uuidv4();

    const addServiceItem = {
      ...SERVICEITEM,
      claimNo,
      id: serviceItemId,
      invoiceId,
    };

    dispatch({
      type: 'bpOfDataCaptureController/addServiceItem',
      payload: {
        invoiceId,
        addServiceItem,
      },
    });
  };

  getexistServiceItems = () => {
    const { invoiceId, serviceItemListMap } = this.props;

    const serviceItemListMapEntries = Object.entries(serviceItemListMap);
    const existServiceItems = [];
    lodash.map(serviceItemListMapEntries, (item) => {
      if (item[1].invoiceId === invoiceId) {
        existServiceItems.push(formUtils.queryValue(item[1].serviceItem));
      }
    });

    return existServiceItems;
  };

  render() {
    const { serviceItemList, invoiceId, submited, taskNotEditable } = this.props;
    const existServiceItems = this.getexistServiceItems();

    const isShow = lodash.compact(serviceItemList).length > 0 || !taskNotEditable;

    return (
      <div className={isShow ? styles.serviceCard : ''}>
        {isShow && (
          <div>
            <h3 className={styles.title}>
              {submited && lodash.compact(serviceItemList).length === 0 && (
                <ErrorTooltipManual
                  manualErrorMessage="Service item should not be empty."
                  style={{
                    display: 'inline-flex',
                    position: 'relative',
                    top: '3px',
                    marginRight: '4px',
                  }}
                />
              )}
              {formatMessageApi({
                Label_BIZ_Claim: 'app.navigator.task-detail-of-data-capture.title.service-item',
              })}
            </h3>
            {lodash.map(lodash.compact(serviceItemList), (item) => (
              <ServiceListItem
                invoiceId={invoiceId}
                serviceItemId={item}
                key={item}
                existServiceItems={existServiceItems}
              />
            ))}
          </div>
        )}
        {!taskNotEditable && (
          <ButtonOfClaim
            handleClick={this.handleAdd}
            buttonText={formatMessageApi({
              Label_BPM_Button: 'app.navigator.task-detail-of-data-capture.button.fee',
            })}
          />
        )}
      </div>
    );
  }
}

export default ServiceItemList;
