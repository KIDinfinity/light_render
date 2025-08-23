import React from 'react';
import { useSelector } from 'dva';
import lodash from 'lodash';
import { formUtils, FormLayoutContext } from 'basic/components/Form';
import { NAMESPACE } from '../activity.config';
import PayableItem from './PayableItem';
import { Link } from '../../../Components';
import styles from './index.less';

interface Iprops {
  procedureId: string;
}

const ProcedurePayableList = ({ procedureId }: Iprops) => {
  const procedurePayableListMap = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace.claimEntities?.procedurePayableListMap
  );

  const claimPayableListMap = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace.claimEntities?.claimPayableListMap
  );

  const list = lodash.chain(procedurePayableListMap).filter({ procedureId }).value() || [];

  return (
    lodash.size(list) > 0 &&
    lodash.some(
      list,
      (item) =>
        formUtils.queryValue(claimPayableListMap?.[item?.payableId]?.claimDecision) !== 'D' &&
        formUtils.queryValue(claimPayableListMap?.[item?.payableId]?.claimDecision) !== 'N'
    ) && (
      <Link>
        <FormLayoutContext.ExpandProvider>
          <div className={styles.payableList}>
            <FormLayoutContext.ExpandIcon className={styles.expandIcon} />
            {lodash.map(list, (item: any) => (
              <PayableItem key={item?.id} procedurePayableId={item?.id} item={item} />
            ))}
          </div>
        </FormLayoutContext.ExpandProvider>
      </Link>
    )
  );
};

export default ProcedurePayableList;
