import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Subscription } from 'rxjs';
import { Employee } from '../exmployee.model';
import { EmployeeService } from '../exmployee.service';

@Component({
  selector: 'app-change-manager',
  templateUrl: './change-manager.component.html',
  styleUrls: ['./change-manager.component.scss'],
})
export class ChangeManagerComponent implements OnInit {
  @Input() data!: Employee;
  employee_data: Employee[] = this.eService.getEmployees();
  pushed: boolean = false;
  emails: string[] = [];
  @Output() show = new EventEmitter<boolean>();
  emailSelected: string = '';
  dataSubscription!: Subscription;
  ngOnInit(): void {
    console.log(this.data);
    this.employee_data.map((emp) => {
      emp.id !== this.data.id ? this.emails.push(emp.email) : this.emails;
    });
    console.log(this.emails);
  }

  onEmit() {
    this.show.emit();
  }

  onSave() {
    if (this.emailSelected) {
      this.employee_data.map((emp) => {
        if (emp.email === this.emailSelected) {
          const rootEmp = this.employee_data.indexOf(this.data);
          const selectedEmp = this.employee_data.indexOf(emp);

          this.employee_data[rootEmp] = emp;
          this.employee_data[selectedEmp] = this.data;

          // Swapping managerIDs
          const temp = emp.managerId;
          emp.managerId = this.data.managerId;
          this.data.managerId = temp;

          // Swapping ids
          const ids = this.data.id;
          this.data.id = emp.id;
          emp.id = ids;

          // Swapping subordinates

          const sub = this.data.subordinates;
          this.data.subordinates = emp.subordinates;
          emp.subordinates = sub;
          this.eService.dataChanged.next(true);
        }
      });

      this.show.emit(false);
    }
    console.log(this.employee_data);
  }

  constructor(private eService: EmployeeService) {}
}
