export class Book {
  public firstName: string;
  public lastName: string;
  public bookName: string;
  public pagesNumber: number;
  public bookPrice: string | number;
  public id?: number;

  constructor(
    firstName: string,
    lastName: string,
    bookName: string,
    pagesNumber: number,
    bookPrice: number,
    id?: number
  ) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.bookName = bookName;
    this.pagesNumber = pagesNumber;
    this.bookPrice = bookPrice;
    this.id = id;
  }
}
