import React, { Component } from 'react';
import { connect } from 'dva';
import type { Dispatch } from 'redux';
import{ v4 as  uuidv4 } from 'uuid';
import lodash from 'lodash';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import { PROCEDUREITEM } from '@/utils/claimConstant';
import ProcedureItem from './ProcedureListItem';
import styles from './ProcedureList.less';

interface IProps {
  dispatch: Dispatch<any>;
  treatmentId: string;
  claimNo: string;
  incidentId: string;
  procedureList: any;
}

@connect(({ hbOfClaimAssessmentController }: any, { treatmentId }: any) => ({
  claimNo: lodash.get(hbOfClaimAssessmentController, 'claimProcessData.claimNo'),
  procedureList:
    hbOfClaimAssessmentController.claimEntities.treatmentListMap[treatmentId].procedureList,
}))
class ProcedureList extends Component<IProps> {
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
      type: 'hbOfClaimAssessmentController/addProcedureItem',
      payload: {
        treatmentId,
        addProcedureItem,
      },
    });
  };

  render() {
    const { procedureList, treatmentId, incidentId } = this.props;

    return (
      <div className={lodash.isEmpty(procedureList) ? '' : styles.procedureCard}>
        <div>
          {!lodash.isEmpty(procedureList) && (
            <h3 className={styles.title}>
              {formatMessageApi({
                Label_BIZ_Claim:
                  'app.navigator.task-detail-of-data-capture.title.medical-surgical-procedure',
              })}
            </h3>
          )}
          {lodash.map(lodash.compact(procedureList), (item: any, index: number) => (
            <ProcedureItem
              incidentId={incidentId}
              treatmentId={treatmentId}
              procedureId={item}
              dataIndex={index}
              key={item}
            />
          ))}
        </div>
      </div>
    );
  }
}

export default ProcedureList;
