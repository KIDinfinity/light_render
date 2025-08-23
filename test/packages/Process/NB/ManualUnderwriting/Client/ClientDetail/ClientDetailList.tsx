import React from 'react';
import { Row, Col } from 'antd';
import { useParams } from 'umi';
import { useSelector,  } from 'dva';
import { shallowEqual } from 'react-redux';
import lodash from 'lodash';
import { QuestionnaireModal } from 'basic/components/QuestionnaireV2';
import useFilterAuthorisedSignatoryClientDetailList from 'process/NB/ManualUnderwriting/_hooks/useFilterAuthorisedSignatoryClientDetailList';
import useFilterFamilyGroupClientDetailList from 'process/NB/ManualUnderwriting/_hooks/useFilterFamilyGroupClientDetailList';
import useResetExpendedClient from 'process/NB/ManualUnderwriting/_hooks/useResetExpendedClient';
import useGetRelationOfProposerDefaultValue from 'process/NB/ManualUnderwriting/_hooks/useGetRelationOfProposerDefaultValue';
import useLoadRoleDropdown from 'process/NB/ManualUnderwriting/_hooks/useLoadRoleDropdown';
import useJudgeSummary360DataEmptyCallback from 'summary/hooks/useJudgeSummary360DataEmptyCallback';
import { NAMESPACE } from '../../activity.config';
import Mode from 'process/NB/ManualUnderwriting/Enum/Mode';
import ClientDetail from './ClientDetail';
import C360 from 'claim/360Summary';
import styles from './clientDetail.less';

const ClientList = ({ mode, isDisplayc360, expendStatus }: any) => {
  const filteredList = useFilterAuthorisedSignatoryClientDetailList();
  const list = useFilterFamilyGroupClientDetailList(filteredList);

  const expendedClient = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace.expendedClient,
    shallowEqual
  );
  const { businessNo, caseCategory, inquiryBusinessNo } = useSelector(
    ({ processTask }: any) => processTask.getTask || {}
  );

  const paramsBussinessNo = useParams()?.businessNo;

  useResetExpendedClient();
  useLoadRoleDropdown();
  useGetRelationOfProposerDefaultValue();
  const handleJudge360Empty = useJudgeSummary360DataEmptyCallback();
  return (
    <>
      <Row gutter={[16, 16]} type="flex">
        {lodash
          .chain(list)
          .filter((item: any) => item.deleted !== 1)
          .filter((item: any, index: number) => {
            if (expendStatus) {
              return true;
            }
            if (mode === Mode.Edit) {
              return index === 0;
            }
            if (expendedClient) {
              return item.id === expendedClient;
            }
            if (index < 2) {
              return true;
            }
            return false;
          })
          .map((item: any, index: number) => {
            return (
              <Col
                key={item.id}
                span={mode === Mode.Edit || expendedClient || expendStatus ? 24 : 12}
              >
                <div className={styles.detailWrapper}>
                  <ClientDetail
                    mode={mode}
                    item={item}
                    index={index}
                    isSubCard={false}
                    expendStatus={expendStatus}
                  />
                  {isDisplayc360 &&
                    (expendedClient || expendStatus) &&
                    !handleJudge360Empty({ clientId: item?.laClientId }) && (
                      <C360 clientId={item?.laClientId} />
                    )}
                </div>
              </Col>
            );
          })
          .value()}
      </Row>
      <QuestionnaireModal
        businessNo={businessNo || paramsBussinessNo || inquiryBusinessNo}
        caseCategory={caseCategory}
        isNB
      />
    </>
  );
};

export default ClientList;
