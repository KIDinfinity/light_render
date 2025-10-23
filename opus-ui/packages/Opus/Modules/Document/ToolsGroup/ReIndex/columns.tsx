import lodash from 'lodash';
import { formatMessageApi } from '@/utils/dictFormatMessage';

export default (() => {
  const width = 80;

  const params = [
    {
      dataIndex: 'businessNo',
      width,
      render: (text: any) => text,
      title: 'Business No.',
    },
    {
      dataIndex: 'caseCategory',
      title: 'Case Category',
      width,
      render: (text: any) => formatMessageApi({ Label_BPM_CaseCategory: text }),
    },
    {
      dataIndex: 'status',
      width,
      title: 'Task Status',
      render: (text: any) => formatMessageApi({ Label_BPM_TaskActivity: text }),
    },
    {
      dataIndex: 'policyNo',
      width,
      render: (text: any) => text,
      title: 'Policy No.',
    },
    {
      dataIndex: 'caseNo',
      width,
      render: (text: any) => text,
      title: 'Case No.',
    },
    {
      dataIndex: 'claimType',
      width,
      render: (text: any) => text,
      title: 'Claim Type',
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
