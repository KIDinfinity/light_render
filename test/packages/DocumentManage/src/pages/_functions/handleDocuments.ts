import lodash from 'lodash';

/**
 * 处理文档数据--分组--排序
 * @param documents 文档数据集合
 * @param groupKey 分组的key
 */
const handleDocuments = (documents: any[], groupKey: string = 'formCategory') => {
  if (!lodash.isArray(documents) || documents.length < 1) return documents;
  // 分组
  const documentsGrouped = lodash.chain(documents).groupBy(groupKey).value();
  // 排序并重新组织数据返回
  return lodash
    .chain(documentsGrouped)
    .keys()
    .orderBy()
    .map((groupValue: string) => {
      return {
        groupValue: groupValue && groupValue !== String(undefined) ? groupValue : '',
        documents: lodash.orderBy(documentsGrouped[groupValue], 'receivedDate'),
        hideTitle: lodash.every(documentsGrouped[groupValue], (item: any) => !!item?.voidFlag),
      };
    })
    .value();
};

export default handleDocuments;
