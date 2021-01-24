import { Component, OnInit } from '@angular/core';
import { UploadsService } from 'src/app/services/uploads.service';

@Component({
  selector: 'app-uploads-list',
  templateUrl: './uploads-list.component.html',
  styleUrls: ['./uploads-list.component.scss']
})
export class UploadsListComponent implements OnInit {
  filesList: any[];
  rowIndexArray: any[];

  constructor(
    private fileService: UploadsService
  ) { }

  ngOnInit(): void {
    this.fileService.fileDetailList.snapshotChanges().subscribe((list) => {
      if (list) {
        this.filesList = list.map(item => {
          // ARRAY OF OBJECTS
          return item.payload.val();
        });
        this.rowIndexArray = Array.from(Array(Math.ceil(this.filesList.length / 3)).keys());
      }
    });
  }

}
