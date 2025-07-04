import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { useEffect, useRef } from 'react';
import type { SerializedEditorState } from 'lexical';

export function InitialContentPlugin({
  content,
}: {
  content?: SerializedEditorState | null;
}) {
  const [editor] = useLexicalComposerContext();
  const isMounted = useRef(false);

  useEffect(() => {
    if (
      !content ||
      (typeof content === 'object' && Object.keys(content).length === 0)
    )
      return;

    if (isMounted.current) return;

    isMounted.current = true;

    try {
      const editorState = editor.parseEditorState(JSON.stringify(content));
      if (editorState.isEmpty()) {
        console.warn('Initial content is empty, skipping initialization');
        return;
      }

      editor.update(() => {
        editor.setEditorState(editorState);
      });
    } catch (error) {
      console.error('Failed to parse initial content:', error);
    }
  }, [editor, content]);

  return null;
}
