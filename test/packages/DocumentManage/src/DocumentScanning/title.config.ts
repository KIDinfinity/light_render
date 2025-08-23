import { formatMessageApi } from '@/utils/dictFormatMessage';

export default () => ({
  claimProcessData: {
    indexInformation: {
      title: formatMessageApi({
        Label_COM_Document: 'IndexingInformation',
      }),
    },
    uploadFiles: {
      title: formatMessageApi({
        Label_COM_Document: 'UploadFile',
      }),
    },
  },
});
