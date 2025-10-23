import React from 'react';
import { EditSectionCodeEnum } from 'process/GeneralPOS/common/Enum';
import useSectionEditable from 'process/GeneralPOS/BaseProduct/_hooks/useSectionEditable';
import Section from '../Section';
import { localConfig, Fields } from './Section';
import useGetSectionAtomConfigByRemote from 'basic/components/Elements/hooks/useGetSectionAtomConfigByRemote';
import { ReactComponent as CountryIcon } from 'process/assets/country.svg';

const Item = ({ form, transactionId, formId }: any) => {
  const editable = useSectionEditable(EditSectionCodeEnum.CommonNominee);
  const config = useGetSectionAtomConfigByRemote({
    section: 'Nominee-Address',
    localConfig,
  });
  return (
    <Section
      icon={<CountryIcon />}
      config={config}
      form={form}
      editable={editable}
      section="Nominee-Address"
      formId={formId}
    >
      <Fields.Nationality transactionId={transactionId} />
    </Section>
  );
};

export default Item;
