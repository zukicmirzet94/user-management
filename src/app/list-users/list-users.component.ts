import { Component, OnInit } from '@angular/core';
import { PaginationData } from '../models/common';
import { User } from '../models/user';
import { ApiService } from '../services/api.service';
import { MatTableDataSource } from '@angular/material/table';
import { PageEvent } from '@angular/material/paginator';
import { debounceTime, Subject } from 'rxjs';
import { SharedService } from '../services/shared.service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { DeleteComponent } from '../dialogs/delete/delete.component';

@Component({
  selector: 'app-list-users',
  templateUrl: './list-users.component.html',
  styleUrls: ['./list-users.component.scss']
})
export class ListUsersComponent implements OnInit {

  public displayedColumns: string[] = ['firstName', 'lastName', 'username', 'email', 'status', 'actions'];
  public dataSource = new MatTableDataSource();
  public isLoadingData = true;
  public pageSize = 10;
  public totalUsers = 0;
  public users: User[] = [];
  public filteringUser: PaginationData = {
    limit: 10,
    offset: 0,
    like: ''
  };
  public searchValue = '';
  public searchChanged: Subject<string> = new Subject<string>();
  constructor(private apiService: ApiService,
              private sharedService: SharedService,
              private router: Router,
              private dialog: MatDialog) {
    this.searchChanged.pipe(
      debounceTime(500))
      .subscribe((model: string) => {
        this.applyFilter(model);
      });
  }

  ngOnInit(): void {
    this.isLoadingData = true;
    this.getUsers();
  }

  getUsers() {
    this.apiService.getUsers(this.filteringUser).subscribe(usersResponse => {
      this.dataSource.data = usersResponse.rows;
      this.totalUsers = usersResponse.count;
      this.isLoadingData = false;
    })
  }

  changePage(event: PageEvent) {
    this.filteringUser.limit = event.pageSize;
    this.filteringUser.offset = event.pageSize * event.pageIndex;
    this.getUsers();
  }

  applyFilter(searchValue: string) {
    this.filteringUser.like =  searchValue;
    this.getUsers();
  }

  search() {
    this.searchChanged.next(this.searchValue);
  }

  editUser(user: User) {
    this.sharedService.selectedUser = user;
    this.router.navigateByUrl('/edit/' + user.id);
  }

  createUser() {
    this.router.navigateByUrl('/create');
  }

  assignPermissions(user: User) {
    this.sharedService.selectedUser = user;
    this.router.navigateByUrl('/permissions/' + user.id);
  }

  deleteUser(user: User) {
    const deleteDialog = this.dialog.open(DeleteComponent, {
      width: '100%',
      maxWidth: '400px'
    })
    deleteDialog.beforeClosed().subscribe(isDeleted => {
      if (isDeleted) {
        if (user.id) {
          this.apiService.deleteUser(user.id).subscribe(deletedUser => {
            if (deletedUser) {
              this.getUsers();
            }
          })
        }
      }
    })
  }

}
