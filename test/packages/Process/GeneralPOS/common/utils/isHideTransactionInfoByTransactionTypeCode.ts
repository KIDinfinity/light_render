import { Region, tenant } from '@/components/Tenant';
import lodash from 'lodash';
import { TransactionTypeEnum } from 'process/GeneralPOS/common/Enum';

export default ({ transactionTypeCode }: any) => {
  return (
    lodash.includes(
      [
        TransactionTypeEnum.SRV020,
        TransactionTypeEnum.SRV035,
        TransactionTypeEnum.SRV098,
        TransactionTypeEnum.SRV019,
        TransactionTypeEnum.SRV032,
        TransactionTypeEnum.SRV081,
        TransactionTypeEnum.SRV085,
        TransactionTypeEnum.SRV092,
        TransactionTypeEnum.SRV024,
        TransactionTypeEnum.SRV026,
        TransactionTypeEnum.SRV034,
        TransactionTypeEnum.SRV046,
        TransactionTypeEnum.SRV050,
        TransactionTypeEnum.TEM002,
      ],
      transactionTypeCode
    ) && tenant.region() === Region.TH
  );
};
