import React, { PureComponent } from 'react';

interface IProps {
  titleText: any;
  children: any;
}

class OPDFormSection extends PureComponent<IProps> {
  render() {
    const { titleText, children } = this.props;
    return (
      <div className="formSection">
        <div className="title">{titleText}</div>
        {children}
      </div>
    );
  }
}

export default OPDFormSection;
