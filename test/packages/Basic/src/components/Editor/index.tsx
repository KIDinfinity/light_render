import React, { memo } from 'react';
import lodash from 'lodash';
import classnames from 'classnames';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import BasicEditor from '@ctc/ckeditor5-custom-build/build/ckeditor';
import ToolbarItem from 'basic/components/Editor/enum/toolbar.item';
import styles from './index.less';

interface IEprops {
  onChange?: Function;
  onFocus?: Function;
  onBlur?: Function;
  onReady?: Function;
  placeholder?: string;
  toolbarItem?: string[];
  value: string;
  disabled?: boolean;
  className?: string;
  maxLength?: number;
}
const defaultToolbarItem = [
  ToolbarItem.heading,
  ToolbarItem.bold,
  ToolbarItem.italic,
  ToolbarItem.underline,
  ToolbarItem.strikethrough,
  ToolbarItem.removeFormat,
  ToolbarItem.break,
  ToolbarItem.alignment,
  ToolbarItem.blockQuote,
  ToolbarItem.indent,
  ToolbarItem.outdent,
  ToolbarItem.highlight,
  ToolbarItem.insertTable,
  ToolbarItem.undo,
  ToolbarItem.redo,
];
const Editor = ({
  onChange = () => {},
  onFocus = () => {},
  onBlur = () => {},
  onReady = () => {},
  toolbarItem = defaultToolbarItem,
  placeholder = '',
  value = '',
  disabled = false,
  className,
  maxLength,
}: IEprops) => {
  return (
    <div className={classnames(styles.customerEditor, className)}>
      <CKEditor
        editor={BasicEditor}
        data={value || ''}
        placeholder={placeholder}
        height={400}
        isReadOnly={disabled}
        config={{
          toolbar: {
            items: toolbarItem,
          },
          indentBlock: {
            offset: 1,
            unit: 'em',
          },
          language: 'en',
          table: {
            contentToolbar: ['tableColumn', 'tableRow', 'mergeTableCells'],
          },
          highlight: {
            options: [
              {
                model: 'greenMarker',
                class: 'editor-high-light',
                title: 'Green marker',
                color: 'var(--highlight)',
                type: 'marker',
              },
            ],
          },
        }}
        onReady={(editor) => {
          // You can store the "editor" and use when it is needed.
          onReady(editor);
        }}
        onChange={(event, editor) => {
          const changedData = editor.getData();
          if (maxLength && changedData.length > maxLength) {
            editor.setData(`${changedData.substring(0, maxLength - 4)}</p>`);
          }
          onChange(changedData);
        }}
        onBlur={(event, editor) => {
          onBlur(event, editor);
        }}
        onFocus={(event, editor) => {
          onFocus(event, editor);
        }}
      />
    </div>
  );
};

export default memo(Editor, (pre, next) => {
  const keys = ['placeholder', 'toolbarItem', 'value'];
  return lodash.isEqual(lodash.pick(pre, keys), lodash.pick(next, keys));
});
