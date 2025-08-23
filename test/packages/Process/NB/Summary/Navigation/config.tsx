import loadable from '@loadable/component';

export default [
  {
    icon: 'PlanInfo',
    iconComponent: loadable(async () => (await import('process/assets/PlanInfo.svg'))?.ReactComponent),
    link: 'planInfo',
    title: 'Policy',
    name: 'PlanInfo',

  },
  {
    icon: 'decision',
    iconComponent: loadable(async () => (await import('process/assets/decision.svg'))?.ReactComponent),
    link: 'decision',
    title: 'UW Decision',
    name: 'decision',
  },
  {
    icon: 'client',
    iconComponent: loadable(async () => (await import('process/assets/client.svg'))?.ReactComponent),
    link: 'client',
    title: 'Client',
    name: 'client',
  },
  {
    icon: 'fund',
    iconComponent: loadable(async () => (await import('process/assets/fund.svg'))?.ReactComponent),
    link: 'fund',
    title: 'Fund',
    name: 'fund',
  },
  {
    icon: 'policyReplacement',
    iconComponent: loadable(async () => (await import('process/assets/policyReplacement.svg'))?.ReactComponent),
    link: 'policyReplacement',
    title: 'Replacement',
    name: 'policyReplacement',
  },
  {
    icon: 'agent',
    iconComponent: loadable(async () => (await import('process/assets/agent.svg'))?.ReactComponent),
    link: 'distributionchannel',
    title: 'Agent',
    name: 'distributionchannel',
  },
  {
    icon: 'InformationSummary',
    iconComponent: loadable(async () => (await import('process/assets/InformationSummary.svg'))?.ReactComponent),
    link: 'InformationSummary',
    title: 'Information',
    name: 'InformationSummary',
  },
  {
    icon: 'InformationSummary',
    iconComponent: loadable(async () => (await import('process/assets/InformationSummary.svg'))?.ReactComponent),
    link: 'EnvoySummary',
    title: 'Envoy',
    name: 'EnvoySummary',
  },
  {
    icon: 'top',
    iconComponent: loadable(async () => (await import('process/assets/top.svg'))?.ReactComponent),
    link: 'header',
    title: 'Top',
    name: 'top',
  },
];
