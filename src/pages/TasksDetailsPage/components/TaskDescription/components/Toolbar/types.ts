import type { LexicalCommand } from 'lexical';

export interface ToolbarButton {
  label: string;
  icon: React.ReactNode;
  command?: LexicalCommand<unknown>;
  value?: unknown;
  custom?: 'quote' | 'heading';
  type?: 'format' | 'list' | 'table' | 'link';
  isActive?: boolean;
  isDisabled?: boolean;
  divider?: boolean;
}
