import { HttpClientModule } from '@angular/common/http'
import { NgModule } from '@angular/core'
import { MatIconModule } from '@angular/material/icon'
import { MatListModule } from '@angular/material/list'
import { MatSidenavModule } from '@angular/material/sidenav'
import { MatToolbarModule } from '@angular/material/toolbar'
import { BrowserModule } from '@angular/platform-browser'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { EffectsModule } from '@ngrx/effects'
import { StoreModule } from '@ngrx/store'
import { StoreDevtoolsModule } from '@ngrx/store-devtools'
import { AppRoutingModule } from './app-routing.module'
import { AppComponent } from './app.component'

const AngularMaterialModules = [MatSidenavModule, MatToolbarModule, MatIconModule, MatListModule]

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AppRoutingModule,
    ...AngularMaterialModules,
    StoreModule.forRoot({}),
    EffectsModule.forRoot(),
    StoreDevtoolsModule.instrument({
      maxAge: 25,
      autoPause: true,
    }),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
