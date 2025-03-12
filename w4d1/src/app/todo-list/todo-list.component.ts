import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { Task } from '../state/list.reducer';
import {
  selectAllTodos,
  selectCompletedTodos,
  selectIncompleteTodos,
} from '../state/list.selector';
import {
  addTask,
  completeTask,
  removeTask,
  resetTasks,
} from '../state/list.actions';
import { UserService, User } from '../service/user-service.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-todo-list',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss'],
  providers: [UserService],
})
export class TodoListComponent implements OnInit {
  todoForm?: FormGroup;
  todos$?: Observable<Task[]>;
  completedTodos$?: Observable<Task[]>;
  incompleteTodos$?: Observable<Task[]>;
  users: User[] = [];

  constructor(
    private fb: FormBuilder,
    private store: Store,
    private userService: UserService
  ) {
    this.todos$ = this.store.select(selectAllTodos);
    this.completedTodos$ = this.store.select(selectCompletedTodos);
    this.incompleteTodos$ = this.store.select(selectIncompleteTodos);
  }

  ngOnInit(): void {
    this.todoForm = this.fb.group({
      name: new FormControl('', [Validators.min(2), Validators.required]),
    });

    // Fetch users from the API
    this.userService.getUsers().subscribe((data) => {
      this.users = data;
    });
  }

  onSubmit() {
    this.todoForm?.reset();
  }

  addTodo(): void {
    if (this.todoForm?.valid) {
      this.store.dispatch(
        addTask({
          task: {
            name: this.todoForm.value.name,
            complete: false,
          },
        })
      );
      this.todoForm.reset();
    }
  }

  completeTodo(id: string): void {
    this.store.dispatch(completeTask({ id }));
  }

  removeTodo(id: string): void {
    this.store.dispatch(removeTask({ id }));
  }

  resetAllTodos(): void {
    this.store.dispatch(resetTasks());
  }
}