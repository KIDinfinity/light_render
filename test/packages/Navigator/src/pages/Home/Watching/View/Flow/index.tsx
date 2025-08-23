import React, { Component } from 'react';
import { connect } from 'dva';
import classNames from 'classnames';
import { serialize as objectToFormData } from 'object-to-formdata';
import TaskFlowChart from './Activities/TaskFlowChart';
import Flowfilters from './FlowFilters';
import MultiplePath from './Process/MultiplePath';
import ProcessList from './Process/List';
import FlowDetail from './Error';
import styles from './index.less';

interface IComponentProps {
  dispatch?: any;
  isShowFlowDetails?: any;
  multiple?: any;
}

@connect(({ homeTaskFlow }: any) => ({
  isShowFlowDetails: homeTaskFlow.isShowFlowDetails,
  multiple: homeTaskFlow.flowData.length > 1,
}))
class TaskFlow extends Component<IComponentProps> {
  abortController = new AbortController();

  componentDidMount = () => {
    const { dispatch } = this.props;
    dispatch({
      type: 'homeTaskFlow/flowInit',
      signal: this.abortController.signal,
    });
    dispatch({
      type: 'dictionaryController/findDictionaryByTypeCode',
      payload: objectToFormData({ typeCode: 'Label_BPM_CaseCategory' }),
      signal: this.abortController.signal,
    });
  };

  componentWillUnmount = () => {
    this.abortController.abort();
  };

  render() {
    const { isShowFlowDetails, multiple } = this.props;

    const Flow = () => (
      <>
        <Flowfilters />
        <TaskFlowChart />
      </>
    );

    return (
      <div className={classNames(styles.flowBg, styles.flowBgRadius)}>
        <div className={styles.flowBgImg} />
        {multiple ? (
          <div className={styles.multiple}>
            <div className={styles.flow_thumbnail}>
              <div className={styles.flow_thumbnail_inner}>
                <MultiplePath />
                <ProcessList />
              </div>
            </div>
            <div className={styles.flow_process}>
              {isShowFlowDetails ? <FlowDetail /> : <Flow />}
            </div>
          </div>
        ) : (
          <div className={styles.single}>
            <div className={styles.flow_process}>
              {isShowFlowDetails ? <FlowDetail /> : <Flow />}
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default TaskFlow;
