import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { HttpService } from 'src/app/services/http.service';


@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit {

  categories:any[] = []
  id:string ="";
  formDefaultData!:any

  constructor(private builder: FormBuilder, private dialog: MatDialog, private http: HttpService,private activatedRoute:ActivatedRoute,
    private router:Router,private toastr: ToastrService) { }

  ngOnInit(): void {
    this.getCategories();
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
          this.router.navigate(['/'])
          this.toastr.success('Updated successfully');
        
        });
      } else {
        this.http.Createstudent(this.studentform.value).subscribe(response => {
          this.toastr.success('Saved successfully');
          this.router.navigate(['students'])
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
  
  onCancelBtnClick(){
    this.router.navigate(["students"])
  }

}
