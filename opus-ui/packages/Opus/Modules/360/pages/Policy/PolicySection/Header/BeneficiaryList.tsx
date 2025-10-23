import React from 'react';
import { Collapse } from 'antd';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import DataLayout from '@/components/DataLayout';
import styles from './SubList.less';
import lodash from 'lodash';
import { formatMessageApiTypeCodeLabel_CLM_Opus as t } from '@/utils/dictFormatMessage';

const { Panel } = Collapse;

export default ({ beneficiaryList, isActive }) => {
  return (
    <Collapse activeKey={isActive ? 'beneficiary' : ''} bordered={false}>
      <Panel disabled key={'beneficiary'} showArrow={false} header={<></>}>
        <div className={styles.itemContainer}>
          <div className={styles.title}>{t('beneficiaryList')}</div>
          <DataLayout span={6} className={styles.beneficiaryInfoTitle}>
            <div>{formatMessageApi({ Label_BIZ_Policy: 'BeneficiaryName' })}</div>
            <div>{formatMessageApi({ Label_BIZ_Policy: 'BeneficiaryCategory' })}</div>
            <div>{formatMessageApi({ Label_BIZ_Policy: 'RelationshipwithInsured' })}</div>
            <div>{formatMessageApi({ Label_BIZ_Policy: 'BeneficiaryPercentage' })}</div>
          </DataLayout>
          {lodash.map(beneficiaryList, (item, key) => (
            <DataLayout span={6} key={key}>
              <div className={styles.beneficiaryInfoItem}>
                {lodash
                  .chain(item)
                  .pick(['firstName', 'middleName', 'surname'])
                  .values()
                  .compact()
                  .join('.')
                  .value()}
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
                {!lodash.isNil(item?.beneficiaryPercentage)
                  ? `${item?.beneficiaryPercentage}%`
                  : ' '}
              </div>
            </DataLayout>
          ))}
        </div>
      </Panel>
    </Collapse>
  );
};
