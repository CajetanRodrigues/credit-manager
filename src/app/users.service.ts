import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
const httpOptionsText = {
  headers: new HttpHeaders({ 'Content-Type': 'text' })
};
@Injectable({
  providedIn: 'root'
})
export class UsersService {
  
  constructor(private http: HttpClient) { }
  getUsers (): Observable<any> {
    return this.http.get<any>("http://localhost:8080/rest/get-all-users")
  }
  getUser(id : number) : Observable<any> {
    console.log("requested " +"http://localhost:8080/rest/get-one-user/"+id );
    console.log(this.http.get<any>("http://localhost:8080/rest/get-one-user/"+id).subscribe(id => console.log(id)))
    return this.http.get<any>("http://localhost:8080/rest/get-one-user/"+id);
  }
  deleteUser (id : number): Observable<any> {
    return this.http.delete<any>('user/'+ `${id}`, httpOptions);
  }

  transferAmount(idFrom : number,idTo : number,amount: number): Observable<any> {
    return this.http.get('http://localhost:8080/rest/transfer-credit/'+ 
    idFrom + "/"+  idTo + "/" + amount,
    {responseType: 'text'});
  }
}
