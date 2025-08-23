import React, { Component } from 'react';
import { connect } from 'dva';
import type { Dispatch } from 'redux';
import{ v4 as  uuidv4 } from 'uuid';
import lodash from 'lodash';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import { PROCEDUREITEM } from '@/utils/claimConstant';
import ButtonOfClaim from 'claim/components/ButtonOfClaim';
import { getProcedureList } from 'claim/pages/utils/selector';
import ProcedureItem from './ProcedureListItem';
import styles from './ProcedureList.less';

interface IProps {
  dispatch: Dispatch<any>;
  treatmentId: string;
  claimNo: string;
  incidentId: string;
  procedureList: any;
  procedureListMap: any;
}

@connect(({ daOfClaimCaseController, claimEditable }: any, { treatmentId }: any) => ({
  claimNo: lodash.get(daOfClaimCaseController, 'claimProcessData.claimNo'),
  procedureList: getProcedureList(
    treatmentId,
    daOfClaimCaseController.claimEntities.procedureListMap
  ),
  taskNotEditable: claimEditable.taskNotEditable,
  procedureListMap: daOfClaimCaseController.claimEntities.procedureListMap,
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
      type: 'daOfClaimCaseController/addProcedureItem',
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
