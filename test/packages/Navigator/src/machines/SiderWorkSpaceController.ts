import { Machine, send } from 'xstate';
import { SwitchDrawerTab } from 'navigator/enum/SwitchDrawerTab';
import { IntegrationChecklistUpdateStatus } from 'navigator/enum/IntegrationChecklistUpdateStatus';
import { TabsKey as InsuredContentTypes } from 'claim/pages/360/enum';

const SiderWorkSpace = Machine({
  id: 'sider-work-space',
  type: 'parallel',
  states: {
    switch: {
      initial: SwitchDrawerTab.SmartCircle,
      states: {
        [SwitchDrawerTab.SmartCircle]: {
          onEntry: [send('turnOffExpander'), send('disable'), send('hideButton')],
          on: {
            chat: {
              target: SwitchDrawerTab.Chat,
            },
            pending: {
              target: SwitchDrawerTab.Pending,
            },
            360: {
              target: SwitchDrawerTab.CustomerView,
            },
            remark: {
              target: SwitchDrawerTab.Remark,
            },
            tools: {
              target: SwitchDrawerTab.Tools,
            },
            integration: {
              target: SwitchDrawerTab.Integration,
            },
          },
        },
        [SwitchDrawerTab.Chat]: {
          onEntry: [
            send('turnOffExpander'),
            send('disable'),
            send('hideButton'),
            send('turnOnSider'),
          ],
          on: {
            pending: {
              target: SwitchDrawerTab.Pending,
            },
            360: {
              target: SwitchDrawerTab.CustomerView,
            },
            remark: {
              target: SwitchDrawerTab.Remark,
            },
            ai: {
              target: SwitchDrawerTab.SmartCircle,
            },
            tools: {
              target: SwitchDrawerTab.Tools,
            },
            integration: {
              target: SwitchDrawerTab.Integration,
            },
          },
        },
        [SwitchDrawerTab.Pending]: {
          onEntry: [send('enable'), send('showButton'), send('turnOnSider')],
          on: {
            360: {
              target: SwitchDrawerTab.CustomerView,
            },
            remark: {
              target: SwitchDrawerTab.Remark,
            },
            ai: {
              target: SwitchDrawerTab.SmartCircle,
            },
            chat: {
              target: SwitchDrawerTab.Chat,
            },
            tools: {
              target: SwitchDrawerTab.Tools,
            },
            integration: {
              target: SwitchDrawerTab.Integration,
            },
          },
        },
        [SwitchDrawerTab.CustomerView]: {
          onEntry: [send('enable'), send('showButton'), send('turnOnSider')],
          on: {
            remark: {
              target: SwitchDrawerTab.Remark,
            },
            ai: {
              target: SwitchDrawerTab.SmartCircle,
            },
            chat: {
              target: SwitchDrawerTab.Chat,
            },
            pending: {
              target: SwitchDrawerTab.Pending,
            },
            tools: {
              target: SwitchDrawerTab.Tools,
            },
            integration: {
              target: SwitchDrawerTab.Integration,
            },
          },
        },
        [SwitchDrawerTab.Remark]: {
          onEntry: [send('enable'), send('showButton'), send('turnOnSider')],
          on: {
            ai: {
              target: SwitchDrawerTab.SmartCircle,
            },
            chat: {
              target: SwitchDrawerTab.Chat,
            },
            pending: {
              target: SwitchDrawerTab.Pending,
            },
            360: {
              target: SwitchDrawerTab.CustomerView,
            },
            tools: {
              target: SwitchDrawerTab.Tools,
            },
            integration: {
              target: SwitchDrawerTab.Integration,
            },
          },
        },
        [SwitchDrawerTab.Tools]: {
          onEntry: [
            send('enable'),
            send('showButton'),
            send('turnOnSider'),
            send('backMonitorMenu'),
          ],
          on: {
            remark: {
              target: SwitchDrawerTab.Remark,
            },
            ai: {
              target: SwitchDrawerTab.SmartCircle,
            },
            chat: {
              target: SwitchDrawerTab.Chat,
            },
            pending: {
              target: SwitchDrawerTab.Pending,
            },
            360: {
              target: SwitchDrawerTab.CustomerView,
            },
            integration: {
              target: SwitchDrawerTab.Integration,
            },
          },
        },
        [SwitchDrawerTab.Integration]: {
          onEntry: [send('enable'), send('showButton'), send('turnOnSider'), send('checkUpdate')],
          onExit: [send('checkUpdate')],
          on: {
            remark: {
              target: SwitchDrawerTab.Remark,
            },
            ai: {
              target: SwitchDrawerTab.SmartCircle,
            },
            chat: {
              target: SwitchDrawerTab.Chat,
            },
            pending: {
              target: SwitchDrawerTab.Pending,
            },
            360: {
              target: SwitchDrawerTab.CustomerView,
            },
            tools: {
              target: SwitchDrawerTab.Tools,
            },
          },
        },
      },
    },
    expanderToggle: {
      initial: 'off',
      states: {
        on: {
          on: {
            turnOffExpander: {
              target: 'off',
            },
          },
        },
        off: {
          on: {
            turnOnExpander: {
              target: 'on',
            },
          },
        },
      },
    },
    siderToggle: {
      initial: 'off',
      states: {
        on: {
          onEntry: [send('showButton')],
          on: {
            turnOffSider: {
              target: 'off',
            },
          },
        },
        off: {
          onEntry: [send('turnOffExpander'), send('hideButton')],
          on: {
            turnOnSider: {
              target: 'on',
            },
          },
        },
      },
    },
    insuredContentTab: {
      initial: InsuredContentTypes.policy,
      states: {
        [InsuredContentTypes.policy]: {
          onEntry: [send('enable'), send('showButton')],
          on: {
            [InsuredContentTypes.claim]: {
              target: InsuredContentTypes.claim,
            },
            [InsuredContentTypes.pos]: {
              target: InsuredContentTypes.pos,
            },
            [InsuredContentTypes.coverage]: {
              target: InsuredContentTypes.coverage,
            },
          },
        },
        [InsuredContentTypes.coverage]: {
          onEntry: [send('turnOffExpander'), send('enable'), send('showButton')],
          on: {
            [InsuredContentTypes.pos]: {
              target: InsuredContentTypes.pos,
            },
            [InsuredContentTypes.policy]: {
              target: InsuredContentTypes.policy,
            },
            [InsuredContentTypes.claim]: {
              target: InsuredContentTypes.claim,
            },
          },
        },
        [InsuredContentTypes.claim]: {
          onEntry: [],
          on: {
            [InsuredContentTypes.pos]: {
              target: InsuredContentTypes.pos,
            },
            [InsuredContentTypes.policy]: {
              target: InsuredContentTypes.policy,
            },
            [InsuredContentTypes.coverage]: {
              target: InsuredContentTypes.coverage,
            },
          },
        },
        [InsuredContentTypes.pos]: {
          onEntry: [send('turnOffExpander'), send('disable'), send('hideButton')],
          on: {
            [InsuredContentTypes.claim]: {
              target: InsuredContentTypes.claim,
            },
            [InsuredContentTypes.policy]: {
              target: InsuredContentTypes.policy,
            },
            [InsuredContentTypes.coverage]: {
              target: InsuredContentTypes.coverage,
            },
          },
        },
      },
    },
    expanderButtonDisplay: {
      initial: 'hidden',
      states: {
        show: {
          on: {
            hideButton: {
              target: 'hidden',
            },
          },
        },
        hidden: {
          on: {
            showButton: {
              target: 'show',
            },
          },
        },
      },
    },
    expanderAvailable: {
      initial: 'disabled',
      states: {
        disabled: {
          onEntry: [send('hideButton')],
          on: {
            enable: {
              target: 'enabled',
            },
          },
        },
        enabled: {
          on: {
            disable: {
              target: 'disabled',
            },
          },
        },
      },
    },
    monitorSliderDisplayType: {
      initial: 'menu',
      states: {
        menu: {
          onEntry: [send('turnOffExpander')],
          on: {
            selectMonitorContent: {
              target: 'content',
            },
            selectClearSnapshotContent: {
              target: 'clearSnapshotContent',
            },
            selectAuthorizedUser: {
              target: 'authorizedUser',
            },
          },
        },
        content: {
          on: {
            backMonitorMenu: {
              target: 'menu',
            },
          },
        },
        clearSnapshotContent: {
          onEntry: [send('turnOffExpander')],
          on: {
            backMonitorMenu: {
              target: 'menu',
            },
          },
        },
        authorizedUser: {
          onEntry: [send('turnOffExpander')],
          on: {
            backMonitorMenu: {
              target: 'menu',
            },
          },
        },
      },
    },
    integrationUpdateUnread: {
      initial: IntegrationChecklistUpdateStatus.HasNoUpdate,
      states: {
        [IntegrationChecklistUpdateStatus.HasNoUpdate]: {
          on: {
            receiveUpdate: {
              target: IntegrationChecklistUpdateStatus.HasUpdate,
            },
          },
        },
        [IntegrationChecklistUpdateStatus.HasUpdate]: {
          on: {
            checkUpdate: {
              target: IntegrationChecklistUpdateStatus.HasNoUpdate,
            },
          },
        },
      },
    },
  },
});

export default SiderWorkSpace;
