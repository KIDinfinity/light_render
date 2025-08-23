import React, { Component } from 'react';
import SubmitButton from 'claim/components/LeftMenuButton/SubmitButton/SiderBarSubmitButton';
import BackButton from '@/components/BackButton/SiderBarBackButton';

interface IProps {
  handleSubmit: Function;
  submitting: boolean;
  validating: boolean;
  submited: boolean;
  errors: any[];
  compressed?: boolean;
}
class LeftMenu extends Component<IProps> {
  render() {
    return (
      <>
        <SubmitButton {...this.props} />
        <BackButton compressed={this.props?.compressed}/>
      </>
    );
  }
}

export default LeftMenu;
