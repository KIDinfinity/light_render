import { formatMessageApi } from '@/utils/dictFormatMessage';
import lodash from 'lodash';

export enum Filter {
  todo = 'todo',
  pending = 'pending',
  favorite = 'favorite',
  completed = 'completed',
  unassigned = 'unassigned',
}

export default (filter: Filter) => {
  let name = '';

  switch (filter) {
    case Filter.todo:
      name = formatMessageApi({
        Label_BIZ_Claim: `app.navigator.task-detail-of-data-capture.status.${Filter.todo}`,
      });
      break;
    case Filter.pending:
      name = formatMessageApi({
        Label_BIZ_Claim: `app.navigator.task-detail-of-data-capture.status.${Filter.pending}`,
      });
      break;
    case Filter.favorite:
      name = formatMessageApi({
        Label_BIZ_Claim: `app.navigator.index.mode.flow.${Filter.favorite}`,
      });
      break;
    case Filter.completed:
      name = formatMessageApi({
        Label_BIZ_Claim: `app.navigator.index.mode.flow.${Filter.completed}`,
      });
      break;
    case Filter.unassigned:
      name = formatMessageApi({
        Label_BIZ_Claim: `app.navigator.index.mode.flow.${Filter.unassigned}`,
      });
      break;
    default:
      break;
  }

  if (/[A-z]*/.test(name)) {
    name = lodash.capitalize(name);
  }

  return name;
};
