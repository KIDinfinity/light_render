import React from 'react';
import moment from 'moment';
import classnames from 'classnames';
import useGetIsVersionSelected from 'process/NewBusiness/EWS/_hooks/useGetIsVersionSelected';
import useHandleSelectEwsVersion from 'process/NewBusiness/EWS/_hooks/useHandleSelectEwsVersion';
import styles from './item.less';

export default ({ versionInfo }: any) => {
  const isSelected = useGetIsVersionSelected({
    version: versionInfo.id,
  });
  const handleSelect = useHandleSelectEwsVersion({
    id: versionInfo?.id,
  });
  return (
    <div
      className={classnames(styles.versionItem, {
        [styles.selected]: isSelected,
      })}
      onClick={handleSelect}
    >
      {moment(versionInfo.submitDate).format('L LT')}
    </div>
  );
};
