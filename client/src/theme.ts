// import { createTheme, MantineColorsTuple } from '@mantine/core';

// const customYellow: MantineColorsTuple = [
//   "#FFF9E6",
//   "#FFF3CC",
//   "#FFE799",
//   "#FFDB66",
//   "#FFCF33",
//   "#FFC300", 
//   "#E6B000",
//   "#CC9C00",
//   "#B38900",
//   "#997300"
// ];

// export const theme = createTheme({
//   primaryColor: 'brand',
//   colors: {
//     brand: customYellow,
//   },
//   shadows: {
//     md: '0 4px 8px 0 rgba(0, 0, 0, 0.1)',
//     xl: '0 8px 16px 0 rgba(0, 0, 0, 0.15)',
//   },
//   components: {
//     Button: {
//       defaultProps: {
//         color: 'brand',
//       },
//     },
//     Badge: {
//       defaultProps: {
//         color: 'brand',
//       },
//     },
//   },
// });

import { createTheme, MantineColorsTuple } from '@mantine/core';

const customYellow: MantineColorsTuple = [
  "#FFF9E6",
  "#FFF3CC",
  "#FFE799",
  "#FFDB66",
  "#FFCF33",
  "#FFC300",
  "#E6B000",
  "#CC9C00",
  "#B38900",
  "#997300"
];

export const theme = createTheme({
  primaryColor: 'brand',
  colors: {
    brand: customYellow,
    dark: [
      "#C1C2C5",
      "#A6A7AB",
      "#909296",
      "#5c5f66",
      "#373A40",
      "#2C2E33",
      "#25262b",
      "#1A1B1E",
      "#141517",
      "#101113",
    ],
  },
  components: {
    Button: {
      defaultProps: {
        color: 'brand',
      },
      styles: {
        root: {
          '&:focus': {
            outline: 'none',
            boxShadow: 'none',
          },
        },
      },
    },
    ActionIcon: {
      styles: {
        root: {
          '&:focus': {
            outline: 'none',
            boxShadow: 'none',
          },
        },
      },
    },
    AppShell: {
      styles: {
        header: {
          borderBottom: 'none',
        },
      },
    },
  },
});