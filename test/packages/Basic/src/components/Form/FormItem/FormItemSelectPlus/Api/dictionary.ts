import { searchName as dictionary } from '@/services/miscDictionaryControllerService';

export default (typeCode: any) => (codes: any) => {
  return dictionary({
    codes,
    typeCode,
  });
}
