import React from 'react';
import lodash from 'lodash';
import styles from './index.less';
import CoverageItem from './CoverageItem';
import LoadingItem from './LoadingItem';
import ExclusionItem from './ExclusionItem';
import { useSelector } from 'dva';
import { NAMESPACE } from 'process/GeneralPOS/BaseProduct/activity.config';
import classnames from 'classnames';

const CoverageList = ({ transactionId }) => {
  const uwCoverageList = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) =>
      modelnamepsace.entities?.transactionTypesMap?.[transactionId]?.uwPolicy?.uwCoverageList
  );

  return (
    <div className={styles.coverageList}>
      {lodash.map(uwCoverageList, (item, index) => {
        return (
          <div key={item?.id} className={classnames(styles.coverageListItem, 'Reinstatement')}>
            <CoverageItem coverageIndex={index} item={item} transactionId={transactionId} />
            {!lodash.isEmpty(item?.uwCoverageLoadingList) && (
              <LoadingItem
                transactionId={transactionId}
                list={item?.uwCoverageLoadingList}
                coverageIndex={index}
              />
            )}
            {!lodash.isEmpty(item?.uwCoverageExclusionList) && (
              <ExclusionItem
                transactionId={transactionId}
                list={item?.uwCoverageExclusionList}
                coverageIndex={index}
              />
            )}
          </div>
        );
      })}
    </div>
  );
};

export default CoverageList;
