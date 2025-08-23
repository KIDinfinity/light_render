import React, { useMemo } from 'react';
import classnames from 'classnames';
import lodash from 'lodash';
import useGetCoverageItemValue from '../../../../_hooks/useGetCoverageItemValue';
import CustomisationCol from 'basic/components/CustomisationCol';
import useGetFieldOrderAtomConfigCallback from 'basic/components/Elements/hooks/useGetFieldOrderAtomConfigCallback';
import Ellipsis from '@/components/Ellipsis';
import styles from './index.less';
import useGetSustainabilityCaseCheckStatus from 'process/NewBusiness/ManualUnderwriting/Pages/SustainabilityCaseModal/CheckingProvider/hooks/useGetSustainabilityCaseCheckStatus';
import Mode from 'process/NewBusiness/ManualUnderwriting/_enum/Mode';

export default ({ item, col }: any) => {
  const val = useGetCoverageItemValue({ item, col, type: Mode.Show });
  const { checking } = useGetSustainabilityCaseCheckStatus();
  const handleGetOrder = useGetFieldOrderAtomConfigCallback({
    localConfig: {},
    section: 'UWDecision-Table',
  });
  const displayType = useMemo(() => {
    if (!lodash.get(val, 'outdatedValue')) {
      return 'normal';
    }
    return 'valueChange';
  }, [val]);

  const NormalSpan = () => {
    const ellipsisKeys = [
      'coreCode',
      'numberOfUnits',
      'sumAssured',
      'annualPrem',
      'basePremium',
      'instalmentPremiumWithTax',
    ];

    if (lodash.includes(ellipsisKeys, col.key)) {
      return (
        <Ellipsis lines={1} tooltip forceTooltip>
          {val.normal}
        </Ellipsis>
      );
    } else if (col.key === 'finalCoi') {
      return <span>{val.normal === '0.00' ? '' : val.normal}</span>;
    } else {
      return <span>{Array.isArray(val.normal) ? '' : val.normal}</span>;
    }
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
    <CustomisationCol key={col?.key} span={col?.span} order={handleGetOrder({ field: col?.key })}>
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
    </CustomisationCol>
  );
};
