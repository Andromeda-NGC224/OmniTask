import { useCallback, useEffect, useState } from 'react';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import {
  $createHeadingNode,
  $createQuoteNode,
  $isHeadingNode,
  $isQuoteNode,
  type HeadingTagType,
} from '@lexical/rich-text';
import {
  $getSelection,
  $isRangeSelection,
  CAN_REDO_COMMAND,
  CAN_UNDO_COMMAND,
  COMMAND_PRIORITY_CRITICAL,
  COMMAND_PRIORITY_LOW,
  FORMAT_ELEMENT_COMMAND,
  FORMAT_TEXT_COMMAND,
  REDO_COMMAND,
  SELECTION_CHANGE_COMMAND,
  UNDO_COMMAND,
  $isParagraphNode,
  type TextFormatType,
  type ElementFormatType,
  type RangeSelection,
  type LexicalNode,
  $isElementNode,
} from 'lexical';
import { $getNearestNodeOfType, mergeRegister } from '@lexical/utils';
import {
  INSERT_ORDERED_LIST_COMMAND,
  INSERT_UNORDERED_LIST_COMMAND,
  ListNode,
  $isListNode,
} from '@lexical/list';
import { INSERT_TABLE_COMMAND } from '@lexical/table';
import type { ToolbarButton } from '../types';

interface UseToolbarLogicResult {
  canUndo: boolean;
  canRedo: boolean;
  isBold: boolean;
  isItalic: boolean;
  isUnderline: boolean;
  isStrikethrough: boolean;
  isCode: boolean;
  isQuote: boolean;
  isUnorderedList: boolean;
  isOrderedList: boolean;
  blockType: 'paragraph' | 'h1' | 'h2' | 'h3' | 'quote' | 'ul' | 'ol';
  elementFormat: ElementFormatType | '';
  handleToolbarButtonClick: (btn: ToolbarButton) => void;
  getIsActive: (btn: ToolbarButton) => boolean;
  getIsDisabled: (btn: ToolbarButton) => boolean;
}

