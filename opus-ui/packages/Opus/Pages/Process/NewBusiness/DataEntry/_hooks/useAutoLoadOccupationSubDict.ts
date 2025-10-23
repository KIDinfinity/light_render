import useAutoLoadHierachySubDicts from 'basic/hooks/useAutoLoadHierachySubDicts';

export default (parentCode: string, parentFieldName: string) => {
  useAutoLoadHierachySubDicts({
    parentFieldName,
    parentCode,
  });
};
