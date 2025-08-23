import React, { Component } from 'react';
import { connect } from 'dva';
import styled from 'styled-components';

const FocusSpan = styled.span`
  :focus {
    outline: none;
  }
`;

const FocusDiv = styled.div`
  :focus {
    outline: none;
  }
`;

interface IComponentProps {
  id: string;
  dispatch?: any;
  action?: Function;
  hotkeys?: any;
  block?: any;
}

@connect(() => ({}))
class Hotkey extends Component<IComponentProps> {
  componentDidMount = async () => {
    const { dispatch, children, ...restProps } = this.props;

    await dispatch({
      type: 'hotkey/loginAddKey',
      payload: {
        ...restProps,
      },
    });
  };

  componentWillUnmount = async () => {
    const { id, dispatch } = this.props;

    await dispatch({
      type: 'hotkey/loginRemoveHotkey',
      payload: {
        id,
      },
    });
  };

  render() {
    const { id, children, block = true } = this.props;

    return block ? (
      <FocusDiv tabIndex={0} id={`hotkey_${id}`}>
        {children}
      </FocusDiv>
    ) : (
      <FocusSpan tabIndex={0} id={`hotkey_${id}`}>
        {children}
      </FocusSpan>
    );
  }
}

export default Hotkey;
