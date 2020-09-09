import { Component, OnInit, OnDestroy } from '@angular/core';

import { Subscription } from 'rxjs';

import { IContentListItem } from '@interfaces/content-list-item.interface';

import { CoctailRestService } from '@services/coctail-rest/coctail-rest.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {

  lists: IContentListItem[] = [];

  streams = new Subscription();

  constructor(private coctailService: CoctailRestService) { }

  ngOnInit(): void {
    const getCategories = this.coctailService.selectedCategories
      .subscribe(list => {
        this.lists = [];
        list.forEach(item => this.getItemsByCategoryName(item.category));
      });

    this.streams.add(getCategories);
  }

  ngOnDestroy(): void {
    this.streams.unsubscribe();
  }

  private getItemsByCategoryName(category: string) {
    const getItemsByCategory = this.coctailService.getItemsByCategory(category)
      .subscribe(data => this.lists.push({category: category, items: data}));

    this.streams.add(getItemsByCategory);
  }

}
