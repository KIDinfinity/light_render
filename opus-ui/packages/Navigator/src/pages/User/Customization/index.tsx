import React from 'react';
import Title from '../_components/Title';
import Mode from './Mode';
import Language from './Language';
import Theme from './Theme';
import TaskFolder from './TaskFolder';
import Dashboard from './Dashboard';
import styles from './index.less';
import classnames from 'classnames';

export default () => (
  <>
    <Title />
    <div className={classnames('guidance-theme-scroll-one', styles.customisationBox)}>
      <Mode />
      <Language />
      <Theme />
      <TaskFolder />
      <Dashboard />
    </div>
  </>
);
