import { formatMessageApi } from '@/utils/dictFormatMessage';
import { Icon, Spin, Tabs } from 'antd';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'umi';
import lodash from 'lodash';
import classNames from 'classnames';
import useInfo from './_hook/useInfo';
import { namespace } from './_models';

import Extension from './Extension';
import Comment from './Comment';
import GenerateUWWorksheetModal from './_component/GenerateUWWorksheetModal';
import ReadOnlyInfoHistory from './ReadOnlyInfoHistory';
import AuditLog from './_component/AuditLog';

import styles from './index.less';

export { namespace };

const { TabPane } = Tabs;

const SystemAutomationItem = ({ infoGroup }: any) => {
  return (
    <div>
      <div className={styles.title}>
        <Icon type="history" className={styles.history} />
        <span className={styles.text}>
          {formatMessageApi({
            Label_BIZ_Claim: 'app.navigator.drawer.remark.title.history',
          })}
        </span>
      </div>
      <ReadOnlyInfoHistory infoGroup={infoGroup} />
    </div>
  );
};

const tabContent = ({ infoGroupCode, editable, infoGroup, caseDetail }: any) => {
  const map: any = {
    auditLog: AuditLog,
  };

  const CommentItem = !editable ? SystemAutomationItem : Comment;

  const Component: any = map?.[infoGroupCode] ? map[infoGroupCode] : CommentItem;
  return <Component infoGroup={infoGroup} caseDetail={caseDetail} />;
};

const C = ({ caseDetail }: any) => {
  const { informationGroups, groupCodes, curGroupCode } = useSelector((state) => state[namespace]);

  const initLoading = useSelector((state) =>
    lodash.get(state, `loading.effects.${namespace + '/initInfo'}`)
  );

  const gethistoryLoading = useSelector((state) =>
    lodash.get(state, `loading.effects.${namespace + '/getInfoHistory'}`)
  );

  const dispatch = useDispatch();

  const curInfoHistory = useInfo({
    infoGroupCode: curGroupCode,
  });

  const infoGroup = lodash.get(informationGroups, curGroupCode);
  const { editable, isShowDropDown } = infoGroup || {};
  const handleChangeTab = (key) => {
    dispatch({
      type: `${namespace}/setCurGroupCategory`,
      payload: { curGroupCode: key },
    });
  };

  useEffect(() => {
    if (!lodash.isEmpty(caseDetail)) {
      dispatch({
        type: 'infoController/initInfo',
        payload: {
          caseDetail: { ...caseDetail, caseNo: `${caseDetail?.caseNo}` },
        },
      });
      return () => {
        dispatch({
          type: `${namespace}/clearState`,
          payload: { keepState: 'submitInfo' },
        });
      };
    }
  }, [caseDetail]);

  return (
    <Spin spinning={initLoading || gethistoryLoading}>
      <div className={styles.content}>
        <Extension
          editable={editable}
          curInfoHistory={curInfoHistory}
          isShowDropDown={isShowDropDown}
        />
        <div className={classNames(styles.main, { [styles.hiddenExtension]: !editable })}>
          <Tabs activeKey={curGroupCode} onChange={handleChangeTab}>
            {groupCodes.map(({ infoGroupCode }: any) => (
              <TabPane
                tab={formatMessageApi({ DropDown_INF_CategoryGroup: infoGroupCode })}
                key={infoGroupCode}
              >
                {tabContent({ infoGroupCode, editable, infoGroup, caseDetail })}
              </TabPane>
            ))}
          </Tabs>
        </div>
        <GenerateUWWorksheetModal />
      </div>
    </Spin>
  );
};

export default C;
