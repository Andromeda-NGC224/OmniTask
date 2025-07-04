import type { SerializedEditorState } from 'lexical';

export interface RichTextEditorProps {
  onChange?: (editorState: SerializedEditorState) => void;
  placeholder?: string;
  minHeight?: number;
  value?: SerializedEditorState | null;
}
