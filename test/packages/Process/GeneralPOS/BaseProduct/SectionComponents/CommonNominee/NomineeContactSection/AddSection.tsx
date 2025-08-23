import { Form } from 'antd';
import useGetSectionAtomConfigByRemote from 'basic/components/Elements/hooks/useGetSectionAtomConfigByRemote';
import useSectionEditable from 'process/GeneralPOS/BaseProduct/_hooks/useSectionEditable';
import { EditSectionCodeEnum } from 'process/GeneralPOS/common/Enum';
import React from 'react';
import Section from '../Section';
import { Fields, localConfig } from './Section';

const AddSection = ({ form, transactionId, clientIndex, addHandle, formId }: any) => {
  const editable = useSectionEditable(EditSectionCodeEnum.CommonNominee);
  const config = useGetSectionAtomConfigByRemote({
    section: 'Nominee-Contact',
    localConfig,
  });
  return editable ? (
    <Section
      config={config}
      form={form}
      formId={formId}
      editable={editable}
      section="Nominee-Contact"
    >
      <Fields.ContactType
        isAdd
        addHandle={addHandle}
        transactionId={transactionId}
        clientIndex={clientIndex}
      />
    </Section>
  ) : (
    <></>
  );
};

export default Form.create()(AddSection);
