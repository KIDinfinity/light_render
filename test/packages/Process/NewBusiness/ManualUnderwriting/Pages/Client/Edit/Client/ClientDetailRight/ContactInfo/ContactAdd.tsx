import React, { useEffect } from 'react';
import { Form } from 'antd';
import { connect, useSelector } from 'dva';
import { shallowEqual } from 'react-redux';
import lodash from 'lodash';

import { getDrowDownList } from '@/utils/dictFormatMessage';
import { formUtils } from 'basic/components/Form';
import useGetSectionAtomConfig from 'basic/components/Elements/hooks/useGetSectionAtomConfig';
import { NAMESPACE } from 'process/NewBusiness/ManualUnderwriting/activity.config';

import { Section, Fields, localConfig } from '../../../../_section/contactInfoTable';

const useIsSelectdAllItem = ({ id }: any) => {
  const contactInfoList = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) =>
      lodash.get(modelnamepsace, `modalData.entities.clientMap.${id}.contactInfoList`),
    shallowEqual
  );
  const contactInfoMap = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) =>
      lodash.get(modelnamepsace, `modalData.entities.contactInfoMap`),
    shallowEqual
  );

  const sectionConfig = useGetSectionAtomConfig({
    section: localConfig.section,
    localConfig,
  });
  const config = lodash.find(sectionConfig, { field: 'contactType' });
  const fieldProps = lodash.find(localConfig.configs, { field: 'contactType' })?.['field-props'];
  const defaultDicts = getDrowDownList({ config, fieldProps });
  const existCodes = lodash
    .chain(contactInfoList)
    .map((itemId) => formUtils.queryValue(lodash.get(contactInfoMap, `${itemId}.contactType`)))
    .value();
  return lodash.every(defaultDicts, (item) => existCodes.includes(item.dictCode));
};

const ContactAdd = ({ clientId, form }: any) => {
  const editable = !useSelector(({ claimEditable }: any) => claimEditable.taskNotEditable);

  useEffect(() => {
    form.resetFields();
  }, [form]);

  const isSelectdAllItem = useIsSelectdAllItem({ id: clientId });
  return isSelectdAllItem ? null : (
    <Section
      form={form}
      editable={editable}
      clientId={clientId}
      readOnly={false}
      condition="proposal"
      itemTable
    >
      <Fields.ContacttypeAdd />
    </Section>
  );
};

export default connect()(
  Form.create({
    onValuesChange(props: any, changedValues: any) {
      const { dispatch, clientId } = props;
      dispatch({
        type: `${NAMESPACE}/addContactInfo`,
        payload: {
          id: clientId,
          changedValues,
        },
      });
    },
  })(ContactAdd)
);
