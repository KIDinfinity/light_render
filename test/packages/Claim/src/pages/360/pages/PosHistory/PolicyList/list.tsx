import React, { useState } from 'react';
import lodash from 'lodash';
import Item from './item';

export default ({ policyList }: any) => {
  const [activeKey, setActiveKey] = useState(0);

  return (
    <div>
      {lodash.map(policyList, (item, key) => (
        <Item
          activeKey={activeKey}
          key={key}
          index={key}
          callback={setActiveKey}
          policyItem={item}
        />
      ))}
    </div>
  );
};
