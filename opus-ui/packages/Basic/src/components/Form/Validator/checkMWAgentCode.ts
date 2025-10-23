export const checkMWAgentCode = ({ uwProposalAgent }: any) => (
  rule: any,
  value: any,
  callback: Function
) => {
  if (!uwProposalAgent) {
    callback('Invalid Agent');
  }
  callback();
};
