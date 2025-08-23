import React, { Component } from 'react';
import { connect } from 'dva';
import{ v4 as  uuidv4 } from 'uuid';
import lodash from 'lodash';

import { formUtils } from 'basic/components/Form';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import { PROCEDUREITEM } from '@/utils/claimConstant';
import ButtonOfClaim from 'claim/components/ButtonOfClaim';
import { getProcedureList } from 'claim/pages/utils/selector';
import ProcedureItem from './ProcedureListItem';
import styles from './ProcedureList.less';

const mapStateToProps = ({ JPCLMOfClaimAssessmentController, claimEditable }, { treatmentId }) => {
  const { claimEntities } = JPCLMOfClaimAssessmentController;
  const treatmentItem = claimEntities.treatmentListMap[treatmentId];
  const hospitalization = [
    formUtils.queryValue(treatmentItem.dateOfAdmission),
    formUtils.queryValue(treatmentItem.dateOfDischarge),
  ];
  return {
    hospitalization,
    claimNo: JPCLMOfClaimAssessmentController.claimProcessData.claimNo,
    procedureList: getProcedureList(treatmentId, claimEntities.procedureListMap),
    taskNotEditable: claimEditable.taskNotEditable,
  };
};
@connect(mapStateToProps)
class ProcedureList extends Component {
  shouldComponentUpdate(nextProps) {
    const {
      claimNo: nextClaimNo,
      hospitalization: nextHospitalization,
      procedureList: nextProcedureList,
    } = nextProps;
    const { claimNo, hospitalization, procedureList } = this.props;

    return (
      !(claimNo === nextClaimNo) ||
      !lodash.isEqual(hospitalization, nextHospitalization) ||
      !lodash.isEqual(procedureList, nextProcedureList)
    );
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
      type: 'JPCLMOfClaimAssessmentController/addProcedureItem',
      payload: {
        treatmentId,
        addProcedureItem,
      },
    });
  };

  render() {
    const { procedureList, treatmentId, incidentId, hospitalization, taskNotEditable } = this.props;

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
            {lodash.map(lodash.compact(procedureList), (item) => (
              <ProcedureItem
                incidentId={incidentId}
                treatmentId={treatmentId}
                procedureId={item.id}
                key={item.id}
                hospitalization={hospitalization}
                procedureList={procedureList}
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
