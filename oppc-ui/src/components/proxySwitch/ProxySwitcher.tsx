import React, { useEffect, useState } from 'react';


import { proxyEnvMap, ProxyEnvKey } from '../../constants/proxyEnv';
const proxyKeys = Object.keys(proxyEnvMap) as ProxyEnvKey[];

const LOCAL_KEY = 'DEV_PROXY_ENV_KEY';

const ProxySwitcher: React.FC = () => {
  const [selected, setSelected] = useState<string>(() => localStorage.getItem(LOCAL_KEY) || 'presit');

  useEffect(() => {
    localStorage.setItem(LOCAL_KEY, selected);
  }, [selected]);

  if (process.env.NODE_ENV !== 'development') return null;

  return (
    <div style={{ position: 'fixed', top: 16, right: 24, zIndex: 9999 }}>
      <select
        value={selected}
        onChange={e => {
          setSelected(e.target.value);
          window.location.reload();
        }}
        style={{ padding: 4, borderRadius: 4 }}
        title="切换代理环境"
      >
        {proxyKeys.map(key => (
          <option value={key} key={key}>{key}</option>
        ))}
      </select>
    </div>
  );
};

export default ProxySwitcher;
