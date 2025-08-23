import React from 'react';
import HeaderUI from '../Header/Header';

const Header = ({ headerInfoConfig, title, appealFlag }: any) => (
  <HeaderUI
    title={title}
    status=""
    slaTime={0}
    urgent={false}
    headerInfoConfig={headerInfoConfig}
    appealFlag={appealFlag}
  />
);

Header.displayName = 'Header';

export default Header;
