import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ITask } from '../model/task';
import { faTrash, faPen, faCircleCheck } from '@fortawesome/free-solid-svg-icons';
@Component({
  selector: 'app-to-do',
  templateUrl: './to-do.component.html',
  styleUrls: ['./to-do.component.css']
})
export class ToDoComponent implements OnInit {
  faTrash = faTrash;
  faPen = faPen;
  faCircleCheck = faCircleCheck
  toDoForm!: FormGroup;
  tasks: ITask [] = [];
  inProgress: ITask [] = [
    {description: "Trying to do better", done: false},
    {description: "Learning English", done: false}
  ];
  done: ITask [] = [];
  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.toDoForm = this.formBuilder.group({
      item: ['', Validators.required]
    })
  }

  addTask() {
    this.tasks.push(
      {
        description: this.toDoForm.value.item,
        done: false
      }
    )
  }
  deleteTask(i: number) {
    this.tasks.splice(i, 1);
  }
  deleteInProgress(i: number) {
    this.inProgress.splice(i, 1);
  }
  drop(event: CdkDragDrop<ITask[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
    }
  }
}
