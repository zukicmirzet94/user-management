import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '../models/user';
import { ApiService } from '../services/api.service';
import { SharedService } from '../services/shared.service';

@Component({
  selector: 'app-action-user',
  templateUrl: './action-user.component.html',
  styleUrls: ['./action-user.component.scss']
})
export class ActionUserComponent implements OnInit {

  public userForm = new FormGroup({
    firstName: new FormControl('', [Validators.required]),
    lastName: new FormControl('', [Validators.required]),
    username: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    status: new FormControl('', [Validators.required])
  });
  public user: User = {};
  public userAction = '';
  constructor(private route: ActivatedRoute,
    private sharedService: SharedService,
    private apiService: ApiService,
    private router: Router) { }

  ngOnInit(): void {
    this.route.data.subscribe(routeData => {
      this.userAction = routeData['action'];
      if (this.userAction && this.userAction === 'edit') {
        this.userForm.get('username')?.disable();
        this.userForm.get('password')?.disable();
        if (this.sharedService.selectedUser && Object.keys(this.sharedService.selectedUser).length > 0) {
          // Get selected user if user exists in shared service (way for to avoid API call)
          this.user = this.sharedService.selectedUser;
          this.fillUserForm();
        } else {
          // Get selected user if page is refreshed
          const snapshotUser = this.route.snapshot.paramMap.get('user') ? this.route.snapshot.paramMap.get('user') : '';
          if (snapshotUser) {
            this.user.id = snapshotUser;
            this.getUser(this.user.id ? this.user.id : null)
          } else {
            this.router.navigateByUrl('/list');
          }
        }
      }
    })
  }

  getErrorMessage(controlField: AbstractControl | null) {
    if (controlField?.hasError('required')) {
      return 'You must enter a value';
    }

    return controlField?.hasError('email') ? 'Not a valid email' : '';
  }

  fillUserForm() {
    this.userForm.controls['firstName'].setValue(this.user.firstName);
    this.userForm.controls['lastName'].setValue(this.user.lastName);
    this.userForm.controls['username'].setValue(this.user.username);
    this.userForm.controls['email'].setValue(this.user.email);
    this.userForm.controls['status'].setValue(this.user.status);
  }

  getValuesFromForm() {
    this.user.firstName = this.userForm.get('firstName')?.value;
    this.user.lastName = this.userForm.get('lastName')?.value;
    this.user.username = this.userForm.get('username')?.value;
    this.user.password = this.userForm.get('password')?.value;
    this.user.email = this.userForm.get('email')?.value;
    this.user.status = this.userForm.get('status')?.value;
  }

  save() {
    this.getValuesFromForm();
    if (this.userAction && this.userAction === 'edit' && this.user.id) {
      this.editUser();
    } else {
      this.createUser();
    }
  }

  editUser() {
    this.apiService.editUser(this.user).subscribe(isUpdated => {
      if (isUpdated) {
        this.router.navigateByUrl('/list');
      }
    })
  }

  createUser() {
    this.apiService.createUser(this.user).subscribe(isCreated => {
      if (isCreated) {
        this.router.navigateByUrl('/list');
      }
    })
  }

  getUser(id: string | null) {
    if (id) {
      this.apiService.getUser(id).subscribe(user => {
        this.user = user;
        this.fillUserForm();
      })
    }
  }

}
