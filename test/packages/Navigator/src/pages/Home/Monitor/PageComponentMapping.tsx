import React from 'react';
import { MenuEnum } from './enum';
import {
  ClearSnapshot,
  IntegrationError,
  FailedJob,
  RetryJobQueue,
  SystemIntergration,
  ExceptionalCase,
  PostQCTrigger,
  SpecialHandler,
  ExtractRequestResponse,
  CasesWithSubmissionErrorData,
  SkipIntegration,
  CasesWithoutDocuments,
  MIReport,
  DisableDowntime,
  DBATool,
  CaseProgress,
} from './components';

export default function PageComponentMapping({ type, ...res }) {
  const mapping = {
    [MenuEnum.RS_BP_Menu_Monitor_ClearSnapshot]: <ClearSnapshot />,
    [MenuEnum.RS_BP_Menu_Monitor_IntegrationError]: <IntegrationError />,
    [MenuEnum.RS_BP_Menu_Monitor_FailedJob]: <FailedJob />,
    [MenuEnum.RS_BP_Menu_Monitor_RetryJobQueue]: <RetryJobQueue />,
    [MenuEnum.RS_BP_Menu_Monitor_SystemIntegrationStatus]: <SystemIntergration />,
    [MenuEnum.RS_BP_Menu_Monitor_ExceptionalCase]: <ExceptionalCase />,
    [MenuEnum.RS_BP_Menu_Monitor_ReGenPostQC]: <PostQCTrigger />,
    [MenuEnum.RS_BP_Menu_Monitor_SpecialHandler]: <SpecialHandler />,
    [MenuEnum.RS_BP_Menu_Monitor_ExtractRequestResponse]: <ExtractRequestResponse />,
    [MenuEnum.RS_BP_Menu_Monitor_CasesWithSubmissionErrorData]: <CasesWithSubmissionErrorData />,
    [MenuEnum.RS_BP_Menu_Monitor_SkipIntegration]: <SkipIntegration />,
    [MenuEnum.RS_BP_Menu_Monitor_CasesWithoutDocument]: <CasesWithoutDocuments />,
    [MenuEnum.RS_BP_Menu_Monitor_MIReport]: <MIReport />,
    [MenuEnum.RS_BP_Menu_Monitor_DisableDowntime]: <DisableDowntime />,
    [MenuEnum.RS_BP_Menu_Monitor_DBA]: <DBATool />,
    [MenuEnum.RS_BP_Menu_Monitor_CaseProgress]: <CaseProgress />,
  };
  return <>{React.cloneElement(mapping?.[type] || <></>, { ...res })}</>;
}
