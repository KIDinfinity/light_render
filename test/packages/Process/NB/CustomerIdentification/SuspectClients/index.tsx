import React from 'react';
import { useSelector } from 'dva';
import lodash from 'lodash';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import Ellipsis from '@/components/Ellipsis';
import ErrorTooltipManual from 'claim/components/ErrorTooltipManual';
import useGetFullNameByClientInfo from 'process/NB/CustomerIdentification/_hooks/useGetFullNameByClientInfo';
import useJudgeAuthorisedSignatoryDisplay from 'process/NB/CustomerIdentification/_hooks/useJudgeAuthorisedSignatoryDisplay';
import { clientIsSelected, showCard } from 'process/NB/CustomerIdentification/Utils';
import CustomerType from 'process/NB/CustomerIdentification/CustomerType';
import CustomerRoleList from 'process/NB/CustomerIdentification/CustomerRoleList';
import SuspectClientsDetail from './SuspectClientsDetail';
import SubCard from '../SubCard';
import styles from './index.less';
import useJudgeUpdateClientOptionDisplay from '../_hooks/useJudgeUpdateClientOptionDisplay';
import getSelectedSuspectClient from '../Utils/getSelectedSuspectClient';
import ClientOptionSelection from './ClientOptionSelection';

const RequestClients = ({ clientList, columnList, policy }: any) => {
  const submited = useSelector(({ formCommonController }: any) => formCommonController.submited);
  const getCleintName = useGetFullNameByClientInfo();
  const isShowASCard = useJudgeAuthorisedSignatoryDisplay();
  const canShowUpdateClientOption = useJudgeUpdateClientOptionDisplay();
  return (
    <div>
      {lodash.map(clientList, (item: any) => {
        return showCard(item, clientList) ? (
          <div className={styles.wrap} key={item.id}>
            <div className={styles.account}>
              <div className={styles.info}>
                <div className={styles.userName}>
                  <span className={styles.errorToolTip}>
                    {submited && clientIsSelected(item) && (
                      <ErrorTooltipManual
                        // @ts-ignore
                        manualErrorMessage={
                          <>
                            <p>
                              {formatMessageApi(
                                { Label_COM_WarningMessage: 'MSG_000528' },
                                getCleintName({ clientInfo: item })
                              )}
                            </p>
                          </>
                        }
                      />
                    )}
                  </span>
                  <Ellipsis lines={2} tooltip forceTooltip>
                    <span>{getCleintName({ clientInfo: item })}</span>
                  </Ellipsis>
                </div>
                <CustomerRoleList roleList={item?.roleList} />
                <CustomerType customerType={item.customerType} />
              </div>
            </div>
            <div className={styles.ClientsDetail}>
              <SuspectClientsDetail item={item} policy={policy} columnList={columnList} />
              {isShowASCard({ item }) && <SubCard policy={policy} columnList={columnList} />}
              {canShowUpdateClientOption && getSelectedSuspectClient(item) && (
                <ClientOptionSelection clientItem={item} policy={policy} />
              )}
            </div>
          </div>
        ) : (
          <></>
        );
      })}
    </div>
  );
};

export default RequestClients;
