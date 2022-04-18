import { Injectable } from '@angular/core';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  public selectedUser: User = {};
  constructor() { }
}
