import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { App } from './app/app';

bootstrapApplication(App, appConfig)
  .then(() => {
    const splash = document.getElementById('initial-splash');
    const appRoot = document.querySelector('app-root');

    if (appRoot) {
      appRoot.classList.add('app-ready');
    }

    if (splash) {
      splash.classList.add('fade-out');

      setTimeout(() => {
        splash.remove();
      }, 700);
    }
  })
  .catch((err) => console.error(err));
