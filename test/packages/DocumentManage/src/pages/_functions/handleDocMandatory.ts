import lodash from 'lodash';
import type { DocumentModel, DropdownConfigureModel } from '../_dto/model';
import checkExistDocMandatory from './checkExistDocMandatory';

const handleDocMandatory = (
  documentList?: DocumentModel[],
  dropdownConfigure?: DropdownConfigureModel[],
  docMandatoryList: string[]
): DocumentModel | any => {
  const mandatoryList = [];
  // find mandatory document
  if (lodash.isEmpty(docMandatoryList)) return [];
  const docMandatorys = lodash.filter(dropdownConfigure, (dropdownItem) => {
    const { docTypeCode } = dropdownItem;
    return docMandatoryList.indexOf(docTypeCode) !== -1;
  });

  // check current document is included mandatory document
  lodash.forEach(docMandatorys, (mandatory) => {
    const { docTypeCode } = mandatory;
    const docMandatory = checkExistDocMandatory(documentList, { docTypeCode });
    const voidFlag = docMandatory?.voidFlag;
    const docMandatoryObj = { mandatory, isExistMandatory: !!docMandatory && !voidFlag };
    mandatoryList.push(docMandatoryObj);
  });

  return lodash.orderBy(mandatoryList, 'mandatory.docName');
};

export default handleDocMandatory;
