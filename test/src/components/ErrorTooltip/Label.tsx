import React from 'react';
import classNames from 'classnames';
import formatLabel from './formatLabel';

interface IProps {
  labelId: string;
  labelTypeCode?: string;
  title?: string;
  style?: Object;
  className?: string;
}
class Label extends React.PureComponent<IProps> {
  static defaultProps = {
    labelTypeCode: 'Label_BIZ_Claim',
  };

  get formatText() {
    const { labelId, labelTypeCode } = this.props;
    return formatLabel(labelId, labelTypeCode);
  }

  render() {
    const { labelId, title, style, className } = this.props;

    return (
      <>
        {labelId ? (
          <span style={style} title={this.formatText} className={classNames('formItemLabel', className)}>
            {this.formatText}
          </span>
        ) : (
          <span style={style} title={title} className={classNames('formItemLabel', className)}>
            {title}
          </span>
        )}
      </>
    );
  }
}

export default Label;
