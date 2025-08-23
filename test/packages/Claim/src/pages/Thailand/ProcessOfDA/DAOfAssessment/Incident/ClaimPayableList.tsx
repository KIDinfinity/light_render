import React, { Component } from 'react';
import { connect } from 'dva';
import lodash from 'lodash';
import{ v4 as  uuidv4 } from 'uuid';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import { CLAIMPAYABLEITEM } from '@/utils/claimConstant';
import ButtonOfClaim from 'claim/components/ButtonOfClaim';
import { getClaimPayableList, getMaxViewOrder } from 'claim/pages/utils/selector';
import ClaimPayableListItem from './ClaimPayableListItem';

// @ts-ignore
@connect(({ daOfClaimAssessmentController, claimEditable }: any, { incidentId }: any) => ({
  claimNo: daOfClaimAssessmentController.claimProcessData.claimNo,
  insuredId: daOfClaimAssessmentController.claimProcessData.insured.insuredId,
  curIncidentPayableList: getClaimPayableList(
    incidentId,
    daOfClaimAssessmentController.claimEntities.claimPayableListMap,
    daOfClaimAssessmentController.claimProcessData.claimPayableList
  ),
  invoiceListMap: daOfClaimAssessmentController.claimEntities.invoiceListMap,
  claimPayableListMap: daOfClaimAssessmentController.claimEntities.claimPayableListMap,
  incidentDecisionListMap: daOfClaimAssessmentController.claimEntities.claimPayableListMap,
  taskNotEditable: claimEditable.taskNotEditable,
}))
class ClaimPayableList extends Component {
  shouldComponentUpdate(nextProps: any) {
    const {
      hasTreatment: nextHasTreatment,
      claimNo: nextClaimNo,
      curIncidentPayableList: nextCurIncidentPayableList,
    } = nextProps;
    const { hasTreatment, claimNo, curIncidentPayableList }: any = this.props;

    return (
      !(hasTreatment === nextHasTreatment) ||
      !(claimNo === nextClaimNo) ||
      !lodash.isEqual(curIncidentPayableList, nextCurIncidentPayableList)
    );
  }

  get viewOrder() {
    const { claimPayableListMap }: any = this.props;
    return getMaxViewOrder(claimPayableListMap);
  }

  handleAdd = () => {
    const { dispatch, incidentId, claimNo, insuredId }: any = this.props;

    const addClaimPayableItem = {
      ...CLAIMPAYABLEITEM,
      insuredId,
      claimNo,
      id: uuidv4(),
      incidentId,
      manualAdd: 'Y',
      viewOrder: this.viewOrder + 1,
    };
    dispatch({
      type: 'daOfClaimAssessmentController/addClaimPayableItem',
      payload: { addClaimPayableItem },
    });
  };

  render() {
    const { curIncidentPayableList, hasTreatment, taskNotEditable }: any = this.props;
    return (
      <div>
        {lodash.map(curIncidentPayableList, (item: any) => (
          <ClaimPayableListItem
            key={item.id}
            incidentPayableId={item.id}
            hasTreatment={hasTreatment}
            curIncidentPayableList={curIncidentPayableList}
          />
        ))}
        {!taskNotEditable && (
          <ButtonOfClaim
            handleClick={this.handleAdd}
            buttonText={formatMessageApi({
              Label_BPM_Button:
                'app.navigator.task-detail-of-claim-assessment.button.incident-payable',
            })}
          />
        )}
      </div>
    );
  }
}

export default ClaimPayableList;
