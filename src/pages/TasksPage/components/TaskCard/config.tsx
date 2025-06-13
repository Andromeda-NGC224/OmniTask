import EditIcon from '@mui/icons-material/Edit';
import DescriptionIcon from '@mui/icons-material/Description';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import DeleteIcon from '@mui/icons-material/Delete';

export enum CardButtonAction {
  Edit = 'edit',
  Details = 'details',
  Complete = 'complete',
  Delete = 'delete',
}

export const toolbarButtons = [
  {
    action: CardButtonAction.Details,
    icon: <DescriptionIcon />,
    tooltipKey: 'card_button.details',
  },
  {
    action: CardButtonAction.Complete,
    icon: <CheckCircleOutlineIcon />,
    tooltipKey: 'card_button.complete',
  },
  {
    action: CardButtonAction.Edit,
    icon: <EditIcon />,
    tooltipKey: 'card_button.edit',
  },
  {
    action: CardButtonAction.Delete,
    icon: <DeleteIcon />,
    tooltipKey: 'card_button.delete',
  },
];
