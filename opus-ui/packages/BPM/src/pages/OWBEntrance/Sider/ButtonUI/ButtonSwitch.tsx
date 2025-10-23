import { useDispatch } from 'dva';
import React, { useContext, useMemo } from 'react';
import context from '../../Context/context';
import opusButtonStyles from './OpusButton.less';
import Default from './Default';
import Error from './Error';
import Loading from './Loading';

const C = ({ item, buttonStatus, defaultTitle, handleClick, disabled }: any) => {
  const globalDispatch = useDispatch();
  const styles = opusButtonStyles;
  switch (buttonStatus?.status) {
    case 'error':
      return (
        <Error
          key={item?.key}
          errorsCount={buttonStatus?.errorsCount}
          styles={styles}
          globalDispatch={globalDispatch}
          buttonCode={item?.buttonCode}
          disabled={disabled}
        />
      );
    case 'loading':
      return (
        <Loading
          buttonCode={item?.buttonCode}
          key={item?.key}
          title={item?.title}
          styles={styles}
        />
      );
    case 'avtive':
    case 'warning':
    case 'default':
    case 'disabled':
    default:
      return (
        <Default
          key={item?.key}
          title={item?.title || defaultTitle}
          styles={styles}
          className={item?.className}
          status={buttonStatus?.status || item?.initStatus}
          icon={item?.icon || item?.buttonCode}
          buttonCode={item?.buttonCode}
          action={() => handleClick(item)}
          compress={false}
          disabled={disabled}
        />
      );
  }
  return <></>;
};

const ButtonSwitch = ({ item, defaultTitle, handleClick, disabled }: any) => {
  const { state } = useContext(context);
  const buttonStatus = state?.buttonStatus?.[item?.buttonCode];

  return useMemo(() => {
    return (
      <C
        item={item}
        buttonStatus={buttonStatus}
        defaultTitle={defaultTitle}
        handleClick={handleClick}
        disabled={disabled}
      />
    );
  }, [item, state?.buttonStatus]);
};

export default ButtonSwitch;
