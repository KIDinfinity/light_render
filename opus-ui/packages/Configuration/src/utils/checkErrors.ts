import { ErrorType } from 'configuration/pages/ConfigurationCenter/Enum';
import lodash from 'lodash';

const checkError = (errorMessage = [], type) => {
  return lodash.some(errorMessage, (item: any) => item.type === type);
};

export default ({ errorMessage }: any) => {
  return {
    isFormatError: checkError(errorMessage, ErrorType.errData),
    isRequiredError: checkError(errorMessage, ErrorType.errField),
    isLoseFieldError: checkError(errorMessage, ErrorType.lose),
  };
};
