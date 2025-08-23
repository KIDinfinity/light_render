import React from 'react';
import Proptypes from 'prop-types';
import classnames from 'classnames';
import { connect } from 'dva';
import { precisionEnsure } from '@/utils/precisionUtils';
import classNames from './index.less';

@connect(({ calculationPath }, { name }) => ({
  activeModel: calculationPath.activeModel,
  isActive: name && name === calculationPath.activeModel,
}))
class CountModel extends React.Component {
  render() {
    const { title, amount, hasDetail, dispatch, name, isActive, descStyle, isInteger } = this.props;

    return (
      <div
        className={classnames(classNames.model, {
          [classNames.noDetail]: !hasDetail,
          [classNames.active]: isActive,
        })}
        onClick={() => {
          if (!(hasDetail && name)) {
            return false;
          }
          dispatch({
            type: 'calculationPath/setActiveModel',
            payload: {
              activeModel: name,
            },
          });

          return true;
        }}
      >
        <span className={classnames(classNames.desc)} style={descStyle}>
          {title}
        </span>
        <span className={classNames.count}>{isInteger ? amount : precisionEnsure(amount)}</span>
      </div>
    );
  }
}

CountModel.propTypes = {
  title: Proptypes.string,
  hasDetail: Proptypes.bool,
  amount: Proptypes.oneOfType([Proptypes.string, Proptypes.number]).isRequired,
  name: Proptypes.string,
  descStyle: Proptypes.object,
};
CountModel.defaultProps = {
  title: '',
  hasDetail: false,
  name: '',
  descStyle: {},
};
export default CountModel;
