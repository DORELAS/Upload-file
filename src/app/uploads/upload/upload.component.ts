import { Component, OnInit } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { finalize } from 'rxjs/operators';
import { UploadsService } from 'src/app/services/uploads.service';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.scss']
})
export class UploadComponent implements OnInit {

  categories = [{ id: 1, name: 'document'}, { id: 2, name: 'media'}];
  fileForm = new FormGroup({
    title: new FormControl('', Validators.required),
    category: new FormControl(''),
    fileUrl: new FormControl('', Validators.required)
  });
  // tslint:disable-next-line:no-inferrable-types
  fileAdd: string = '../../../assets/images/add_file.png';
  fileDocument = new FileReader();
  // tslint:disable-next-line:no-inferrable-types
  fileName: string = '';
  selectedFile: any = null;
  // tslint:disable-next-line:no-inferrable-types
  isSubmited: boolean = false;


  constructor(
    private storage: AngularFireStorage,
    private fileService: UploadsService
  ) { }

  ngOnInit(): void {
    this.resetForm();
  }

  showTitle(event: any): void {
    if (event.target.files && event.target.files[0]) {
      this.fileDocument.onload = (e: any) => this.fileName = e.target.result;
      this.fileDocument.readAsDataURL(event.target.files[0]);
      this.selectedFile = event.target.files[0];
      this.fileAdd = '../../../assets/images/added_file.png';
    } else {
      this.fileName = '';
      this.selectedFile = null;
      this.fileAdd = '../../../assets/images/add_file.png';
    }
  }

  onSubmit(formValue): void {
    this.isSubmited = true;
    if (this.fileForm.valid) {
      // tslint:disable-next-line:no-inferrable-types
      const filePath: string = `${formValue.category}/${this.selectedFile.name.split('.').slice(0, -1).join(',')}_${new Date().getTime()}`;
      const fileRef = this.storage.ref(filePath);
      this.storage.upload(filePath, this.selectedFile).snapshotChanges().pipe(
        finalize(() => {
          fileRef.getDownloadURL().subscribe((url) => {
            formValue.fileUrl = url;
            this.fileService.insertFileDetails(formValue);
            this.resetForm();
          });
        })
      ).subscribe();
    }
  }

  get formControls(): any {
    return this.fileForm.controls;
  }

  resetForm(): void {
    this.fileForm.reset();
    this.fileForm.setValue({
      title: '',
      fileUrl: '',
      category: 1
    });
    this.fileAdd = '../../../assets/images/add_file.png';
    this.selectedFile = null;
    this.isSubmited = false;
  }
}
