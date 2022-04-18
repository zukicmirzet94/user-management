import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { PaginationData, PaginationResponse } from '../models/common';
import { Observable } from 'rxjs';
import { User } from '../models/user';
import { Permission } from '../models/permission';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  public BASE_URL = environment.serverUrl;
  constructor(private http: HttpClient) { }

  getUsers(filteringData: PaginationData): Observable<PaginationResponse> {
    return this.http.post<PaginationResponse>(this.BASE_URL + '/api/v1/user', filteringData);
  }

  getUser(id: string): Observable<User> {
    return this.http.get<User>(this.BASE_URL + '/api/v1/user/' + id);
  }

  editUser(user: User): Observable<boolean> {
    return this.http.put<boolean>(this.BASE_URL + '/api/v1/user/edit', user);
  }

  deleteUser(id: string): Observable<boolean> {
    return this.http.delete<boolean>(this.BASE_URL + '/api/v1/user/' + id);
  }

  createUser(user: User): Observable<boolean> {
    return this.http.post<boolean>(this.BASE_URL + '/api/v1/user/create', user);
  }

  getAssignedPermissions(id: string): Observable<Permission[]> {
    return this.http.get<Permission[]>(this.BASE_URL + '/api/v1/permission/assigned/' + id);
  }

  getAllPermissions(): Observable<Permission[]> {
    return this.http.get<Permission[]>(this.BASE_URL + '/api/v1/permission');
  }

  assignePermission(permissionData: Permission): Observable<boolean> {
    return this.http.post<boolean>(this.BASE_URL + '/api/v1/permission/assigne', permissionData);
  }

  unassignePermission(permissionData: Permission): Observable<boolean> {
    return this.http.delete<boolean>(this.BASE_URL + '/api/v1/permission/unassigne/' + permissionData.id + '/' + permissionData.code);
  }

}
