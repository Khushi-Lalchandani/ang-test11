import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Subscription } from 'rxjs';
import { Employee } from './exmployee.model';
import { EmployeeService } from './exmployee.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  employee_data!: Employee[];
  rootEmployee!: Employee;
  subordinates: any;
  dataSubcription!: Subscription;
  managerChanged!: boolean;
  updatedEmp!: Employee;
  showAddOverlay!: boolean;
  updatedSub!: Employee;
  ngOnInit() {
    this.dataSubcription = this.eService.dataChanged.subscribe(
      (dataChanged) => {
        if (dataChanged) {
          this.loadData();
        }
      }
    );
    this.loadData();
  }

  loadData() {
    this.employee_data = this.eService.getEmployees();
    this.employee_data.forEach((emp) => {
      if (!emp.subordinates) {
        emp.isManager = false;
      } else {
        emp.isManager = true;
      }
    });

    this.employee_data.filter((emp) => {
      if (emp.managerId === null) {
        this.rootEmployee = emp;
      }
    });
    this.rootEmployee.managerId === null
      ? (this.rootEmployee.isManager = true)
      : (this.rootEmployee.isManager = false);
    this.rootEmployee.isExpanded = true;
    if (this.rootEmployee.subordinates) {
      this.subordinates = this.eService.getEmployeesByIds(
        this.rootEmployee.subordinates
      );
    }
  }
  changeManager(employee: Employee) {
    this.managerChanged = true;
    this.updatedEmp = employee;
  }
  addSub(sub: Employee) {
    this.showAddOverlay = true;
    this.updatedSub = sub;
  }
  constructor(private eService: EmployeeService) {}
}
