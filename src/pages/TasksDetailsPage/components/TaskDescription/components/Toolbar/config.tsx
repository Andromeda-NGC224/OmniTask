import FormatBoldIcon from '@mui/icons-material/FormatBold';
import FormatItalicIcon from '@mui/icons-material/FormatItalic';
import FormatUnderlinedIcon from '@mui/icons-material/FormatUnderlined';
import StrikethroughSIcon from '@mui/icons-material/StrikethroughS';
import CodeIcon from '@mui/icons-material/Code';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import FormatListNumberedIcon from '@mui/icons-material/FormatListNumbered';
import FormatQuoteIcon from '@mui/icons-material/FormatQuote';
import TitleIcon from '@mui/icons-material/Title';
import UndoIcon from '@mui/icons-material/Undo';
import RedoIcon from '@mui/icons-material/Redo';
import FormatAlignLeftIcon from '@mui/icons-material/FormatAlignLeft';
import FormatAlignCenterIcon from '@mui/icons-material/FormatAlignCenter';
import FormatAlignRightIcon from '@mui/icons-material/FormatAlignRight';
import FormatAlignJustifyIcon from '@mui/icons-material/FormatAlignJustify';
import TableChartIcon from '@mui/icons-material/TableChart';

import {
  FORMAT_TEXT_COMMAND,
  REDO_COMMAND,
  UNDO_COMMAND,
  FORMAT_ELEMENT_COMMAND,
} from 'lexical';
import {
  INSERT_UNORDERED_LIST_COMMAND,
  INSERT_ORDERED_LIST_COMMAND,
} from '@lexical/list';
import { INSERT_TABLE_COMMAND } from '@lexical/table';
import type { ToolbarButton } from './types';
import type { HeadingTagType } from '@lexical/rich-text';
import { useTranslation } from 'react-i18next';

export const useToolbarButtons = () => {
  const { t } = useTranslation('tasks_details_page');

  const TOOLBAR_BUTTONS: ToolbarButton[] = [
    {
      label: t('toolbar.undo'),
      icon: <UndoIcon fontSize='small' />,
      command: UNDO_COMMAND,
    },
    {
      label: t('toolbar.redo'),
      icon: <RedoIcon fontSize='small' />,
      command: REDO_COMMAND,
    },
    {
      label: t('toolbar.bold'),
      icon: <FormatBoldIcon fontSize='small' />,
      command: FORMAT_TEXT_COMMAND,
      value: 'bold',
      divider: true,
    },
    {
      label: t('toolbar.italic'),
      icon: <FormatItalicIcon fontSize='small' />,
      command: FORMAT_TEXT_COMMAND,
      value: 'italic',
    },
    {
      label: t('toolbar.underline'),
      icon: <FormatUnderlinedIcon fontSize='small' />,
      command: FORMAT_TEXT_COMMAND,
      value: 'underline',
    },
    {
      label: t('toolbar.strikethrough'),
      icon: <StrikethroughSIcon fontSize='small' />,
      command: FORMAT_TEXT_COMMAND,
      value: 'strikethrough',
    },
    {
      label: t('toolbar.heading'),
      icon: <TitleIcon fontSize='small' />,
      custom: 'heading',
      value: 'h2' as HeadingTagType,
    },

    {
      label: t('toolbar.bulletedList'),
      icon: <FormatListBulletedIcon fontSize='small' />,
      command: INSERT_UNORDERED_LIST_COMMAND,
      value: 'bullet',
      divider: true,
    },
    {
      label: t('toolbar.numberedList'),
      icon: <FormatListNumberedIcon fontSize='small' />,
      command: INSERT_ORDERED_LIST_COMMAND,
      value: 'check',
    },
    {
      label: t('toolbar.quote'),
      icon: <FormatQuoteIcon fontSize='small' />,
      custom: 'quote',
      divider: true,
    },
    {
      label: t('toolbar.code'),
      icon: <CodeIcon fontSize='small' />,
      command: FORMAT_TEXT_COMMAND,
      value: 'code',
    },
    {
      label: t('toolbar.insertTable'),
      icon: <TableChartIcon fontSize='small' />,
      command: INSERT_TABLE_COMMAND,
      value: {
        rows: 3,
        columns: 3,
        includeHeaders: true,
      },
    },
    {
      label: t('toolbar.leftAlign'),
      icon: <FormatAlignLeftIcon fontSize='small' />,
      command: FORMAT_ELEMENT_COMMAND,
      value: 'left',
      divider: true,
    },
    {
      label: t('toolbar.centerAlign'),
      icon: <FormatAlignCenterIcon fontSize='small' />,
      command: FORMAT_ELEMENT_COMMAND,
      value: 'center',
    },
    {
      label: t('toolbar.rightAlign'),
      icon: <FormatAlignRightIcon fontSize='small' />,
      command: FORMAT_ELEMENT_COMMAND,
      value: 'right',
    },
    {
      label: t('toolbar.justifyAlign'),
      icon: <FormatAlignJustifyIcon fontSize='small' />,
      command: FORMAT_ELEMENT_COMMAND,
      value: 'justify',
    },
  ];

  return {
    TOOLBAR_BUTTONS,
  };
};
