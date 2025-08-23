import React from 'react';
import { useSelector } from 'dva';
import { shallowEqual } from 'react-redux';
import { Icon } from 'antd';
import lodash from 'lodash';
import BooleanEnum from 'basic/enum/BooleanEnum';

import { NAMESPACE } from 'process/NewBusiness/ManualUnderwriting/activity.config';

import useLinkToUWWSquestionnaire from './useLinkToUWWSquestionnaire';
import styles from './index.less';

const ErrorMessage = () => {
  const handleLinkToUWWSQuestionnaire = useLinkToUWWSquestionnaire();
  const isDisplay =
    useSelector(
      ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace?.processData?.failCloseEnquiry
    ) === BooleanEnum.Yes;
  const cfgRegionalDefaultValueList = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace?.cfgRegionalDefaultValueList,
    shallowEqual
  );

  const UWMehypelink = lodash
    .chain(cfgRegionalDefaultValueList)
    .find((item: any) => item.codeType === 'UWMehypelink')
    .get('defaultValue')
    .isEqual('N')
    .value();

  return (
    (isDisplay && (
      <div className={styles.wrap}>
        <div className={styles.warningIcon}>
          <Icon type="warning" className={styles.warning} />
        </div>
        <div className={styles.warningMessage}>
          <span>
            Unable to close the enquiry, please access{' '}
            {UWMehypelink ? (
              'UWMe'
            ) : (
              <a className={styles.link} target="_blank" onClick={handleLinkToUWWSQuestionnaire}>
                UWMe
              </a>
            )}{' '}
            to update the outstanding questions and close the re-open enquiry in UWMe directly.
          </span>
        </div>
      </div>
    )) ||
    null
  );
};

ErrorMessage.displayName = 'errorMessage';

export default ErrorMessage;
