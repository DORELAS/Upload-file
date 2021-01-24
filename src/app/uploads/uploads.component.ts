import { Component, OnInit } from '@angular/core';
import { UploadsService } from '../services/uploads.service';

@Component({
  selector: 'app-uploads',
  templateUrl: './uploads.component.html',
  styleUrls: ['./uploads.component.scss']
})
export class UploadsComponent implements OnInit {

  constructor(
    private fileService: UploadsService
  ) { }

  ngOnInit(): void {
    this.fileService.getFileDetailsList();
  }

}
