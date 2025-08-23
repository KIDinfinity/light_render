import React from 'react';
import Provider from './Provider';
import Consumer from './Consumer';

export default ({ children }) => (
  <Provider>
    <Consumer>{children}</Consumer>
  </Provider>
);
