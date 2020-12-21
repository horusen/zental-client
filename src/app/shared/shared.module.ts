import { NgMultiSelectDropDownModule } from "ng-multiselect-dropdown";
import { CKEditorModule } from "@ckeditor/ckeditor5-angular";
import { AngularMultiSelectModule } from "angular2-multiselect-dropdown";
import { MatTooltipModule } from "@angular/material/tooltip";
import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { SweetAlert2Module } from "@sweetalert2/ngx-sweetalert2";
import { NgxPicaModule } from "@digitalascetic/ngx-pica";
import { ToastrModule } from "ng6-toastr-notifications";
import { RouterModule } from "@angular/router";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { DpDatePickerModule } from "ng2-date-picker";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { TranslateModule } from "@ngx-translate/core";
import { PickerModule } from "@ctrl/ngx-emoji-mart";
import { NgxPaginationModule } from "ngx-pagination";
import { ModalComponent } from "./components/modal/modal.component";
// import { CommonCreateComponent } from "./components/common-component/common-create/common-create.component";
// import { CommonEditComponent } from "./components/common-component/common-edit/common-edit.component";
import { LoadingComponent } from "./components/loading/loading.component";
import { MissingDataComponent } from "./components/missing-data/missing-data.component";
import { PageLoadingComponent } from "./components/page-loading/page-loading.component";
import { CommonCreateComponent } from "./components/common-component/common-create/common-create.component";
import { OverlayComponent } from "./components/overlay/overlay.component";
import { ModalSidebarComponent } from "./components/modal-sidebar/modal-sidebar.component";
@NgModule({
  declarations: [
    ModalComponent,
    CommonCreateComponent,
    // CommonEditComponent,
    LoadingComponent,
    MissingDataComponent,
    PageLoadingComponent,
    OverlayComponent,
    ModalSidebarComponent,
  ],
  imports: [
    // BrowserModule,
    ToastrModule,
    CommonModule,
    MatTooltipModule,
    AngularMultiSelectModule,
    SweetAlert2Module,
    NgxPicaModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    CKEditorModule,
    NgMultiSelectDropDownModule.forRoot(),
    NgxPaginationModule,
    DpDatePickerModule,
    NgbModule,
    TranslateModule.forChild(),
    PickerModule,
  ],
  exports: [
    MatTooltipModule,
    AngularMultiSelectModule,
    SweetAlert2Module,
    NgxPicaModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    CKEditorModule,
    NgMultiSelectDropDownModule,
    NgxPaginationModule,
    DpDatePickerModule,
    NgbModule,
    TranslateModule,
    PickerModule,
    ToastrModule,
    OverlayComponent,
    ModalComponent,
    CommonCreateComponent,
    ModalSidebarComponent,
    // CommonEditComponent,
    LoadingComponent,
    MissingDataComponent,
    PageLoadingComponent,
  ],
})
export class SharedModule {}
