import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Permission } from '../models/permission';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-permissions',
  templateUrl: './permissions.component.html',
  styleUrls: ['./permissions.component.scss']
})
export class PermissionsComponent implements OnInit {

  public assignedPermissions: Permission[] = [];
  public unassignedPermissions: Permission[] = [];
  public userId = '';
  constructor(private apiService: ApiService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit(): void {
    const snapshotUserId = this.route.snapshot.paramMap.get('user') ? this.route.snapshot.paramMap.get('user') : '';
    if (snapshotUserId) {
      this.userId = snapshotUserId;
      this.refreshPermissions();
    }
  }

  refreshPermissions() {
    this.getAssignedPermissions(this.userId);
  }

  getAssignedPermissions(id: string) {
    this.apiService.getAssignedPermissions(id).subscribe(assignedPermissions => {
      this.assignedPermissions = assignedPermissions;
      this.getAllPermissions();
    })
  }

  getAllPermissions() {
    this.apiService.getAllPermissions().subscribe(permissions => {
      const assignedPermissionsCode = this.assignedPermissions.map(assignedPermission => assignedPermission.code);
      this.unassignedPermissions = permissions.filter(permission => !assignedPermissionsCode.includes(permission.code));
    })
  }
  
  assignePermission(permission: Permission) {
    permission.id = this.userId;
    this.apiService.assignePermission(permission).subscribe(isAssigned => {
      if (isAssigned) {
        this.refreshPermissions();
      }
    })
  }

  unassignePermission(permission: Permission) {
    permission.id = this.userId;
    this.apiService.unassignePermission(permission).subscribe(isUnassigned => {
      if (isUnassigned) {
        this.refreshPermissions();
      }
    })
  }

  backToList() {
    this.router.navigateByUrl('/list');
  }

}
