import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild
} from '@angular/core';
import {CategoryModel} from '../../../../models/category.model';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {guid} from '@datorama/akita';

@Component({
  selector: 'app-category-form',
  templateUrl: './category-form.component.html',
  styleUrls: ['./category-form.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CategoryFormComponent implements OnInit {

  @Input()
  category: CategoryModel;

  @Input()
  createMode = false;

  @Input()
  buttonText = 'Save';

  @Output()
  formSubmit: EventEmitter<CategoryModel> = new EventEmitter<CategoryModel>();

  @ViewChild('colorBlock', {static: false})
  colorBlock: ElementRef<any>;

  categoryForm: FormGroup;

  constructor(private fb: FormBuilder) {
  }

  ngOnInit(): void {
    this.createCategoryForm();
  }

  createCategoryForm() {
    if (this.category) {
      this.categoryForm = this.fb.group({
        id: this.category.id,
        name: this.category.name,
        color: this.category.color
      });
    } else if (this.createMode) {
      this.categoryForm = this.fb.group({
        id: guid(),
        user_id: localStorage.getItem('userId'),
        name: null,
        color: [null, Validators.pattern(/^#([0-9a-f]{3}|[0-9a-f]{6})$/i)]
      });
    }
  }

  saveCategory() {
    this.formSubmit.emit(this.categoryForm.value);
  }
}
