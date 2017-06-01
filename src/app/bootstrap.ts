import 'rxjs';
import 'zone.js';
import 'reflect-metadata';
import 'whatwg-fetch';

import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule } from './module/app.module';

platformBrowserDynamic().bootstrapModule(AppModule);
