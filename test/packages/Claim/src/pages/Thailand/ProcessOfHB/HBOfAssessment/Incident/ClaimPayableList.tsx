import React, { Component } from 'react';
import { connect } from 'dva';
import lodash from 'lodash';
import{ v4 as  uuidv4 } from 'uuid';
import { formUtils } from 'basic/components/Form';
import { CLAIMPAYABLEITEM } from '@/utils/claimConstant';
import ClaimPayableListItem from './ClaimPayableListItem';

const mapStateToProps = ({ hbOfClaimAssessmentController }: any, { incidentId }: any) => {
  const { claimEntities, claimProcessData } = hbOfClaimAssessmentController;
  const { claimPayableList } = claimProcessData;
  const { claimPayableListMap } = claimEntities;
  const claimPayableListItemIds: any = [];
  lodash.map(claimPayableList, (item: any) => {
    const claimPayableItem = claimPayableListMap[item] || {};
    if (claimPayableItem.incidentId === incidentId) {
      claimPayableListItemIds.push({
        claimPayableItemId: item,
        policyNo: formUtils.queryValue(claimPayableItem.policyNo),
      });
    }
  });

  return {
    curIncidentPayableList: lodash.map(claimPayableListItemIds, (item) => item.claimPayableItemId),
    claimNo: hbOfClaimAssessmentController.claimProcessData.claimNo,
    claimPayableListMap: lodash.get(
      hbOfClaimAssessmentController,
      'claimEntities.claimPayableListMap'
    ),
  };
};

@connect(mapStateToProps)
class ClaimPayableList extends Component {
  shouldComponentUpdate(nextProps: any) {
    const { curIncidentPayableList: nextCurIncidentPayableList } = nextProps;
    const { curIncidentPayableList }: any = this.props;

    return !lodash.isEqual(nextCurIncidentPayableList, curIncidentPayableList);
  }

  handleAdd = () => {
    const { dispatch, incidentId, claimNo }: any = this.props;

    const addClaimPayableItem = {
      ...CLAIMPAYABLEITEM,
      claimNo,
      id: uuidv4(),
      incidentId,
      manualAdd: 'Y',
    };

    dispatch({
      type: 'hbOfClaimAssessmentController/addClaimPayableItem',
      payload: { addClaimPayableItem },
    });
  };

  render() {
    const { curIncidentPayableList, hasTreatment, claimPayableListMap }: any = this.props;
    const existProduceCodes = lodash
      .values(claimPayableListMap)
      .filter((item: any) => lodash.includes(curIncidentPayableList, item.id))
      .filter((item: any) => formUtils.queryValue(item.benefitTypeCode))
      .map((item) => [
        formUtils.queryValue(item.policyNo),
        formUtils.queryValue(item.benefitTypeCode),
      ]);

    return (
      <div>
        {curIncidentPayableList &&
          lodash.map(curIncidentPayableList, (item: any) => (
            <ClaimPayableListItem
              key={item}
              incidentPayableId={item}
              hasTreatment={hasTreatment}
              existProduceCodes={existProduceCodes}
            />
          ))}
      </div>
    );
  }
}

export default ClaimPayableList;
