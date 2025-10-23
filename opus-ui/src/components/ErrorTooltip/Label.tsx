import React from 'react';
import classNames from 'classnames';
import formatLabel from './formatLabel';

interface IProps {
  labelId: string;
  labelTypeCode?: string;
  title?: string;
  style?: Object;
  className?: string;
  disabled?: boolean;
  ignoreLabelUpper?: boolean;
}
class Label extends React.PureComponent<IProps> {
  static defaultProps = {
    labelTypeCode: 'Label_BIZ_Claim',
  };

  get formatText() {
    const { labelId, labelTypeCode, ignoreLabelUpper } = this.props;
    return formatLabel(labelId, labelTypeCode, ignoreLabelUpper);
  }

  render() {
    const { labelId, title, style, className, disabled } = this.props;

    return (
      <>
        {labelId ? (
          <span
            style={style}
            title={this.formatText}
            className={classNames('formItemLabel', className)}
            data-disabled={disabled}
          >
            {this.formatText}
          </span>
        ) : (
          <span
            style={style}
            title={title}
            className={classNames('formItemLabel', className)}
            data-disabled={disabled}
          >
            {title}
          </span>
        )}
      </>
    );
  }
}

export default Label;
