import React, { PureComponent } from 'react';

import styles from './index.less';
import Header from './Header';
import ReportCard from './ReportCard';

class Statistic extends PureComponent {
  render() {
    return (
      <div className={styles.statistic}>
        <Header />
        {/* <Search /> */}
        <ReportCard />
      </div>
    );
  }
}

export default Statistic;
