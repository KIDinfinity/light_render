import { ExceptionType } from '@/utils/constant/information';

export default function isOtherException(type: string) {
  return (
    type === ExceptionType.DAO_EXCEPTION ||
    type === ExceptionType.UNKNOW_EXCEPTION ||
    type === ExceptionType.SYSTEM_EXCEPTION
  );
}
