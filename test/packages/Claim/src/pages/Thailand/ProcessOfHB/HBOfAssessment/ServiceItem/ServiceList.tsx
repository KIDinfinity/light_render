import React, { Component } from 'react';
import { connect } from 'dva';
import type { Dispatch } from 'redux';
import{ v4 as  uuidv4 } from 'uuid';
import lodash from 'lodash';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import { SERVICEITEM } from '@/utils/claimConstant';
import CommonEmpty from '@/components/Empty';
import ErrorTooltipManual from 'claim/components/ErrorTooltipManual';
import ServiceListItem from './ServiceListItem';
import AddMultipleServiceItems from './AddMultipleServiceItems';
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

@connect(
  (
    { hbOfClaimAssessmentController, formCommonController, claimEditable }: any,
    { invoiceId }: any
  ) => ({
    submited: formCommonController.submited,
    claimNo: hbOfClaimAssessmentController.claimProcessData.claimNo,
    serviceItemList:
      hbOfClaimAssessmentController.claimEntities.invoiceListMap[invoiceId].serviceItemList,
    serviceItemListMap: hbOfClaimAssessmentController.claimEntities.serviceItemListMap,
    taskNotEditable: claimEditable.taskNotEditable,
  })
)
class ServiceItemList extends Component<IProps> {
  handleAdd = () => {
    const { dispatch, claimNo, invoiceId } = this.props;
    const serviceItemId = uuidv4();

    const addServiceItem = {
      ...SERVICEITEM,
      claimNo,
      id: serviceItemId,
      invoiceId,
      unit: null,
    };

    dispatch({
      type: 'hbOfClaimAssessmentController/addServiceItem',
      payload: {
        invoiceId,
        addServiceItem,
      },
    });
  };

  render() {
    const {
      serviceItemList,
      invoiceId,
      submited,
      serviceItemListMap,
      taskNotEditable,
    } = this.props;
    const existServiceItems = lodash
      .values(serviceItemListMap)
      .filter((item: IServiceItem) => lodash.compact(serviceItemList).includes(item.id))
      .map((item) => formUtils.queryValue(item.serviceItem));

    return (
      <div className={styles.serviceCard}>
        <h3 className={styles.title}>
          {submited && lodash.isArray(serviceItemList) && serviceItemList.length === 0 && (
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
        {!taskNotEditable && (
          <AddMultipleServiceItems invoiceId={invoiceId} existServiceItems={existServiceItems} />
        )}
        {lodash.isArray(serviceItemList) &&
          lodash.map(serviceItemList, (item) => (
            <ServiceListItem
              invoiceId={invoiceId}
              existServiceItems={existServiceItems}
              serviceItemId={item}
              key={item}
            />
          ))}
        {lodash.isArray(serviceItemList) && serviceItemList.length === 0 && <CommonEmpty />}
      </div>
    );
  }
}

export default ServiceItemList;
