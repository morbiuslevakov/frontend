import { useMediaQuery, useTheme } from '@mui/material';

export const useMediaQueryHook = (query) => {
  const theme = useTheme()
  const matches = useMediaQuery(theme.breakpoints.down(query));

  return matches
}
