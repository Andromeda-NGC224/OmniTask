import { Stack, IconButton, Tooltip, Divider, Box } from '@mui/material';
import { useToolbarLogic } from './hooks/useToolbarLogic';
import { useToolbarButtons } from './config';

export default function Toolbar() {
  const { handleToolbarButtonClick, getIsActive, getIsDisabled } =
    useToolbarLogic();
  const { TOOLBAR_BUTTONS } = useToolbarButtons();

  return (
    <Stack
      direction='row'
      spacing={1}
      sx={{
        p: 1,
        backgroundColor: 'background.paper',
        borderBottom: '1px solid',
        borderColor: 'divider',
        flexWrap: 'wrap',
      }}
    >
      {TOOLBAR_BUTTONS.map((btn) => (
        <Box key={btn.label} sx={{ display: 'flex', alignItems: 'center' }}>
          {btn.divider && (
            <Divider
              orientation='vertical'
              flexItem
              sx={{ mx: 1 }}
              color='divider'
            />
          )}
          <Tooltip title={btn.label}>
            <IconButton
              size='small'
              onClick={() => handleToolbarButtonClick(btn)}
              color={getIsActive(btn) ? 'primary' : 'default'}
              disabled={getIsDisabled(btn)}
            >
              {btn.icon}
            </IconButton>
          </Tooltip>
        </Box>
      ))}
    </Stack>
  );
}
