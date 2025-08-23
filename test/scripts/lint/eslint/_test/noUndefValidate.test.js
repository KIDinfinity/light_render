const { validateUnDef }  = require('../noUndefValidate');
const fs = require('fs');
const path = require('path');

describe('test validate undef', () => {
  const testFilePath = path.resolve('./testRule.ts');
  beforeEach(() => {
    console.log('each here');
    fs.writeFileSync(testFilePath, `import lodash from 'lodash';
    import { produce } from 'immer';

    interface IAction {
      payload: {
        groupId: string,
        dataId: string,
        dataPath: string,
        value: string,
      }
    }

    export default function saveFreeFieldsOfTextareaReminderData (state: any, { payload }: IAction){
      const {
        groupId,
        dataId,
        dataPath,
        value,
      } = payload;

      return produce(state, (draftState: any) => {
        lodash.forEach(draftState?.currentReasonGroups, (reasonGroup: any) => {
          if (reasonGroup.id === groupId) {
            lodash.forEach(reasonGroup?.reasonDetails, (reason: any) => {
              lodash.forEach(reason?.reasonReminders, (reminder: any) => {
                if (reminder.id === dataId) {
                  reminder[dataPath] = value;
                }
              })
            })
          }
        })
      })
    }
    `, 'utf8', () => {
    })
  })
  afterAll(() => {
    fs.rm(testFilePath,{ force: true }, () => {
    });
  })
  test('default test', () => {
    validateUnDef({ dictPaths: [testFilePath] });
    expect(true);
  })
});
