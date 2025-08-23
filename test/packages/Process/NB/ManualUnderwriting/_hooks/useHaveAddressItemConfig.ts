import lodash from 'lodash';
import useGetSectionAtomConfig from 'basic/components/Elements/hooks/useGetSectionAtomConfig';
import useHandleExtraConfigCallback from 'process/NB/ManualUnderwriting/_hooks/useHandleExtraConfigCallback';
import { localConfig } from 'process/NB/ManualUnderwriting/Client/ClientDetail/BasicInfo/ContactInfo/ContactInfo-Field/Section';

const section = 'ContactInfo-Field';

const targetFields = [
  'address1',
  'address2',
  'address3',
  'address4',
  'address5',
  'address6',
  'country',
  'zipCode',
  'addrType',
];

export default ({ id }: any) => {
  const config = useGetSectionAtomConfig({
    section,
    localConfig,
  });
  const targetFieldsConfigs = lodash.filter(config, (item) =>
    lodash.includes(targetFields, item?.field)
  );
  const gateway = useHandleExtraConfigCallback({ id });
  const newConfigs = gateway({ config: targetFieldsConfigs });

  return lodash.filter(newConfigs, (item) => item['field-props'].visible !== 'N');
};
