import React from 'react';
import icon_error from '../../_static/un-recieved.svg';
import icon_right from '../../_static/recieved.svg';

export default ({ status, className }: any) => {
  return status ? (
    <img src={icon_right} alt="icon_right" width={12} className={className} />
  ) : (
    <img src={icon_error} alt="icon_error" width={12} className={className} />
  );
};
