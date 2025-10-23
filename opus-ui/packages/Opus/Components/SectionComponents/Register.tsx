import React, { useContext, useEffect } from 'react';

import Context from './Context';

const Register = ({ formName, children }: any) => {
  const { registerField } = useContext<any>(Context);

  useEffect(() => {
    // 注册表单项到sectionContext
    if (registerField && formName) {
      registerField(formName, true);
    }
    return () => {
      if (registerField && formName) {
        // 卸载时取消注册
        registerField(formName, false);
      }
    };
  }, [registerField, formName]);

  return children;
};

export default Register as React.FC<any>;
