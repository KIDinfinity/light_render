import React, { PureComponent } from 'react';
import { connect } from 'dva';
import lodash from 'lodash';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import ProcedureItem from './ProcedureListItem';
import styles from './ProcedureList.less';

interface IProps {
  treatmentId: string;
  incidentId: string;
  taskNotEditable?: boolean;
}

@connect(({ HKCLMOfClaimAssessmentController, claimEditable }: any, { treatmentId }: any) => ({
  procedureList:
    HKCLMOfClaimAssessmentController.claimEntities.treatmentListMap[treatmentId].procedureList,
  taskNotEditable: claimEditable.taskNotEditable,
}))
class ProcedureList extends PureComponent<IProps> {
  render() {
    const { procedureList, treatmentId, incidentId, taskNotEditable }: any = this.props;
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
      </div>
    );
  }
}

export default ProcedureList;
