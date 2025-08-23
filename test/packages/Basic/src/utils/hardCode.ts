import { tenant, Region } from '@/components/Tenant';

interface HardCodePHNB6149 {
  caseCategory: string;
  originalSubmissionDate: string;
  submissionDate: string;
}
const hardCode_PHNB6149 = ({
  caseCategory,
  originalSubmissionDate,
  submissionDate,
}: HardCodePHNB6149): string => {
  return (
    (tenant.region() === Region.PH &&
    (caseCategory === 'BP_AP_CTG02' || caseCategory === 'BP_NB_CTG003')
      ? originalSubmissionDate
      : submissionDate) || submissionDate
  );
};

export { hardCode_PHNB6149 };
