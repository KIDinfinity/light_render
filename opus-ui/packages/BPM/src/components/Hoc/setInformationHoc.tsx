import React from 'react';

const setInformationHoc: Function = (WrappedComponent: any) => {
  return class extends React.Component<any> {
    render() {
      return <WrappedComponent {...this.props} />;
    }
  };
};

export default setInformationHoc;
