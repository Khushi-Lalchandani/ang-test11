import { Component, Input, OnInit } from '@angular/core';
import { Employee } from '../exmployee.model';
import { EmployeeService } from '../exmployee.service';

@Component({
  selector: 'app-subordinate',
  templateUrl: './subordinate.component.html',
  styleUrls: ['./subordinate.component.scss'],
})
export class SubordinateComponent implements OnInit {
  @Input() subordinate!: Employee[];
  @Input() expanded!: boolean | undefined;
  expandedSubordinate!: Employee[];
  ngOnInit(): void {
    console.log(this.subordinate);
  }
  loadSubordinates(ids: number[]) {
    this.expandedSubordinate = this.eService.getEmployeesByIds(ids);
  }
  expand(sub: Employee) {
    sub.isExpanded = !sub.isExpanded;
    console.log(sub);
  }
  constructor(private eService: EmployeeService) {}
}
