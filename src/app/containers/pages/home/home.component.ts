import { Component, OnInit, OnDestroy, ChangeDetectorRef, ViewChild, ChangeDetectionStrategy } from '@angular/core';

import { ScrollDispatcher } from '@angular/cdk/overlay';
import { CdkVirtualScrollViewport } from '@angular/cdk/scrolling';

import { CoctailRestService } from '@services/coctail-rest/coctail-rest.service';

import { Subscription } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent implements OnInit, OnDestroy {

  @ViewChild(CdkVirtualScrollViewport) virtualScroll: CdkVirtualScrollViewport;

  streams = new Subscription();

  searchPageNumber: number;
  searchResults: Array<any>;

  list = [];

  constructor(
    private coctailService: CoctailRestService,
    private scrollDispatcher: ScrollDispatcher,
    private cd: ChangeDetectorRef) {
    this.searchPageNumber = 0;
    this.searchResults = [];
  }

  ngOnInit(): void {
    const getCategories = this.coctailService.selectedCategories
      .subscribe(list => {
        this.list = list;
        this.searchResults = [];
        this.searchPageNumber = 0;

        if (this.list.length) {
          this.nextSearchPage(this.list[this.searchPageNumber]['category']);
        }
      });

    this.streams.add(getCategories);
  }

  ngOnDestroy(): void {
    this.streams.unsubscribe();
  }

  trackByFn(index,item) {
    return item;
  }

  onScroll(index) {
    if (index > this.searchResults.length / 2 && this.list.length > this.searchPageNumber) {
      this.nextSearchPage(this.list[this.searchPageNumber]['category']);
      this.searchPageNumber++;
    }
  }

  private getResults(category) {
    return this.coctailService.getItemsByCategory(category);
  }

  private nextSearchPage(category: string) {
    const result = this.getResults(category).subscribe((data) => {
      const newData = [{ headline: category }, ...data];
      this.searchResults = [...this.searchResults, ...newData ];
      this.cd.detectChanges();
    });

    this.streams.add(result);
  }

}
