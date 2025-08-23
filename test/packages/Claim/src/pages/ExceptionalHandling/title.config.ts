import { formatMessageApi } from '@/utils/dictFormatMessage';

export default () => ({
    errorInfo: {
      title: formatMessageApi({
        Label_COM_Exception: 'ErrorInformation',
      }),
    },
});
