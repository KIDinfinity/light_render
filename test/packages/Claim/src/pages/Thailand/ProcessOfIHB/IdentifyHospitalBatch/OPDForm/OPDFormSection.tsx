import React, { PureComponent } from 'react';
import ButtonOfClaim from 'claim/components/ButtonOfClaim';

interface IProps {
  titleText: any;
  buttonText: string;
  disabled: boolean;
  children: any;
  buttonClickFn: any;
}

class OPDFormSection extends PureComponent<IProps> {
  render() {
    const { titleText, buttonText, disabled, children, buttonClickFn } = this.props;
    return (
      <div className="formSection">
        <div className="title">{titleText}</div>
        {children}
        {!disabled ? <ButtonOfClaim buttonText={buttonText} handleClick={buttonClickFn} /> : null}
      </div>
    );
  }
}

export default OPDFormSection;
