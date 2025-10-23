import React from 'react';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import Section from '../../../../_component/Section';
import styles from './SubList.less';
import lodash from 'lodash';

const transConfig = {
  currentFrom: { type: 'date' },
  currentTo: { type: 'date' },
  productCode: { type: 'dropdownWithCode' },
};

export default ({ exclusionList }) => {
  return (
    <div className={styles.itemContainer}>
      <div className={styles.title}>{formatMessageApi({ Label_BIZ_Policy: 'Exclusion' })}</div>
      <Section sectionId={'Exclusion'} transConfig={transConfig} titleOnly />
      <div className={styles.itemText}>
        {exclusionList.map((item, key) => {
          const exclusionArray = lodash.compact(
            Array.from({ length: 8 }, (v, k) => {
              return {
                exclusionType: item?.[`exclusionType${k + 1}`],
                exclusionText: item?.[`exclusionText${k + 1}`],
                exclusionName: item?.[`exclusionName${k + 1}`],
              };
            })
          );
          return (
            <Section
              sectionId={'Exclusion'}
              key={`${item.exclusionType1}_${key}`}
              transConfig={transConfig}
              data={{
                ...item,
                exclusionType: lodash.compact(exclusionArray.map((item) => item?.exclusionType)),
                exclusionText: lodash.compact(exclusionArray.map((item) => item?.exclusionText)),
                exclusionName: lodash.compact(exclusionArray.map((item) => item?.exclusionName)),
              }}
              hideTitle
            />
          );
        })}
      </div>
    </div>
  );
};
