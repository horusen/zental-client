import { BrowserModule } from "@angular/platform-browser";
import { Injector, NgModule } from "@angular/core";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { HttpClient, HttpClientModule } from "@angular/common/http";
import { TranslateHttpLoader } from "@ngx-translate/http-loader";
import { TranslateModule, TranslateLoader } from "@ngx-translate/core";
import { SweetAlert2Module } from "@sweetalert2/ngx-sweetalert2";
import { AppInjector } from "./shared/services/app-injector.service";
import { SharedModule } from "./shared/shared.module";
import { AuthentificationModule } from "./authentification/authentification.module";
import { NgxPicaModule } from "@digitalascetic/ngx-pica";
import { ToastrModule } from "ngx-toastr";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { EmailVerificationComponent } from "./auth/email-verification/email-verification.component";
import { EmailUnverifiedComponent } from "./auth/email-unverified/email-unverified.component";
import { MatTabsModule } from "@angular/material/tabs";

@NgModule({
  declarations: [
    AppComponent,
    EmailVerificationComponent,
    EmailUnverifiedComponent,
  ],
  imports: [
    AuthentificationModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    SharedModule,
    NgxPicaModule,
    MatTabsModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    SweetAlert2Module.forRoot(),
    TranslateModule.forRoot({
      defaultLanguage: "fr",
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient],
      },
    }),
  ],
  providers: [],
  bootstrap: [AppComponent],
  exports: [TranslateModule],
})
export class AppModule {
  constructor(injector: Injector) {
    AppInjector.injector = injector;
  }
}

// required for AOT compilation FOR ngx-translate
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, "assets/i18n/", ".json");
}
