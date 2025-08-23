import { Region, tenant } from '@/components/Tenant';
import { useDispatch, useSelector } from 'dva';
import lodash from 'lodash';
import { NAMESPACE } from 'process/GeneralPOS/BaseProduct/activity.config';
import { IdentificationClientTagEnum, OperationTypeEnum } from 'process/GeneralPOS/common/Enum';
import React, { useMemo } from 'react';
import ClientInfoIdentificationItem from '../../ClientInfoIdentificationItem';
import type { ICustomer } from '../../CustomerIdentification/types';
import EditItem from '../Edit/EditItem';
import CheckDuplicateButton from './CheckDuplicateButton';

interface IProps {
  clientInfo: any;
  transactionId: string;
  clientIndex: number;
  identificationClientResult: object;
  disabled: boolean;
}

const Item = ({
  clientInfo,
  transactionId,
  clientIndex,
  identificationClientResult,
  disabled = false,
}: IProps) => {
  const dispatch = useDispatch();
  const identifyResultTagMap = {
    [IdentificationClientTagEnum.SuspectClient]: null,
    [IdentificationClientTagEnum.Mismatch]: 'New',
    [IdentificationClientTagEnum.FullyMatch]: 'Existing',
  };
  const isHistory = useSelector(({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace.isHistory);

  const { clientSeq } = clientInfo;
  const deleteHandle = () => {
    dispatch({
      type: `${NAMESPACE}/nomineeUpdate`,
      payload: {
        transactionId,
        type: OperationTypeEnum.DELETE,
        clientIndex: clientIndex,
        validating: false,
      },
    });
  };
  const customerInfo = useMemo<ICustomer>(() => {
    const { firstName, middleName, surname, roleList } = clientInfo;
    const roles = lodash.map(roleList, (roleItem: any) => roleItem.customerRole);
    return {
      firstName,
      middleName,
      surname,
      roleList: roles,
      clientId: tenant.region({
        [Region.TH]: identificationClientResult?.selectClientId || '-',
        [Region.MY]: identificationClientResult?.selectCcrClientId || '-',
      }),
    };
  }, [clientInfo, identificationClientResult]);
  return (
    <ClientInfoIdentificationItem
      customerInfo={customerInfo}
      identifyResultTag={identifyResultTagMap?.[identificationClientResult?.identificationResult]}
      identifyResultTagShow={
        identificationClientResult?.identificationResult !==
        IdentificationClientTagEnum.SuspectClient
      }
      disabled={disabled}
      handleClose={deleteHandle}
    >
      {!isHistory && !disabled && (
        <CheckDuplicateButton
          transactionId={transactionId}
          clientSeq={clientSeq}
          clientIndex={clientIndex}
        />
      )}
      <EditItem transactionId={transactionId} clientSeq={clientSeq} clientIndex={clientIndex} />
    </ClientInfoIdentificationItem>
  );
};

export default Item;
