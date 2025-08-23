import type { FunctionComponent } from 'react';
import React from 'react';
import lodash from 'lodash';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import DataLayout from '@/components/DataLayout';
import styles from './info.less';

interface IProps {
  beneficiaryList: any;
}

const beneficiaryItem: FunctionComponent<IProps> = ({ beneficiaryList, layout = 6 }: any) => {

  return (
    <>
      <DataLayout span={layout}>
        <div className={styles.beneficiaryInfoItem} >
          {formatMessageApi({ Label_BIZ_Policy: 'BeneficiaryName' })}
        </div>
        <div className={styles.beneficiaryInfoItem} >
          {formatMessageApi({ Label_BIZ_Policy: 'BeneficiaryCategory' })}
        </div>
        <div className={styles.beneficiaryInfoItem} >
          {formatMessageApi({ Label_BIZ_Policy: 'RelationshipwithInsured' })}
        </div>
        <div className={styles.beneficiaryInfoItem} >
          {formatMessageApi({ Label_BIZ_Policy: 'BeneficiaryPercentage' })}
        </div>
      </DataLayout >
      {lodash.map(beneficiaryList, (item, key) => (
        <DataLayout span={layout} key={key}>
          <div className={styles.beneficiaryInfoItem}>
            {lodash
              .chain(item)
              .pick(['firstName', 'middleName', 'surname'])
              .values()
              .compact()
              .join('.')
              .value()
            }
          </div>
          <div className={styles.beneficiaryInfoItem}>
            {formatMessageApi({
              Dropdown_POL_BeneficiaryCategory: item?.beneficiaryCategory,
            })}
          </div>
          <div className={styles.beneficiaryInfoItem}>
            {formatMessageApi({
              Dropdown_POL_RelationshipWithInsured: item?.relationshipWithInsured,
            })}
          </div>
          <div className={styles.beneficiaryInfoItem}>
            {!lodash.isNil(item?.beneficiaryPercentage) ? `${item?.beneficiaryPercentage}%` : ' '}
          </div>
        </DataLayout>
      ))}
    </>
  );
};

export default beneficiaryItem;
