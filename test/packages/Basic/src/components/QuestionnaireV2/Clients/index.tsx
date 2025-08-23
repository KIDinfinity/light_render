import React from 'react';
import { useSelector, useDispatch } from 'dva';
import useHandleGetQuestionnaireDefaultClientName from 'process/NewBusiness/ManualUnderwriting/_hooks/useHandleGetQuestionnaireDefaultClientName';
import ClientsUI from './ClientsUI';
import useGetNamespace from 'basic/components/NamespaceProvider/hooks/useGetNamespace';

const Clients = () => {
  const NAMESPACE = useGetNamespace();
  const dispatch = useDispatch();
  const questionnaireKey = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace.questionnaireKey
  );
  const selectClient = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace.selectClient
  );
  const roleByClientMap = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace.roleByClientMap
  );
  const handleGetQuestionnaireDefaultClientName = useHandleGetQuestionnaireDefaultClientName();
  const customerQuestionnaireList =
    useSelector(({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace.processData) || [];
  console.log('customerQuestionnaireList__', customerQuestionnaireList);
  const isNB = useSelector(({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace.isNB);
  const isAgentName = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace.isAgentName
  );
  const otherPayload = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace.otherPayload
  );

  const handleSelect = (clientIdOrIdentity: string) => {
    dispatch({
      type: `${NAMESPACE}/saveSelectClient`,
      payload: {
        selectClient: clientIdOrIdentity,
      },
    });
  };

  const computedCustomerQuestionnaireList = customerQuestionnaireList
    ?.filter((item) => item?.clientInfo?.[questionnaireKey])
    ?.sort((item: any) =>
      isNB && item?.clientInfo?.[questionnaireKey] === otherPayload?.[questionnaireKey] ? -1 : 0
    )
    ?.map((item: any) => {
      let clientName = item?.clientInfo?.clientName;
      if (isNB) {
        clientName = `${item.clientInfo.firstName}${item.clientInfo.surname}`;

        if (!isAgentName) {
          clientName = (() => {
            return handleGetQuestionnaireDefaultClientName({
              clientId: item?.clientInfo?.clientId,
              questionnaireKey,
              identityNo: item?.clientInfo?.identityNo,
              identityType: item?.clientInfo?.identityType,
            });
          })();
        }
      }

      return {
        ...item,
        clientName,
        clientKey: item.clientInfo[questionnaireKey],
        selected: item.clientInfo[questionnaireKey] == selectClient,
      };
    });

  return (
    <ClientsUI
      roleByClientMap={roleByClientMap}
      selectClientFn={handleSelect}
      customerQuestionnaireList={computedCustomerQuestionnaireList}
    />
  );
};
Clients.displayName = 'Clients';

export default Clients;
