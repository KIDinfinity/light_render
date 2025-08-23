import React, { Component } from 'react';
import { connect } from 'dva';
import lodash from 'lodash';
import{ v4 as  uuidv4 } from 'uuid';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import { CLAIMPAYABLEITEM } from '@/utils/claimConstant';
import ButtonOfClaim from 'claim/components/ButtonOfClaim';
import { getGroupedClaimPayableList } from 'claim/pages/utils/selector';
import IncidentListItemOfPayableItemAdd from './IncidentListItemOfPayableItemAdd';
import IncidentListItemOfGroupPayableItem from './IncidentListItemOfGroupPayableItem';

@connect(({ JPCLMOfClaimAssessmentController, claimEditable }, { incidentId }) => ({
  claimNo: JPCLMOfClaimAssessmentController.claimProcessData.claimNo,
  curIncidentPayableGroupList: getGroupedClaimPayableList(
    incidentId,
    JPCLMOfClaimAssessmentController.claimEntities.claimPayableListMap
  ),
  incidentPayableAddItem: JPCLMOfClaimAssessmentController.incidentPayableAddItem,
  taskNotEditable: claimEditable.taskNotEditable,
}))
class IncidentListItemOfPayableList extends Component {
  shouldComponentUpdate(nextProps) {
    const {
      claimNo: nextClaimNo,
      curIncidentPayableGroupList: nextCurIncidentPayableList,
      incidentPayableAddItem: nextincidentPayableAddItem,
    } = nextProps;
    const { claimNo, curIncidentPayableGroupList, incidentPayableAddItem } = this.props;

    return (
      !(claimNo === nextClaimNo) ||
      !lodash.isEqual(curIncidentPayableGroupList, nextCurIncidentPayableList) ||
      !lodash.isEqual(incidentPayableAddItem, nextincidentPayableAddItem)
    );
  }

  handleAdd = () => {
    const { dispatch, incidentId, claimNo } = this.props;

    const addClaimPayableItem = {
      ...CLAIMPAYABLEITEM,
      claimNo,
      id: uuidv4(),
      incidentId,
    };

    dispatch({
      type: 'JPCLMOfClaimAssessmentController/addIncidentPayableItem',
      payload: { addClaimPayableItem },
    });
  };

  render() {
    const {
      curIncidentPayableGroupList,
      taskNotEditable,
      incidentPayableAddItem,
      incidentId,
    } = this.props;
    const isBelongToCurrentItem = incidentId === incidentPayableAddItem?.incidentId;

    return (
      <div>
        {!lodash.isEmpty(curIncidentPayableGroupList) &&
          lodash.map(curIncidentPayableGroupList, (item) => (
            <IncidentListItemOfGroupPayableItem key={item.id} groupIncidentPayableItem={item} />
          ))}
        {incidentPayableAddItem && isBelongToCurrentItem && (
          <IncidentListItemOfPayableItemAdd incidentPayableAddItemDetail={incidentPayableAddItem} />
        )}
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

export default IncidentListItemOfPayableList;
