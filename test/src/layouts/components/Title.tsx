import React from 'react';
import { Helmet } from 'umi';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import {  SS, SSKey } from '@/utils/cache';
const Title = () => {
  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>
          {formatMessageApi({ Label_COM_WebTabTitle:SS.getItem(SSKey.CONFIGS)?.webPageTitle })}
        </title>
      </Helmet>
    </>
  );
};
export default Title;
