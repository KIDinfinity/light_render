import Title from './Title';

export default ({ onSearchChange, params }: any) => {
  return [
    {
      key: 'conditionName',
      width: 200,
      title: Title({
        labelId: 'venus_claim.ruleEngine.label.conditionName',
        value: params.conditionName,
        handleChange: (e: any) => {
          e.persist();
          onSearchChange({
            code: 'conditionName',
            value: e.target.value,
          });
        },
      }),
      dataIndex: 'conditionName',
    },
    {
      key: 'conditionContent',
      width: 200,
      title: Title({
        labelId: 'venus_claim.ruleEngine.label.conditionContent',
        value: params.conditionContent,
        handleChange: (e: any) => {
          e.persist();
          onSearchChange({
            code: 'conditionContent',
            value: e.target.value,
          });
        },
      }),
      dataIndex: 'conditionContent',
    },
  ];
};
