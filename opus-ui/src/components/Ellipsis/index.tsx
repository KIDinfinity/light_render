import React, { Component } from 'react';
import { Tooltip } from 'antd';
import classNames from 'classnames';
import styles from './index.less';

/* eslint react/no-did-mount-set-state: 0 */
/* eslint no-param-reassign: 0 */

const isSupportLineClamp = document.body.style.webkitLineClamp !== undefined;

const TooltipOverlayStyle = {
  overflowWrap: 'break-word',
  wordWrap: 'break-word',
};

export const getStrFullLength = (str = '') =>
  str.split('').reduce((pre, cur) => {
    const charCode = cur.charCodeAt(0);
    if (charCode >= 0 && charCode <= 128) {
      return pre + 1;
    }

    return pre + 2;
  }, 0);

export const cutStrByFullLength = (str = '', maxLength) => {
  let showLength = 0;

  return str.split('').reduce((pre, cur) => {
    const charCode = cur.charCodeAt(0);
    if (charCode >= 0 && charCode <= 128) {
      showLength += 1;
    } else {
      showLength += 2;
    }
    if (showLength <= maxLength) {
      return pre + cur;
    }

    return pre;
  }, '');
};

const EllipsisText = ({
  text,
  length,
  tooltip,
  fullWidthRecognition,
  tooltipClassName,
  ...other
}) => {
  if (typeof text !== 'string') {
    throw new Error('Ellipsis children must be string.');
  }
  const textLength = fullWidthRecognition ? getStrFullLength(text) : text.length;
  const tail = '...';

  if (textLength <= length || length < 0 || textLength <= length + tail.length) {
    return <span {...other}>{text}</span>;
  }

  let displayText;
  if (length - tail.length <= 0) {
    displayText = '';
  } else {
    displayText = fullWidthRecognition ? cutStrByFullLength(text, length) : text.slice(0, length);
  }

  if (tooltip) {
    return (
      <Tooltip
        overlayClassName={classNames(styles.ellipsisTooltip, tooltipClassName)}
        overlayStyle={TooltipOverlayStyle}
        title={text}
      >
        <span>
          {displayText}
          {tail}
        </span>
      </Tooltip>
    );
  }

  return (
    <span {...other}>
      {displayText}
      {tail}
    </span>
  );
};

export default class Ellipsis extends Component<any> {
  state = {
    text: '',
    targetCount: 0,
    overHeight: false,
  };

  componentDidMount() {
    if (this.node) {
      this.computeLine();
    }
  }

  componentDidUpdate(perProps) {
    const { lines } = this.props;
    if (lines !== perProps.lines) {
      this.computeLine();
    }
  }

  computeLine = () => {
    const { lines } = this.props;
    const text = this.shadowChildren.innerText || this.shadowChildren.textContent;
    const lineHeight = parseInt(getComputedStyle(this.root).lineHeight, 10);
    const targetHeight = lines * lineHeight;
    const totalHeight = this.shadowChildren.offsetHeight;

    if (totalHeight > targetHeight) {
      this.setState({ overHeight: true });
    }
    if (lines && !isSupportLineClamp) {
      this.content.style.height = `${targetHeight}px`;
      const shadowNode = this.shadow.firstChild;
      if (totalHeight <= targetHeight) {
        this.setState({
          text,
          targetCount: text.length,
        });

        return;
      }

      // bisection
      const len = text.length;
      const mid = Math.ceil(len / 2);

      const count = this.bisection(targetHeight, mid, 0, len, text, shadowNode);

      this.setState({
        text,
        targetCount: count,
      });
    }
  };

  bisection = (th, m, b, e, text, shadowNode) => {
    const suffix = '...';
    let mid = m;
    let end = e;
    let begin = b;
    shadowNode.innerHTML = text.substring(0, mid) + suffix;
    let sh = shadowNode.offsetHeight;

    if (sh <= th) {
      shadowNode.innerHTML = text.substring(0, mid + 1) + suffix;
      sh = shadowNode.offsetHeight;
      if (sh > th || mid === begin) {
        return mid;
      }
      begin = mid;
      if (end - begin === 1) {
        mid = 1 + begin;
      } else {
        mid = Math.floor((end - begin) / 2) + begin;
      }

      return this.bisection(th, mid, begin, end, text, shadowNode);
    }
    if (mid - 1 < 0) {
      return mid;
    }
    shadowNode.innerHTML = text.substring(0, mid - 1) + suffix;
    sh = shadowNode.offsetHeight;
    if (sh <= th) {
      return mid - 1;
    }
    end = mid;
    mid = Math.floor((end - begin) / 2) + begin;

    return this.bisection(th, mid, begin, end, text, shadowNode);
  };

  handleRoot = (n) => {
    this.root = n;
  };

  handleContent = (n) => {
    this.content = n;
  };

  handleNode = (n) => {
    this.node = n;
  };

  handleShadow = (n) => {
    this.shadow = n;
  };

  handleShadowChildren = (n) => {
    this.shadowChildren = n;
  };

  render() {
    const { text, targetCount, overHeight } = this.state;
    const {
      children,
      lines,
      length,
      wrapperClass,
      className,
      tooltip,
      forceTooltip,
      fullWidthRecognition,
      tooltipClassName,
      ...restProps
    } = this.props;

    const cls = classNames(styles.ellipsis, className, {
      [styles.lines]: lines && !isSupportLineClamp,
      [styles.lineClamp]: lines && isSupportLineClamp,
    });
    if (!lines && !length) {
      return (
        <span className={cls} {...restProps}>
          {children}
        </span>
      );
    }

    // length
    if (!lines) {
      return (
        <EllipsisText
          className={cls}
          length={length}
          text={children || ''}
          tooltip={tooltip}
          fullWidthRecognition={fullWidthRecognition}
          tooltipClassName={tooltipClassName}
          {...restProps}
        />
      );
    }

    const id = `react-app-ellipsis-${`${new Date().getTime()}${Math.floor(Math.random() * 100)}`}`;

    const node = isSupportLineClamp ? (
      <div id={id} className={cls} {...restProps} ref={this.handleNode}>
        <style>
          {' '}
          {`#${id}{ display: -webkit-box;-webkit-line-clamp:${lines};-webkit-box-orient: vertical;}`}
        </style>
        {children}
      </div>
    ) : (
      <span ref={this.handleNode}>
        {targetCount > 0 && text.substring(0, targetCount)}
        {targetCount > 0 && targetCount < text.length && '...'}
      </span>
    );

    return (
      <div className={wrapperClass}>
        <div {...restProps} ref={this.handleRoot} className={cls}>
          <div ref={this.handleContent}>
            {tooltip && (overHeight || forceTooltip) ? (
              <Tooltip
                placement="leftTop"
                overlayClassName={classNames(styles.ellipsisTooltip, tooltipClassName)}
                overlayStyle={TooltipOverlayStyle}
                title={children}
              >
                {node}
              </Tooltip>
            ) : (
              node
            )}
            <div className={styles.shadow} ref={this.handleShadowChildren}>
              {children}
            </div>
            <div className={styles.shadow} ref={this.handleShadow}>
              <span>{text}</span>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
