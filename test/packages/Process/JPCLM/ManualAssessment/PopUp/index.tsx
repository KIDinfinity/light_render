import React, { useMemo } from 'react';
import { useSelector, useDispatch } from 'dva';
import { Tabs } from 'antd';
import lodash from 'lodash';
import { SourceSystem } from 'process/Enum';
import { formUtils } from 'basic/components/Form';
import ButtonOfClaim from 'claim/components/ButtonOfClaim';
import KlipCaseInfo from './KlipCaseInfo';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import PolicyInfo from './PolicyInfo';
import Treatment from './Treatment';
import styles from './index.less';

const { TabPane } = Tabs;

const PopUp = ({ incidentId }: any) => {
  const dispatch = useDispatch();
  const editable = !useSelector((state: any) => state.claimEditable.taskNotEditable);

  const listPolicy =
    useSelector(({ JPCLMOfClaimAssessment }: any) => JPCLMOfClaimAssessment?.listPolicy) || [];

  const klipCaseInfoList =
    useSelector(
      ({ JPCLMOfClaimAssessment }: any) =>
        JPCLMOfClaimAssessment?.claimEntities?.incidentListMap?.[incidentId]?.klipCaseInfoList
    ) || [];

  const treatmentList = useSelector(
    (state: any) =>
      state.JPCLMOfClaimAssessment.claimEntities?.incidentListMap?.[incidentId].treatmentList
  );
  const existPolicy = lodash.compact(
    lodash.map(klipCaseInfoList, (item) => formUtils.queryValue(item?.policyId))
  );
  const claimNo = useSelector(
    ({ JPCLMOfClaimAssessment }: any) => JPCLMOfClaimAssessment.claimProcessData?.claimNo
  );

  const popUpPolicyInfoList = useSelector(
    ({ JPCLMOfClaimAssessment }: any) => JPCLMOfClaimAssessment?.popUpPolicyInfoList
  );

  const newKlipCaseInfoList = useMemo(() => {
    return lodash.map(klipCaseInfoList, (infoItem: any) => ({
      ...infoItem,
      sourceSystem:
        lodash
          .chain(listPolicy)
          .find(
            (policyItem: any) => policyItem.policyNo === formUtils.queryValue(infoItem.policyId)
          )
          .get('sourceSystem')
          .value() || SourceSystem.Klip,
    }));
  }, [klipCaseInfoList, listPolicy]);

  const handleAdd = () => {
    dispatch({
      type: 'JPCLMOfClaimAssessment/klipCaseInfoAdd',
      payload: {
        incidentId,
        claimNo,
      },
    });
  };
  return (
    <>
      <div className={styles.title}>Integration information</div>
      <div className={styles.container}>
        <Tabs defaultActiveKey="1" type="card">
          <TabPane
            tab={formatMessageApi({
              Label_BIZ_Claim: 'ExtSystemInfo',
            })}
            key="1"
          >
            {lodash
              .reduce(
                newKlipCaseInfoList,
                (arr: any, el: any) => {
                  return el.sourceSystem === SourceSystem.Lifej ? [el, ...arr] : [...arr, el];
                },
                []
              )
              .map((item: any) => (
                <KlipCaseInfo
                  item={item}
                  key={item.id}
                  existPolicy={existPolicy}
                  incidentId={incidentId}
                />
              ))}
            {editable && (
              <ButtonOfClaim
                handleClick={handleAdd}
                buttonText={formatMessageApi({
                  Label_BIZ_Claim: 'AddExtLinkage',
                })}
              />
            )}
            {lodash.map(treatmentList, (treatmentId: any) => (
              <Treatment treatmentId={treatmentId} incidentId={incidentId} key={treatmentId} />
            ))}
          </TabPane>
          <TabPane
            tab={formatMessageApi({
              Label_BIZ_Policy: 'Policy',
            })}
            key="2"
          >
            {lodash.map(popUpPolicyInfoList, (item) => (
              <PolicyInfo item={item} key={item} />
            ))}
          </TabPane>
        </Tabs>
      </div>
    </>
  );
};

export default PopUp;
