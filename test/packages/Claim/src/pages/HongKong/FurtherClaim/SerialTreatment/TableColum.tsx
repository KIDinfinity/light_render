import React from 'react';
import moment from 'moment';
import lodash from 'lodash';
import { tenant, Region } from '@/components/Tenant';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import { initialCapital } from '@/utils/utils';
import { getDictName, formatPerioDate } from '../functions';

export default ({
  dictsOfClaimType,
  dictsOfCauseOfIncident,
  dictsOfClaimStatus,
  dictsOfDiagnosis,
  dictsOfCaseSource,
  dictsOfMainBenefit,
  dispatch,
}: any) => {
  const width = 130;

  const extraInquiryClaimNo = tenant.region({
    [Region.JP]: {
      defaultSortOrder: 'ascend',
      sorter: (a, b) => a.inquiryClaimNo - b.inquiryClaimNo,
    },
    notMatch: {},
  });
  let columns = [
    {
      fieldName: 'relateTreatment',
      width: width - 80,
      // fixed: 'left',
    },
    {
      fieldName: 'incidentDate',
      labelId: 'app.navigator.task-detail-of-claim-assessment.label.date-of-incident',
      dataIndex: 'incidentDate',
      width,
      render: (text: any) => text && moment(text).format('L'),
    },
    {
      fieldName: 'primaryDiagnosisCode',
      labelId: 'Diagnosis',
      dataIndex: 'primaryDiagnosisCode',
      width: 3 * width,
      render: (text: any) => getDictName(text, dictsOfDiagnosis, true),
    },
    {
      fieldName: 'admissionPeriod',
      labelId: 'AdmissionPeriod',
      dataIndex: 'admissionPeriod',
      width: 1.5 * width,
      render: (_: any, record: any) => formatPerioDate(record),
    },
    {
      fieldName: 'dateOfConsultation',
      labelId: 'ConsultationDate',
      dataIndex: 'dateOfConsultation',
      width,
      render: (text: any, record: any) => {
        if (text) {
          return text && moment(text).format('L');
        }
        if (record.outpatientTreatmentDateList) {
          return lodash
            .map(record.outpatientTreatmentDateList, (item) => moment(item).format('L'))
            .join(',');
        }
        return text && moment(text).format('L');
      },
    },
    {
      fieldName: 'operationDate',
      labelId: 'DateofOperation',
      dataIndex: 'operationDate',
      width,
      render: (text: any) => text && moment(text).format('L'),
    },
    {
      fieldName: 'relationSubType',
      labelId: '90DaysAgo',
      dataIndex: 'relationSubType',
      width,
      render: (text: any) => text === 'ninetyDaysAgo' ? 'Y' : '',
    },
    {
      fieldName: 'inquiryClaimNo',
      labelId: 'BusinessNo',
      dataIndex: 'inquiryClaimNo',
      width,
      ...extraInquiryClaimNo,
      render: (text: any, record: any) => {
        const handleClick = async () => {
          const { claimNo, caseCategory, claimStatus, partyId, customerType } = record || {};
          const jumpToHistory = () => {
            window.open(
              `/claim/history?caseCategory=${caseCategory}&claimNo=${claimNo}&partyId=${partyId}&customerType=${customerType}&businessNo=${claimNo}`,
              '_blank'
            );
          };

          const jumpToTask = async () => {
            const resultData = await dispatch({
              type: 'processTask/getLastTask',
              payload: {
                claimNo,
                caseCategory,
              },
            });
            const { id: taskId } = lodash.pick(resultData, ['id']);

            if (taskId) {
              window.open(`/process/task/detail/${taskId}`, '_blank');
            }
          };

          return claimStatus === 'inProgress' ? jumpToTask() : jumpToHistory();
        };

        return (
          <a
            onClick={handleClick}
            style={{ color: 'rgba(255,255,255,0.65)', textDecoration: 'underline' }}
          >
            {text}
          </a>
        );
      },
    },
    {
      fieldName: 'claimTypeArray',
      labelId: 'app.navigator.task-detail-of-claim-assessment.label.claim-type',
      dataIndex: 'claimTypeArray',
      width,
      render: (text: any) => getDictName(text, dictsOfClaimType),
    },
    {
      fieldName: 'causeOfIncident',
      labelId: 'app.navigator.task-detail-of-data-capture.label.case-of-incident',
      dataIndex: 'causeOfIncident',
      width,
      render: (text: any) => getDictName(text, dictsOfCauseOfIncident),
    },
    {
      fieldName: 'claimDecision',
      labelId: 'AssessmentDecision',
      dataIndex: 'claimDecision',
      width,
      render: (text: any) =>
        formatMessageApi({
          Dropdown_CLM_ClaimDecision: text,
        }),
    },
    {
      fieldName: 'claimStatus',
      labelId: 'ClaimStatus',
      dataIndex: 'claimStatus',
      width,
      render: (text: any) => getDictName(text, dictsOfClaimStatus),
    },
  ];

  if (tenant.remoteRegion() === Region.TH) {
    columns = lodash
      .chain(columns)
      .remove(({ fieldName }) => fieldName !== 'operationDate')
      .concat([
        {
          fieldName: 'caseSource',
          labelId: 'CaseSource',
          dataIndex: 'caseSource',
          width,
          render: (text: any) => getDictName(text, dictsOfCaseSource),
        },
        {
          fieldName: 'mainBenefit',
          labelId: 'MainBenefit',
          dataIndex: 'mainBenefitArray',
          width: 1.5 * width,
          render: (text: any) => {
            return lodash.isArray(text) && lodash.isEmpty(text)
              ? lodash.map(text, (item) => getDictName(item, dictsOfMainBenefit)).join()
              : getDictName(text, dictsOfMainBenefit);
          },
        },
        {
          fieldName: 'assessmentAmount',
          labelId: 'AssessmentAmount',
          dataIndex: 'assessmentAmount',
          width,
          render: (text: any) => text,
        },
      ])
      .value();
  }

  return (
    lodash.isArray(columns) &&
    columns.map((colum: any) => {
      const titleFormat = () => {
        return colum.fieldName === 'inquiryClaimNo'
          ? formatMessageApi({
            Label_COM_General: colum?.labelId,
          })
          : formatMessageApi({
            Label_BIZ_Claim: colum?.labelId,
          });
      };

      return {
        ...colum,
        title: initialCapital(titleFormat()),
        key: colum?.key || colum?.dataIndex,
      };
    })
  );
};
