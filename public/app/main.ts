import { XHRBackend } from '@angular/http';

import { InMemoryBackendService, SEED_DATA } from 'angular2-in-memory-web-api';
import { InMemoryDataService }               from './services/in-memory-data.service';

import { bootstrap }    from '@angular/platform-browser-dynamic';

import { AppComponent } from './app.component';
import { appRouterProviders } from './app.routes';
import { HTTP_PROVIDERS } from '@angular/http';


bootstrap(AppComponent, [appRouterProviders,
   HTTP_PROVIDERS,
    { provide: XHRBackend, useClass: InMemoryBackendService }, // in-mem server
    { provide: SEED_DATA, useClass: InMemoryDataService }
 ]);
