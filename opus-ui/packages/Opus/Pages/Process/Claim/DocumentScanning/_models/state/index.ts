export default {
  caseDetails: {},
  businessData: {
    claimProcessData: [
      {
        uploadFiles: [],
      },
    ],
  },
  documentNameList: [],
  uploadDocumentsModal: {
    visible: false,
    uploadFiles: [],
    ocrRequestId: null,
    ocrResultList: [],
    compressedConfig: {
      quality: 1,
      maxWidth: 0,
      enableCompress: false,
    },
  },
  ocrResultModal: {
    visible: false,
  },
};
