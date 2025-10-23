import React, { useState } from 'react';
import lodash from 'lodash';
import classnames from 'classnames';

import styles from './PolicyItem.less';

export default ({ exclusionTexts }: any) => {

  const [expendStatus, setExpendStatus] = useState(true)

  return (
    <ul
      className={classnames({ [styles.policyContext]: true, [styles.maxHeight]: expendStatus })}
      onClick={() => setExpendStatus(!expendStatus)}
    >
      {lodash.map(exclusionTexts, item => (<li>{item}</li>))}
    </ul>
  );
};
