import React from 'react';
import { Helmet } from 'umi';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import { SS, SSKey } from '@/utils/cache';
import { tenant } from '@/components/Tenant';
import isOpus from '@/utils/isOpus';

const Title = (props) => {
  const { inLogin } = props;
  const region = tenant.region();
  const currentEnv = SS.getItem(SSKey.CONFIGS)?.currentEnv;
  const OWBTitle = SS.getItem(SSKey.CONFIGS)?.webPageTitle;
  const opusSite = isOpus();
  const title = opusSite ? `opus${currentEnv}${inLogin ? '' : region}` : OWBTitle;
  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>{formatMessageApi({ Label_COM_WebTabTitle: title })}</title>
      </Helmet>
    </>
  );
};
export default Title;
