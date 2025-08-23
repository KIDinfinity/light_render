import React from 'react';
import { history } from 'umi';
import lodash from 'lodash';
import { getProcessInstanceProgress } from '@/services/caseMgntProcessInstanceControllerService';
import { serialize as objectToFormData } from 'object-to-formdata';
import { advSearch } from '@/services/dcTaskInquiryControllerService';
import { taskStatus } from 'bpm/enum';
import styles from './index.less';

const NotificationLink = ({ content, dispatch }) => {
  const getTargetTaskIdByCaseNo = async (caseNo) => {
    const processRequest = await getProcessInstanceProgress(
      objectToFormData({
        processInstanceId: caseNo,
      })
    );
    const taskAdvRequest = await advSearch({
      currentPage: 1,
      pageSize: 1,
      params: { processInstanceId: caseNo, taskStatus: [taskStatus.todo, taskStatus.pending] },
      sortName: 'procInstId',
      sortOrder: 'asc',
    });
    const [response, activityResponse] = await Promise.all([processRequest, taskAdvRequest]);
    const activityTask = lodash.get(activityResponse, 'resultData.rows[0]', {});
    const taskDetailList = lodash.get(response, 'resultData.taskDetailList', []);
    const targetTask =
      taskDetailList.find((item) => item.status === 'inprogress') ||
      lodash.maxBy(taskDetailList, 'startTime');
    return lodash.get(activityTask, 'taskId') || lodash.get(targetTask, 'taskId');
  };
  const map = [
    {
      /**
       * @return {Array}
       */
      format: (text) => {
        const replaceReg = /(<a\s*href='task\/)([0-9]{1,})('\s*target='_[a-z]{1,}'>)([0-9]{1,})(<\/a>)/g;
        const array = text.match(replaceReg);
        const list = lodash.map(array, (item) => {
          const matchCaseNo = item.match(/[0-9]{1,}/g);
          return lodash.get(matchCaseNo, '[1]');
        });
        let result = text;
        array?.forEach((item, index) => {
          result = result.replace(item, `$taskDetail_${list[index]}$`);
        });
        return result;
      },
      replaceRule: /\$taskDetail_[0-9]{1,}\$/gi,
      createLinkComponent: (item) => {
        const caseNo = lodash.get(item.match(/[0-9]{1,}/), '[0]');
        if (!caseNo) {
          return item;
        }
        return React.createElement(
          'span',
          {
            className: styles.link,
            onClick: async () => {
              const taskId = await getTargetTaskIdByCaseNo(caseNo);
              if (!taskId) {
                return;
              }
              dispatch({
                type: 'global/visitTaskDetail',
                payload: { taskId },
              });
            },
          },
          [caseNo]
        );
      },
    },
    {
      replaceRule: /\$caseDetail_[0-9]{1,}\$/gi,
      format: (text) => {
        const replaceReg = /(<a\s*href='case\/)([0-9]{1,})('\s*target='_[a-z]{1,}'>)([0-9]{1,})(<\/a>)/g;
        const array = text.match(replaceReg);
        const list = lodash.map(array, (item) => {
          const matchCaseNo = item.match(/[0-9]{1,}/g);
          return lodash.get(matchCaseNo, '[1]');
        });
        let result = text;
        array?.forEach((item, index) => {
          result = result.replace(item, `$caseDetail_${list[index]}$`);
        });
        return result;
      },
      createLinkComponent: (item) => {
        const caseNo = lodash.get(item.match(/[0-9]{1,}/), '[0]');
        if (!caseNo) {
          return item;
        }
        return React.createElement(
          'span',
          {
            className: styles.link,
            onClick: () => {
              history.push(`/navigator/case/detail/${item}`);
            },
          },
          [caseNo]
        );
      },
    },
  ];

  let replaceResult = content;
  map.forEach((item) => {
    replaceResult = item.format(replaceResult);
  });
  const splitReg = /(\$[a-z]{1,}_[0-9]{1,}\$)/gi;
  const array = replaceResult.split(splitReg);
  const component = lodash.map(array, (item) => {
    const matchOption = lodash.find(map, (i) => i.replaceRule.test(item));
    if (matchOption) {
      return matchOption.createLinkComponent(item);
    }
    return item;
  });

  return React.createElement('p', {}, component);
};

export default NotificationLink;
