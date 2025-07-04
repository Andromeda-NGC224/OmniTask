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
  $isNodeSelection,
  $isParagraphNode,
  type TextFormatType,
  type ElementFormatType,
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

      // Update text format
      setIsBold(selection.hasFormat('bold'));
      setIsItalic(selection.hasFormat('italic'));
      setIsUnderline(selection.hasFormat('underline'));
      setIsStrikethrough(selection.hasFormat('strikethrough'));
      setIsCode(selection.hasFormat('code'));

      // Update block type
      if (element) {
        if ($isListNode(element)) {
          const parentList = $getNearestNodeOfType(anchorNode, ListNode);
          const listType =
            (parentList as ListNode)?.getTag() ||
            (element as ListNode).getTag();
          setBlockType(listType as 'ul' | 'ol');
          setIsUnorderedList(listType === 'ul');
          setIsOrderedList(listType === 'ol');
        } else {
          const nodeType = element.getType();
          if ($isHeadingNode(element)) {
            setBlockType(nodeType as 'h1' | 'h2' | 'h3');
          } else if ($isQuoteNode(element)) {
            setBlockType('quote');
            setIsQuote(true);
          } else if ($isParagraphNode(element)) {
            setBlockType('paragraph');
          } else {
            setBlockType('paragraph');
          }
          setIsUnorderedList(false);
          setIsOrderedList(false);
          setIsQuote(false);
        }
      }

      // Update element format
      setElementFormat(
        ((element?.getFormat() === 0
          ? ''
          : element?.getFormat()) as ElementFormatType) || '',
      );
    } else if ($isNodeSelection(selection)) {
      // No specific text format for NodeSelection
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

  const handleToolbarButtonClick = (btn: ToolbarButton) => {
    if (btn.custom === 'quote') {
      editor.update(() => {
        const node = $createQuoteNode();
        const selection = editor.getEditorState()._selection;
        if (selection && 'insertNodes' in selection) {
          selection.insertNodes([node]);
        }
      });
    } else if (btn.custom === 'heading') {
      editor.update(() => {
        const node = $createHeadingNode(btn.value as HeadingTagType);
        const selection = editor.getEditorState()._selection;
        if (selection && 'insertNodes' in selection) {
          selection.insertNodes([node]);
        }
      });
    } else if (btn.command === UNDO_COMMAND) {
      editor.dispatchCommand(UNDO_COMMAND, undefined);
    } else if (btn.command === REDO_COMMAND) {
      editor.dispatchCommand(REDO_COMMAND, undefined);
    } else if (btn.command === FORMAT_TEXT_COMMAND) {
      editor.dispatchCommand(FORMAT_TEXT_COMMAND, btn.value as TextFormatType);
    } else if (btn.command === FORMAT_ELEMENT_COMMAND) {
      editor.dispatchCommand(
        FORMAT_ELEMENT_COMMAND,
        btn.value as ElementFormatType,
      );
    } else if (btn.command === INSERT_UNORDERED_LIST_COMMAND) {
      editor.dispatchCommand(INSERT_UNORDERED_LIST_COMMAND, undefined);
    } else if (btn.command === INSERT_ORDERED_LIST_COMMAND) {
      editor.dispatchCommand(INSERT_ORDERED_LIST_COMMAND, undefined);
    } else if (btn.command === INSERT_TABLE_COMMAND) {
      const { rows, columns, includeHeaders } = btn.value as {
        rows: number;
        columns: number;
        includeHeaders: boolean;
      };
      editor.dispatchCommand(INSERT_TABLE_COMMAND, {
        rows: String(rows),
        columns: String(columns),
        includeHeaders,
      });
    } else if (btn.command) {
      editor.dispatchCommand(btn.command, btn.value);
    }
  };

  const getIsActive = (btn: ToolbarButton) => {
    if (btn.command === FORMAT_TEXT_COMMAND) {
      if (typeof btn.value === 'string') {
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
      return false; // If not a string, it's not active for text format commands
    } else if (btn.command === FORMAT_ELEMENT_COMMAND) {
      return typeof btn.value === 'string' && elementFormat === btn.value;
    } else if (btn.custom === 'quote') {
      return isQuote;
    } else if (btn.custom === 'heading') {
      return typeof btn.value === 'string' && blockType === btn.value;
    } else if (btn.command === INSERT_UNORDERED_LIST_COMMAND) {
      return isUnorderedList;
    } else if (btn.command === INSERT_ORDERED_LIST_COMMAND) {
      return isOrderedList;
    } else if (btn.command === INSERT_TABLE_COMMAND) {
      return false; // Table insertion doesn't have an active state
    }
    return false;
  };

  const getIsDisabled = (btn: ToolbarButton) => {
    if (btn.command === UNDO_COMMAND) {
      return !canUndo;
    } else if (btn.command === REDO_COMMAND) {
      return !canRedo;
    } else if (btn.command === INSERT_TABLE_COMMAND) {
      return false; // Table insertion is always enabled unless there's a specific reason
    }
    return false;
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
