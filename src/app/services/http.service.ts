import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { studentModel } from '../models/student.model';
import { categoryModel } from '../models/category.model';


@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private http: HttpClient) { }
  apiurl = 'http://localhost:3000/student';
  apiurl2 = 'http://localhost:3000/category';
 

  Getallstudent(): Observable<studentModel[]> {
    return this.http.get<studentModel[]>(this.apiurl);
  }

  Getstudentbycode(id: any): Observable<studentModel> {
    return this.http.get<studentModel>(this.apiurl + '/' + id);
  }


  Removestudentbycode(id: any) {
    return this.http.delete(this.apiurl + '/' + id);
  }

  Createstudent(studentdata: any) {
    return this.http.post(this.apiurl, studentdata);
  }

 
  Updatestudent(id: any, studentdata: any) {
    return this.http.put(this.apiurl + '/' + id, studentdata);
  }

  Getallcategory(): Observable<categoryModel[]> {
    return this.http.get<categoryModel[]>(this.apiurl2);
  }

  GetCategorybycode(id: any): Observable<categoryModel> {
    return this.http.get<categoryModel>(this.apiurl2 + '/' + id);
  }

  CreateCategory(categoryData:any){
    return this.http.post(this.apiurl2,categoryData);
  }

  RemoveCategorybycode(id: any) {
    return this.http.delete(this.apiurl2 + '/' + id);
  }

  UpdateCategory(id: any, categoryData: any) {
    return this.http.put(this.apiurl2 + '/' + id, categoryData);
  }

}
