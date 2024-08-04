import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';

bootstrapApplication(AppComponent, appConfig)
  .catch((err) => console.error(err));








//   import { provideRouter } from '@angular/router';
// import { importProvidersFrom } from '@angular/core';
// import { CommonModule } from '@angular/common';

// export const appConfig = {
//   providers: [
//     provideRouter([]), // your routes here
//     importProvidersFrom(CommonModule), // only if you need it
//   ],
// };