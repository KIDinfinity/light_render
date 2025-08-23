import React from 'react';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import DrawHeadTitle from '@/components/DrawHeadTitle';

export default () => {
  return (
    <DrawHeadTitle>
      {formatMessageApi({
        Label_COM_General: 'Tools',
      })}
    </DrawHeadTitle>
  );
};
