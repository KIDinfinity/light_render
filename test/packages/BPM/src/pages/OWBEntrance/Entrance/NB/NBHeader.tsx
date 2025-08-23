import React, { useContext } from 'react';
import HeaderUI from 'bpm/pages/OWBEntrance/Header/Header';
import HeaderDefault from 'bpm/pages/OWBEntrance/Header/HeaderDefault';
import context from '../../Context/context';

const Header = ({ headerInfoConfig, taskDetail }: any) => {
  const { state } = useContext(context);
  const { title } = state;
  return (
    <HeaderUI
      title={title}
      status=""
      slaTime={0}
      urgent={false}
      headerInfoConfig={headerInfoConfig}
      defaultHeader={<HeaderDefault {...taskDetail} />}
    />
  );
};

Header.displayName = 'Header';

export default Header;
