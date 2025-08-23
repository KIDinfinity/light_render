import DescriptionList from '@/components/DescriptionList';
import { getRelCaseInquiryParamVO } from '@/services/posSrvCaseInquiryControllerService';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import { getRemainingTimeStr } from '@/utils/utils';
import { Card } from 'antd';
import { useSelector, useDispatch } from 'dva';
import CaseCategory from 'enum/CaseCategory';
import lodash from 'lodash';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { history } from 'umi';
const { Description }: any = DescriptionList;

const CaseDeteailInfo = () => {
  const [completedAll, setCompletedAll] = useState(false);

  const [posCaseCategory, setPosCaseCategory] = useState('');
  const [posBusinessNo, setPosBusinessNo] = useState('');
  const dispatch = useDispatch();
  const {
    activityLogList,
    parentClaimNo,
    infoData: detail,
  } = useSelector((state: any) => {
    return state?.workspaceCases;
  });
  const {
    caseCategory,
    inquiryBusinessNo,
    businessNo,
    slaPercentage,
    processInstanceId,
    gmtCreate,
    insuredFirstName,
    insuredLastName,
    insured,
    level,
    slaEndTime,
    slaUsed,
    slaUnit,
    slaRemain,
    fullStp,
  } = lodash.pick(detail, [
    'caseCategory',
    'inquiryBusinessNo',
    'businessNo',
    'slaPercentage',
    'processInstanceId',
    'gmtCreate',
    'insuredFirstName',
    'insuredLastName',
    'insured',
    'level',
    'slaEndTime',
    'slaUsed',
    'slaUnit',
    'slaRemain',
    'fullStp',
  ]);
  const Jump = styled.span`
  text-decoration: underline;
  color: var(--primary-color);
  &:hover {
    color: var(--primary-color)
    cursor: pointer;
  }
`;
  let caseSla = '';
  const isPosCaseEnd = [
    CaseCategory.BP_SRV_CTG001,
    CaseCategory.BP_SRV_CTG002,
    CaseCategory.BP_PAPER_CTG001,
    CaseCategory.BP_POS_CTG001,
    CaseCategory.BP_POS_CTG002,
    CaseCategory.BP_POS_CTG003,
    CaseCategory.PH_POS_CTG001,
    CaseCategory.PH_POS_CTG002,
    CaseCategory.PH_POS_CTG003,
    CaseCategory.BP_PAPER_CTG004,
    CaseCategory.BP_POS_CTG006,
    CaseCategory.BP_POS_CTG008,
    CaseCategory.BP_POS_CTG009,
    CaseCategory.BP_POS_CTG010,
    CaseCategory.BP_PT_CTG001,
  ].includes(caseCategory);

  const formatTime = (data: any, slaUnit: any) => {
    if (!data || !lodash.isNumber(data)) return 0;
    const remainTime = getRemainingTimeStr(data, slaUnit, true);
    return remainTime;
  };
  const handledCaseEnd = async () => {
    const posCaseResponse = await getRelCaseInquiryParamVO({
      inquiryBusinessNo,
      caseCategory,
    });
    await setPosBusinessNo(posCaseResponse.resultData?.businessNo);
    await setPosCaseCategory(posCaseResponse.resultData?.caseCategory);
    setCompletedAll(
      posCaseResponse?.success &&
        !lodash.isEmpty(posCaseResponse.resultData?.businessNo) &&
        !lodash.isEmpty(posCaseResponse.resultData?.caseCategory)
        ? true
        : false
    );
  };
  useEffect(() => {
    if (!lodash.isEmpty(detail)) {
      if (isPosCaseEnd) {
        // 表示pos case en
        handledCaseEnd();
      } else {
        // 其他 流程表示case end
        setCompletedAll(
          activityLogList?.every(
            (item: any) => item.completedTime && !lodash.isEmpty(item.completedTime)
          )
        );
      }
    }
  }, [isPosCaseEnd, inquiryBusinessNo, caseCategory, activityLogList]);
  if (completedAll) {
    caseSla =
      slaPercentage > 100
        ? formatMessageApi({
            Label_BPM_Button: 'app.navigator.drawer.messager.button.no',
          })
        : formatMessageApi({
            Label_BPM_Button: 'app.navigator.drawer.messager.button.yes',
          });
  } else {
    caseSla = '---';
  }
  const handleClaimNoJump = async () => {
    if (isPosCaseEnd) {
      history.push({
        pathname: `/servicing/history/${posCaseCategory}/${posBusinessNo}`,
      });
      return;
    }
    let tabIndex = '';
    let params = {};
    switch (caseCategory) {
      case 'BP_NB_CTG001':
      case 'BP_NB_CTG005':
        tabIndex = '9';
        params = {
          businessNo,
        };
        break;
      default:
        tabIndex = '4';
        params = {
          inquiryBusinessNo: parentClaimNo,
        };
        break;
    }
    dispatch({
      type: 'advancedQueryController/enter',
      payload: {
        tabIndex,
        stateOfSearch: {
          params,
        },
      },
    });
  };
  return (
    <Card bordered={false}>
      <DescriptionList>
        <Description
          term={formatMessageApi({
            Label_BIZ_Claim: 'app.navigator.index.mode.table.title.caseNumber',
          })}
        >
          {processInstanceId}
        </Description>
        <Description
          term={formatMessageApi({
            Label_BIZ_Claim: 'app.navigator.taskDetail.inquireForm.label.creation-time',
          })}
        >
          {gmtCreate ? moment(gmtCreate).format('L LT') : null}
        </Description>
        <Description
          term={formatMessageApi({
            Label_BIZ_Claim: 'app.navigator.caseDetail.label.process-type',
          })}
        >
          {formatMessageApi({ Label_BPM_CaseCategory: caseCategory })}
        </Description>
        <Description
          term={formatMessageApi({
            Label_COM_General: 'BusinessNo',
          })}
        >
          {completedAll ? (
            <Jump onClick={() => handleClaimNoJump()}>{inquiryBusinessNo || '-'}</Jump>
          ) : (
            inquiryBusinessNo || '-'
          )}
        </Description>
        {!lodash.includes(
          ['BP_NB_CTG001', 'BP_NB_CTG002', 'BP_AP_CTG02', 'BP_NB_CTG003', 'BP_NB_CTG004'],
          caseCategory
        ) && (
          <Description
            term={formatMessageApi({
              Label_BIZ_Claim: 'app.navigator.taskDetail.inquireForm.label.insured-first-name',
            })}
          >
            {insuredFirstName || '-'}
          </Description>
        )}
        {!lodash.includes(
          ['BP_NB_CTG001', 'BP_NB_CTG002', 'BP_AP_CTG02', 'BP_NB_CTG003', 'BP_NB_CTG004'],
          caseCategory
        ) && (
          <Description
            term={formatMessageApi({
              Label_BIZ_Claim: 'app.navigator.taskDetail.inquireForm.label.insured-surname',
            })}
          >
            {insuredLastName || '-'}
          </Description>
        )}
        {lodash.includes(
          ['BP_NB_CTG001', 'BP_NB_CTG002', 'BP_AP_CTG02', 'BP_NB_CTG003', 'BP_NB_CTG004'],
          caseCategory
        ) && (
          <Description
            term={formatMessageApi({
              Label_BIZ_Policy: 'InsuredName',
            })}
          >
            {insured || '-'}
          </Description>
        )}
        <Description
          term={formatMessageApi({
            Label_BIZ_Claim: 'app.navigator.caseDetail.label.sla-level',
          })}
        >
          {level || '-'}
        </Description>
        <Description
          term={formatMessageApi({
            Label_BIZ_Claim: 'app.navigator.caseDetail.label.case-sla-due-data',
          })}
        >
          {moment(slaEndTime).format('L LT')}
        </Description>
        <Description
          term={formatMessageApi({
            Label_BIZ_Claim: 'app.navigator.caseDetail.label.case-sla-percentage',
          })}
        >
          {slaPercentage > 0 ? `${slaPercentage}%` : '0%'}
        </Description>
        <Description
          term={formatMessageApi({
            Label_BIZ_Claim: 'app.navigator.caseDetail.label.case-sla-used-time',
          })}
        >
          {formatTime(Number(slaUsed), slaUnit)}
        </Description>
        <Description
          term={formatMessageApi({
            Label_BIZ_Claim: 'app.navigator.caseDetail.label.case-sla-remain-time',
          })}
        >
          {formatTime(Math.max(Number(slaRemain), 0), slaUnit)}
        </Description>
        <Description
          term={formatMessageApi({
            Label_BIZ_Claim: 'app.navigator.caseDetail.label.meet-case-sla',
          })}
        >
          {caseSla}
        </Description>
        <Description
          term={formatMessageApi({
            Label_BIZ_Claim: 'app.navigator.caseDetail.label.case-category',
          })}
        >
          {formatMessageApi({
            Label_BPM_CaseCategory: caseCategory,
          })}
        </Description>
        <Description
          term={formatMessageApi({
            Label_BPM_CaseInfo: 'STPCase',
          })}
        >
          {formatMessageApi({
            Dropdown_CAS_STPFlag: fullStp,
          })}
        </Description>
      </DescriptionList>
    </Card>
  );
};
export default CaseDeteailInfo;
