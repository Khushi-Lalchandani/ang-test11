import { Component, OnInit } from '@angular/core';
import { Employee } from './exmployee.model';
import { EmployeeService } from './exmployee.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  exployee_data!: Employee[];
  rootEmployee!: Employee;
  subordinates: any;
  ngOnInit() {
    this.exployee_data = this.eService.getEmployees();
    this.exployee_data.filter((emp) => {
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
    console.log(this.rootEmployee);
  }
  constructor(private eService: EmployeeService) {}
}
