import type { SerializedEditorState } from 'lexical';

export interface TaskDescriptionProps {
  description?: string;
  onChange?: (editorState: SerializedEditorState) => void;
  value?: SerializedEditorState | null;
}
