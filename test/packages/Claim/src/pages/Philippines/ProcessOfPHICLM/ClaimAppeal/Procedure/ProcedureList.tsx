import React, { PureComponent } from 'react';
import { connect } from 'dva';
import{ v4 as  uuidv4 } from 'uuid';
import lodash from 'lodash';
import { PROCEDUREITEM } from '@/utils/claimConstant';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import ButtonOfClaim from 'claim/components/ButtonOfClaim';
import { withContextData } from '@/components/_store';
import ProcedureItem from './ProcedureListItem';

import styles from './ProcedureList.less';

@connect(
  (
    { PHCLMOfAppealCaseController, claimEditable }: any,
    { treatmentId, withData: { caseType } }: any
  ) => ({
    procedureList: caseType
      ? PHCLMOfAppealCaseController[caseType].claimEntities.treatmentListMap[treatmentId]
          .procedureList
      : PHCLMOfAppealCaseController.claimEntities.treatmentListMap[treatmentId].procedureList,
    taskNotEditable: claimEditable.taskNotEditable,
    claimNo: lodash.get(PHCLMOfAppealCaseController, 'claimProcessData.claimNo'),
  })
)
class ProcedureList extends PureComponent {
  handleAdd = () => {
    const { dispatch, treatmentId, claimNo } = this.props;
    const addProcedureItem = {
      ...PROCEDUREITEM,
      claimNo,
      id: uuidv4(),
      treatmentId,
    };

    dispatch({
      type: 'PHCLMOfAppealCaseController/addProcedureItem',
      payload: {
        treatmentId,
        addProcedureItem,
      },
    });
  };
  render() {
    const {
      procedureList,
      treatmentId,
      incidentId,
      taskNotEditable: notEditable,
      withData,
    } = this.props;

    const { appealNotEditable }: any = withData || {};
    const taskNotEditable = notEditable || appealNotEditable;

    const isShow = lodash.compact(procedureList).length > 0 || !taskNotEditable;

    return (
      <div className={isShow ? styles.procedureCard : ''}>
        {isShow && (
          <h3 className={styles.title}>
            {formatMessageApi({
              Label_BIZ_Claim:
                'app.navigator.task-detail-of-data-capture.title.medical-surgical-procedure',
            })}
          </h3>
        )}
        {lodash.map(lodash.compact(procedureList), (item: any) => (
          <ProcedureItem
            incidentId={incidentId}
            treatmentId={treatmentId}
            procedureId={item}
            key={item}
          />
        ))}
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

export default withContextData(ProcedureList);
