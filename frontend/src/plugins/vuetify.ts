import 'vuetify/styles';
import '@mdi/font/css/materialdesignicons.css';
import { createVuetify } from 'vuetify';
import * as components from 'vuetify/components';
import * as directives from 'vuetify/directives';

export default createVuetify({
  components,
  directives,
  theme: {
    defaultTheme: 'light',
    themes: {
      light: {
        dark: false,
        colors: {
          primary: '#1A365D',
          secondary: '#C8963E',
          accent: '#4A90D9',
          background: '#F0F4F8',
          surface: '#FFFFFF',
          error: '#E53E3E',
          info: '#3182CE',
          success: '#38A169',
          warning: '#D69E2E',
          'surface-variant': '#E2EBF5',
          'on-primary': '#FFFFFF',
          'on-secondary': '#FFFFFF'
        }
      },
      dark: {
        dark: true,
        colors: {
          primary: '#4299E1',
          secondary: '#ECC94B',
          accent: '#63B3ED',
          background: '#171923',
          surface: '#1E2533',
          error: '#FC8181',
          info: '#63B3ED',
          success: '#68D391',
          warning: '#F6E05E',
          'surface-variant': '#2D3748',
          'on-primary': '#FFFFFF',
          'on-secondary': '#1A202C'
        }
      }
    }
  }
});
