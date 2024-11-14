import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { Subscription } from 'rxjs';
import { Employee } from '../exmployee.model';
import { EmployeeService } from '../exmployee.service';

@Component({
  selector: 'app-overlay',
  templateUrl: './overlay.component.html',
  styleUrls: ['./overlay.component.scss'],
})
export class OverlayComponent implements OnInit {
  @Input() data!: Employee;

  dataSubscription!: Subscription;
  employee_data: Employee[] = this.eService.getEmployees();
  @Output() show = new EventEmitter<boolean>();
  ngOnInit(): void {
    // if (this.data) console.log(this.data);
  }
  onEmit() {
    this.show.emit(false);
  }

  onDelete() {
    this.eService.deleteEmployee(this.data.id);
    this.show.emit(false);
    this.eService.dataChanged.next(true);
  }

  constructor(private eService: EmployeeService) {}
}
