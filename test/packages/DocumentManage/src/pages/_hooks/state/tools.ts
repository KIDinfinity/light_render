import lodash from 'lodash';
import { formatMessageApi } from '@/utils/dictFormatMessage';

import { ReactComponent as View } from '../../_static/view.svg';
import { ReactComponent as UnView } from '../../_static/un-view.svg';
import { ReactComponent as Void } from '../../_static/void.svg';
import { ReactComponent as UnVoid } from '../../_static/un-void.svg';
import { ReactComponent as Edit } from '../../_static/edit.svg';
import { ReactComponent as Upload } from '../../_static/upload.svg';
import { ReactComponent as Delete } from '../../_static/delete.svg';
import { ReactComponent as Mandatory } from '../../_static/mandatory.svg';
import { ReactComponent as ReIndex } from '../../_static/reIndex.svg';

export default [
  {
    toolId: 'mandatory',
    order: 3,
    callback: lodash.noop,
    data: {},
    icon: Mandatory,
    title: 'document.label.mandatory',
  },
  {
    toolId: 'edit',
    order: 4,
    callback: lodash.noop,
    data: {},
    icon: Edit,
    title: 'document.label.edit-property',
  },
  {
    toolId: 'void',
    order: 5,
    callback: lodash.noop,
    data: {},
    icon: [Void, UnVoid],
    title: ['document.label.edit-void', 'document.label.edit-un-void'],
    region: ['PH'],
  },
  {
    toolId: 'upload',
    order: 6,
    callback: lodash.noop,
    data: {},
    icon: Upload,
    title: formatMessageApi({ Label_BPM_Button: 'document.label.upoad' }),
  },
  {
    toolId: 'view',
    order: 7,
    callback: lodash.noop,
    data: {},
    icon: [View, UnView],
    title: ['document.label.edit-view-all-documents', 'document.label.edit-view-valid-documents'],
  },
  {
    toolId: 'delete',
    order: 8,
    callback: lodash.noop,
    data: {},
    icon: [Delete],
    title: ['delete'],
  },
  {
    toolId: 'ocr',
    order: 8,
    callback: lodash.noop,
    data: {},
    title: 'OCR',
  },
  {
    toolId: 'reIndex',
    order: 9,
    callback: lodash.noop,
    data: {},
    icon: ReIndex,
    title: formatMessageApi({ Label_BPM_Button: 'reindex' }),
  },
];
