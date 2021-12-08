import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { AppRoutingModule } from './app.routing';
import { ComponentsModule } from './components/components.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import {
    AgmCoreModule
} from '@agm/core';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { AngularFireModule } from '@angular/fire';
import { firebaseConfig } from './firebaseConfig';
import { BrowserModule } from '@angular/platform-browser';
import { AvatarModule } from 'ngx-avatar';
import { NgxPaginationModule } from 'ngx-pagination';

@NgModule({
    imports: [
        AngularFireModule.initializeApp(firebaseConfig),
        BrowserAnimationsModule,
        NgbModule,
        FormsModule,
        ReactiveFormsModule,
        BrowserModule,
        HttpClientModule,
        ComponentsModule,
        NgxPaginationModule,
        AvatarModule,
        RouterModule,
        AppRoutingModule,
        AgmCoreModule.forRoot({
            apiKey: 'YOUR_GOOGLE_MAPS_API_KEY'
        })
    ],
    declarations: [
        AppComponent,
        AdminLayoutComponent,

    ],

    schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],

    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule { }
