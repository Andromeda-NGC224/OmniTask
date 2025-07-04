import { useCallback } from 'react';
import { Box } from '@mui/material';
import { LexicalComposer } from '@lexical/react/LexicalComposer';

import { RichTextPlugin } from '@lexical/react/LexicalRichTextPlugin';
import { ContentEditable } from '@lexical/react/LexicalContentEditable';
import { HistoryPlugin } from '@lexical/react/LexicalHistoryPlugin';
import { AutoFocusPlugin } from '@lexical/react/LexicalAutoFocusPlugin';
import { OnChangePlugin } from '@lexical/react/LexicalOnChangePlugin';
import { LexicalErrorBoundary } from '@lexical/react/LexicalErrorBoundary';
import { LinkPlugin } from '@lexical/react/LexicalLinkPlugin';
import { ListPlugin } from '@lexical/react/LexicalListPlugin';
import { TablePlugin } from '@lexical/react/LexicalTablePlugin';

import type { EditorState } from 'lexical';

import type { RichTextEditorProps } from './types';
import { InitialContentPlugin } from './utils';
import { initialConfig } from './config';
import { Toolbar } from '../Toolbar';

import './styles/richTextEditopStyles.css';
import { Placeholder } from '../Placeholder';

export default function RichTextEditor({
  onChange,
  placeholder = '',
  minHeight = 200,
  value,
}: RichTextEditorProps) {
  const handleChange = useCallback(
    (editorState: EditorState) => {
      if (onChange) {
        const editorContent = editorState.toJSON();
        onChange(editorContent);
      }
    },
    [onChange],
  );

  return (
    <Box
      sx={{
        backgroundColor: 'background.default',
        border: '1px solid',
        borderColor: 'divider',
        borderRadius: 4,
        minHeight,
        overflow: 'hidden',
        margin: '24px 0',
        position: 'relative',
      }}
    >
      <LexicalComposer initialConfig={initialConfig}>
        <Toolbar />

        <RichTextPlugin
          contentEditable={
            <ContentEditable
              style={{
                minHeight: minHeight - 50,
                padding: 12,
                outline: 'none',
                fontSize: 16,
              }}
            />
          }
          placeholder={<Placeholder placeholder={placeholder} />}
          ErrorBoundary={LexicalErrorBoundary}
        />

        <HistoryPlugin />

        <AutoFocusPlugin />

        <LinkPlugin />

        <ListPlugin />

        <TablePlugin />

        <OnChangePlugin onChange={handleChange} />

        <InitialContentPlugin content={value} />
      </LexicalComposer>
    </Box>
  );
}
