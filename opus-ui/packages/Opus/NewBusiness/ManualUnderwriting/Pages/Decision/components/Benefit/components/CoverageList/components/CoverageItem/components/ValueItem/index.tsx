import React, { useMemo } from 'react';
import classnames from 'classnames';
import lodash from 'lodash';
import useGetCoverageItemValue from '../../../../_hooks/useGetCoverageItemValue';
import Ellipsis from '@/components/Ellipsis';
import styles from './index.less';
import useGetSustainabilityCaseCheckStatus from 'opus/NewBusiness/ManualUnderwriting/Pages/SustainabilityCaseModal/CheckingProvider/hooks/useGetSustainabilityCaseCheckStatus';

export default ({ item, col }: any) => {
  const val = useGetCoverageItemValue({ item, col });
  const { checking } = useGetSustainabilityCaseCheckStatus();
  const displayType = useMemo(() => {
    if (!lodash.get(val, 'outdatedValue')) {
      return 'normal';
    }
    return 'valueChange';
  }, [val]);

  const NormalSpan = () => {
    const keyConfig = {
      coreCode: 'coreCode',
      finalCoi: 'finalCoi',
      numberOfUnits: 'numberOfUnits',
    };
    return (
      <>
        {lodash.includes([keyConfig.coreCode, keyConfig.numberOfUnits], col.key) && (
          <Ellipsis lines={1} tooltip forceTooltip>
            {val.normal}
          </Ellipsis>
        )}
        {col.key === keyConfig.finalCoi && <span>{val.normal === '0.00' ? '' : val.normal}</span>}
        {!lodash.includes(Object.keys(keyConfig), col.key) && (
          <span>{Array.isArray(val.normal) ? '' : val.normal}</span>
        )}
      </>
    );
  };

  const MultiLineDiv = () => (
    <div className={styles.valueItem}>
      {lodash.map(val.normal, (text: string) => (
        <Ellipsis lines={1} tooltip forceTooltip>
          {text}
        </Ellipsis>
      ))}
    </div>
  );

  return (
    <div className={classnames(styles.container, styles[col?.key])} data-key={col.key}>
      {displayType === 'normal' ? (
        col.key !== 'waiveProductList' ? (
          <span
            className={classnames(styles.normal, {
              [styles.increasedVal]: lodash.get(item, 'systemAutoAddInd') === 'Y',
              [styles?.rtCoverageFlag]: item?.rtCoverageFlag && checking,
            })}
          >
            <NormalSpan />
          </span>
        ) : (
          <MultiLineDiv />
        )
      ) : null}

      {displayType === 'valueChange' && (
        <>
          <div
            className={classnames(styles.valueItem, {
              [styles.increasedVal]: !!lodash.get(item, 'isIncreased'),
              [styles?.rtCoverageFlag]: item?.rtCoverageFlag && checking,
            })}
          >
            <span>{val.effectiveValue}</span>
            <del className={styles.delete}>{val.outdatedValue}</del>
          </div>
        </>
      )}
    </div>
  );
};
