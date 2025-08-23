import React from 'react';
import lodash from 'lodash';
import RenderListItem from './RenderListItem';
import styles from './index.less';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import Empty from '@/components/Empty';

const getDataSource = (dataSource, options) =>
  lodash
    .chain(dataSource)
    .filter(
      (el) =>
        !el.filter &&
        (lodash.isEmpty(options) || lodash.every(options, (item) => item.atomCode !== el.atomCode))
    )
    .value();

function RenderList({ options = [], setOptions, dataSource, AtomType }: any) {
  const newDataSource = getDataSource(dataSource, options);
  const onRequired = (checkValue: any) => {
    const { item, standalone } = checkValue?.target;
    const { atomCode } = item;
    const newOptions = standalone
      ? options?.filter((el) => el.atomCode !== atomCode)
      : [
          ...options,
          {
            atomCode: item.atomCode,
            formatName: item.formatName,
            type: AtomType,
            standalone: false,
          },
        ];
    setOptions(newOptions);
  };

  const onStandalone = (checkValue: any) => {
    const { item } = checkValue?.target;
    const { atomCode, standalone } = item;
    const newOptions = lodash.map(lodash.compact(options), (el) =>
      el.atomCode === atomCode
        ? {
            ...el,
            standalone: !standalone,
          }
        : el
    );
    setOptions(newOptions);
  };

  return (
    <>
      <div className={styles.header}>
        <div className={styles.name}>
          {formatMessageApi({
            Label_BIZ_Claim: 'venus_claim.ruleEngine.label.requiredAtom',
          })}
        </div>
        <div className={styles.standalone}>
          {formatMessageApi({
            Label_BIZ_Claim: 'venus_claim.ruleEngine.label.standalone',
          })}
        </div>
      </div>
      <div className={styles.checked}>
        <RenderListItem
          list={options}
          standalone
          onRequired={onRequired}
          onStandalone={onStandalone}
        />
      </div>
      <div className={styles.unChecked}>
        {newDataSource?.length ? (
          <RenderListItem
            list={newDataSource}
            onRequired={onRequired}
            onStandalone={onStandalone}
          />
        ) : (
          <Empty />
        )}
      </div>
    </>
  );
}

export default RenderList;
