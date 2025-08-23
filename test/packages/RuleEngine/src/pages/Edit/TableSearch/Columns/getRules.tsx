import Title from './Title';

export default ({ onSearchChange, params }: any) => {
  return [
    {
      key: 'basicRuleId',
      width: 200,
      title: Title({
        labelId: 'venus_claim.ruleEngine.label.ruleId',
        value: params.basicRuleId,
        handleChange: (e: any) => {
          e.persist();
          onSearchChange({
            code: 'basicRuleId',
            value: e.target.value,
          });
        },
      }),
      dataIndex: 'basicRuleId',
    },
    {
      key: 'ruleName',
      width: 200,
      title: Title({
        labelId: 'venus_claim.ruleEngine.label.ruleName',
        value: params.ruleName,
        handleChange: (e: any) => {
          e.persist();

          onSearchChange({
            code: 'ruleName',
            value: e.target.value,
          });
        },
      }),
      dataIndex: 'ruleName',
    },
    {
      key: 'ruleDescription',
      width: 200,
      title: Title({
        labelId: 'venus_claim.ruleEngine.label.ruleDescription',
        value: params.ruleDescription,
        handleChange: (e: any) => {
          e.persist();
          onSearchChange({
            code: 'ruleDescription',
            value: e.target.value,
          });
        },
      }),
      dataIndex: 'ruleDescription',
    },
    {
      key: 'condition',
      width: 200,
      title: Title({
        labelId: 'venus_claim.ruleEngine.label.conditions',
        value: params.condition,
        handleChange: (e: any) => {
          e.persist();
          onSearchChange({
            code: 'condition',
            value: e.target.value,
          });
        },
      }),
      dataIndex: 'condition',
    },
    {
      key: 'result',
      width: 200,
      title: Title({
        labelId: 'venus_claim.ruleEngine.label.results',
        value: params.rusult,
        handleChange: (e: any) => {
          e.persist();
          onSearchChange({
            code: 'rusult',
            value: e.target.value,
          });
        },
      }),
      dataIndex: 'result',
    },
  ];
};
