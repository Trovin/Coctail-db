import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { map } from 'rxjs/operators';
import { Observable, Subject } from 'rxjs';

import { environment } from '@environments/environment';

import { IFormItem } from '@interfaces/form-item.interface';

import { CoctailListItem } from '@models/coctail-list-item';
import { CoctailCategoryItem } from '@models/coctail-category-item';

@Injectable({
  providedIn: 'root'
})
export class CoctailRestService {

  selectedCategories = new Subject<IFormItem[]>();

  constructor(private http: HttpClient) { }

  getCategories(): Observable<CoctailCategoryItem[]> {
    return this.http.get<any>(`${environment.apiUrl}/list.php?c=list`)
      .pipe(map(data => data?.drinks.map(item => new CoctailCategoryItem(item))));
  }

  getItemsByCategory(category: string): Observable<CoctailListItem[]> {
    return this.http.get<any>(`${environment.apiUrl}/filter.php?c=${category}`)
      .pipe(map(data => data?.drinks.map(item => new CoctailListItem(item))));
  }

}
