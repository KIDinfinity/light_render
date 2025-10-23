import lodash from 'lodash';
import { formatMessageApi } from '@/utils/dictFormatMessage';

export default (() => {
  const width = 130;

  const params = [
    {
      // labelTypeCode: 'Label_BPM_CaseInfo',
      // id: 'CaseCategory',
      dataIndex: 'businessNo',
      width,
      render: (text: any) => text,
      title: 'Business No.',
    },
    {
      labelTypeCode: 'Label_BPM_CaseInfo',
      id: 'CurrentActivity',
      dataIndex: 'currentActivityKey',
      width,
      render: (text: any) => formatMessageApi({ activity: text }),
    },
    {
      // labelTypeCode: 'Label_COM_ReportCenter',
      // id: 'status',
      dataIndex: 'status',
      width,
      title: 'Task Status',
      render: (text: any) => formatMessageApi({ Label_BPM_TaskActivity: text }),
    },
    {
      // labelTypeCode: 'Label_COM_ReportCenter',
      // id: 'Re-Gen Result',
      dataIndex: 'policyNo',
      width,
      render: (text: any) => text,
      title: 'Policy No.',
    },
    {
      // labelTypeCode: 'Label_COM_ReportCenter',
      // id: 'Re-Gen Result',
      dataIndex: 'caseNo',
      width,
      render: (text: any) => text,
      title: 'Case No.',
    },
  ];

  return lodash.map(params, (el: any) => {
    return {
      title: el.title || formatMessageApi({ [el?.labelTypeCode]: el?.id }),
      dataIndex: el?.dataIndex,
      key: el?.key || el?.dataIndex,
      render: el?.render,
      width: el?.width,
      className: el?.className,
    };
  });
})();
