import { HeadingNode, QuoteNode } from '@lexical/rich-text';
import { ListNode, ListItemNode } from '@lexical/list';
import { LinkNode } from '@lexical/link';
import { TableNode, TableCellNode, TableRowNode } from '@lexical/table';
import { CodeNode } from '@lexical/code';

import { editorTheme } from './styles/theme';

const nodes = [
  HeadingNode,
  QuoteNode,
  ListNode,
  ListItemNode,
  LinkNode,
  TableNode,
  TableCellNode,
  TableRowNode,
  CodeNode,
];

export const initialConfig = {
  namespace: 'RichTextEditor',
  theme: editorTheme,
  nodes,
  onError: (error: Error) => {
    console.error(error);
  },
};
