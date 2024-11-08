import { Component, OnInit } from '@angular/core';
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

  ngOnInit() {
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
    console.log(this.employee_data);
  }

  constructor(private eService: EmployeeService) {}
}
