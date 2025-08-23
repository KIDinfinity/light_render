import React, { useMemo } from 'react';
import { useSelector, useDispatch } from 'dva';
import lodash from 'lodash';
import { Tabs } from 'antd';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import ButtonOfClaim from 'claim/components/ButtonOfClaim';
import { SourceSystem } from 'process/Enum';
import { formUtils } from 'basic/components/Form';
import KlipCaseInfo from './KlipCaseInfo';
import PolicyInfo from './PolicyInfo';
import Treatment from './Treatment';
import styles from './index.less';

const { TabPane } = Tabs;

const PopUp = ({ incidentId }: any) => {
  const dispatch = useDispatch();
  const editable = !useSelector((state: any) => state.claimEditable.taskNotEditable);

  const policyList = useSelector(({ JPCLMOfDataCapture }: any) => JPCLMOfDataCapture?.policyList);
  const klipCaseInfoList =
    useSelector(
      ({ JPCLMOfDataCapture }: any) =>
        JPCLMOfDataCapture?.claimEntities?.incidentListMap?.[incidentId]?.klipCaseInfoList
    ) || [];

  const treatmentList = useSelector(
    (state: any) =>
      state.JPCLMOfDataCapture.claimEntities?.incidentListMap?.[incidentId].treatmentList
  );
  const claimNo = useSelector(
    ({ JPCLMOfDataCapture }: any) => JPCLMOfDataCapture.claimProcessData?.claimNo
  );
  const KlipClaimNo = useSelector(
    ({ JPCLMOfDataCapture }: any) => JPCLMOfDataCapture?.KLIPClaimNoList
  );

  const existPolicy = lodash.compact(
    lodash.map(klipCaseInfoList, (item) => formUtils.queryValue(item?.policyId))
  );

  const popUpPolicyInfoList = useSelector(
    ({ JPCLMOfDataCapture }: any) => JPCLMOfDataCapture?.popUpPolicyInfoList
  );

  const newKlipCaseInfoList = useMemo(() => {
    return lodash.map(klipCaseInfoList, (infoItem: any) => ({
      ...infoItem,
      sourceSystem:
        lodash
          .chain(policyList)
          .find(
            (policyItem: any) => policyItem.policyId === formUtils.queryValue(infoItem.policyId)
          )
          .get('sourceSystem')
          .value() || SourceSystem.Klip,
    }));
  }, [klipCaseInfoList, policyList]);
  const handleAdd = () => {
    dispatch({
      type: 'JPCLMOfDataCapture/klipCaseInfoAdd',
      payload: {
        incidentId,
        claimNo,
        klipClaimNo: lodash.get(KlipClaimNo, `[0].fieldValue`),
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
                (arr: any, item: any) => {
                  return item.sourceSystem === SourceSystem.Lifej ? [item, ...arr] : [...arr, item];
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
