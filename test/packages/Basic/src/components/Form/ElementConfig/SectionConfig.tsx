import React, { useState, useEffect } from 'react';
import lodash from 'lodash';
import GetConfig from './GetConfig';

const Config = ({ section, children, config }: any) => {
  const [filteredConfig, setFilteredConfig] = useState([]);

  useEffect(() => {
    setFilteredConfig(lodash.filter(config, (item) => item?.section === section));
  }, [config]);
  return React.cloneElement(children, { config: filteredConfig });
};

export default ({ section, config, children }: any) => {
  return (
    <GetConfig config={config}>
      <Config section={section}>{children}</Config>
    </GetConfig>
  );
};
