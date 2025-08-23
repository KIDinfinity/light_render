import React from 'react';
import ItemMap from './map';
import LoginContext from './loginContext';
import WrapFormItemInput from './WrapFormItemInput';
import Region from './Region';
import Tenant from './Tenant';

const LoginItem = {};
Object.keys(ItemMap).forEach((key) => {
  const item = ItemMap[key];
  LoginItem[key] = (props) => (
    <LoginContext.Consumer>
      {(context) => (
        <WrapFormItemInput
          customprops={item.props}
          rules={item.rules}
          {...props}
          type={key}
          updateActive={context.updateActive}
          form={context.form}
        />
      )}
    </LoginContext.Consumer>
  );
});

LoginItem.Region = Region;
LoginItem.Tenant = Tenant;

export default LoginItem;
