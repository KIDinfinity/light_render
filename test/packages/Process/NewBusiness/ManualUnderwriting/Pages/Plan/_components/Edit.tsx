import React from 'react';
import { useSelector } from 'dva';
import lodash from 'lodash';

import { formatMessageApi } from '@/utils/dictFormatMessage';

import { NAMESPACE } from 'process/NewBusiness/ManualUnderwriting/activity.config';
import useGetSectionConfigWithCondition from 'process/NewBusiness/ManualUnderwriting/_hooks/useGetSectionConfigWithCondition';

import { localConfig } from '../Sections/Address';

import Address from './Address';
import Basic from './Basic';

import styles from '../index.less';

export default () => {
  const data =
    useSelector(
      ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace?.modalData?.processData?.planInfoData
    ) || {};

  const config = useGetSectionConfigWithCondition({
    section: 'PlanInfoAddress-Field',
    localConfig,
    condition: 'proposal',
  });

  return (
    <>
      <Basic data={data} />
      {!lodash.isEmpty(config) && (
        <div className={styles.addressWrap}>
          <p className={styles.title}>{formatMessageApi({ Label_BIZ_Policy: 'PolicyAddress' })}</p>
          <div className={styles.item}>
            <Address data={data} />
          </div>
        </div>
      )}
    </>
  );
};
