import React from 'react';
import { Form } from 'antd';
import { connect, useSelector } from 'dva';
import { formUtils } from 'basic/components/Form';
import Section from '../../../../_section/riskIndicatorField';
import { NAMESPACE } from 'opus/NewBusiness/ManualUnderwriting/activity.config';

const RaskIndicator = ({ clientId, form }: any) => {
  return <Section form={form} editable={false} clientId={clientId} readOnly />;
};

const RaskIndicatorSection = connect(({ [NAMESPACE]: modelnamepsace }: any, { clientId }: any) => ({
  riskIndicator: modelnamepsace.entities.clientMap?.[clientId]?.riskIndicator,
}))(
  Form.create({
    mapPropsToFields(props: any) {
      const { riskIndicator } = props;
      return formUtils.mapObjectToFields(riskIndicator);
    },
  })(RaskIndicator)
);

export default (props: any) => {
  const expandedClientId = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace.expandedClientId
  );
  const expand = !!expandedClientId;
  return (
    <>
      {expand && (
        <>
          <RaskIndicatorSection {...props} />
        </>
      )}
    </>
  );
};
