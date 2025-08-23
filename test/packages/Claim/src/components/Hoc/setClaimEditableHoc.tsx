import React from 'react';
import lodash from 'lodash';
import type { Dispatch } from 'redux';

interface IProps {
  dispatch: Dispatch;
  taskDetail: any;
}

const setClaimEditableHoc: Function = (WrappedComponent: any) => {
  return class extends React.Component<IProps> {
    componentDidMount() {
      const { taskDetail } = this.props;
      this.handleSetEditable(taskDetail);
    }

    componentDidUpdate(preProps: any) {
      const { taskDetail } = this.props;
      if (!lodash.isEqual(taskDetail, preProps.taskDetail)) {
        this.handleSetEditable(taskDetail);
      }
    }

    handleSetEditable = (taskDetail: any) => {
      const { dispatch } = this.props;
      dispatch({
        type: 'claimEditable/set',
        payload: lodash.pick(taskDetail, [
          'taskStatus',
          'taskDefKey',
          'submissionChannel',
          'procActOrder',
          'editFlag',
          'isEditPage',
        ]),
      });
    };

    render() {
      return <WrappedComponent {...this.props} />;
    }
  };
};
export default setClaimEditableHoc;
