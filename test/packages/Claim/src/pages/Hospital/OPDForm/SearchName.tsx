import React, { PureComponent } from 'react';
import { connect } from 'dva';

interface IProps {
  dispatch?: Function;
  searchType: string;
  searchVal: string[];
  showCode?: string;
  showName?: string;
  showType?: string;
}

interface IState {
  showText: string;
}

// @ts-ignore
@connect()
class SearchName extends PureComponent<IProps, IState> {
  constructor(props) {
    super(props);
    this.state = {
      showText: '',
    };
  }

  componentDidMount = async () => {
    const { dispatch, ...props } = this.props;
    const showText = await dispatch({
      type: 'hospitalDetailController/searchName',
      payload: { ...props },
    });
    this.setState({ showText });
  };

  render() {
    const { showText } = this.state;
    return <>{showText}</>;
  }
}

export default SearchName;
