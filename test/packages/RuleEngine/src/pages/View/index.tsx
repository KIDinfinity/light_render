import React, { useEffect, useState } from 'react';
import { connect, useDispatch, useSelector } from 'dva';
import TaskDetailHeader from 'claim/components/TaskDetailHeader';
import HeaderInfo from 'claim/components/HeaderInfo';
import DetailSider from 'navigator/components/DetailSider';
import SiderBarButton from '@/components/SiderBarButton';
import BackButton from '@/components/BackButton/SiderBarBackButton';
import CaseCategory from 'basic/enum/CaseCategory';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import { getAuth } from '@/auth/Utils';
import RuleView from '../Edit';
import styles from './index.less';
import { Spin } from 'antd';
import { useParams } from 'umi';

const RuleEngineView = connect(({ ruleEngineController, user }: any) => ({
  submitRuleSet: ruleEngineController.submitRuleSet,
  asyncBusinesssId: ruleEngineController.asyncBusinesssId,
  userId: user.currentUser?.userId,
}))((props: { match: any; submitRuleSet: any; userId: string; asyncBusinesssId: string }) => {
  const { match, submitRuleSet, userId, asyncBusinesssId } = props;
  const dispatch = useDispatch();
  const ruleSetId = match?.params?.id;
  const versionId = submitRuleSet?.ruleSetInfo?.versionId;
  const commonAuthorityList = useSelector(
    (state: { authController: { commonAuthorityList: any } }) =>
      state.authController.commonAuthorityList
  );

  const [isEditButtonShow, setEditButtonShow] = useState(false);

  useEffect(() => {
    const editButtonShow: boolean = getAuth(commonAuthorityList, {
      authorityCode: CaseCategory.RS_RuleQuery_EditRule,
    });
    setEditButtonShow(editButtonShow);
  }, []);

  useEffect(() => {
    dispatch({
      type: 'global/changeLayoutHeader',
      payload: {
        isShowHeader: false,
      },
    });
    return () => {
      dispatch({
        type: 'global/changeLayoutHeader',
        payload: {
          isShowHeader: true,
        },
      });
    };
  }, []);

  useEffect(() => {
    dispatch({
      type: 'ruleEngineController/asyncQueryRuleSetByBusinessId',
      payload: ruleSetId,
    });

    dispatch({
      type: `ruleEngineController/getDropDown`,
    });
  }, [ruleSetId]);
  useEffect(() => {
    let time: any;
    async function start(asyncBusinesssId: any[]) {
      await dispatch({
        type: 'ruleEngineController/loopAsyncBusinessId',
        payload: { asyncBusinesssId },
      });
    }

    if (asyncBusinesssId) {
      time = setInterval(() => {
        start(asyncBusinesssId);
      }, 4000);
    }

    return () => {
      clearTimeout(time);
    };
  }, [asyncBusinesssId]);

  const handleEdit = () => {
    dispatch({
      type: 'ruleEngineController/startSyncProcessInstance',
      payload: {
        caseCategory: CaseCategory.BP_RUL_CTG002,
        variables: {
          applicant: userId,
          inquiryBusinessNo: ruleSetId,
          claimNo: versionId,
          submisionDate: new Date(),
        },
      },
    });
  };

  return (
    <>
      <TaskDetailHeader
        title={formatMessageApi({ Label_BIZ_Claim: 'venus_claim.ruleEngine.ruleSetMaintenance' })}
      >
        <HeaderInfo
          list={[
            {
              title: formatMessageApi({ Label_BIZ_Claim: 'venus_claim.ruleEngine.ruleSetId' }),
              value: ruleSetId,
            },
          ]}
        />
      </TaskDetailHeader>
      <div className={styles.container}>
        <DetailSider>
          {isEditButtonShow && (
            <SiderBarButton
              onClick={handleEdit}
              icon={'edit'}
              key={'edit'}
              title={'Edit'}
              disabled={!!asyncBusinesssId}
              className={'edit'}
            />
          )}
          <BackButton />
        </DetailSider>
        <div className={`${styles.content} ${styles['black-scroll']}`}>
          {asyncBusinesssId ? (
            <Spin size="large" className={styles.loading} />
          ) : (
            <RuleView isAdvanced />
          )}
        </div>
      </div>
    </>
  );
});

export default (props) => {
  const params = useParams();
  return <RuleEngineView {...props} match={{ params }} />;
};
