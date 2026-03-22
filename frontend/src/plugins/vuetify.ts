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
          primary: '#2D3748',
          secondary: '#718096',
          accent: '#4A90D9',
          background: '#F7F8FA',
          surface: '#FFFFFF',
          error: '#E53E3E',
          info: '#3182CE',
          success: '#38A169',
          warning: '#D69E2E',
          'surface-variant': '#EDF2F7',
          'on-surface-variant': '#2D3748',
          'on-primary': '#FFFFFF',
          'on-secondary': '#FFFFFF'
        }
      },
      dark: {
        dark: true,
        colors: {
          primary: '#1E2533',
          secondary: '#90A4B8',
          accent: '#63B3ED',
          background: '#0F1117',
          surface: '#1A1F2E',
          error: '#FC8181',
          info: '#63B3ED',
          success: '#68D391',
          warning: '#F6E05E',
          'surface-variant': '#2D3748',
          'on-surface-variant': '#E2E8F0',
          'on-primary': '#E2E8F0',
          'on-secondary': '#1A202C'
        }
      }
    }
  }
});
