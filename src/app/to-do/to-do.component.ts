import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ITask } from '../model/task';

@Component({
  selector: 'app-to-do',
  templateUrl: './to-do.component.html',
  styleUrls: ['./to-do.component.css']
})
export class ToDoComponent implements OnInit {
  toDoForm!: FormGroup;
  tasks: ITask [] = [];
  inProgress: ITask [] = [];
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
