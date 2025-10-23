import React, { useContext, useState, useRef } from 'react';
import lodash from 'lodash';
import { Col } from 'antd';

import Context from './Context';

const { Provider } = Context;

const SectionProvider = ({ children, sectionId, sectionIndex, config }: any) => {
  const registerIds = useRef({});
  const [isShow, setIsShow] = useState(false);

  const { registerField: registerParent, id: parentId } = useContext<any>(Context);
  const id = parentId ? `${parentId}_${sectionId}${sectionIndex}` : `${sectionId}${sectionIndex}`;

  const registerField = (registerId: string, value: boolean) => {
    registerIds.current = { ...registerIds.current, [registerId]: value };
    const hasShow = lodash.some(registerIds.current, (item) => item === true);

    // 当前section 根据字段是否渲染来判断是否显示
    if (hasShow) {
      registerParent?.(id, true);
      setIsShow(true);
    } else {
      registerParent?.(id, false);
      setIsShow(false);
    }
  };

  return (
    <Provider value={{ registerField, id, sectionId }}>
      <div style={isShow ? {} : { display: 'none' }} data-automation={id}>
        <Col span={config.span || 24}>{React.cloneElement(children, { config: config })}</Col>
      </div>
    </Provider>
  );
};

export default SectionProvider;
