import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { formUtils } from 'basic/components/Form';
import CardOfClaim from 'basic/components/Form/FormCard';
import ClaimPayableListItemOfBasicInfo from './ClaimPayableListItemOfBasicInfo';

@connect(
  (
    { PHCLMOfClaimAssessmentController, formCommonController, claimEditable }: any,
    { incidentPayableId }: any
  ) => ({
    policyBackgrounds: formCommonController.policyBackgrounds,
    incidentPayableItem:
      PHCLMOfClaimAssessmentController.claimEntities.claimPayableListMap[incidentPayableId],
    taskNotEditable: claimEditable.taskNotEditable,
  })
)
class ClaimPayableListItem extends PureComponent {
  handleDelete = () => {
    const { incidentPayableId, dispatch }: any = this.props;
    dispatch({
      type: 'PHCLMOfClaimAssessmentController/removeClaimPayableItem',
      payload: {
        incidentPayableId,
      },
    });
  };

  render() {
    const {
      hasTreatment,
      policyBackgrounds,
      incidentPayableItem,
      incidentPayableId,
      taskNotEditable,
    }: any = this.props;

    return (
      <CardOfClaim
        showButton={!taskNotEditable && !incidentPayableItem?.registered}
        handleClick={this.handleDelete}
        cardStyle={
          policyBackgrounds && formUtils.queryValue(incidentPayableItem.policyNo)
            ? {
                background: policyBackgrounds[formUtils.queryValue(incidentPayableItem.policyNo)],
              }
            : {}
        }
      >
        <ClaimPayableListItemOfBasicInfo
          incidentPayableId={incidentPayableId}
          hasTreatment={hasTreatment}
          incidentPayableItem={incidentPayableItem}
        />
      </CardOfClaim>
    );
  }
}

export default ClaimPayableListItem;
