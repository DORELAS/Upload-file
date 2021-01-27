import { Component, OnInit } from '@angular/core';
import { UploadsService } from 'src/app/services/uploads.service';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-uploads-list',
  templateUrl: './uploads-list.component.html',
  styleUrls: ['./uploads-list.component.scss']
})
export class UploadsListComponent implements OnInit {
  filesList: any[];
  rowIndexArray: any[];
  displayedColumns: string[] = ['title', 'category', 'url'];
  dataSource: MatTableDataSource<any>;

  constructor(
    private fileService: UploadsService,
    public dialog: MatDialog,
    public dialogRef: MatDialogRef<UploadsListComponent>
  ) {
    this.fileService.fileDetailList.snapshotChanges().subscribe((list) => {
      if (list) {
        this.filesList = list.map(item => {
          // ARRAY OF OBJECTS
          return item.payload.val();
        });
        const ELEMENT_DATA = this.filesList;
        this.dataSource = new MatTableDataSource(this.filesList);
      }
    });
  }

  ngOnInit(): void {
  }

  close() {
    this.dialogRef.close();
  }


}
