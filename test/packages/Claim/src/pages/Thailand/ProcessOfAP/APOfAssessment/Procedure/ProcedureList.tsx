import React, { Component } from 'react';
import { connect } from 'dva';
import type { Dispatch } from 'redux';
import { v4 as uuidv4 } from 'uuid';
import lodash from 'lodash';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import { PROCEDUREITEM } from '@/utils/claimConstant';
import ButtonOfClaim from 'claim/components/ButtonOfClaim';
import { getProcedureList } from 'claim/pages/utils/selector';
import ProcedureItem from './ProcedureListItem';
import styles from './ProcedureList.less';
import { isReimbursement, isIDAC, isOPDCashless } from 'claim/pages/Thailand/flowConfig';

interface IProps {
  dispatch: Dispatch<any>;
  treatmentId: string;
  claimNo: string;
  incidentId: string;
  procedureList: any;
  caseCategory: string;
  activityKey: string;
}

@connect(
  ({ apOfClaimAssessmentController, claimEditable, processTask }: any, { treatmentId }: any) => ({
    claimNo: lodash.get(apOfClaimAssessmentController, 'claimProcessData.claimNo'),
    procedureList: getProcedureList(
      treatmentId,
      apOfClaimAssessmentController.claimEntities?.procedureListMap
    ),
    taskNotEditable: claimEditable.taskNotEditable,
    caseCategory: apOfClaimAssessmentController.claimProcessData.caseCategory,
    activityKey: processTask.getTask.activityKey,
  })
)
class ProcedureList extends Component<IProps> {
  componentDidMount(): void {
    const { caseCategory, activityKey, dispatch } = this.props;
    const isHistory = lodash.includes(window.location?.pathname, 'claim/history');
    const displaySurgicalPackage =
      (isReimbursement(caseCategory) || isIDAC(caseCategory) || isOPDCashless(caseCategory)) &&
      (['CP_ACT003', 'CP_ACT004'].includes(activityKey) || isHistory);
    dispatch({
      type: 'apOfClaimAssessmentController/initProcedureItemConfig',
      payload: {
        displaySurgicalPackage,
        isHistory,
      },
    });
  }
  shouldComponentUpdate(nextProps: any) {
    const { procedureList: nextProcedureList } = nextProps;
    const { procedureList } = this.props;

    return !lodash.isEqual(nextProcedureList, procedureList);
  }

  handleAdd = () => {
    const { dispatch, treatmentId, claimNo } = this.props;
    const addProcedureItem = {
      ...PROCEDUREITEM,
      claimNo,
      id: uuidv4(),
      treatmentId,
    };

    dispatch({
      type: 'apOfClaimAssessmentController/addProcedureItem',
      payload: {
        treatmentId,
        addProcedureItem,
      },
    });
  };

  render() {
    const { procedureList, treatmentId, incidentId, taskNotEditable } = this.props;

    const isShow = lodash.compact(procedureList).length > 0 || !taskNotEditable;

    return (
      <div className={isShow ? styles.procedureCard : ''}>
        {isShow && (
          <div>
            <h3 className={styles.title}>
              {formatMessageApi({
                Label_BIZ_Claim:
                  'app.navigator.task-detail-of-data-capture.title.medical-surgical-procedure',
              })}
            </h3>
            {lodash.map(lodash.compact(procedureList), (item: any, index: number) => (
              <ProcedureItem
                incidentId={incidentId}
                treatmentId={treatmentId}
                procedureId={item.id}
                dataIndex={index}
                key={item.id}
              />
            ))}
          </div>
        )}
        {!taskNotEditable && (
          <ButtonOfClaim
            handleClick={this.handleAdd}
            buttonText={formatMessageApi({
              Label_BPM_Button: 'app.navigator.task-detail-of-data-capture.button.procedure',
            })}
          />
        )}
      </div>
    );
  }
}

export default ProcedureList;
