import React, { PureComponent } from 'react';
import { connect } from 'dva';
import{ v4 as  uuidv4 } from 'uuid';
import { compact, map } from 'lodash';

import { formatMessageApi } from '@/utils/dictFormatMessage';
import { OTHERPROCEDUREITEM } from '@/utils/claimConstant';
import ButtonOfClaim from 'claim/components/ButtonOfClaim';
import OtherProcedureListItem from './OtherProcedureListItem';
import styles from './OtherProcedureList.less';

@connect(({ JPCLMOfClaimAssessmentController, claimEditable }, { treatmentId }) => ({
  claimNo: JPCLMOfClaimAssessmentController?.claimProcessData?.claimNo,
  otherProcedureList:
    JPCLMOfClaimAssessmentController.claimEntities.treatmentListMap[treatmentId]
      ?.otherProcedureList,
  taskNotEditable: claimEditable.taskNotEditable,
}))
class OtherProcedureList extends PureComponent {
  handleAdd = () => {
    const { dispatch, treatmentId, claimNo } = this.props;
    const addOtherProcedureItem = {
      ...OTHERPROCEDUREITEM,
      claimNo,
      id: uuidv4(),
      treatmentId,
    };

    dispatch({
      type: 'JPCLMOfClaimAssessmentController/addOtherProcedureItem',
      payload: {
        treatmentId,
        addOtherProcedureItem,
      },
    });
  };

  render() {
    const { otherProcedureList, treatmentId, incidentId, taskNotEditable } = this.props;

    const isShow = compact(otherProcedureList).length > 0 || !taskNotEditable;

    return (
      <div className={isShow ? styles.procedureCard : ''}>
        {isShow && (
          <div>
            <h3 className={styles.title}>
              {formatMessageApi({
                Label_BIZ_Claim:
                  'app.navigator.task-detail-of-claim-assessment.title.medical-surgical-procedure',
              })}
            </h3>
            {map(compact(otherProcedureList), (item) => (
              <OtherProcedureListItem
                incidentId={incidentId}
                treatmentId={treatmentId}
                otherProcedureId={item}
                key={item}
              />
            ))}
          </div>
        )}
        {!taskNotEditable && (
          <ButtonOfClaim
            handleClick={this.handleAdd}
            buttonText={formatMessageApi({
              Label_BIZ_Claim:
                'app.navigator.task-detail-of-claim-assessment.title.medical-surgical-procedure',
            })}
          />
        )}
      </div>
    );
  }
}

export default OtherProcedureList;
