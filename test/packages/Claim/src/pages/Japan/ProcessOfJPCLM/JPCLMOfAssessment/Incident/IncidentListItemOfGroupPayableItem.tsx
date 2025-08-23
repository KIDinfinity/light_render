import React, { PureComponent } from 'react';
import { connect } from 'dva';
import lodash from 'lodash';
import CardOfClaim from 'basic/components/Form/FormCard';
import { formUtils } from 'basic/components/Form';
import IncidentListItemOfGroupPayableItemInfo from './IncidentListItemOfGroupPayableItemInfo';
import IncidentListItemOfPayableListItem from './IncidentListItemOfPayableListItem';

@connect(({ JPCLMOfClaimAssessmentController }) => ({
  policyBackgrounds: JPCLMOfClaimAssessmentController?.policyBackgrounds,
}))
class IncidentItemOfGroupClaimPayableItem extends PureComponent {
  render() {
    const { groupIncidentPayableItem, policyBackgrounds } = this.props;
    const { payableList } = groupIncidentPayableItem;
    return (
      <CardOfClaim
        showButton={false}
        cardStyle={
          formUtils.queryValue(groupIncidentPayableItem.policyNo)
            ? {
                background:
                  policyBackgrounds?.[formUtils.queryValue(groupIncidentPayableItem.policyNo)],
              }
            : {}
        }
      >
        <IncidentListItemOfGroupPayableItemInfo incidentPayableInfo={groupIncidentPayableItem} />
        {lodash.map(payableList, (item) => (
          <IncidentListItemOfPayableListItem key={item} incidentPayableId={item} />
        ))}
      </CardOfClaim>
    );
  }
}

export default IncidentItemOfGroupClaimPayableItem;
