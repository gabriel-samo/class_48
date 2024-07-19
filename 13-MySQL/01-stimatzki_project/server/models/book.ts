export class Book {
  public authorId: number;
  public bookName: string;
  public pagesNumber: number;
  public bookPrice: number;
  public id?: number;

  constructor(
    authorId: number,
    bookName: string,
    pagesNumber: number,
    bookPrice: number,
    id?: number
  ) {
    this.authorId = authorId;
    this.bookName = bookName;
    this.pagesNumber = pagesNumber;
    this.bookPrice = bookPrice;
    this.id = id;
  }
}
