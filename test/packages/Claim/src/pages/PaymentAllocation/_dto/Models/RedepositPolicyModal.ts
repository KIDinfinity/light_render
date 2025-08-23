export interface RedepositPolicyModal {
  id?: string;
  redepositPolicyNo?: string;
  redepositPercentage?: number;
  redepositAmount?: number | null;
  redepositPolicyCurrency?: string;

  viewOrder?: number;
  exchangeRateRecord?: string; // 有出入
  originalRedepositPercentage?: number;
}
