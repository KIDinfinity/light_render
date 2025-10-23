import React from 'react';

const setEnvoyHoc: Function = (WrappedComponent: any) => {
  return class extends React.Component<any> {
    componentDidMount() {
      const { taskDetail, dispatch } = this.props;
      dispatch({
        type: 'envoyController/setCaseNo',
        payload: {
          caseNo: taskDetail.processInstanceId,
          taskId: taskDetail.taskId,
        },
      });
    }

    render() {
      return <WrappedComponent {...this.props} />;
    }
  };
};

export default setEnvoyHoc;
