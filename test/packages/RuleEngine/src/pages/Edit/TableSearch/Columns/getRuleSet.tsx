import Title from './Title';

export default ({ onSearchChange, params }: any) => {
  return [
    {
      key: 'ruleSetName',
      width: 200,
      title: Title({
        labelId: 'Rule Set Name',
        value: params.ruleSetName,
        handleChange: (e: any) => {
          e.persist();
          onSearchChange({
            code: 'ruleSetName',
            value: e.target.value,
          });
        },
      }),
      dataIndex: 'ruleSetName',
    },
    {
      key: 'description',
      width: 200,
      title: Title({
        labelId: 'Rule Set Description',
        value: params.description,
        handleChange: (e: any) => {
          e.persist();
          onSearchChange({
            code: 'description',
            value: e.target.value,
          });
        },
      }),
      dataIndex: 'description',
    },
  ];
};
