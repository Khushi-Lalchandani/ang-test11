import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Employee } from '../exmployee.model';
import { EmployeeService } from '../exmployee.service';

@Component({
  selector: 'app-overlay',
  templateUrl: './overlay.component.html',
  styleUrls: ['./overlay.component.scss'],
})
export class OverlayComponent implements OnInit {
  @Input() data!: Employee;
  employee_data: Employee[] = this.eService.getEmployees();
  @Output() show = new EventEmitter<boolean>();
  ngOnInit(): void {
    if (this.data) console.log(this.data);
  }
  onEmit() {
    this.show.emit(false);
  }

  onDelete() {
    const index = this.employee_data.findIndex(
      (emp) => emp.id === this.data.id
    );
    if (index !== -1) {
      this.employee_data.splice(index, 1);
    }

    this.employee_data.forEach((emp) => {
      if (emp.subordinates !== null) {
        const subordinateIndex = emp.subordinates.indexOf(this.data.id);
        if (subordinateIndex !== -1) {
          emp.subordinates.splice(subordinateIndex, 1);
        }
      }
    });
    this.eService.dataChanged.next(true);
    this.show.emit(false);
    console.log(this.employee_data);
  }
  constructor(private eService: EmployeeService) {}
}
