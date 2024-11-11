import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
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
  ngOnInit(): void {
    console.log(this.data);
    this.employee_data.filter((emp) => {
      emp.id < this.data.id ? this.emails.push(emp.email) : this.emails;
    });
    console.log(this.emails);
    this.eService.dataChanged.next(true);
  }
  onSelect() {
    console.log(this.emailSelected);
  }

  onEmit() {
    this.show.emit(false);
  }
  constructor(private eService: EmployeeService) {}
}
