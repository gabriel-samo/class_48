export class Car {
  public carNumber: number;
  public manufacturer: string;
  public model: string;
  public fuelType: string;
  public color: string;
  public year: number;
  public km?: number;
  public hand?: number;
  public desc?: string;
  public img1?: string;
  public img2?: string;
  public img3?: string;

  constructor(
    carNumber: number,
    manufacturer: string,
    model: string,
    fuelType: string,
    color: string,
    year: number,
    km?: number,
    hand?: number,
    desc?: string,
    img1?: string,
    img2?: string,
    img3?: string
  ) {
    this.carNumber = carNumber;
    this.manufacturer = manufacturer;
    this.model = model;
    this.fuelType = fuelType;
    this.color = color;
    this.year = year;
    this.km = km;
    this.hand = hand;
    this.desc = desc;
    this.img1 = img1;
    this.img2 = img2;
    this.img3 = img3;
  }
}
