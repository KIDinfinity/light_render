import React from 'react';
import classNames from 'classnames';
import { useSelector } from 'dva';
import { formUtils } from 'basic/components/Form';
import lodash from 'lodash';
import MainTitle from './MainTitle';
import ICUItem from './ICUItem';
import Item from './Item';
import ExpandItem from './ExpandItem';
import OtherProcedureList from '../OtherProcedure';
import Add from './Add';
import { NAMESPACE } from '../activity.config';
import styles from './index.less';

interface Iprops {
  treatmentId: string;
  incidentId: string;
  procedureExpand: boolean;
  arrowCallBack: Function;
}

const List = ({ treatmentId, incidentId, procedureExpand, arrowCallBack }: Iprops) => {
  const editable = !useSelector(({ claimEditable }: any) => claimEditable.taskNotEditable);
  const procedureList =
    useSelector(
      ({ [NAMESPACE]: modelnamepsace }: any) =>
        modelnamepsace.claimEntities?.treatmentListMap?.[treatmentId]?.procedureList
    ) || [];
  const treatmentItem =
    useSelector(
      ({ [NAMESPACE]: modelnamepsace }: any) =>
        modelnamepsace.claimEntities?.treatmentListMap?.[treatmentId]
    ) || {};

  return (
    <div className={classNames(styles.procedure, procedureExpand && styles.expand)}>
      {(Boolean(formUtils.queryValue(treatmentItem?.icu)) || !lodash.isEmpty(procedureList)) && (
        <MainTitle
          incidentId={incidentId}
          treatmentId={treatmentId}
          procedureExpand={procedureExpand}
          arrowCallBack={arrowCallBack}
        />
      )}

      <div className={styles.list}>
        {Boolean(formUtils.queryValue(treatmentItem?.icu)) && (
          <ICUItem treatmentId={treatmentId} editable={editable} />
        )}

        {lodash.map(procedureList, (item) => (
          <div className={styles.item} key={item}>
            {procedureExpand && (
              <ExpandItem
                incidentId={incidentId}
                treatmentId={treatmentId}
                procedureId={item}
                procedureExpand={procedureExpand}
                key={`procedure_${item}`}
              />
            )}
            {!procedureExpand && (
              <Item
                incidentId={incidentId}
                treatmentId={treatmentId}
                procedureId={item}
                procedureExpand={procedureExpand}
                key={`procedure_${item}`}
              />
            )}
          </div>
        ))}
        <OtherProcedureList treatmentId={treatmentId} procedureExpand={procedureExpand} />
        {editable && <Add treatmentId={treatmentId} />}
      </div>
    </div>
  );
};

export default List;
