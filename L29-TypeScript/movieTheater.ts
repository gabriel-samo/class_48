class MovieTheater {
    //fileds
    private name:String='';
    private openTime:number=0;
    private closeTime:number=0;
    private seats?:number;

    //constructor
    constructor(name: String, openTime: number, closeTime: number, seats?: number) {
        this.setName = name;
        this.setOpenTime = openTime;
        this.setCloseTime = closeTime;
        this.setSeats = seats ? seats : 0;
    }

    //setters
    public set setName(name: String) {
        this.name = name;
    }

    public set setOpenTime(time: number) {
        if (time >= 6 && time <= 12) {
            this.openTime = time;
        } else {
            throw new Error('Enter a number between 6 - 12');
        }
    }

    public set setCloseTime(time: number) {
        if(time >= 18 && time <= 23){
            this.closeTime = time;
        } else {
            throw new Error('Enter a number between 18 - 23');
        }
        
    }

    public set setSeats(seats: number) {
        if (seats >= 0) {
            this.seats = seats;
        } else {
            throw new Error('Enter a positive number...');
        }
    }

    //getters
    public get getName(): String {
        return this.name;
    }

    public get getOpenTime(): number {
        return this.openTime;
    }

    public get getCloseTime(): number {
        return this.closeTime;
    }

    public get getSeats(): number {
        return this.seats ? this.seats : 0;
    }

    //methods
    public print(): String {
        return `Theater Name: ${this.getName}, Open Time: ${this.getOpenTime}, Close Time: ${this.getCloseTime}, Number of seats: ${this.getSeats ? this.getSeats : 'N/A'}`;
    }

    public timeOpen(): number {
        return (this.getCloseTime - this.getOpenTime);
    }
}

let yesPlanet = new MovieTheater('Yes Planet', 6, 23);
let noPlanet = new MovieTheater('No Planet', 12, 18, 5);

console.log(yesPlanet.print());
console.log(yesPlanet.timeOpen());

console.log(noPlanet.print());
console.log(noPlanet.timeOpen());
