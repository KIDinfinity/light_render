import React from 'react';
import { Link } from 'umi';
import useExpanderController from 'navigator/hooks/useExpanderController';
import Logo from '@/components/Logo/logo';
import styles from './DetailSider.less';
import compressedStyles from './DetailSiderCompressed.less';

const DetailSider = ({ children }) => {
  const { isSiderToggleOn } = useExpanderController();
  const actualStyle = isSiderToggleOn? compressedStyles : styles;

  return (
    <div className={actualStyle.slider}>
      <Link to="/" key="logo" className={actualStyle.logo}>
        {isSiderToggleOn ? <Logo sideOpen type="2" /> : <Logo type="2" />}
      </Link>
      <div className={actualStyle.button}>
        {React.Children.map(children, (child: any) =>
          child && React.cloneElement(child, { compressed: isSiderToggleOn })
        )}
      </div>
    </div>
  );
};

export default DetailSider;
