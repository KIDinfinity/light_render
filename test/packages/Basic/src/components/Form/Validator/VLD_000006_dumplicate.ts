// 总数不为0
export const VLD_000006 = (total: number) =>
  Number(total) === 0 ? [{ field: 'errorTotalWithdrawAmount' }] : [];
