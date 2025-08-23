import React, { Component } from 'react';
import { connect } from 'dva';
import type { Dispatch } from 'redux';
import {v4 as uuidv4 } from 'uuid';
import lodash from 'lodash';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import { SERVICEITEM } from '@/utils/claimConstant';
import ButtonOfClaim from 'claim/components/ButtonOfClaim';
import ErrorTooltipManual from 'claim/components/ErrorTooltipManual';
import ServiceListItem from './ServiceListItem';
import { formUtils } from 'basic/components/Form';
import type { IServiceItem } from '@/dtos/claim';
import styles from './ServiceList.less';

interface IProps {
  dispatch: Dispatch<any>;
  claimNo: string;
  invoiceId: string;
  serviceItemList: string[];
  submited: boolean;
  serviceItemListMap?: any;
}

@connect(({ hkProcessController, formCommonController }: any, { invoiceId }: any) => ({
  submited: formCommonController.submited,
  claimNo: hkProcessController.claimProcessData.claimNo,
  serviceItemList: hkProcessController.claimEntities.invoiceListMap[invoiceId]?.serviceItemList,
  serviceItemListMap: hkProcessController.claimEntities.serviceItemListMap,
}))
class ServiceItemList extends Component<IProps> {
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
      type: 'hkProcessController/addServiceItem',
      payload: {
        invoiceId,
        addServiceItem,
      },
    });
  };

  render() {
    const { serviceItemList, invoiceId, submited, serviceItemListMap } = this.props;
    const existServiceItems = lodash
      .values(serviceItemListMap)
      .filter((item: IServiceItem) => lodash.compact(serviceItemList).includes(item.id))
      .map((item) => formUtils.queryValue(item.serviceItem));

    return (
      <div className={styles.serviceCard}>
        <>
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
          {lodash.compact(serviceItemList).map((item) => (
            <ServiceListItem
              invoiceId={invoiceId}
              existServiceItems={existServiceItems}
              serviceItemId={item}
              key={item}
            />
          ))}
        </>
        <ButtonOfClaim
          handleClick={this.handleAdd}
          buttonText={formatMessageApi({
            Label_BPM_Button: 'app.navigator.task-detail-of-data-capture.button.service',
          })}
        />
      </div>
    );
  }
}

export default ServiceItemList;
