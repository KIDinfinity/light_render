import Title from './Title';

export default ({ onSearchChange, params }: any) => {
  return [
    {
      key: 'resultName',
      width: 200,
      title: Title({
        labelId: 'venus_claim.ruleEngine.label.resultName',
        value: params.resultName,
        handleChange: (e: any) => {
          e.persist();
          onSearchChange({
            code: 'resultName',
            value: e.target.value,
          });
        },
      }),
      dataIndex: 'resultName',
    },
    {
      key: 'resultContent',
      width: 200,
      title: Title({
        labelId: 'venus_claim.ruleEngine.label.resultContent',
        value: params.resultContent,
        handleChange: (e: any) => {
          e.persist();
          onSearchChange({
            code: 'resultContent',
            value: e.target.value,
          });
        },
      }),
      dataIndex: 'resultContent',
    },
  ];
};
