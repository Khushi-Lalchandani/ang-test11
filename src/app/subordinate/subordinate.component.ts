import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { Employee } from '../exmployee.model';
import { EmployeeService } from '../exmployee.service';
import { subscribeOn, Subscription } from 'rxjs';

@Component({
  selector: 'app-subordinate',
  templateUrl: './subordinate.component.html',
  styleUrls: ['./subordinate.component.scss'],
})
export class SubordinateComponent implements OnInit {
  @Input() subordinate!: Employee[];
  updatedSub!: Employee;
  showAddOverlay: boolean = false;
  @Output() data = new EventEmitter<Employee>();
  @Output() subordinatesUpdated = new EventEmitter<Employee[]>();
  dataChangedSubscription!: Subscription;
  @Input() expanded!: boolean | undefined;
  showDeleteOverlay: boolean = false;
  expandedSubordinate!: Employee[];
  managerChanged: boolean = false;
  ngOnInit(): void {
    // console.log(this.subordinate);
  }
  loadSubordinates(ids: number[]) {
    this.dataChangedSubscription = this.eService.dataChanged.subscribe(
      (dataChanged) => {
        if (dataChanged) {
          this.expandedSubordinate = this.eService.getEmployeesByIds(ids);
        }
      }
    );
    this.expandedSubordinate = this.eService.getEmployeesByIds(ids);
  }
  expand(sub: Employee) {
    // console.log(this.eService.employee_data);
    this.subordinate.forEach((sibling) => {
      if (sibling !== sub) {
        sibling.isExpanded = false;
      }
    });

    sub.isExpanded = !sub.isExpanded;

    this.expandedSubordinate = [];
    if (sub.isExpanded && sub.subordinates) {
      this.loadSubordinates(sub.subordinates);
    }
  }
  deleteEmployee(sub: Employee) {
    this.showDeleteOverlay = true;
    this.updatedSub = sub;
  }
  addSub(sub: Employee) {
    this.showAddOverlay = true;
    this.updatedSub = sub;
  }
  changeManager(sub: Employee) {
    this.managerChanged = true;
    this.updatedSub = sub;
  }

  constructor(private eService: EmployeeService) {}
}
