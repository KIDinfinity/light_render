import React from 'react';
import lodash from 'lodash';
import { Icon, Popover } from 'antd';
import { formatMessageApi } from '@/utils/dictFormatMessage';

import styles from './styles.less';

export default ({ intrances }: any) => {
  return (
    <Popover
      content={
        <div className={styles.intranceList} id="intranceFurther">
          {lodash.map(
            intrances,
            (intrance: any) =>
              intrance?.visible && (
                <div key={intrance?.labelId} onClick={(e: any) => intrance?.handler(intrance, e)}>
                  {formatMessageApi({ Label_BIZ_Claim: intrance?.labelId })}
                </div>
              )
          )}
        </div>
      }
      title={null}
    >
      <Icon type="ellipsis" className={styles.intrance} />
    </Popover>
  );
};
