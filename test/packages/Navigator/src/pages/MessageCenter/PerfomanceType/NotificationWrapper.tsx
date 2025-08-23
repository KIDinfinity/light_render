import React from 'react';
import Notification from './Notification';
import Decorator from '../Decorator';
import MCSubscribeNotification from '../MCSubscribe/MCSubscribeNotification';

export default () => (
  <Decorator>
    <MCSubscribeNotification />
    <Notification />
  </Decorator>
);
