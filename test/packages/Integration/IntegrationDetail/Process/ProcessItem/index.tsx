import React from 'react';
import type { ProcessDataItem } from 'packages/Integration/types/data';
import InfoItem from './InfoItem';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import styles from './index.less';
import timeUtils from '@/utils/time';

interface IProps {
  processItem: ProcessDataItem;
}

export default ({ processItem }: IProps) => {
  return (
    <div className={styles.list}>
      <InfoItem
        title={formatMessageApi({ Label_COM_General: 'IntegrationSystem' })}
        info={processItem.systemCode}
      />
      <InfoItem
        title={formatMessageApi({ Label_COM_General: 'ErrorMessage' })}
        info={processItem.errorTranslate || processItem.errorMsg}
      />
      <InfoItem
        contentStyle={{
          display: '-webkit-box',
          overflow: 'scroll',
          WebkitBoxOrient: 'vertical',
          WebkitLineClamp: '10',
        }}
        title={formatMessageApi({ Label_COM_General: 'RequestData' })}
        info={processItem.requestData}
        time={timeUtils.formatDateTime(processItem.requestTime)}
        showCopy={true}
      />
      <InfoItem
        contentStyle={{
          display: '-webkit-box',
          overflow: 'scroll',
          WebkitBoxOrient: 'vertical',
          WebkitLineClamp: '10',
        }}
        title={formatMessageApi({ Label_COM_General: 'ResponseData' })}
        info={processItem.responseData}
        time={timeUtils.formatDateTime(processItem.responseTime)}
        showCopy={true}
      />
      <InfoItem
        title={formatMessageApi({ Label_COM_General: 'Endpoint' })}
        info={processItem.url}
      />
    </div>
  );
};
