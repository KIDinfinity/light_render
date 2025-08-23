import type { FunctionComponent, CSSProperties } from 'react';
import React, { useMemo } from 'react';
import { Progress } from 'antd';
import classNames from 'classnames';
import { EErrorResCodes } from '../../_dto/enums';

import styles from './styles.less';

interface IProps {
  className?: string;
  style?: CSSProperties;
  eloading?: boolean;
  uploading?: boolean;
  loading?: boolean;
  image?: string;
  progressing?: boolean;
}

const ProgressCustom: FunctionComponent<IProps> = ({
  className,
  eloading,
  uploading,
  progressing = false,
  image,
  style,
}) => {
  const ProgressCom = useMemo(() => {
    let Component = () => null;
    if (image === EErrorResCodes.uploadFailed) {
      Component = () => (
        <Progress
          percent={100}
          className={classNames(styles.uploadCompleted, className)}
          status="exception"
          style={style}
        />
      );
    } else if (eloading || uploading || progressing) {
      Component = () => (
        <Progress
          strokeColor={{
            from: 'var(--progress-from)',
            to: 'var(--progress-to)',
          }}
          percent={99.9}
          status="active"
          className={classNames(styles.uploading, className)}
          style={style}
        />
      );
    } else {
      Component = () => (
        <Progress
          percent={100}
          className={classNames(styles.uploadCompleted, className)}
          style={style}
        />
      );
    }
    return Component;
  }, [className, eloading, image, progressing, style, uploading]);

  return <ProgressCom />;
};

export default ProgressCustom;
