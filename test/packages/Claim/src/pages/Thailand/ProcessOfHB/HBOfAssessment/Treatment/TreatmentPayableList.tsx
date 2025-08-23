import React, { Component } from 'react';
import { connect } from 'dva';
import lodash from 'lodash';
import { formUtils } from 'basic/components/Form';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import { TREATMENTPAYABLEITEM } from '@/utils/claimConstant';
import{ v4 as  uuidv4 } from 'uuid';
import ButtonOfClaim from 'claim/components/ButtonOfClaim';
import TreatmentPayableListItem from './TreatmentPayableListItem';
import TreatmentPayableListItemAdd from './TreatmentPayableListItemAdd';

const mapStateToProps = (
  { hbOfClaimAssessmentController, claimEditable }: any,
  { treatmentId }: any
) => {
  const { claimEntities } = hbOfClaimAssessmentController;
  const treatmentPayableListMapEntries = Object.entries(claimEntities.treatmentPayableListMap);
  const { claimPayableListMap } = claimEntities;
  const treatmentPayableListItemIds: any = [];
  lodash.map(treatmentPayableListMapEntries, (item: any) => {
    if (item[1].treatmentId === treatmentId) {
      treatmentPayableListItemIds.push({
        treatmentPayableItemId: item[0],
        policyNo: formUtils.queryValue(item[1].policyNo),
        benefitCategory: lodash.get(claimPayableListMap, `${item[1].payableId}.benefitCategory`),
      });
    }
  });
  const curTreatmentPayableList = lodash.map(treatmentPayableListItemIds, (item) => ({
    id: item.treatmentPayableItemId,
    benefitCategory: item.benefitCategory,
  }));

  return {
    curTreatmentPayableList,
    treatmentPayableAddItem: hbOfClaimAssessmentController.treatmentPayableAddItem,
    claimNo: hbOfClaimAssessmentController.claimProcessData.claimNo,
    claimPayableListMap,
    taskNotEditable: claimEditable.taskNotEditable,
  };
};

@connect(mapStateToProps)
class TreatmentPayableList extends Component {
  shouldComponentUpdate(nextProps: any) {
    const {
      curTreatmentPayableList: nextCurTreatmentPayableList,
      treatmentPayableAddItem: nextTreatmentPayableAddItem,
    } = nextProps;
    const { curTreatmentPayableList, treatmentPayableAddItem }: any = this.props;

    return (
      !lodash.isEqual(nextCurTreatmentPayableList, curTreatmentPayableList) ||
      !lodash.isEqual(nextTreatmentPayableAddItem, treatmentPayableAddItem)
    );
  }

  handleAdd = () => {
    const { dispatch, incidentId, treatmentId, claimNo }: any = this.props;
    const addTreamentPayableItem = {
      ...TREATMENTPAYABLEITEM,
      claimNo,
      id: uuidv4(),
      treatmentId,
      incidentId,
    };
    dispatch({
      type: 'hbOfClaimAssessmentController/addTreatmentPayableAddItem',
      payload: { addTreamentPayableItem },
    });
  };

  render() {
    const {
      curTreatmentPayableList,
      treatmentId,
      treatmentPayableAddItem,
      incidentId,
      taskNotEditable,
    }: any = this.props;
    const isBelongToCurrentItem =
      treatmentPayableAddItem && treatmentId === treatmentPayableAddItem.treatmentId;

    return (
      <div>
        {curTreatmentPayableList &&
          lodash.map(curTreatmentPayableList, (item: any) => {
            if (item.benefitCategory !== 'R') {
              return <TreatmentPayableListItem treatmentPayableItemId={item.id} key={item.id} />;
            }
          })}
        {treatmentPayableAddItem && isBelongToCurrentItem && (
          <TreatmentPayableListItemAdd
            treatmentPayableItemDetail={treatmentPayableAddItem}
            incidentId={incidentId}
          />
        )}
        {!taskNotEditable && false && (
          <ButtonOfClaim
            handleClick={this.handleAdd}
            buttonText={formatMessageApi({
              Label_BPM_Button:
                'app.navigator.task-detail-of-claim-assessment.button.treatment-payable',
            })}
          />
        )}
      </div>
    );
  }
}

export default TreatmentPayableList;
