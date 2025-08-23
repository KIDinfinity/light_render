import React, { Component } from 'react';
import { connect } from 'dva';
import lodash from 'lodash';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import ButtonOfClaim from 'claim/components/ButtonOfClaim';
import { eBenefitCategory } from 'claim/enum/BenefitCategory';
import { getTreatmentPayableList } from 'claim/pages/utils/selector';
import TreatmentPayableListItem from './TreatmentPayableListItem';
import TreatmentPayableListItemAdd from './TreatmentPayableListItemAdd';

@connect(({ HKCLMOfClaimAssessmentController, claimEditable }: any, { treatmentId }: any) => ({
  curTreatmentPayableList: getTreatmentPayableList(
    treatmentId,
    HKCLMOfClaimAssessmentController.claimEntities.treatmentPayableListMap
  ),
  treatmentPayableAddItem: HKCLMOfClaimAssessmentController.treatmentPayableAddItem,
  claimNo: HKCLMOfClaimAssessmentController.claimProcessData.claimNo,
  taskNotEditable: claimEditable.taskNotEditable,
  claimPayableListMap: HKCLMOfClaimAssessmentController.claimEntities.claimPayableListMap,
}))
class TreatmentPayableList extends Component {
  shouldComponentUpdate(nextProps) {
    const {
      claimNo: nextClaimNo,
      curTreatmentPayableList: nextCurTreatmentPayableList,
      treatmentPayableAddItem: nextTreatmentPayableAddItem,
    } = nextProps;
    const { claimNo, curTreatmentPayableList, treatmentPayableAddItem } = this.props;

    return (
      !(claimNo === nextClaimNo) ||
      !lodash.isEqual(curTreatmentPayableList, nextCurTreatmentPayableList) ||
      !lodash.isEqual(treatmentPayableAddItem, nextTreatmentPayableAddItem)
    );
  }

  handleAdd = () => {
    const { dispatch, incidentId, treatmentId, claimNo } = this.props;
    dispatch({
      type: 'HKCLMOfClaimAssessmentController/addTreatmentPayableItem',
      payload: {
        incidentId,
        treatmentId,
        claimNo,
      },
    });
  };

  render() {
    const {
      treatmentId,
      treatmentPayableAddItem,
      curTreatmentPayableList,
      incidentId,
      taskNotEditable,
      claimPayableListMap,
    } = this.props;
    const isBelongToCurrentItem =
      treatmentPayableAddItem && treatmentId === treatmentPayableAddItem.treatmentId;

    return (
      <div>
        {lodash.map(lodash.compact(curTreatmentPayableList), (item: any) => {
          const payableId = item?.payableId;
          const benefitCategory = lodash.get(claimPayableListMap, `${payableId}.benefitCategory`);
          return (
            (eBenefitCategory.Cashless === benefitCategory ||
              eBenefitCategory.Aipa === benefitCategory) && (
              <TreatmentPayableListItem
                treatmentPayableItemId={item.id}
                key={item.id}
                curTreatmentPayableList={curTreatmentPayableList}
              />
            )
          );
        })}
        {treatmentPayableAddItem && isBelongToCurrentItem && (
          <TreatmentPayableListItemAdd
            treatmentPayableItemDetail={treatmentPayableAddItem}
            curTreatmentPayableList={curTreatmentPayableList}
            incidentId={incidentId}
            treatmentId={treatmentId}
          />
        )}
        {!taskNotEditable && (
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
