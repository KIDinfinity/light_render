import React, { useState } from 'react';
import classnames from 'classnames';
import lodash from 'lodash';
import { EPolicySource } from 'claim/enum/EPolicySource';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import useExpanderController from 'navigator/hooks/useExpanderController';

import CoverageTypeItem from './CoverageTypeItem';
import CoverageTypeDetail from './CoverageTypeDetail';
import styles from './index.less';

const classNameMap = {
  [EPolicySource.Individual]: styles.blue,
  [EPolicySource.Group]: styles.skyBlue,
};

export default ({
  policySource = 'G',
  productInfoList,
}: {
  policySource: string;
  productInfoList: any[];
}) => {
  const [curCoverageType, setCurCoverageType] = useState('');

  const titleMap = {
    [EPolicySource.Individual]: formatMessageApi({
      Label_BIZ_Policy: 'INDpolicy',
    }),
    [EPolicySource.Group]: formatMessageApi({
      Label_BIZ_Policy: 'Grppolicy',
    }),
  };

  const coverageTypeGruop = lodash
    .chain(productInfoList)
    .groupBy('coverageType')
    .map((products, coverageType) => {
      return {
        coverageType,
        amount: lodash.map(products, (productInfo: any) =>
          lodash.pick(productInfo, ['currency', 'sumAssured'])
        ),
        products,
      };
    })
    .value();
  const coverageTypeGruopList = lodash.map(coverageTypeGruop, (item: any, index: number) => (
    <>
      <CoverageTypeItem
        key={`${item.coverageType}-${index}`}
        coverageType={item?.coverageType}
        amount={item?.amount}
        handleClickFn={setCurCoverageType}
      />
      {index % 2 !== 0 ? <div className={styles.breakDom} /> : null}
    </>
  ));

  const { isExpanderSwitchOn } = useExpanderController();

  const prexis = classNameMap?.[policySource] || '';
  return (
    <div className={classnames(styles.itemGroup, prexis, isExpanderSwitchOn ? styles.ex : '')}>
      <div className={styles.header}>
        {titleMap?.[policySource]}
        <span className={styles.mark}>{lodash.size(coverageTypeGruopList)}</span>
      </div>
      {curCoverageType !== '' ? (
        <CoverageTypeDetail
          {...lodash
            .chain(coverageTypeGruop)
            .find({ coverageType: curCoverageType })
            .pick(['coverageType', 'amount', 'products'])
            .value()}
          handleClickFn={setCurCoverageType}
        />
      ) : (
        <div
          className={classnames({
            [styles.itemGroupList]: true,
            [styles.coverageGroupList]: true,
          })}
        >
          {coverageTypeGruopList}
        </div>
      )}
    </div>
  );
};
