import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Employee } from '../exmployee.model';
import { EmployeeService } from '../exmployee.service';

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

  @Input() expanded!: boolean | undefined;
  showDeleteOverlay: boolean = false;
  expandedSubordinate!: Employee[];
  ngOnInit(): void {
    // console.log(this.subordinate);
  }
  loadSubordinates(ids: number[]) {
    this.expandedSubordinate = this.eService.getEmployeesByIds(ids);
  }
  expand(sub: Employee) {
    sub.isExpanded = !sub.isExpanded;
    if (sub.isExpanded && sub.subordinates) {
      this.loadSubordinates(sub.subordinates); // Load subordinates when expanded
    } else {
      this.subordinatesUpdated.emit([]); // Emit empty array when collapsing
    }
    // console.log(this.expandedSubordinate);
  }
  deleteEmployee(sub: Employee) {
    this.showDeleteOverlay = true;
    this.updatedSub = sub;
  }
  addSub(sub: Employee) {
    this.showAddOverlay = true;
    this.updatedSub = sub;
  }

  constructor(private eService: EmployeeService) {}
}
