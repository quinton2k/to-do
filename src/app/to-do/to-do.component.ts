import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ITask } from '../model/task';
import {
  faTrash,
  faPen,
  faCircleCheck,
  faGrinTongueSquint,
} from '@fortawesome/free-solid-svg-icons';
@Component({
  selector: 'app-to-do',
  templateUrl: './to-do.component.html',
  styleUrls: ['./to-do.component.css'],
})
export class ToDoComponent implements OnInit {
  faTrash = faTrash;
  faPen = faPen;
  faCircleCheck = faCircleCheck;
  toDoForm!: FormGroup;
  tasks: ITask[] = [];
  inProgress: ITask[] = [
    { description: 'Trying to do better', done: false },
    { description: 'Learning English', done: false },
  ];
  done: ITask[] = [];
  updateIndex!: any;
  isEditEnabled: boolean = false;
  constructor(private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.toDoForm = this.formBuilder.group({
      item: ['', Validators.required],
    });
  }

  addTask() {
    this.tasks.push({
      description: this.toDoForm.value.item,
      done: false,
    });
    this.toDoForm.reset();
  }

  deleteTask(i: number) {
    this.tasks.splice(i, 1);
  }

  updateTask() {
    this.tasks[this.updateIndex].description = this.toDoForm.value.item;
    this.tasks[this.updateIndex].done = false;
    this.toDoForm.reset();
    this.updateIndex = undefined;
    this.isEditEnabled = false;
  }

  deleteInProgress(i: number) {
    this.inProgress.splice(i, 1);
  }

  onEdit(item: ITask, i: number) {
    this.toDoForm.controls['item'].setValue(item.description);
    this.updateIndex = i;
    this.isEditEnabled = true;
  }

  drop(event: CdkDragDrop<ITask[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    }
  }
}
