export class CoctailCategoryItem {
  strCategory: string;

  constructor(data) {
    if(data) {
      this.strCategory = data.strCategory;
    }
  }
}
