import React from 'react';
import navigator from 'navigator/api';

const SwitchDrawerModeHoc = (WrappedComponent: any) => {
  return class extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        isCapsule: false,
        isExpander: false,
        isClose: false,
        mode: '',
      };
    }

    timer: number = 0;

    componentDidMount() {
      this.subscribe();
    }

    componentWillUnmount() {
      this.unsubscribe();
    }

    subscribe = () => {
      this.sub = navigator.SiderWorkSpaceController.subscribe((state) => {
        this.timer = setTimeout(() => {
          this.setState({
            isCapsule: state?.value?.siderToggle === 'on' && state?.value?.expanderToggle === 'off',
            isExpander: state?.value?.expanderToggle === 'on',
            isClose: state?.value?.siderToggle === 'off' && state?.value?.expanderToggle === 'off',
          });
        }, 0);
      });
    };

    unsubscribe = () => {
      this.sub.unsubscribe();
      clearTimeout(this.timer);
    };

    render() {
      const { mode, isCapsule, isExpander, isClose } = this.state;

      return (
        <WrappedComponent
          mode={mode}
          isCapsule={isCapsule}
          isExpander={isExpander}
          isClose={isClose}
          {...this.props}
        />
      );
    }
  };
};

export default SwitchDrawerModeHoc;
