import{ v4 as  uuidv4 } from 'uuid';

export default {
  claimProcessData: {
    identityId: '',
    firstName: '',
    lastName: '',
    submissionId: uuidv4(),
    activityType: '',
    processParam: {
      caseCategory: 'TH_UD_CTG01',
    },
  },
};
