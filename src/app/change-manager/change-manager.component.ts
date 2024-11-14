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
      emp.id < this.data.id ? this.emails.push(emp.email) : this.emails;
    });
    console.log(this.emails);
  }

  onEmit() {
    this.show.emit()
  }

  onSave() {
    if (this.emailSelected) {
      this.show.emit(false);

      let subordinateAdded: boolean = false;

      console.log(this.emailSelected, this.data);

      this.employee_data.filter((emp) => {
        if (emp.email === this.emailSelected) {
          if (!emp.subordinates) {
            emp.subordinates = [];
          }
          if (emp.subordinates && emp.subordinates.length < 5) {
            this.eService.deleteEmployee(this.data.id);

            emp.subordinates.push(this.data.id);
            this.data.managerId = emp.id;
            subordinateAdded = true;
            this.eService.dataChanged.next(true);
            console.log(this.employee_data);
          }
        }
      });

      this.eService.dataChanged.next(true);
    }
  }

  constructor(private eService: EmployeeService) {}
}
