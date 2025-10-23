import React from 'react';

const changeWorkSpaceHoc: Function = (WrappedComponent: any) => {
  return class extends React.Component<any> {
    componentDidMount() {
      const { taskDetail, dispatch } = this.props;
      if (taskDetail?.rejected) {
        dispatch({
          type: 'workspaceSwitchOn/changeSwitch',
          payload: {
            name: 'remark',
          },
        });
      }
    }

    render() {
      return <WrappedComponent {...this.props} />;
    }
  };
};

export default changeWorkSpaceHoc;
