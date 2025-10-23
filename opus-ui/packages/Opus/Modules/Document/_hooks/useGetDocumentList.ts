import { useMemo } from 'react';
import lodash from 'lodash';
import moment from 'moment';
import { useSelector } from 'dva';
import { EToolModules, EFieldFlagName } from '../_dto/enums';
import { handleDocuments, findConfigsByFlagName, getTypeCode } from '../_functions';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import { ESubjectType } from '@/components/SolutionRead/Enums';
import isIsoDateFormat from 'claim/pages/utils/isIsoDateFormat';
import { Region, tenant } from '@/components/Tenant';

const orderConditions = (() => {
  return tenant.region({
    [Region.JP]: [
      ['formCategory', 'docTypeCode', 'receivedDate'],
      ['asc', 'asc', 'desc'],
    ],
    notMatch: [
      ['voidFlag', 'formCategory', 'docTypeCode', 'receivedDate'],
      ['desc', 'asc', 'asc', 'desc'],
    ],
  });
})();

export default ({
  documentList,
  fieldConfigure,
  dropdownConfigure,
  viewActived,
  skipFilter,
}: any) => {
  const searchValue = useSelector(({ documentManagement }: any) => documentManagement.searchValue);
  const isAssinee = useSelector(({ solutionRead }: any) => solutionRead?.isAssinee) || false;
  const readData = useSelector(({ solutionRead }: any) => solutionRead?.readData);

  const fields = fieldConfigure?.[EToolModules.view];
  const config = findConfigsByFlagName(fields, EFieldFlagName.groupByFlag);
  const { fieldName } = config;
  return useMemo(() => {
    const filterList = skipFilter
      ? documentList
      : lodash
          .chain(documentList)
          .filter((documentItem: any) => {
            return lodash.some(
              [
                {
                  key: 'name',
                },
                {
                  key: 'docTypeCode',
                  value: (documentItem: any) => {
                    const targetKey = 'docName';
                    const docName = lodash
                      .chain(dropdownConfigure)
                      .find(
                        (item) =>
                          item.docTypeCode === documentItem.docTypeCode &&
                          item.externalDocTypeCode === documentItem.externalDocTypeCode
                      )
                      .get(targetKey)
                      .value();
                    const docCode = tenant.isJP()
                      ? documentItem?.docTypeCode
                      : documentItem?.externalDocTypeCode;
                    return docCode && docName ? `${docCode}-${docName}` : docCode || docName;
                  },
                },
                {
                  key: 'formCategory',
                  value: (documentItem: any) => {
                    const { formCategory } = documentItem;
                    return formatMessageApi({
                      [getTypeCode(fieldName)]: isIsoDateFormat(formCategory)
                        ? moment(formCategory).format('L')
                        : formCategory,
                    });
                  },
                },
              ],
              (item) => {
                const target = item.value ? item.value(documentItem) : documentItem[item.key];
                return lodash.toUpper(target)?.indexOf?.(lodash.toUpper(searchValue)) !== -1;
              }
            );
          })
          .map((documentItem) => {
            return {
              ...documentItem,
              formCategory: documentItem?.voidFlag
                ? formatMessageApi({
                    Label_COM_Opus: 'VoidedDocuments',
                  })
                : documentItem.formCategory,
            };
          })
          .value();

    return lodash
      .chain(handleDocuments(filterList, fieldName))
      .reduce((arr: any, documentItem: any) => {
        const documents = lodash
          .chain(documentItem?.documents)
          .filter((document) => (!viewActived ? !document?.voidFlag : true))
          .map((el: any) => ({
            ...el,
            unRead: !!isAssinee && !lodash.includes(readData[ESubjectType.DOC], el.docId),
          }))
          .orderBy(...orderConditions)
          .value();

        return [
          ...arr,
          {
            ...documentItem,
            documents,
          },
        ];
      }, [])
      .orderBy(['groupValue'], ['asc'])
      .value();
  }, [
    documentList,
    fieldConfigure,
    dropdownConfigure,
    readData,
    isAssinee,
    viewActived,
    searchValue,
  ]);
};
