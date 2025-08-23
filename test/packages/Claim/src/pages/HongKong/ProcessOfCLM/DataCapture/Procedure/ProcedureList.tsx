import React, { PureComponent } from 'react';
import { connect } from 'dva';
import{ v4 as  uuidv4 } from 'uuid';
import lodash from 'lodash';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import { PROCEDUREITEM } from '@/utils/claimConstant';
import ButtonOfClaim from 'claim/components/ButtonOfClaim';
import ProcedureItem from './ProcedureListItem';
import styles from './ProcedureList.less';

interface IProps {
  treatmentId: string;
  incidentId: string;
  taskNotEditable?: boolean;
}

@connect(({ HKCLMOfDataCaptureController, claimEditable }: any, { treatmentId }: any) => ({
  claimNo: lodash.get(HKCLMOfDataCaptureController, 'claimProcessData.claimNo'),
  procedureList:
    HKCLMOfDataCaptureController.claimEntities.treatmentListMap[treatmentId].procedureList,
  taskNotEditable: claimEditable.taskNotEditable,
}))
class ProcedureList extends PureComponent<IProps> {
  handleAdd = () => {
    const { dispatch, treatmentId, claimNo }: any = this.props;
    const addProcedureItem = {
      ...PROCEDUREITEM,
      claimNo,
      id: uuidv4(),
      treatmentId,
    };

    dispatch({
      type: 'HKCLMOfDataCaptureController/addProcedureItem',
      payload: {
        treatmentId,
        addProcedureItem,
      },
    });
  };

  render() {
    const { procedureList, treatmentId, incidentId, taskNotEditable }: any = this.props;
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
            {lodash.map(lodash.compact(procedureList), (item: any) => (
              <ProcedureItem
                incidentId={incidentId}
                treatmentId={treatmentId}
                procedureId={item}
                key={item}
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
