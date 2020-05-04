import {ChangeDetectionStrategy, Component, Input, OnChanges, OnInit} from '@angular/core';
import {TaskModel} from '../../../../models/task.model';
import {CommentModel} from '../../../../models/comment.model';
import {Observable} from 'rxjs/internal/Observable';
import {FormBuilder, FormGroup} from '@angular/forms';
import {CommentsStore} from '../../../../state/comments/comments.store';
import {CommentsQuery} from '../../../../state/comments/comments.query';
import {CommentsService} from '../../../../state/comments/comments.service';

@Component({
  selector: 'app-task-comments',
  templateUrl: './task-comments.component.html',
  styleUrls: ['./task-comments.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    CommentsStore,
    CommentsService,
    CommentsQuery
  ]
})
export class TaskCommentsComponent implements OnInit, OnChanges {

  @Input()
  task: TaskModel;

  userLogin: string;
  comments: Observable<CommentModel[]>;

  commentForm: FormGroup;

  constructor(private commentService: CommentsService,
              private fb: FormBuilder,
              private query: CommentsQuery) {
  }

  saveComment() {
    this.commentService.createComment(this.commentForm.value).subscribe();
    this.createCommentForm();
  }

  createCommentForm() {
    this.commentForm = this.fb.group({
      task_id: this.task.id,
      text: null
    });
  }

  ngOnInit(): void {
    this.comments = this.query.selectAll();
    this.userLogin = JSON.parse(localStorage.getItem('user')).login;
  }

  ngOnChanges(): void {
    if (this.task) {
      this.commentService.getTaskComments(this.task.id).subscribe();
      this.createCommentForm();
    }
  }

}
