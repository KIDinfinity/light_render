import React from 'react';
import { useDispatch, useSelector,  } from 'dva';
import { shallowEqual } from 'react-redux';
import { Row, Button, Icon } from 'antd';
import lodash from 'lodash';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import { ReactComponent as dashboardIcon } from './images/dashboard.svg';
import styles from './Dashboard.less';

export default () => {
  const dispatch = useDispatch();

  const { dashboardList } = useSelector(
    (state: any) => ({
      dashboardList: state.dashboard.dashboardList,
    }),
    shallowEqual
  );

  const handleCreateDashboard = () => {
    dispatch({
      type: 'dashboard/createNewDashboard',
    });
  };

  return (
    <Row type="flex" className={styles.wrap}>
      <div className={styles.dashboardTitle}>
        <Icon component={dashboardIcon} />
        <span>
          {formatMessageApi({
            Label_BIZ_Claim: 'app.usermanagement.basicInfo.title.dashboard',
          })}
        </span>
      </div>
      <div className={styles.dashboardList}>
        {lodash.map(dashboardList, (item) => (
          <div key={item.name} className={styles.dashboardItem} />
        ))}
        <div className={styles.actionContainer}>
          <Button disabled icon="plus" onClick={handleCreateDashboard}>
            {formatMessageApi({
              Label_BPM_Button: 'app.usermanagement.button.create-new-dashboard',
            })}
          </Button>
        </div>
      </div>
    </Row>
  );
};
