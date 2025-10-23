import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import lodash from 'lodash';
import { precisionEnsure } from '@/utils/precisionUtils';
import classNames from './index.less';

class Process extends React.PureComponent {
  render() {
    const {
      title,
      calculationResult,
      processList,
      showType,
      detailProcess,
      showHeader,
      size,
      style,
      height,
      isInteger,
    } = this.props;

    const isNormal = !['min', 'max'].includes(showType);
    // const imageSizes = {
    //   min: 21,
    //   big: 252,
    //   middle: 67,
    //   normal: 167,
    // };
    let backgroundImageHeight = 167;
    let backgroundSize = 'contain';
    let tight = false;
    let backgroundType = 'normal';
    if (height !== 'auto' && height > 280) {
      backgroundImageHeight = 252;
      backgroundType = 'bigBg';
    }
    if (height !== 'auto' && height > 250 && height <= 280) {
      backgroundType = 'middleBg';
    }
    if (height !== 'auto' && height < 70) {
      backgroundImageHeight = 67;
      backgroundType = 'smallBg';
    }
    if (height !== 'auto' && (height === 169 || height === 275)) {
      tight = true;
    }
    if (backgroundImageHeight < height) {
      // debugger
      backgroundSize = 'cover';
    }

    return (
      <div
        className={classnames(classNames.calculationProcessContainer, {
          [classNames.detailProcess]: detailProcess,
          [classNames.showHeader]: showHeader,
        })}
        style={{ ...style }}
      >
        <div>
          {showHeader && (
            <div className={classNames.titleContainer}>
              <span className={classNames.title}>{title}</span>
              <span className={classNames.resultAmount}>
                {isInteger ? calculationResult : precisionEnsure(calculationResult)}
              </span>
            </div>
          )}
          <div
            className={classnames(
              classNames.contentContainer,
              classNames[size],
              classNames[backgroundSize],
              classNames[backgroundType],
              { [classNames.total]: !isNormal, [classNames.tight]: tight }
            )}
            style={{ minHeight: height }}
          >
            {!isNormal && (
              <div className={classNames.calculaitonType}>{showType.toUpperCase()}</div>
            )}
            <ul className={classnames(classNames.content)}>
              {lodash
                .chain(processList)
                .filter((item) => !item.hidden)
                .map((item, i) => (
                  // eslint-disable-next-line react/no-array-index-key
                  <li className={classNames.item} key={item.key + i} name={item.key}>
                    <div className={classNames.detailItem}>
                      <span
                        className={classnames(classNames.detailTitle, {
                          [classNames.titleIsNull]: !item.title,
                        })}
                      >
                        {item.title}
                      </span>
                      <span className={classNames.detailValue}>{item.value}</span>
                    </div>
                    {item.child && <div className={classNames.child}>{item.child}</div>}
                  </li>
                ))
                .value()}
            </ul>
          </div>
        </div>
      </div>
    );
  }
}

Process.propTypes = {
  title: PropTypes.string,
  calculationResult: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  processList: PropTypes.array,
  showType: PropTypes.string,
  detailProcess: PropTypes.bool,
  showHeader: PropTypes.bool,
  size: PropTypes.string,
  style: PropTypes.object,
  height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

Process.defaultProps = {
  title: '',
  showType: 'normal',
  detailProcess: false,
  calculationResult: '',
  showHeader: true,
  size: 'big',
  style: {},
  height: 'auto',
  processList: [],
};

export default Process;
