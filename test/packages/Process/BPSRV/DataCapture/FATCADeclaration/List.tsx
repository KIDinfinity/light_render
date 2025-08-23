import React from 'react';
import lodash from 'lodash';
import { connect, useSelector } from 'dva';
import classNames from 'classnames';
import { Form, Row, Col } from 'antd';
import Ellipsis from '@/components/Ellipsis';
import { formUtils, ElementConfig } from 'basic/components/Form';
import transFieldsConfig from '../../common/transFieldsConfig';
import Section, { Fields } from './Section';
import { NAMESPACE } from '../activity.config';
import { localConfig } from './Section';
import Item from './Item'
import styles from './index.less';

const RenderTitle = ({ config }: any) => {
  const editable = !useSelector(({ claimEditable }: any) => claimEditable.taskNotEditable);
  const list = transFieldsConfig({ config });
  const titleList = lodash.filter(list, (item) => { return item?.field !== "fATCAStatus" });

  return (
    <div className={classNames({ [styles.laber]: editable, [styles.disabledLaberPr]: !editable })}>
      <Row type="flex" gutter={16}>
        {lodash.map(titleList, (item: any) => {
          return (
            <Col key={item.label} span={item.span}>
              <Ellipsis lines={0} fullWidthRecognition>
                {item.label}
              </Ellipsis>
            </Col>
          );
        })}
      </Row>
    </div>
  );
};


const List = ({ form }: any) => {
  const editable = !useSelector(({ claimEditable }: any) => claimEditable.taskNotEditable);

  const fatcaInfo = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace.processData?.fatcaInfo
  );

  return (
    <>
      <div>
        <Section
          form={form}
          editable={editable}
          section="FATCADeclaration"
        >
          <Fields.FATCAStatus />
        </Section>
      </div>
      {lodash.size(fatcaInfo) > 0 && (<ElementConfig.Section section={'FATCADeclaration'} config={localConfig}>
        <RenderTitle />
      </ElementConfig.Section>)}
      {lodash.map(fatcaInfo, (item: any) => (<Item item={item} />))}
    </>
  );
};

export default connect(
  ({ [NAMESPACE]: modelnamepsace }: any) => ({
    crsFACTAUpdateFlag: modelnamepsace.processData?.crsFACTAUpdateFlag,
  })
)(
  Form.create({
    mapPropsToFields(props: any) {
      const { crsFACTAUpdateFlag } = props;
      return formUtils.mapObjectToFields(
        {
          fATCAStatus: crsFACTAUpdateFlag || 'N'
        }
      );
    },
  })(List)
);
