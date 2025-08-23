import React, {useEffect} from 'react';
import { useDispatch } from 'dva';
import classnames from 'classnames';

import { NAMESPACE } from 'process/NewBusiness/ManualUnderwriting/activity.config';

import ClientDetailLeft from './ClientDetailLeft';
import ClientDetailRight from './ClientDetailRight';
import DeleteButton from './DeleteButton';
import styles from '../../index.less';

export default ({ clientId }: any) => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch({
      type: `${NAMESPACE}/getListDedupCheckCfg`,
    });
    dispatch({
      type: `${NAMESPACE}/getRegionalDefaultValue`,
      payload: {
        codeType: 'SPECIAL_MANDATORY_FIELD_ROLE',
      },
    });
  }, []);

  return (
    <div className={classnames(styles.clientDetailList, styles.clientDetailListHandleOverFlow)}>
      <div className={classnames(styles.clientDetail, styles.edit)}>
        <ClientDetailLeft clientId={clientId} />
        <ClientDetailRight clientId={clientId} />
        <DeleteButton  clientId={clientId} />
      </div>
    </div>
  );
};
