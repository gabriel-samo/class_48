export default class CarData {
  public manufacturer: string;
  public testData: Date;
  public color: string;
  public engineType: string;
  public model: string;
  public price: number;
  public yad: number;
  public km: number;
  public year: number;
  public sold: boolean = false;

  constructor(
    manufacturer: string,
    testData: string,
    color: string,
    engineType: string,
    model: string,
    price: number,
    yad: number,
    km: number,
    year: number
  ) {
    this.manufacturer = manufacturer;
    //testdata
    this.testData = new Date(testData);
    this.color = color;
    this.engineType = engineType;
    this.model = model;
    this.price = price;
    this.yad = yad;
    this.km = km;
    this.year = year;
  }
}
