import React, { Component } from 'react';
import{ v4 as  uuidv4 } from 'uuid';
import lodash from 'lodash';
import { connect } from 'dva';
import type { Dispatch } from 'redux';
import { formUtils } from 'basic/components/Form';
import { PROCEDUREITEM } from '@/utils/claimConstant';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import { getProcedureList } from 'claim/pages/utils/selector';
import ButtonOfClaim from 'claim/components/ButtonOfClaim';
import ProcedureItem from './ProcedureListItem';

import styles from './ProcedureList.less';

interface IProps {
  dispatch: Dispatch<any>;
  treatmentId: string;
  claimNo: string;
  incidentId: string;
  procedureList: any;
}

@connect(({ JPCLMOfClaimRegistrationController }: any, { treatmentId }: any) => ({
  claimNo: lodash.get(JPCLMOfClaimRegistrationController, 'claimProcessData.claimNo'),
  procedureList: getProcedureList(
    treatmentId,
    JPCLMOfClaimRegistrationController.claimEntities.procedureListMap,
    'operationDateString'
  ),
  treatmentItem: JPCLMOfClaimRegistrationController.claimEntities.treatmentListMap[treatmentId],
}))
class ProcedureList extends Component<IProps> {
  handleAdd = () => {
    const { dispatch, treatmentId, claimNo } = this.props;
    const addProcedureItem = {
      ...PROCEDUREITEM,
      claimNo,
      id: uuidv4(),
      treatmentId,
    };

    dispatch({
      type: 'JPCLMOfClaimRegistrationController/addProcedureItem',
      payload: {
        treatmentId,
        addProcedureItem,
      },
    });
  };

  render() {
    const { procedureList, treatmentId, dataEditable, treatmentItem } = this.props;
    const hospitalization = [
      formUtils.queryValue(treatmentItem.dateOfAdmissionString),
      formUtils.queryValue(treatmentItem.dateOfDischargeString),
    ];
    const isShow = lodash.compact(procedureList).length || dataEditable;

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
                treatmentId={treatmentId}
                procedureId={item.id}
                key={item.id}
                dataEditable={dataEditable}
                hospitalization={hospitalization}
                procedureList={procedureList}
              />
            ))}
          </div>
        )}
        {dataEditable && (
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
