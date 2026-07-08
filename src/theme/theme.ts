import { createTheme } from '@mui/material/styles';

import { breakpoints } from './breakpoints';
import { lightPalette } from './palette';
import { spacing } from './spacing';
import { typography } from './typography';
import { appShadows } from './shadows';
import { shape } from './shape';
import { components } from './components';

export const theme = createTheme({
    palette: lightPalette,
    typography,
    spacing,
    breakpoints,
    shadows: appShadows,
    shape,
    components
});