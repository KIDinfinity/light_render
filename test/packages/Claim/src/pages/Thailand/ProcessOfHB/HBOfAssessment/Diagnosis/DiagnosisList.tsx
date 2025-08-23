import React, { Component } from 'react';
import { connect } from 'dva';
import type { Dispatch } from 'redux';
import{ v4 as  uuidv4 } from 'uuid';
import lodash from 'lodash';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import { DIAGNOSISITEM } from '@/utils/claimConstant';
import CommonEmpty from '@/components/Empty';
import DiagnosisListItem from './DiagnosisListItem';
import styles from './DiagnosisList.less';
import ErrorTooltipManual from 'claim/components/ErrorTooltipManual';
import { formUtils } from 'basic/components/Form';
import type { IIncident } from '@/dtos/claim';

interface IProps {
  dispatch: Dispatch<any>;
  incidentId: string;
  claimNo: string;
  incidentItem: IIncident;
  submited: boolean;
  hasTreatment: boolean;
  diagnosisListMap: any;
}

@connect(({ hbOfClaimAssessmentController, formCommonController }: any, { incidentId }: any) => ({
  claimNo: hbOfClaimAssessmentController.claimProcessData.claimNo,
  incidentItem: hbOfClaimAssessmentController.claimEntities.incidentListMap[incidentId],
  diagnosisListMap: hbOfClaimAssessmentController.claimEntities.diagnosisListMap,
  submited: formCommonController.submited,
}))
class DiagnosisList extends Component<IProps> {
  handleAdd = () => {
    const { dispatch, claimNo, incidentId } = this.props;
    const addDiagnosisItem = {
      ...DIAGNOSISITEM,
      claimNo,
      id: uuidv4(),
      incidentId,
    };

    dispatch({
      type: 'hbOfClaimAssessmentController/addDiagnosisItem',
      payload: {
        incidentId,
        addDiagnosisItem,
      },
    });
  };

  render() {
    const { incidentId, incidentItem, hasTreatment, diagnosisListMap, submited } = this.props;
    const { diagnosisList } = incidentItem;
    const existDiagnosisCodes = lodash
      .values(diagnosisListMap)
      .filter((item: any) => lodash.compact(diagnosisList).includes(item.id))
      .map((item) => formUtils.queryValue(item.diagnosisCode));

    return (
      <div className={styles.diagnosiCard}>
        <div>
          <h3 className={styles.title}>
            {formatMessageApi({
              Label_BIZ_Claim: 'app.navigator.task-detail-of-data-capture.title.diagnosis',
            })}
          </h3>
          {submited && lodash.isEmpty(diagnosisList) && (
            <ErrorTooltipManual
              manualErrorMessage={formatMessageApi(
                { Label_COM_WarningMessage: 'ERR_000011' },
                'Diagnosis'
              )}
            />
          )}
          {lodash.map(lodash.compact(diagnosisList), (item: any, index: number) => (
            <DiagnosisListItem
              incidentId={incidentId}
              diagnosisId={item}
              existDiagnosisCodes={existDiagnosisCodes}
              key={item}
              dataIndex={index}
              hasTreatment={hasTreatment}
            />
          ))}
          {diagnosisList && diagnosisList.length === 0 && <CommonEmpty />}
        </div>
      </div>
    );
  }
}

export default DiagnosisList;
