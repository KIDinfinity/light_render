import React from 'react';
import lodash from 'lodash';
import styles from './index.less';
import CoverageItem from './CoverageItem';
import LoadingItem from './LoadingItem';
import ExclusionItem from './ExclusionItem';
import { useSelector } from 'dva';
import { NAMESPACE } from 'process/GeneralPOS/BaseProduct/activity.config';
import classnames from 'classnames';
import AddCoverage from './AddCoverage';

const CoverageList = ({ transactionId, readyOnly = true }: any) => {
  const uwCoverageList = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) =>
      modelnamepsace.entities?.transactionTypesMap?.[transactionId]?.uwPolicy?.uwCoverageList
  );

  return (
    <div className={classnames(styles.coverageList, { [styles.readyOnly]: readyOnly })}>
      {(uwCoverageList || []).map((item: any, index: number) => {
        return (
          (readyOnly ? item.newAddFlag !== 'Y' : item.newAddFlag === 'Y') && (
            <div key={item?.id} className={classnames(styles.coverageListItem, 'AddNewRiders')}>
              <CoverageItem
                coverageIndex={index}
                item={item}
                transactionId={transactionId}
                readyOnly={readyOnly}
                id={item?.id}
              />
              <div>
                {!lodash.isEmpty(item?.uwCoverageLoadingList) && (
                  <LoadingItem
                    transactionId={transactionId}
                    list={item?.uwCoverageLoadingList}
                    coverageIndex={index}
                    readyOnly={readyOnly}
                  />
                )}
                {!lodash.isEmpty(item?.uwCoverageExclusionList) && (
                  <ExclusionItem
                    transactionId={transactionId}
                    list={item?.uwCoverageExclusionList}
                    coverageIndex={index}
                    readyOnly={readyOnly}
                  />
                )}
              </div>
            </div>
          )
        );
      })}
      {!readyOnly && (
        <div className={classnames(styles.coverageListItem, 'AddNewRiders', styles.newCoverage)}>
          <AddCoverage transactionId={transactionId} />
        </div>
      )}
    </div>
  );
};

export default CoverageList;
