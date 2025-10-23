export const businessDataSync = (oldData: any, newData: any) => {
  return {
    ...oldData,
    ...newData,
    claimDecision: {
      ...(oldData?.claimDecision || {}),
      ...(newData?.incidentList?.[0]?.klipCaseInfoList?.[0] || {}),
      claimType: newData?.incidentList?.[0]?.claimType?.split(',') || null,
      hostClaimNo: newData?.incidentList?.[0]?.klipCaseInfoList?.[0]?.klipClaimNo,
    },
  };
};
