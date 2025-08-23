import React from 'react';
import HeaderUI from '../Header/Header';

const Header = ({ headerInfoConfig, title, indicator = {} }: any) => (
  <HeaderUI
    title={title}
    status=""
    slaTime={0}
    urgent={false}
    headerInfoConfig={headerInfoConfig}
    indicator={indicator}
  />
);

Header.displayName = 'Header';

export default Header;
