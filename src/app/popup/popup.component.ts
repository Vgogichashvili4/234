import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { HttpService } from '../services/http.service';
import { ToastrService } from 'ngx-toastr';



@Component({
  selector: 'app-popup',
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.css']
})
export class PopupComponent implements OnInit {

  editdata: any;
  categories:any[] = []

  constructor(private builder: FormBuilder, private dialog: MatDialog, private http: HttpService,
    @Inject(MAT_DIALOG_DATA) public data: any,private toastr: ToastrService) { }

  ngOnInit(): void {
    if (this.data.id != '' && this.data.id != null) {
      this.http.Getstudentbycode(this.data.id).subscribe(response => {
        this.editdata = response;
        this.studentform.setValue({
          id: this.editdata.id, gmail: this.editdata.gmail, personalNumber: this.editdata.personalNumber,name: this.editdata.name,
          lastName: this.editdata.lastName,dateOfBirth: this.editdata.dateOfBirth,
          category: this.editdata.category, isactive: this.editdata.isactive
        });
      });
    }
    this.getCategories()
  }

  studentform = this.builder.group({
    id: this.builder.control({ value: '', disabled: true }),
    gmail: this.builder.control('', Validators.required),
    personalNumber: this.builder.control('', Validators.required),
    name: this.builder.control('', Validators.required),
    lastName: this.builder.control('', Validators.required),
    dateOfBirth: this.builder.control('', Validators.required),
    category: this.builder.control('', Validators.required),
    isactive: this.builder.control(true),
  });

  Savestudent() {
    if (this.studentform.valid) {
      const Editid = this.studentform.getRawValue().id;
      if (Editid != '' && Editid != null) {
        this.http.Updatestudent(Editid, this.studentform.getRawValue()).subscribe(response => {
          this.closepopup();
          this.toastr.success('Updated successfully');
        });
      } else {
        this.http.Createstudent(this.studentform.value).subscribe(response => {
          this.closepopup();
          this.toastr.success('Saved successfully');
         
        });
      }
    }
  }

  getCategories(){
    this.http.Getallcategory().subscribe((res:any)=>{
      this.categories = res;     
    })
    
  }

  closepopup() {
    this.dialog.closeAll();
  }
}
