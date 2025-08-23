import React from 'react';
import navigator from 'navigator/api';
import { IntegrationChecklistUpdateStatus } from 'navigator/enum/IntegrationChecklistUpdateStatus';

const SwitchDrawerModeHoc = (WrappedComponent: any) => {
  return class extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        isCapsule: false,
        isExpander: false,
        isClose: false,
        mode: '',
        monitorSliderDisplayType: 'menu',
        hasIntegrationUpdateUnread: false,
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
            monitorSliderDisplayType: state?.value?.monitorSliderDisplayType,
            hasIntegrationUpdateUnread:
              state?.value?.integrationUpdateUnread === IntegrationChecklistUpdateStatus.HasUpdate,
          });
        }, 0);
      });
    };

    unsubscribe = () => {
      this.sub.unsubscribe();
      clearTimeout(this.timer);
    };

    render() {
      const {
        mode,
        isCapsule,
        isExpander,
        isClose,
        monitorSliderDisplayType,
        hasIntegrationUpdateUnread,
      } = this.state;

      return (
        <WrappedComponent
          mode={mode}
          isCapsule={isCapsule}
          isExpander={isExpander}
          isClose={isClose}
          monitorSliderDisplayType={monitorSliderDisplayType}
          hasIntegrationUpdateUnread={hasIntegrationUpdateUnread}
          {...this.props}
        />
      );
    }
  };
};

export default SwitchDrawerModeHoc;
