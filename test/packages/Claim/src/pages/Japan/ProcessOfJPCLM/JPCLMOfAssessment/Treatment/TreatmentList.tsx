import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { compact, map } from 'lodash';
import{ v4 as  uuidv4 } from 'uuid';

import { formatMessageApi } from '@/utils/dictFormatMessage';
import { TREATMENTITEM } from '@/utils/claimConstant';
import ButtonOfClaim from 'claim/components/ButtonOfClaim';
import TreatmentListItem from './TreatmentListItem';
import styles from './TreatmentList.less';
import { formUtils } from 'basic/components/Form';
import ErrorTooltipManual from 'claim/components/ErrorTooltipManual';
import { VLD_000054 } from '@/utils/validations';

@connect(({ JPCLMOfClaimAssessmentController, claimEditable }, { incidentId }) => ({
  claimNo: JPCLMOfClaimAssessmentController?.claimProcessData?.claimNo,
  treatmentList:
    JPCLMOfClaimAssessmentController.claimEntities.incidentListMap[incidentId]?.treatmentList,
  claimTypeArray: formUtils.queryValue(
    JPCLMOfClaimAssessmentController.claimEntities.incidentListMap[incidentId]?.claimTypeArray
  ),
  taskNotEditable: claimEditable.taskNotEditable,
}))
class TreatmentList extends PureComponent {
  handleAdd = () => {
    const { dispatch, incidentId, claimNo, treatmentList } = this.props;
    const treatmentId = uuidv4();

    const addTreatmentItem = {
      ...TREATMENTITEM,
      claimNo,
      id: treatmentId,
      incidentId,
      otherProcedureList: [],
      procedureList: [],
      treatmentNo: compact(treatmentList).length + 1,
    };

    dispatch({
      type: 'JPCLMOfClaimAssessmentController/addTreatmentItem',
      payload: {
        incidentId,
        addTreatmentItem,
      },
    });
  };

  render() {
    const {
      treatmentList,
      incidentId,
      leftOffsetHeight,
      claimTypeArray,
      taskNotEditable,
    } = this.props;

    return (
      <div
        className={`${styles.content} ${styles['black-scroll']}`}
        style={{ height: leftOffsetHeight }}
      >
        {VLD_000054(claimTypeArray, treatmentList) && (
          <ErrorTooltipManual
            manualErrorMessage={formatMessageApi({ Label_COM_WarningMessage: 'ERR_000076' })}
          />
        )}
        {map(treatmentList, (item, index) => (
          <TreatmentListItem
            incidentId={incidentId}
            treatmentId={item}
            treatmentNo={index + 1}
            key={item}
          />
        ))}
        {!taskNotEditable && (
          <ButtonOfClaim
            handleClick={this.handleAdd}
            buttonText={formatMessageApi({
              Label_BIZ_Claim: 'app.navigator.task-detail-of-data-capture.title.treatment',
            })}
            buttonStyle={{ width: '100%', height: '36px' }}
          />
        )}
      </div>
    );
  }
}

export default TreatmentList;
