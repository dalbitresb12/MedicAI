import { definePreset } from '@primeng/themes';
import Aura from '@primeng/themes/aura';

export const MyPreset = definePreset(Aura, {
  semantic: {
    colorScheme: {
      light: {
        primary: {
          0: 'blue.500',
          50: '{blue.50}',
          100: '{blue.100}',
          200: '{blue.200}',
          300: '{blue.300}',
          400: '{blue.400}',
          500: '{blue.500}',
          600: '{blue.600}',
          700: '{blue.700}',
          800: '{blue.800}',
          900: '{blue.900}',
          950: '{blue.950}',
          inverseColor: 'blue.500',
          hoverColor: '{blue.900}',
          activeColor: '{blue.800}',
        },
        secondary: {
          0: 'blue.500',
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
          background: '{blue.200}',
          focusBackground: '{blue.200}',
          color: 'blue.500',
          focusColor: 'blue.500'
        }
      },
      dark: { // Duplicamos exactamente la configuración del light
        primary: {
          0: 'blue.500',
          50: '{blue.50}',
          100: '{blue.100}',
          200: '{blue.200}',
          300: '{blue.300}',
          400: '{blue.400}',
          500: '{blue.500}',
          600: '{blue.600}',
          700: '{blue.700}',
          800: '{blue.800}',
          900: '{blue.900}',
          950: '{blue.950}',
          inverseColor: 'blue.500',
          hoverColor: '{blue.900}',
          activeColor: '{blue.800}',
        },
        secondary: {
          0: 'blue.500',
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
          color: 'blue.500',
          focusColor: 'blue.500'
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
        dark: { // Duplicamos la configuración del card light
          root: {
            background: '{cyan.0}',
            color: '{zinc.950}',
          },
          subtitle: {
            color: '{surface.500}'
          }
        }
      }
    },
    buttons: {
      colorScheme: {
        light: {
          root: {
            background: '{amber.500}',
          }
        },
        dark: { // Duplicamos la configuración de botones light
          root: {
            background: '{amber.500}',
          }
        }
      }
    }
  }
});
