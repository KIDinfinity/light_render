import React from 'react';
import { useSelector } from 'dva';
import lodash from 'lodash';
import { formUtils, FormLayoutContext } from 'basic/components/Form';
import { NAMESPACE } from '../activity.config';
import PayableItem from './PayableItem';
import { Link } from '../../../Components';
import styles from './index.less';

interface Iprops {
  otherProcedureId: string;
}

const ProcedurePayableList = ({ otherProcedureId }: Iprops) => {
  const otherProcedurePayableListMap = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) =>
      modelnamepsace.claimEntities?.otherProcedurePayableListMap
  );

  const claimPayableListMap = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace.claimEntities?.claimPayableListMap
  );

  const list =
    lodash.chain(otherProcedurePayableListMap).filter({ otherProcedureId }).value() || [];

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
              <PayableItem key={item?.id} otherProcedurePayableId={item?.id} item={item} />
            ))}
          </div>
        </FormLayoutContext.ExpandProvider>
      </Link>
    )
  );
};

export default ProcedurePayableList;
