import React, { useEffect } from 'react';
import useLoadCountrys from 'process/NB/ManualUnderwriting/_hooks/useLoadCountrys';
import ClientDetail from 'process/NB/ManualUnderwriting/Client/ClientDetail';
import ClientSelect from 'process/NB/ManualUnderwriting/Client/ClientSelect';
import Layout from 'process/NB/ManualUnderwriting/Client/Layout';
import ExpandableContainer from 'basic/components/ExpandableContainer';
import useHandlePublishExpandEventCallback from 'basic/components/ExpandableContainer/hooks/useHandlePublishExpandEventCallback';
import ExpandEvent from 'enum/ExpandEvent';
interface Iprops {
  mode: string;
  isDisplayc360?: boolean;
  expendStatus: boolean;
  setExpendStatus: Function;
}

const ClientContent = ({ mode, isDisplayc360, expendStatus, setExpendStatus }: Iprops) => {
  useLoadCountrys();
  const handleExpandSection = useHandlePublishExpandEventCallback();

  useEffect(() => {
    if (expendStatus) {
      handleExpandSection({
        type: ExpandEvent.EXPAND_SINGLE_SECTION,
        payload: {
          sectionId: 'c360',
        },
      });
    }
  }, [expendStatus, handleExpandSection]);
  return (
    <Layout mode={mode} expendStatus={expendStatus}>
      <ClientDetail
        mode={mode}
        isDisplayc360={isDisplayc360}
        expendStatus={expendStatus}
        setExpendStatus={setExpendStatus}
      />
      <ClientSelect mode={mode} expendStatus={expendStatus} />
    </Layout>
  );
};

const Client = (props: any) => {
  return (
    <ExpandableContainer section="client">
      <ClientContent {...props} />
    </ExpandableContainer>
  );
};

Client.displayName = 'client';

export default Client;
