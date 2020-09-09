import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormArray, FormBuilder } from '@angular/forms';

import { Subscription } from 'rxjs';

import { CoctailRestService } from '@services/coctail-rest/coctail-rest.service';

import { CoctailCategoryItem } from '@models/coctail-category-item';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit, OnDestroy {

  categories: CoctailCategoryItem[];
  categoriesForm: FormGroup;

  getCategories = new Subscription();

  constructor(
    private fb: FormBuilder,
    private coctailService: CoctailRestService
  ) {
    this.initForm();
  }

  get formCategories() {
    return this.categoriesForm.get('categories');
  }

  ngOnInit(): void {
    this.getCategories = this.coctailService.getCategories()
      .subscribe(categories => {
        this.categories = categories;
        this.composeForm();
        this.coctailService.selectedCategories.next(this.categoriesForm.value.categories);
      });
  }

  ngOnDestroy(): void {
    this.getCategories.unsubscribe();
  }

  onSubmit() {
    const list = this.categoriesForm.value.categories.filter(item => item.value);
    this.coctailService.selectedCategories.next(list);
  }

  private initForm() {
    this.categoriesForm = this.fb.group({
      categories: this.fb.array([])
    })
  }

  private composeForm() {
    let control = <FormArray>this.categoriesForm.controls.categories;
    this.categories.forEach(category => {
      control.push(this.fb.group({
          value: [true],
          category: category.strCategory,
        }))
    });
  }

}
