import React, { useMemo } from 'react';
import { useSelector } from 'dva';
import lodash from 'lodash';

import { formatMessageApi } from '@/utils/dictFormatMessage';
import Ellipsis from '@/components/Ellipsis';

import ErrorTooltipManual from 'claim/components/ErrorTooltipManual';

import {
  useGetFullNameByClientInfo,
  useJudgeAuthorisedSignatoryDisplay,
  useJudgeUpdateClientOptionDisplay,
} from '../_hooks';
import { clientIsSelected, showCard } from '../Utils';
import { NbClientTag } from 'process/NewBusiness/ManualUnderwriting/_enum';

import Detail from './Detail';
import SubCard from '../SubCard';
import RoleList from '../RoleList';
import CustomerType from '../CustomerType';

import styles from './index.less';
import getSelectedSuspectClient from '../Utils/getSelectedSuspectClient';
import ClientOptionSelection from './ClientOptionSelection';

const RequestClients = ({ act002Config, columnList, clientInfoList, id }: any) => {
  const submited = useSelector(({ formCommonController }: any) => formCommonController.submited);
  const getCleintName = useGetFullNameByClientInfo();
  const isShowASCard = useJudgeAuthorisedSignatoryDisplay();
  const canShowUpdateClientOption = useJudgeUpdateClientOptionDisplay();

  const list = useMemo(() => {
    const result = lodash
      .filter(clientInfoList, ({ identificationList }: any) => {
        const fullyMatchItem = lodash.find(
          identificationList,
          ({ clientTag }: any) => clientTag === NbClientTag.FullyMatch
        );
        const suspectClientItem = lodash.find(
          identificationList,
          ({ clientTag }: any) => clientTag === NbClientTag.SuspectClient
        );

        return !identificationList?.length || (!fullyMatchItem && suspectClientItem);
      })
      // TODO:应该把这个去掉
      .map((item) => {
        return {
          ...item,
          age: item?.customerAge,
        };
      });
    return result;
  }, [clientInfoList]);

  return (
    <div>
      {lodash.map(list, (item: any) => {
        return showCard(item, list) ? (
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
                <RoleList roleList={item?.roleList} />
                <CustomerType customerType={item.customerType} />
              </div>
            </div>
            <div className={styles.ClientsDetail}>
              <Detail policyId={id} item={item} act002Config={act002Config} />
              {isShowASCard({ item }) && <SubCard policyId={id} columnList={columnList} />}
              {canShowUpdateClientOption && getSelectedSuspectClient(item) && (
                <ClientOptionSelection clientItem={item} policyId={id} />
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
