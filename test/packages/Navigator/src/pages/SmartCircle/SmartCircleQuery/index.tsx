import React, { Component } from 'react';
import { connect } from 'dva';
import SmartCircleQueryOfCase from './SmartCircleQueryOfCase';
import SmartCircleQueryOfTask from './SmartCircleQueryOfTask';
import SmartCircleQueryOfUser from './SmartCircleQueryOfUser';
import styles from './SmartCircleQuery.less';

@connect(({ workspaceAI }) => ({
  queryList: workspaceAI.queryList,
  searchValue: workspaceAI.searchValue,
}))
class SmartCircleQuery extends Component {
  render() {
    return (
      <div className={styles.queryWrap}>
        <SmartCircleQueryOfCase />
        <SmartCircleQueryOfTask />
        <SmartCircleQueryOfUser />
      </div>
    );
  }
}

export default SmartCircleQuery;
