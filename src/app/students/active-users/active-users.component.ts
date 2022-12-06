import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { PopupComponent } from '../../popup/popup.component';

import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import * as _ from 'lodash';
import {Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { studentModel } from 'src/app/models/student.model';
import { HttpService } from 'src/app/services/http.service';

@Component({
  selector: 'app-active-users',
  templateUrl: './active-users.component.html',
  styleUrls: ['./active-users.component.css']
})
export class ActiveUsersComponent implements OnInit {
  
  constructor(private dialog: MatDialog, private http: HttpService,private router:Router,private toastr: ToastrService,) { }
  
  @ViewChild('paginator') paginator!:MatPaginator;
  @ViewChild(MatSort) matSort!:MatSort
  studentdata!: studentModel[];
  finaldata:any;
  prgorammers:any[] = []
  tech:any[] = []
  httpResponse:any


  ngOnInit(): void {
    this.Loadstudent();
  }

  displayedColums: string[] = ["id", "user", "isactive", "action"]
  dataSource!:MatTableDataSource<any>;
  Openpopup(id: any) {
    const _popup = this.dialog.open(PopupComponent, {
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
    this.finaldata.filter = $event.target.value;
}

  Loadstudent() {
    this.http.Getallstudent().subscribe(response => {
      this.prgorammers = response;
      console.log(this.prgorammers)
      this.studentdata = this.tech;
      this.dataSource = new MatTableDataSource(this.prgorammers); 
      this.dataSource.paginator = this.paginator; 
      this.dataSource.sort = this.matSort; 

    });
  }

  Editstudent(id: any) {
    this.Openpopup(id);
  }
  Removestudent(id: any) {
    this.http.Removestudentbycode(id).subscribe(r => {
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

}