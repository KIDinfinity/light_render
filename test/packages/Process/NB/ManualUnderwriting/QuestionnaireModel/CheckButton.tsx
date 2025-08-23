import React from 'react';
import { Button } from 'antd';
import { formatMessageApi } from '@/utils/dictFormatMessage';

const CheckButton = ({ onClick }: any) => {
  return (
    <Button onClick={onClick}>
      {formatMessageApi({
        Label_BIZ_Policy: 'Questionaire',
      })}
    </Button>
  );
};

export default CheckButton;
