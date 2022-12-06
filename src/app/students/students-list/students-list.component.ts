import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import * as _ from 'lodash'
import { studentModel } from 'src/app/models/student.model';
import { HttpService } from 'src/app/services/http.service';

@Component({
  selector: 'app-students-list',
  templateUrl: './students-list.component.html',
  styleUrls: ['./students-list.component.css']
})
export class StudentsListComponent implements OnInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) matSort!:MatSort
  studentdata!: studentModel[];
  finaldata:any;
  prgorammers:any[] = []
  tech:any[] = []
  categories:any[] = []

  constructor(private http: HttpService,private toastr: ToastrService,private router:Router) { }


  ngOnInit(): void {
    this.Loadstudent();
    this.getCategories();
  }

  displayedColumns?: string[] = ["id", "gmail", "personalNumber", "name", "lastName", 'dateOfBirth', 'category', "isactive", "action"]
  dataSource!:MatTableDataSource<any>;


  filterData($event : any){
    this.dataSource.filter = $event.target.value;
}

  Loadstudent() {      
    this.http.Getallstudent().subscribe(response => {
      this.prgorammers = response;
      this.studentdata = this.tech;
      this.dataSource = new MatTableDataSource(this.prgorammers); 
      this.dataSource.paginator = this.paginator; 
      this.dataSource.sort = this.matSort; 
    }); 
  }     
  
  getCategories(){
    this.http.Getallcategory().subscribe((res:any)=>{ 
      this.categories = res  
    })
    
  }


  Removestudent(id: any) {
    this.http.Removestudentbycode(id).subscribe(r => {
      this.toastr.success('Deleted successfully');
        this.Loadstudent();
      });
  }

    createBtnClick(){
      this.router.navigate(['add-user'])
    }

    onChange($event:any){
      let filteredData = _.filter(this.prgorammers,(item)=>{
        return item.category.toLowerCase() == $event.value.toLowerCase()
      })
      this.dataSource = new MatTableDataSource(filteredData)
    }

    clearValue(){
      this.dataSource = new MatTableDataSource(this.prgorammers)
    }
}
