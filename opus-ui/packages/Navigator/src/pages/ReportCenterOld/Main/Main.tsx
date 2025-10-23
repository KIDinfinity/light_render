import React from 'react';
import SlideBar from './SlideBar/SlideBar';
import MainCtn from './MainCtn/MainCtn';
import styles from './main.less';

const Main = React.memo(() => (
  <div className={styles.main}>
    <SlideBar />
    <MainCtn />
  </div>
));

export default Main;
