import React from 'react';
import { formatMessageApi } from '@/utils/dictFormatMessage';

const SearchEmpty = () => {
  return (
    <div
      style={{
        height: '40vh',
        marginTop: '20vh',
        fontWeight: '700',
        fontSize: '16px',
      }}
    >
      {<span>-{formatMessageApi({ Label_COM_General: 'startSearch' })}-</span>}
    </div>
  );
};

export default SearchEmpty;
