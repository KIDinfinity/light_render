import React from 'react';
import lodash from 'lodash';
import { Icon } from 'antd';
import styles from './index.less';
import { useSelector } from 'dva';
import { shallowEqual } from 'react-redux';
import { NAMESPACE } from 'process/NB/ManualUnderwriting/activity.config';
import useLinkToUWWSquestionnaire from 'process/NB/ManualUnderwriting/_hooks/useLinkToUWWSquestionnaire';

const ErrorMessage = () => {
  const handleLinkToUWWSQuestionnaire = useLinkToUWWSquestionnaire();
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
  );
};

ErrorMessage.displayName = 'errorMessage';

export default ErrorMessage;
