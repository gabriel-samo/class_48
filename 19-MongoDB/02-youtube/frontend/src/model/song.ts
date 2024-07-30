export class Song {
  public id?: string;
  public category: { _id?: string; name: string };
  public songImg: string;
  public title: string;
  public url: string;

  constructor(
    category: { name: string },
    songImg: string,
    title: string,
    url: string
  ) {
    this.category = category;
    this.songImg = songImg;
    this.title = title;
    this.url = url;
  }
}
