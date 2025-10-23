import { formatMessageApi } from '@/utils/dictFormatMessage';
import React, { Component } from 'react';
import { connect } from 'dva';
import lodash from 'lodash';
import ButtonOfClaim from 'claim/components/ButtonOfClaim';
import ServiceListItemOfPayableListItem from './ServiceItemPayableListItem';
import ServiceListItemOfPayableListItemAdd from './ServiceItemPayableListItemAdd';
import { getServicePayableIdList } from 'claim/pages/utils/selector';

@connect(({ HKCLMOfClaimAssessmentController, claimEditable }: any, { serviceItemId }: any) => ({
  curServicePayableList: getServicePayableIdList(
    serviceItemId,
    HKCLMOfClaimAssessmentController.claimEntities.serviceItemPayableListMap
  ),
  servicePayableAddItem: HKCLMOfClaimAssessmentController.servicePayableAddItem,
  claimNo: HKCLMOfClaimAssessmentController.claimProcessData.claimNo,
  taskNotEditable: claimEditable.taskNotEditable,
}))
class ServiceListItemOfPayableList extends Component {
  shouldComponentUpdate(nextProps) {
    const {
      curServicePayableList: nextServicePayableList,
      servicePayableAddItem: nextServicePayableAddItem,
    } = nextProps;
    const { curServicePayableList, servicePayableAddItem } = this.props;

    return (
      !lodash.isEqual(nextServicePayableList, curServicePayableList) ||
      !lodash.isEqual(nextServicePayableAddItem, servicePayableAddItem)
    );
  }

  handleAdd = () => {
    const { dispatch, serviceItemId, incidentId, treatmentId, invoiceId, claimNo } = this.props;
    dispatch({
      type: 'HKCLMOfClaimAssessmentController/addServicePayableItem',
      payload: {
        serviceItemId,
        incidentId,
        treatmentId,
        invoiceId,
        claimNo,
      },
    });
  };

  render() {
    const {
      serviceItemId,
      servicePayableAddItem,
      incidentId,
      treatmentId,
      invoiceId,
      curServicePayableList,
      taskNotEditable,
    } = this.props;
    const isBelongToCurrentItem =
      servicePayableAddItem && serviceItemId === servicePayableAddItem.serviceItemId;

    return (
      <div>
        {curServicePayableList &&
          lodash.map(curServicePayableList, (item) => (
            <ServiceListItemOfPayableListItem
              serviceItemPayableId={item}
              key={item}
              serviceItemId={serviceItemId}
              curServicePayableList={curServicePayableList}
            />
          ))}
        {servicePayableAddItem && isBelongToCurrentItem && (
          <ServiceListItemOfPayableListItemAdd
            incidentId={incidentId}
            treatmentId={treatmentId}
            invoiceId={invoiceId}
            serviceItemPayableDetail={servicePayableAddItem}
            curServicePayableList={curServicePayableList}
          />
        )}
        {!taskNotEditable && (
          <ButtonOfClaim
            handleClick={this.handleAdd}
            buttonText={formatMessageApi({
              Label_BPM_Button:
                'app.navigator.task-detail-of-claim-assessment.button.service-payable',
            })}
          />
        )}
      </div>
    );
  }
}

export default ServiceListItemOfPayableList;
