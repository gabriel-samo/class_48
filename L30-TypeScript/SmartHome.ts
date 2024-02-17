class SmartHome {
    //Fields
    private name!:String;
    private devices!: Device[];

    // constructor
    constructor(name:String){
        this.setName = name;
        this.devices = [];
    }

    // setters
    public set setName(name:String){
        this.name = name;
    }

    // getters
    public get getName():String{
        return this.name;
    }

    // methods
    addDevice(name:String,location:String, deviceNumber:number, totalEP:number):void{
        let newDevice = new Device(name, location, deviceNumber);
        newDevice.makeEndPoints(totalEP);
        this.devices.push(newDevice);
    }

    getDetails():void{
        console.log(`Home Name: ${this.getName}`)
        for(let index=0; index < this.devices.length; index++){
            console.log(`    Device Name: ${this.devices[index].getName},
    Device Location: ${this.devices[index].getLocation},
    Device Number: ${this.devices[index].getDeviceNumber},
    Device EndPoints: `);
        let myEP = this.devices[index].getEndPoints;
        for (let ep = 0; ep < myEP.length; ep++){
            console.log(`        EndPoint Name: ${myEP[ep].getName},
        EndPoint ID: ${myEP[ep].getEpNum}`);
        }
        }
    }
}

class Device {
    // fields
    private name!: String;
    private location!: String;
    private deviceNumber!: number;
    private endPoints!: EndPoint[];

    // constructor
    constructor(name: String, location: String, deviceNumber: number) {
        this.setName = name;
        this.setLocation = location;
        this.setDeviceNumber = deviceNumber;
        this.endPoints = [];
    }

    // setters
    public set setName(name: String) {
        this.name = name;
    }

    public set setLocation(location: String) {
        this.location = location;
    }

    public set setDeviceNumber(deviceNumber: number) {
        this.deviceNumber = deviceNumber;
    }

    // getters
    public get getName():String{
        return this.name;
    }

    public get getLocation():String{
        return this.location;
    }

    public get getDeviceNumber():number{
        return this.deviceNumber;
    }

    public get getEndPoints(): EndPoint[]{
        return this.endPoints;
    }

    // methods
    makeEndPoints(totalEP:number):void{
        for (let counter = 0; counter <= totalEP; counter++){
            let singleEp = new EndPoint(`deviceNumber-${this.deviceNumber}-epNum-${counter}`, counter);
            this.endPoints.push(singleEp);
        }
    }
}

class EndPoint {
    //fileds
    private name!:String;
    private epNum!:number;

    //constructor
    constructor(name:String, epNum:number){
        this.setName = name;
        this.setEpNum = epNum;
    }

    // setters
    public set setName(name:String){
        this.name = name;
    } 

    public set setEpNum(epNum:number){
        this.epNum = epNum;
    }

    // getters
    public get getName():String{
        return this.name;
    }

    public get getEpNum():number{
        return this.epNum;
    }

}


let myHome = new SmartHome("BigHome");
myHome.addDevice("Entrance", "Floor-a", 10, 13);
myHome.addDevice("Living Room", "Floor-a", 11, 13);
myHome.addDevice("Master Bedroom", "Floor-b", 12, 13);
myHome.addDevice("Theater", "Basement", 13, 3);
myHome.addDevice("Play Room", "Basement", 14, 3);

myHome.getDetails();