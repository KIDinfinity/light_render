import React from 'react';
import useLoadCountrys from 'process/NB/ManualUnderwriting/_hooks/useLoadCountrys';
import ClientDetail from './ClientDetail';
import ClientSelect from './ClientSelect';
import Layout from './Layout';

interface Iprops {
  mode: string;
  isDisplayc360?: boolean;
}

const Client = ({ mode, isDisplayc360 }: Iprops) => {
  useLoadCountrys();

  return (
    <Layout mode={mode}>
      <ClientDetail mode={mode} isDisplayc360={isDisplayc360} />
      <ClientSelect mode={mode} />
    </Layout>
  );
};

Client.displayName = 'client';

export default Client;
