import React, { Component } from 'react';
import { connect } from 'dva';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import lodash from 'lodash';
import{ v4 as  uuidv4 } from 'uuid';
import { INCIDENTDECISIONITEM } from '@/utils/claimConstant';
import ButtonOfClaim from 'claim/components/ButtonOfClaim';
import { getIncidentDecisionList, getMaxViewOrder } from 'claim/pages/utils/selector';
import IncidentDecisionListItem from './IncidentDecisionListItem';

@connect(({ apOfClaimAssessmentController, claimEditable }: any, { incidentId }: any) => ({
  claimNo: apOfClaimAssessmentController.claimProcessData.claimNo,
  curincidentDecisionList: getIncidentDecisionList(
    incidentId,
    apOfClaimAssessmentController.claimEntities.incidentDecisionListMap,
    apOfClaimAssessmentController.claimProcessData.apIncidentDecisionList
  ),
  incidentDecisionListMap: apOfClaimAssessmentController.claimEntities.incidentDecisionListMap,
  taskNotEditable: claimEditable.taskNotEditable,
}))
class IncidentDecisionList extends Component {
  shouldComponentUpdate(nextProps) {
    const {
      claimNo: nextClaimNo,
      curincidentDecisionList: nextCurincidentDecisionList,
      incidentDecisionListMap: nextIncidentDecisionListMap,
    } = nextProps;
    const { claimNo, curincidentDecisionList, incidentDecisionListMap } = this.props;

    return (
      !(claimNo === nextClaimNo) ||
      !lodash.isEqual(curincidentDecisionList, nextCurincidentDecisionList) ||
      !lodash.isEqual(incidentDecisionListMap, nextIncidentDecisionListMap)
    );
  }

  get viewOrder() {
    const { incidentDecisionListMap } = this.props;
    return getMaxViewOrder(incidentDecisionListMap);
  }

  handleAdd = () => {
    const { dispatch, incidentId, claimNo } = this.props;

    dispatch({
      type: 'apOfClaimAssessmentController/addIncidentDecisionItem',
      payload: {
        incidentDecisionItem: {
          ...INCIDENTDECISIONITEM,
          claimNo,
          incidentId,
          id: uuidv4(),
          manualAdd: 'Y',
          viewOrder: this.viewOrder + 1,
        },
      },
    });
  };

  render() {
    const { curincidentDecisionList, taskNotEditable } = this.props;

    return (
      <div>
        {lodash.map(lodash.compact(curincidentDecisionList), (item: any) => (
          <IncidentDecisionListItem
            key={item.id}
            incidentDecisionId={item.id}
            curincidentDecisionList={curincidentDecisionList}
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

export default IncidentDecisionList;
