import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { HttpService } from 'src/app/services/http.service';


@Component({
  selector: 'app-category-popup',
  templateUrl: './category-popup.component.html',
  styleUrls: ['./category-popup.component.css']
})
export class CategoryPopupComponent implements OnInit{
  editdata: any;
  constructor(private builder: FormBuilder, private dialog: MatDialog, private http: HttpService,
    @Inject(MAT_DIALOG_DATA) public data: any,private toastr: ToastrService) { }

  ngOnInit(): void {
    if (this.data.id != '' && this.data.id != null) {
      this.http.GetCategorybycode(this.data.id).subscribe(response => {
        this.editdata = response;
        console.log(response)
        this.studentform.setValue({
          id: this.editdata.id, categoryName: this.editdata.categoryName, 
        });
      });
    }
  }

  studentform = this.builder.group({
    id: this.builder.control({ value: '', disabled: true }),
    categoryName: this.builder.control('', Validators.required),
   
  });

  Savestudent() {
    if (this.studentform.valid) {
      const Editid = this.studentform.getRawValue().id;
      if (Editid != '' && Editid != null) {
        this.http.UpdateCategory(Editid, this.studentform.getRawValue()).subscribe(response => {
          this.closepopup();
          this.toastr.success('Updated successfully');
        });
      } else {
        this.http.CreateCategory(this.studentform.value).subscribe(response => {
          this.closepopup();
          this.toastr.success('Added successfully');
        });
      }
    }
  }

  closepopup() {
    this.dialog.closeAll();
  }
}
