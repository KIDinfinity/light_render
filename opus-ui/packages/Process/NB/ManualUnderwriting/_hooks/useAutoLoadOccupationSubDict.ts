import useAutoLoadHierachySubDicts from 'basic/hooks/useAutoLoadHierachySubDicts';
import useGetClientInfoFieldValueByKey from 'process/NB/ManualUnderwriting/_hooks/useGetClientInfoFieldValueByKey';

export default ({ id }: any) => {
  const occupationCode = useGetClientInfoFieldValueByKey({ id, key: 'occupationCode' });
  useAutoLoadHierachySubDicts({
    parentFieldName: 'Dropdown_IND_Occupation',
    parentCode: occupationCode,
  });
};
