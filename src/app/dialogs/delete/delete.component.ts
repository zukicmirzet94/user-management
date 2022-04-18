import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-delete',
  templateUrl: './delete.component.html',
  styleUrls: ['./delete.component.scss']
})
export class DeleteComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<DeleteComponent>) { }

  ngOnInit(): void {
  }

  closeDialog(isDeleted: boolean) {
    this.dialogRef.close(isDeleted);
  }

}
