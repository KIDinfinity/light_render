import lodash from 'lodash';
import{ v4 as  uuidv4 } from 'uuid';

export default function* (_, { select, put }) {
  const dataForSubmit = yield put.resolve({
    type: 'prepareClaimData',
  });
  const documentTypeOptionsNew = yield select(
    (state) => state.dictionaryController.documentTypeMandatory_jp
  );
  const taskDetail = yield select((state) => state.processTask.getTask);
  if (lodash.isEmpty(documentTypeOptionsNew)) {
    return {};
  }
  const { processInstanceId, taskId, parentClaimNo } = dataForSubmit;
  const caseCategory = taskDetail?.caseCategory;
  const pendDocumentInfoList = lodash.map(dataForSubmit.applicationList, (item) => ({
    creator: '',
    deleted: 0,
    docConfigDOList: lodash.filter(documentTypeOptionsNew, (documentTypeOptions: any) =>
      lodash.includes(item.documentTypeArray, documentTypeOptions?.dictCode)
    ),
    gmtCreate: '',
    gmtModified: '',
    id: uuidv4(),
    modifier: '',
    parentClaimNo,
    caseCategory,
    processInstanceId,
    applicationNo: item.applicationNo,
    transId: '',
    reminderRecipient: {
      name: item.reminderRecipientName,
      role: item.reminderRecipientRole,
    },
    claimNo: taskDetail?.businessNo,
    variables: {
      address: item.recipientAddress,
      mailCode: item.recipientPostCode,
      surname: item.recipientName,
      claimNo: parentClaimNo,
      documentTypes: (() => {
        const documentTypesList = lodash.map(item.documentTypeArray, (applicationItem) =>
          lodash.find(
            documentTypeOptionsNew,
            (documentItem) => applicationItem === documentItem?.dictCode
          )
        );
        const handledata = lodash
          .chain(documentTypesList)
          .map((v) => v?.dictName)
          .join(',')
          .value();
        return handledata;
      })(),
    },
  }));
  const autoPendContent = {
    processInstanceId,
    taskId,
    pendDocumentInfoList,
  };

  return autoPendContent;
}
