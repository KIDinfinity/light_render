import React from 'react';

const TestFlag = (mapprops: any) => (WrappedComponent: any) => {
  return class extends React.Component<any, any> {
    state = {
      tag: '',
      type: '',
    };

    static getDerivedStateFromProps(props: any) {
      if (typeof mapprops === 'function') {
        return mapprops({ props });
      }

      return {
        tag: '',
        type: '',
      };
    }

    render() {
      const { type, tag } = this.state;

      return React.cloneElement(<WrappedComponent data-test-type={type} data-test-id={tag} />, {
        ...this.props,
      });
    }
  };
};

export default TestFlag;
