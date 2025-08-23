import { formatMessageApi } from '@/utils/dictFormatMessage';
import lodash from 'lodash';

export const VLD_001121 =
  (specialCharList: any, checkSpecialChar: any) => (rule: any, value: any, callback: Function) => {
    const targetSpecialChar = lodash.chain(specialCharList).get('defaultValue').split(',').value();
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = value;
    const filterValue = tempDiv.textContent || tempDiv.innerText || '';
    const specialChar = targetSpecialChar.filter((item) => filterValue.includes(item)).join(', ');

    if (specialCharList && specialChar && !!checkSpecialChar) {
      callback(formatMessageApi({ Label_COM_ErrorMessage: 'MSG_001268' }, specialChar));
    } else {
      callback();
    }
  };
