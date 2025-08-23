import React, { PureComponent } from 'react';
import { connect } from 'dva';
import{ v4 as  uuidv4 } from 'uuid';
import { compact, map } from 'lodash';

import { formatMessageApi } from '@/utils/dictFormatMessage';
import { JPMEDICINETREATMENT, JPTREATMENTDATE } from '@/utils/claimConstant';
import ButtonOfClaim from 'claim/components/ButtonOfClaim';
import JPMedicineTreatmentListItem from './JPMedicineTreatmentListItem';
import styles from './JPMedicineTreatmentList.less';

@connect(({ JPCLMOfClaimAssessmentController, claimEditable }, { treatmentId }) => ({
  claimNo: JPCLMOfClaimAssessmentController?.claimProcessData?.claimNo,
  jpMedicineTreatmentList:
    JPCLMOfClaimAssessmentController.claimEntities.treatmentListMap[treatmentId]
      ?.jpMedicineTreatmentList,
  taskNotEditable: claimEditable.taskNotEditable,
}))
class JPMedicineTreatmentList extends PureComponent {
  handleAdd = () => {
    const { dispatch, treatmentId, claimNo } = this.props;

    const medicineId = uuidv4();
    const treatmentDateId = uuidv4();
    const addMedicineItem = {
      ...JPMEDICINETREATMENT,
      claimNo,
      id: medicineId,
      treatmentId,
      jpTreatmentDateList: [treatmentDateId],
    };
    const addTreatmentDateItem = {
      ...JPTREATMENTDATE,
      claimNo,
      id: treatmentDateId,
      treatmentId,
      medicineId,
    };
    dispatch({
      type: 'JPCLMOfClaimAssessmentController/addMedicineItem',
      payload: {
        treatmentId,
        addMedicineItem,
        addTreatmentDateItem,
      },
    });
  };

  render() {
    const { jpMedicineTreatmentList, treatmentId, incidentId, taskNotEditable } = this.props;

    const isShow = compact(jpMedicineTreatmentList).length > 0 || !taskNotEditable;

    return (
      <div className={isShow ? styles.medicineCard : ''}>
        {isShow && (
          <div>
            <h3 className={styles.title}>
              {formatMessageApi({
                Label_BIZ_Claim: 'app.navigator.JPCA-of-manual-assessment.label.medicine-treatment',
              })}
            </h3>
            {map(compact(jpMedicineTreatmentList), (item) => (
              <JPMedicineTreatmentListItem
                incidentId={incidentId}
                treatmentId={treatmentId}
                medicineId={item}
                key={item}
              />
            ))}
          </div>
        )}
        {!taskNotEditable && (
          <ButtonOfClaim
            handleClick={this.handleAdd}
            buttonText={formatMessageApi({
              Label_BIZ_Claim: 'app.navigator.JPCA-of-manual-assessment.label.medicine-treatment',
            })}
          />
        )}
      </div>
    );
  }
}

export default JPMedicineTreatmentList;
