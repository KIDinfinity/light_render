import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { formUtils } from 'basic/components/Form';
import CardOfClaim from 'basic/components/Form/FormCard';
import IncidentListItemOfPayableListItemOfLife from './IncidentListItemOfPayableListItemOfLife';
import IncidentListItemOfPayableListItemOfBasicInfo from './IncidentListItemOfPayableListItemOfBasicInfo';
import styles from './IncidentListItem.less';

@connect(({ JPCLMOfClaimAssessmentController, claimEditable }, { incidentPayableId }) => ({
  policyBackgrounds: JPCLMOfClaimAssessmentController?.policyBackgrounds,
  taskNotEditable: claimEditable.taskNotEditable,
  incidentPayableItem:
    JPCLMOfClaimAssessmentController.claimEntities.claimPayableListMap[incidentPayableId],
}))
class IncidentListItemOfPayableListItem extends PureComponent {
  handleDelete = () => {
    const { incidentPayableId, dispatch } = this.props;
    dispatch({
      type: 'JPCLMOfClaimAssessmentController/deleteIncidentPayableItem',
      payload: {
        incidentPayableId,
      },
    });
  };

  render() {
    const { taskNotEditable, incidentPayableItem, policyBackgrounds } = this.props;
    return (
      <CardOfClaim
        showButton={!taskNotEditable}
        handleClick={this.handleDelete}
        cardStyle={
          formUtils.queryValue(incidentPayableItem.policyNo)
            ? {
                background: policyBackgrounds?.[formUtils.queryValue(incidentPayableItem.policyNo)],
              }
            : {}
        }
        className={styles.incidentPayableBorder}
      >
        <IncidentListItemOfPayableListItemOfBasicInfo incidentPayableItem={incidentPayableItem} />
        {incidentPayableItem?.benefitCategory === 'L' && incidentPayableItem?.lifePayable && (
          <IncidentListItemOfPayableListItemOfLife incidentPayableItem={incidentPayableItem} />
        )}
      </CardOfClaim>
    );
  }
}

export default IncidentListItemOfPayableListItem;
