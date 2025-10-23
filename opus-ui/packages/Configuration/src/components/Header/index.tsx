import React from 'react';
import { getFunctionName } from 'configuration/pages/NavigatorConfiguration/Utils';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import { Operation } from 'configuration/pages/NavigatorConfiguration/Enum/Operation';
import styles from './index.less';

const Header = ({ functionCode, functionName, pageTemplateType }: any) => {
  const dict = {
    [Operation.Add]: 'configurationcenter.button.add',
    [Operation.Update]: 'configurationcenter.button.update',
    [Operation.UPDATE_Multiple]: 'configurationcenter.button.updateMultiple',
  };
  return (
    <div className={styles.header}>
      <div className={styles.title}>
        <span className={styles.titleWord}>
          {' '}
          {formatMessageApi({ Label_BPM_Button: dict[pageTemplateType] })}{' '}
          {getFunctionName(functionCode, functionName)}
        </span>
      </div>
    </div>
  );
};

export default Header;
