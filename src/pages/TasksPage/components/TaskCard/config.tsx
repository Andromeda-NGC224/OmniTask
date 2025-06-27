import EditIcon from '@mui/icons-material/Edit';
import DescriptionIcon from '@mui/icons-material/Description';

import DeleteIcon from '@mui/icons-material/Delete';
import { FaExchangeAlt } from 'react-icons/fa';

export enum CardButtonAction {
  EDIT = 'edit',
  DETAILS = 'details',
  CHANGE_STATUS = 'change_status',
  DELETE = 'delete',
}

export const toolbarButtons = [
  {
    action: CardButtonAction.DETAILS,
    icon: <DescriptionIcon />,
    tooltipKey: 'card_button.details',
  },
  {
    action: CardButtonAction.CHANGE_STATUS,
    icon: <FaExchangeAlt />,
    tooltipKey: 'card_button.change_status',
  },
  {
    action: CardButtonAction.EDIT,
    icon: <EditIcon />,
    tooltipKey: 'card_button.edit',
  },
  {
    action: CardButtonAction.DELETE,
    icon: <DeleteIcon />,
    tooltipKey: 'card_button.delete',
  },
];
