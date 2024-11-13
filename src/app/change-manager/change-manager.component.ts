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
  emails: string[] = [];
  @Output() show = new EventEmitter<boolean>();
  emailSelected: string = '';
  dataSubscription!: Subscription;
  ngOnInit(): void {
    console.log(this.data);
    this.employee_data.filter((emp) => {
      emp.id < this.data.id ? this.emails.push(emp.email) : this.emails;
    });
    console.log(this.emails);
    this.eService.dataChanged.next(true);
  }

  onEmit() {
    this.show.emit(false);
  }
  //   (employeeDeleted)="changeManager.onEmployeeDeleted()"

  onSave() {
    if (this.emailSelected) {
      this.show.emit(false);

      console.log(this.emailSelected, this.data);
      this.employee_data.forEach((emp) => {
        if (emp.subordinates && emp.subordinates.includes(this.data.id)) {
          const index = emp.subordinates.indexOf(this.data.id);
          if (index !== -1) {
            emp.subordinates.splice(index, 1);
          }
        }
      });
      this.employee_data.forEach((emp) => {
        emp.email === this.emailSelected
          ? emp.subordinates?.push(this.data.id)
          : emp.subordinates;
      });
      this.eService.dataChanged.next(true);
    }
  }
  constructor(private eService: EmployeeService) {}
}
