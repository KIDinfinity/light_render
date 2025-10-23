import React from 'react';
import TaskDefKey from 'enum/TaskDefKey';
import type { Dispatch } from 'redux';

interface IProps {
  dispatch: Dispatch;
  taskDetail: any;
}

const setInsured360Hoc: Function = (WrappedComponent: any) => {
  return class extends React.Component<IProps> {
    not360TaskDefKey: TaskDefKey[];
    constructor(props: any) {
      super(props);
      // 不请求360数据的taskDefKey
      this.not360TaskDefKey = [
        TaskDefKey.JP_CLM_ACT001,
        TaskDefKey.JP_CP_ACT001,
        TaskDefKey.JP_CP_ACT002,
        TaskDefKey.JP_CP_ACT003,
        TaskDefKey.JP_PC_ACT001,
      ];
    }

    componentDidMount() {
      const { dispatch, taskDetail } = this.props;
    }

    render() {
      return <WrappedComponent {...this.props} />;
    }
  };
};

export default setInsured360Hoc;
