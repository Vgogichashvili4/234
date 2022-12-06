import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import * as _ from 'lodash';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, Validators } from '@angular/forms';
import { HttpService } from 'src/app/services/http.service';

import { CategoryPopupComponent } from '../category-popup/category-popup.component';
import { categoryModel } from 'src/app/models/category.model';

@Component({
  selector: 'app-category-pg',
  templateUrl: './category-pg.component.html',
  styleUrls: ['./category-pg.component.css']
})
export class CategoryPgComponent implements OnInit {

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) matSort!:MatSort
  categoryData!: categoryModel[];
  finaldata:any;
  students:any[] = []
  tech:any[] = []
  httpResponse:any

  
  
  constructor(private dialog: MatDialog, private http: HttpService,private router:Router,private toastr: ToastrService,private builder: FormBuilder,) { }

  displayedColums?: string[] = ["id", "categoryName", "action"]
  dataSource!:MatTableDataSource<any>;

  studentform = this.builder.group({
    id: this.builder.control({ value: '', disabled: true }),
    categoryName: this.builder.control('', Validators.required),
   
  });

  Savestudent() {
    if (this.studentform.valid) {
      const Editid = this.studentform.getRawValue().id;
      if (Editid != '' && Editid != null) {
        this.http.UpdateCategory(Editid, this.studentform.getRawValue()).subscribe(response => {
          this.router.navigate(['/'])
          this.toastr.success('Uploaded successfully');
          this.router.navigate([''])
        });
      } else {
        this.http.CreateCategory(this.studentform.value).subscribe(response => {
         
          this.toastr.success('Saved successfully');
          this.router.navigate(['category'])
        });
      }
    }
  }


  ngOnInit(): void {
    this.Loadstudent();
  }


  Openpopup(id: any) {
    const _popup = this.dialog.open(CategoryPopupComponent, {
      width: '500px',
      exitAnimationDuration: '1000ms',
      enterAnimationDuration: '1000ms',
      data: {
        id: id
      }
    })
    _popup.afterClosed().subscribe(r => {
      this.Loadstudent();
    });
  }

  filterData($event : any){
    this.dataSource.filter = $event.target.value;
}

  Loadstudent() {
    this.http.Getallcategory().subscribe(response => {
      this.students = response;
    
      this.dataSource = new MatTableDataSource(this.students); 
      this.dataSource.paginator = this.paginator; 
      this.dataSource.sort = this.matSort; 

    });
  }

  Editstudent(id: any) {
    this.Openpopup(id);
  }
  Removestudent(id: any) {
    this.http.RemoveCategorybycode(id).subscribe(r => {
      this.toastr.success('Deleted successfully');
        this.Loadstudent();
      });
  }


  onChange($event:any){
    let filterData = _.filter(this.httpResponse,(item)=>{
      console.log(item.isactive)
      return item.isactive.toLowerCase() == $event.value.toLowerCase()
    })
    this.finaldata = new MatTableDataSource(filterData);
  }

  onFullInfoBtnClick(){
    this.router.navigate(['students'])
  }
}
