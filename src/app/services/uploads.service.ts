import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';

@Injectable({
  providedIn: 'root'
})
export class UploadsService {

  fileDetailList: AngularFireList<any>;
  constructor(
    private firebase: AngularFireDatabase
  ) { }

  getFileDetailsList(): void {
    this.fileDetailList = this.firebase.list('fileDetails');
  }

  insertFileDetails(fileDetails): void {
    this.fileDetailList.push(fileDetails);
  }
}
