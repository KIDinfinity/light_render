import React from 'react';
import lodash from 'lodash';
import Section from '../../../../_component/Section/index';
import styles from './index.less';
import { formatMessageApiTypeCodeLabel_CLM_Opus as t } from '@/utils/dictFormatMessage';

const getName = (ppl) => lodash.compact([ppl?.firstName, ppl?.middleName, ppl?.surname])?.join(' ');

const transConfig = {
  dateOfBirth: { type: 'date' },
};

export default ({ policyOwner }: any) => {
  return (
    <div className={styles.container}>
      <div className={styles.title}>{t('policyownerDetails')}</div>
      <Section
        sectionId={'PolicyOwner'}
        transConfig={transConfig}
        data={{
          ...policyOwner,
          policyOwnerName: getName(policyOwner),
        }}
      />
    </div>
  );
};
