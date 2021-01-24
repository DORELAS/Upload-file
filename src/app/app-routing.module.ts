import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UploadComponent } from './uploads/upload/upload.component';
import { UploadsListComponent } from './uploads/uploads-list/uploads-list.component';
import { UploadsComponent } from './uploads/uploads.component';

const routes: Routes = [
  { path: '', redirectTo: 'upload/uploaded', pathMatch: 'full'},
  { path: 'upload', component: UploadsComponent, children: [
    { path: 'uploaded', component: UploadComponent },
    { path: 'uploaded-list', component: UploadsListComponent}
  ]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
