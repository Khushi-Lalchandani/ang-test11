import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Employee } from '../exmployee.model';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { EmployeeService } from '../exmployee.service';

@Component({
  selector: 'app-add-overlay',
  templateUrl: './add-overlay.component.html',
  styleUrls: ['./add-overlay.component.scss'],
})
export class AddOverlayComponent implements OnInit {
  @Input() data!: Employee;
  employee_data = this.eService.getEmployees();
  @Output() show = new EventEmitter<boolean>();
  form!: FormGroup;
  ngOnInit(): void {
    // console.log(this.data);
    this.form = new FormGroup({
      name: new FormControl(null, Validators.required),
      email: new FormControl(null, [Validators.required, Validators.email]),
      designation: new FormControl(null, Validators.required),
      imageUrl: new FormControl('https://via.placeholder.com/150'),
      id: new FormControl(this.employee_data.length + 1),
    });
  }
  onSubmit() {
    this.employee_data.push(this.form.value);

    this.employee_data.filter((emp) => {
      emp.id === this.data.id
        ? this.data.subordinates?.push(this.form.value.id)
        : this.data.subordinates;
    });
    this.eService.dataChanged.next(true);
    this.show.emit(false);

    // console.log(this.employee_data);
  }
  onEmit() {
    this.show.emit(false);
  }
  constructor(private eService: EmployeeService) {}
}
