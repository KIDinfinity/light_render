import Title from './Title';

export default ({ onSearchChange, params }: any) => {
  return [
    {
      key: 'branchName',
      width: 200,
      title: Title({
        labelId: 'Branch Name',
        value: params.branchName,
        handleChange: (e: any) => {
          e.persist();
          onSearchChange({
            code: 'branchName',
            value: e.target.value,
          });
        },
      }),
      dataIndex: 'branchName',
    },
    {
      key: 'branchContent',
      width: 200,
      title: Title({
        labelId: 'Branch Content',
        value: params.branchName,
        handleChange: (e: any) => {
          e.persist();
          onSearchChange({
            code: 'branchContent',
            value: e.target.value,
          });
        },
      }),
      dataIndex: 'branchContent',
    },
    {
      key: 'branchDescription',
      width: 200,
      title: Title({
        labelId: 'Branch Description',
        value: params.branchDescription,
        handleChange: (e: any) => {
          e.persist();
          onSearchChange({
            code: 'branchDescription',
            value: e.target.value,
          });
        },
      }),
      dataIndex: 'branchDescription',
    },
  ];
};
