import React from 'react';
import { Icon } from 'antd';
import styles from './CommonButton.less';
import compressedStyles from './CompressButton.less';
import BpmIcon from 'bpm/pages/OWBEntrance/Sider/ButtonUI/Icon';
import classnames from 'classnames';

interface IProps {
  compressed?: boolean,
  key: string,
  onClick: any,
  disabled?: boolean,
  component?: any,
  icon?: string,
  title: string,
  className: string,
  IconClassName?: string,
  ReactComponent?: any,
}

const SiderBarButton = ({ compressed, key, onClick, disabled = false, component, title, className, IconClassName, icon, ReactComponent }: IProps) => {
  const actualStyles = compressed? compressedStyles : styles;
  return (
    <button
      type="button"
      key={key}
      className={classnames(actualStyles.box, className)}
      disabled={disabled}
      onClick={onClick}
    >
      {
        ReactComponent? ReactComponent : icon? <BpmIcon icon={icon} /> : <Icon component={component} className={IconClassName}/>
      }
      <span>{title}</span>
    </button>
  );
};

export default SiderBarButton;
