import React from 'react';
import ProxySwitcher from '../components/proxySwitch/ProxySwitcher';

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
	return (
		<>
			{children}
			<ProxySwitcher />
		</>
	);
};

export default Layout;