export const useToolbarLogic = (): UseToolbarLogicResult => {
  const [editor] = useLexicalComposerContext();
  const [canUndo, setCanUndo] = useState(false);
  const [canRedo, setCanRedo] = useState(false);
  const [isBold, setIsBold] = useState(false);
  const [isItalic, setIsItalic] = useState(false);
  const [isUnderline, setIsUnderline] = useState(false);
  const [isStrikethrough, setIsStrikethrough] = useState(false);
  const [isCode, setIsCode] = useState(false);
  const [isQuote, setIsQuote] = useState(false);
  const [isUnorderedList, setIsUnorderedList] = useState(false);
  const [isOrderedList, setIsOrderedList] = useState(false);
  const [blockType, setBlockType] = useState<
    'paragraph' | 'h1' | 'h2' | 'h3' | 'quote' | 'ul' | 'ol'
  >('paragraph');
  const [elementFormat, setElementFormat] = useState<ElementFormatType | ''>(
    '',
  );

  const $updateToolbar = useCallback(() => {
    const selection = $getSelection();

    if ($isRangeSelection(selection)) {
      const anchorNode = selection.anchor.getNode();
      const element =
        anchorNode.getKey() === 'root' ? anchorNode : anchorNode.getParent();

      updateTextFormats(selection);

      updateBlockTypeStates(anchorNode, element);

      updateElementFormatState(element, setElementFormat);
    }
  }, []);

  useEffect(() => {
    return mergeRegister(
      editor.registerUpdateListener(({ editorState }) => {
        editorState.read(() => {
          $updateToolbar();
        });
      }),
      editor.registerCommand(
        SELECTION_CHANGE_COMMAND,
        () => {
          $updateToolbar();
          return false;
        },
        COMMAND_PRIORITY_CRITICAL,
      ),
      editor.registerCommand(
        CAN_UNDO_COMMAND,
        (payload) => {
          setCanUndo(payload);
          return false;
        },
        COMMAND_PRIORITY_LOW,
      ),
      editor.registerCommand(
        CAN_REDO_COMMAND,
        (payload) => {
          setCanRedo(payload);
          return false;
        },
        COMMAND_PRIORITY_LOW,
      ),
    );
  }, [editor, $updateToolbar]);

  const handleToolbarButtonClick = (btn: ToolbarButton): void => {
    // Custom buttons handling
    if (btn.custom) {
      handleCustomCommand(btn);
      return;
    }

    // Command handling
    if (btn.command) {
      handleStandardCommand(btn);
      return;
    }
  };

  // --- Helper functions ---

  const handleCustomCommand = (btn: ToolbarButton): void => {
    switch (btn.custom) {
      case 'quote':
        insertQuoteNode();
        break;
      case 'heading':
        insertHeadingNode(btn.value as HeadingTagType);
        break;
      default:
        console.warn('Unknown custom command:', btn.custom);
    }
  };

  const handleStandardCommand = (btn: ToolbarButton): void => {
    if (!btn.command) return;

    switch (btn.command) {
      case UNDO_COMMAND:
      case REDO_COMMAND:
      case FORMAT_TEXT_COMMAND:
      case FORMAT_ELEMENT_COMMAND:
      case INSERT_UNORDERED_LIST_COMMAND:
      case INSERT_ORDERED_LIST_COMMAND:
        editor.dispatchCommand(btn.command, btn.value);
        break;

      case INSERT_TABLE_COMMAND:
        handleInsertTableCommand(btn);
        break;

      default:
        editor.dispatchCommand(btn.command, btn.value);
    }
  };

  const insertQuoteNode = (): void => {
    editor.update(() => {
      const node = $createQuoteNode();
      const selection = $getSelection();
      if ($isRangeSelection(selection)) {
        selection.insertNodes([node]);
      }
    });
  };

  const insertHeadingNode = (tag: HeadingTagType): void => {
    editor.update(() => {
      const node = $createHeadingNode(tag);
      const selection = $getSelection();
      if ($isRangeSelection(selection)) {
        selection.insertNodes([node]);
      }
    });
  };

  const handleInsertTableCommand = (btn: ToolbarButton): void => {
    const value = btn.value as {
      rows: number;
      columns: number;
      includeHeaders: boolean;
    };
    editor.dispatchCommand(INSERT_TABLE_COMMAND, {
      rows: String(value.rows),
      columns: String(value.columns),
      includeHeaders: value.includeHeaders,
    });
  };

  const getIsActive = (btn: ToolbarButton): boolean => {
    // Text format (bold, italic, etc.)
    if (btn.command === FORMAT_TEXT_COMMAND && typeof btn.value === 'string') {
      switch (btn.value as TextFormatType) {
        case 'bold':
          return isBold;
        case 'italic':
          return isItalic;
        case 'underline':
          return isUnderline;
        case 'strikethrough':
          return isStrikethrough;
        case 'code':
          return isCode;
        default:
          return false;
      }
    }

    // Special custom buttons (quote, heading)
    switch (btn.custom) {
      case 'quote':
        return isQuote;
      case 'heading':
        return typeof btn.value === 'string' && blockType === btn.value;
    }

    // Block elements (ordered list, unordered list)
    switch (btn.command) {
      case INSERT_UNORDERED_LIST_COMMAND:
        return isUnorderedList;
      case INSERT_ORDERED_LIST_COMMAND:
        return isOrderedList;
    }

    // Alignment or other formatting of elements (left, center, right, etc.)
    if (
      btn.command === FORMAT_ELEMENT_COMMAND &&
      typeof btn.value === 'string'
    ) {
      return elementFormat === btn.value;
    }

    return false;
  };

  const getIsDisabled = (btn: ToolbarButton): boolean => {
    switch (btn.command) {
      case UNDO_COMMAND:
        return !canUndo;
      case REDO_COMMAND:
        return !canRedo;
      case INSERT_TABLE_COMMAND:
        return false; // Table insertion is always enabled
      default:
        return false;
    }
  };

  const updateTextFormats = (selection: RangeSelection): void => {
    setIsBold(selection.hasFormat('bold'));
    setIsItalic(selection.hasFormat('italic'));
    setIsUnderline(selection.hasFormat('underline'));
    setIsStrikethrough(selection.hasFormat('strikethrough'));
    setIsCode(selection.hasFormat('code'));
  };

  const updateBlockTypeStates = (
    anchorNode: LexicalNode,
    element: LexicalNode | null,
  ): void => {
    // Set default values first
    setBlockType('paragraph');
    setIsUnorderedList(false);
    setIsOrderedList(false);
    setIsQuote(false);

    if (!element) return;

    if ($isListNode(element)) {
      const parentList = $getNearestNodeOfType(anchorNode, ListNode);
      const listType = (parentList || element).getTag();
      setBlockType(listType as 'ul' | 'ol');
      setIsUnorderedList(listType === 'ul');
      setIsOrderedList(listType === 'ol');
      return;
    }

    const nodeType = element.getType();

    if ($isHeadingNode(element)) {
      setBlockType(nodeType as 'h1' | 'h2' | 'h3');
      return;
    }

    if ($isQuoteNode(element)) {
      setBlockType('quote');
      setIsQuote(true);
      return;
    }

    if ($isParagraphNode(element)) {
      setBlockType('paragraph');
    }
  };

  const updateElementFormatState = (
    element: LexicalNode | null,
    setElementFormat: (payload: ElementFormatType | '') => void,
  ): void => {
    if (element && $isElementNode(element)) {
      setElementFormat(
        ((element.getFormat() === 0
          ? ''
          : element.getFormat()) as ElementFormatType) || '',
      );
    } else {
      setElementFormat('');
    }
  };

  return {
    canUndo,
    canRedo,
    isBold,
    isItalic,
    isUnderline,
    isStrikethrough,
    isCode,
    isQuote,
    isUnorderedList,
    isOrderedList,
    blockType,
    elementFormat,
    handleToolbarButtonClick,
    getIsActive,
    getIsDisabled,
  };
};
