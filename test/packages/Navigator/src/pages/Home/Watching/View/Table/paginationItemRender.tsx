import React from 'react';
import { Button } from 'antd';
import { formatMessageApi } from '@/utils/dictFormatMessage';

export default (_: any, type: string, originalElement: any) => {
  if (type === 'prev') {
    return (
      <Button>
        {formatMessageApi({
          Label_BPM_Button: 'component.button.back',
        })}
      </Button>
    );
  }
  if (type === 'next') {
    return (
      <Button>
        {formatMessageApi({
          Label_BPM_Button: 'component.button.next',
        })}
      </Button>
    );
  }

  return originalElement;
};
