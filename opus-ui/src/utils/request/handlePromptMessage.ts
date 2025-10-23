import lodash from 'lodash';
import isOtherException from '@/utils/isOtherException';
import { formatMessageApi } from '@/utils/dictFormatMessage';

interface PromptMessage {
  content: string;
}

interface Params {
  type: string;
  promptMessages: PromptMessage[];
}

const handlePromptMessages = ({ type, promptMessages }: Params): PromptMessage[] => {
  if (isOtherException(lodash.toUpper(type))) {
    return [
      {
        content: formatMessageApi({
          Label_COM_ErrorMessage: 'MSG_001357',
        }),
      },
    ];
  }

  return promptMessages;
};

export default handlePromptMessages;
