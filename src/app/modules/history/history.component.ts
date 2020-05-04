import {Component, OnInit} from '@angular/core';
import {TaskService} from '../../services/task.service';
import {Observable} from "rxjs/internal/Observable";
import {TaskModel} from "../../models/task.model";
import {map} from "rxjs/operators";
import {TasksService} from "../../state/tasks/tasks.service";
import {TasksQuery} from "../../state/tasks/tasks.query";
import {CategoriesService} from "../../state/categories/categories.service";

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.less']
})
export class HistoryComponent implements OnInit {

  tasks: Observable<TaskModel[]>;

  constructor(private tasksService: TasksService,
              private tasksQuery: TasksQuery,
              private categoriesService: CategoriesService) {
  }

  ngOnInit(): void {
    this.tasks = this.tasksQuery.doneTasks$;
    this.categoriesService.getUserCategories().subscribe();
    this.tasksService.getAllTasks().subscribe();
  }

}
