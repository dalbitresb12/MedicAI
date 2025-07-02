//mypreset.ts
import {definePreset, dt} from '@primeng/themes';
import Aura from '@primeng/themes/aura';


// @ts-ignore
// @ts-ignore
export const MyPreset = definePreset(Aura, {
  semantic: {
    primary: {
      0: '#FFFF',
      50: '{cyan.50}',
      100: '{cyan.100}',
      200: '{cyan.200}',
      300: '{cyan.300}',
      400: '{cyan.400}',
      500: '{cyan.500}',
      600: '{cyan.600}',
      700: '{cyan.700}',
      800: '{cyan.800}',
      900: '{cyan.900}',
      950: '{cyan.950}'
    },
    secondary: {

      50: '{amber.50}',
      100: '{amber.100}',
      200: '{amber.200}',
      300: '{amber.300}',
      400: '{amber.400}',
      500: '{amber.500}',
      600: '{amber.600}',
      700: '{amber.700}',
      800: '{amber.800}',
      900: '{amber.900}',
      950: '{amber.950}',
    },

    colorScheme: {
      light: {
        primary: {
          0: '#FFFF',
          50: '{cyan.50}',
          100: '{cyan.100}',
          200: '{cyan.200}',
          300: '{cyan.300}',
          400: '{cyan.400}',
          500: '{cyan.500}',
          600: '{cyan.600}',
          700: '{cyan.700}',
          800: '{cyan.800}',
          900: '{cyan.900}',
          950: '{cyan.950}',
          inverseColor: '#ffffff',
          hoverColor: '{cyan.900}',
          activeColor: '{cyan.800}',
        },

        secondary: {
          0: '#FFFF',
          50: '{amber.50}',
          100: '{amber.100}',
          200: '{amber.200}',
          300: '{amber.300}',
          400: '{amber.400}',
          500: '{amber.500}',
          600: '{amber.600}',
          700: '{amber.700}',
          800: '{amber.800}',
          900: '{amber.900}',
          950: '{amber.950}',
        },
        highlight: {
          background: '{cyan.950}',
          focusBackground: '{cyan.700}',
          color: '#ffffff',
          focusColor: '#ffffff'
        }
      },
      dark: {
        primary: {
          color: '{zinc.50}',
          inverseColor: '{zinc.950}',
          hoverColor: '{zinc.100}',
          activeColor: '{zinc.200}'
        },
        highlight: {
          background: 'rgba(250, 250, 250, .16)',
          focusBackground: 'rgba(250, 250, 250, .24)',
          color: 'rgba(255,255,255,.87)',
          focusColor: 'rgba(255,255,255,.87)'
        }
      }
    },

    focusRing: {
      width: '2px',
      style: 'dashed',
      color: '{primary.color}',
      offset: '1px'
    }
  },

  components: {
    card: {
      colorScheme: {
        light: {
          root: {
            background: '{cyan.0}',
            color: '{zinc.950}',

          },
          subtitle: {
            color: '{surface.500}'
          }
        },
        dark: {
          root: {
            background: '{surface.900}',
            color: '{surface.0}'
          },
          subtitle: {
            color: '{surface.400}'
          }
        }
      },

    },

    buttons: {
      colorScheme: {
        light: {
          root: {
            background: '{amber.500}',
          }
        }
      }
    }


  },


});

