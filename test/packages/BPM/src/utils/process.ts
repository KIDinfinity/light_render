import lodash from 'lodash';

class ProcessUtils {
  addProcessModifiedTime({ process }) {
    if (!process) {
      return process;
    }
    const processCreateTime = lodash.get(process, 'activities[0].creationDate');
    const processFirstActivitySubmissionDate = lodash.get(process, 'activities[0].submissionDate');
    const modifiedTime = processFirstActivitySubmissionDate || processCreateTime;
    return {
      ...process,
      modifiedTime,
      activities: lodash
        .chain(process)
        .get('activities')
        .map((item) => {
          return {
            ...item,
            modifiedTime: item?.submissionDate || item?.creationDate,
          };
        })
        .value(),
    };
  }
}

export default ProcessUtils;
