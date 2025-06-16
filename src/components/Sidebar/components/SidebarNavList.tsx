import {
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  ListItemButton,
  Tooltip,
} from '@mui/material';
import { NavLink } from 'react-router-dom';
import { menuItems } from '../config';

interface SidebarNavListProps {
  open: boolean;
}

export default function SidebarNavList({ open }: SidebarNavListProps) {
  return (
    <List sx={{ py: 2 }}>
      {menuItems.map(({ to, label, icon }) => (
        <ListItem sx={{ px: 2 }} key={label} disablePadding>
          <NavLink to={to} style={{ width: '100%' }}>
            <Tooltip title={!open ? label : ''} placement='right'>
              <ListItemButton
                sx={{ justifyContent: open ? 'initial' : 'center' }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 2 : 'auto',
                    justifyContent: 'center',
                  }}
                >
                  {icon}
                </ListItemIcon>
                {open && (
                  <ListItemText
                    primary={label}
                    slotProps={{
                      primary: {
                        sx: { fontWeight: 'bold', color: 'text.secondary' },
                      },
                    }}
                  />
                )}
              </ListItemButton>
            </Tooltip>
          </NavLink>
        </ListItem>
      ))}
    </List>
  );
}
