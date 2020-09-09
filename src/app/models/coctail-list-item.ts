export class CoctailListItem {
  idDrink: string;
  strDrink: string;
  strDrinkThumb: string;

  constructor(data) {
    if(data) {
      this.idDrink = data.idDrink;
      this.strDrink = data.strDrink;
      this.strDrinkThumb = data.strDrinkThumb;
    }
  }
}
