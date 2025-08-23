import React from 'react';
import lodash from 'lodash';
import { Button } from 'antd';
import classNames from 'classnames';
import ErrorTooltipManual from 'claim/components/ErrorTooltipManual';
// import { formatMessageApi } from '@/utils/dictFormatMessage';

import styles from './index.less';
interface ButtonWithIconProps {
  handleClick: () => void;
  showIcon: boolean;
  buttonText: string;
  open?: boolean;
  errors?: any[];
  loading?: boolean;
  disabled?: boolean;
  errorsMSG?: string;
}
const ButtonWithIcon = ({
  handleClick,
  showIcon,
  buttonText,
  open,
  errors,
  loading = false,
  disabled = false,
  errorsMSG = '',
}: ButtonWithIconProps) => {
  const getErrorMsg = () => {
    if (lodash.isArray(errors)) {
      return lodash.join(errors, '\n');
    }
    if (lodash.isString(errors)) {
      return errors || errorsMSG;
    }
    return errorsMSG;
  };

  return (
    <div className={classNames('errorIconPoint', styles.buttonWrap)} onClick={handleClick}>
      <Button disabled={disabled} loading={loading}>
        {buttonText}
      </Button>
      {showIcon && (
        <div className={styles.iconWrap}>
          <ErrorTooltipManual open={open} manualErrorMessage={getErrorMsg()} />
        </div>
      )}
    </div>
  );
};

export default ButtonWithIcon;
