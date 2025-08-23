export const getIsMenuCreateCase = ({ submissionChannel, procActOrder, taskStatus, rejected }) => {
  return submissionChannel === 'M' && procActOrder === 1 && taskStatus === 'todo' && !rejected;
};
