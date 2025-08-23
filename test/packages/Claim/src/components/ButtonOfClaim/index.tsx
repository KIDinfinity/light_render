import type { FunctionComponent, CSSProperties } from 'react';
import React from 'react';
import { Button } from 'antd';
import classNames from 'classnames';
import ErrorTooltipManual from 'claim/components/ErrorTooltipManual';
import styles from './index.less';

interface IClaimBtn {
  handleClick?: (e: React.MouseEvent<HTMLElement, MouseEvent>) => void;
  buttonText?: string;
  buttonStyle?: CSSProperties;
  className?: string;
  errorMessage?: string;
}

const ButtonOfClaim: FunctionComponent<IClaimBtn> = ({
  handleClick,
  buttonText,
  buttonStyle,
  className,
  errorMessage,
}) => (
  <div className={classNames(styles.buttonWrap, className)}>
    <div className={styles.buttonError}>
      <Button icon="plus" type="primary" onClick={handleClick} style={buttonStyle} block>
        {buttonText}
      </Button>
      {errorMessage && <div className={styles.error}>
        <ErrorTooltipManual
          manualErrorMessage={errorMessage}
        />
      </div>}
    </div>
  </div>
);

export default ButtonOfClaim;
