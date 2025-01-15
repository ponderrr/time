import { createTheme, MantineColorsTuple } from '@mantine/core';

const customYellow: MantineColorsTuple = [
  "#FFF9E6",
  "#FFF3CC",
  "#FFE799",
  "#FFDB66",
  "#FFCF33",
  "#FFC300", // Primary shade
  "#E6B000",
  "#CC9C00",
  "#B38900",
  "#997300"
];

export const theme = createTheme({
  primaryColor: 'brand',
  colors: {
    brand: customYellow,
  },
  components: {
    Button: {
      defaultProps: {
        color: 'brand',
      },
    },
    Badge: {
      defaultProps: {
        color: 'brand',
      },
    },
  },
  // Custom theme properties for light/dark modes
  other: {
    backgroundColor: {
      light: '#F5F5DC', // Beige background for light mode
      dark: '#1A1B1E',  // Existing dark grey for dark mode
    },
    navbarColor: '#1A1B1E', // Black navbar for both modes
  }
});