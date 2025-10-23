import { formatMessageApi } from '@/utils/dictFormatMessage';
import moment from 'moment';
import React from 'react';
import { LeaveReasonTag } from './LeaveList';
import styles from './upComingLeave.less';
import { Region, tenant } from '@/components/Tenant';

import EmptyText from 'opus/Components/EmptyData/Default';

export default ({ dataSource = [] }: any) => {
  const format = tenant.region({
    [Region.TH]: 'DD/MM/YYYY',
    [Region.JP]: 'YYYY/MM/DD',
    [Region.HK]: 'DD/MM/YYYY',
  });

  return (
    <div className={styles.upComingLeave}>
      <div className={styles.title}>{formatMessageApi({ Label_COM_Opus: 'myUpcomeLeave' })}</div>
      <div className={styles.listContrainer}>
        {dataSource?.length ? (
          <ul className={styles.list}>
            {dataSource?.slice(0, 3).map((item: any) => (
              <li key={item?.id} className={styles.listItem}>
                <div>
                  {`${moment(item?.startTime).format(format)} -
                ${moment(item?.endTime).format(format)}`}
                </div>
                <div>
                  <LeaveReasonTag reason={item?.leaveType} />
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <EmptyText type="black" />
        )}
      </div>
    </div>
  );
};
