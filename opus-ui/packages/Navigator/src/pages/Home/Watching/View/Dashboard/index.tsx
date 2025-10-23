import React, { useEffect } from 'react';
import { useDispatch } from 'dva';

import Summary from './Components/Summary'

import styles from './index.less';


const Dashboard = () => {
    const dispatch = useDispatch()
    useEffect(() => {
      dispatch({
          type: 'navigatorHomeWatching/getDashboardData'
      });
      const counter = setInterval(() => {
        dispatch({
            type: 'navigatorHomeWatching/getDashboardData'
        });
      }, 15 * 60 * 1000);
      return () => clearInterval(counter)
    }, [])
    return (
        <div className={styles.wrap}>
            <Summary />
        </div>
    );
}

export default Dashboard;

