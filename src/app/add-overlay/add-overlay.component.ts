import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Employee } from '../exmployee.model';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-overlay',
  templateUrl: './add-overlay.component.html',
  styleUrls: ['./add-overlay.component.scss'],
})
export class AddOverlayComponent implements OnInit {
  @Input() data!: Employee;
  @Output() show = new EventEmitter<boolean>();
  form!: FormGroup;
  ngOnInit(): void {
    console.log(this.data);
    this.form = new FormGroup({
      name: new FormControl(null, Validators.required),
      email: new FormControl(null, [Validators.required, Validators.email]),
      designation: new FormControl(null, Validators.required),
    });
  }
  onSubmit() {
    console.log(this.form);
  }
  onEmit() {
    this.show.emit(false);
  }
}
