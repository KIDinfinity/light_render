import { useMemo } from 'react';
import lodash from 'lodash';
import { useSelector } from 'dva';
import { EToolModules, EFieldFlagName } from '../_dto/enums';
import { getNameByCode, handleDocuments, findConfigsByFlagName } from '../_functions';
import { ESubjectType } from '@/components/SolutionRead/Enums';

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
      : lodash.filter(documentList, (documentItem: any) => {
          return lodash.some(
            [
              {
                key: 'name',
              },
              {
                key: 'docId',
              },
              {
                key: 'docTypeCode',
                value: (documentItem: any) => {
                  const { docTypeCode } = documentItem;
                  return lodash.get(getNameByCode(dropdownConfigure, { docTypeCode }), 'docName');
                },
              },
            ],
            (item) => {
              const target = item.value ? item.value(documentItem) : documentItem[item.key];

              return lodash.toUpper(target)?.indexOf?.(lodash.toUpper(searchValue)) !== -1;
            }
          );
        });

    const mustReadList = lodash.filter(filterList, { mustRead: true });

    return lodash
      .chain([
        ...handleDocuments(mustReadList, fieldName),
        ...handleDocuments(lodash.differenceBy(filterList, mustReadList, 'id'), fieldName),
      ])
      .reduce((arr: any, documentItem: any) => {
        const documents = lodash
          .chain(documentItem?.documents)
          .filter((document) => (!viewActived ? !document?.voidFlag : true))
          .map((el: any) => ({
            ...el,
            unRead:
              (el?.mustRead ? true : !!isAssinee) &&
              !lodash.includes(readData[ESubjectType.DOC], el.docId),
          }))
          .orderBy('unRead', ['desc'])
          .value();

        // return lodash.orderBy([{ ...documentItem, documents }, ...arr], ['groupValue'], ['asc']);

        return [
          ...arr,
          {
            ...documentItem,
            documents,
          },
        ];
      }, [])
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
