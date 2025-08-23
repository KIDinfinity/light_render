import React from 'react';
import { Checkbox, Row, Col } from 'antd';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import { connect } from 'dva';
import classnames from 'classnames';
import styles from './index.less';

function InformationTabs(props) {
  const caseCategory = props?.caseCategory;

  const handleChangeHistTab = (t) => {
    const { dispatch } = props;
    dispatch({
      type: 'navigatorInformationController/handleChangeTabs',
      payload: {
        tabs: t,
      },
    });
  };
  const { tabs } = props;
  return (
    <div>
      <div className={classnames('tabButtons', styles.tabButtons)}>
        <Checkbox.Group onChange={handleChangeHistTab} value={tabs}>
          <Row type="flex">
            <Col>
              <Checkbox value="case">
                {formatMessageApi({
                  Label_BIZ_Claim: 'app.navigator.drawer.remark.tab.case',
                  caseCategory,
                })}
              </Checkbox>
            </Col>
            <Col>
              <Checkbox value="insured">
                {formatMessageApi({
                  Label_BIZ_Claim: 'app.navigator.drawer.remark.tab.insured',
                  caseCategory,
                })}
              </Checkbox>
            </Col>
            <Col>
              <Checkbox value="policy">
                {formatMessageApi({
                  Label_BIZ_Claim: 'app.navigator.drawer.remark.tab.policy',
                  caseCategory,
                })}
              </Checkbox>
            </Col>
          </Row>
        </Checkbox.Group>
      </div>
    </div>
  );
}
export default connect(({ navigatorInformationController }) => ({
  tabs: navigatorInformationController.tabs,
  caseCategory: navigatorInformationController.caseCategory,
}))(InformationTabs);
