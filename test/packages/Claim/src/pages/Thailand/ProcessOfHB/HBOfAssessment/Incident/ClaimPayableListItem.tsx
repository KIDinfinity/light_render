import React, { Component } from 'react';
import { connect } from 'dva';
import { formUtils } from 'basic/components/Form';
import CardOfClaim from 'basic/components/Form/FormCard';
import ClaimPayableListItemOfBasicInfo from './ClaimPayableListItemOfBasicInfo';

@connect(
  (
    { hbOfClaimAssessmentController, formCommonController, claimEditable }: any,
    { incidentPayableId }: any
  ) => ({
    policyBackgrounds: formCommonController.policyBackgrounds || {},
    incidentPayableItem:
      hbOfClaimAssessmentController.claimEntities.claimPayableListMap[incidentPayableId],
    taskNotEditable: claimEditable.taskNotEditable,
  })
)
class ClaimPayableListItem extends Component {
  handleDelete = () => {
    const { incidentPayableId, dispatch }: any = this.props;
    dispatch({
      type: 'hbOfClaimAssessmentController/removeClaimPayableItem',
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
      existProduceCodes,
      taskNotEditable,
    }: any = this.props;

    return (
      <CardOfClaim
        showButton={!taskNotEditable && incidentPayableItem.manualAdd === 'Y'}
        handleClick={this.handleDelete}
        cardStyle={
          formUtils.queryValue(incidentPayableItem.policyNo)
            ? {
                background: policyBackgrounds[formUtils.queryValue(incidentPayableItem.policyNo)],
              }
            : {}
        }
      >
        <ClaimPayableListItemOfBasicInfo
          incidentPayableId={incidentPayableId}
          hasTreatment={hasTreatment}
          existProduceCodes={existProduceCodes}
        />
      </CardOfClaim>
    );
  }
}

export default ClaimPayableListItem;
