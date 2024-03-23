class PC {
    constructor(cpuMemory, diskSize, cpuModel, price, warrantyYears) {
        this.setCpuMemory = cpuMemory;
        this.setDiskSize = diskSize;
        this.setCpuModel = cpuModel;
        this.setPrice = price;
        this.setWarrantyYears = warrantyYears;
    }

    // Setters
    set setCpuMemory(cpuMemory) {
        if (cpuMemory >= 4 && cpuMemory <= 16) {
            this.cpuMemory = cpuMemory;
        } else {
            throw new Error(`Enter a valid CPU Memory (4 - 16)`);
        }
    }

    set setDiskSize(diskSize) {
        if (diskSize >= 200 && diskSize <= 3000) {
            return this.diskSize = diskSize;
        } else {
            throw new Error(`Enter a valid Disk Size (200 - 3000)`);
        }
    }

    set setCpuModel(cpuModel) {
        this.cpuModel = cpuModel;
    }

    set setPrice(price) {
        if (price >= 800 && price <= 20000) {
            return this.price = price;
        } else {
            throw new Error(`Enter a vaild Price (800 - 20000)`);
        }
    }

    set setWarrantyYears(warrantyYears) {
        if (warrantyYears >= 0 && warrantyYears <= 5) {
            return this.warrantyYears = warrantyYears;
        } else {
            throw new Error(`Enter a valid Warranty years (0 - 5)`);
        }
    }

    // Getters
    get getCpuMemory() {
        return this.cpuMemory
    }

    get getDiskSize() {
        return this.diskSize;
    }

    get getCpuModel() {
        return this.cpuModel;
    }

    get getPrice() {
        return this.price;
    }

    get getWarrantyYears() {
        return this.warranyYears;
    }

    // Methods
    buyExtra() {
        return `Would you like to buy headphone for only 99$!`
    }

    print() {
        return `Pc specs:
        CPU Memory: ${this.cpuMemory},
        Disk Size: ${this.diskSize},
        CPU Model: ${this.cpuModel},
        Price: ${this.price},
        Warranty Years: ${this.warrantyYears}`
    }
}

class DesktopPc extends PC {
    constructor(cpuMemory, diskSize, cpuModel, price, warrantyYears, isWirelessMouse, screenSize) {
        super(cpuMemory, diskSize, cpuModel, price, warrantyYears);
        this.setIsWirelessMouse = isWirelessMouse;
        this.setScreenSize = screenSize;
    }

    // Setters
    set setIsWirelessMouse(isWirelessMouse) {
        this.isWirelessMouse = isWirelessMouse;
    }

    set setScreenSize(screenSize) {
        if (screenSize >= 11 && screenSize <= 18) {
            return this.screenSize = screenSize;
        } else {
            throw new Error(`Enter a valid screen size (11 - 18)`);
        }
    }

    // Getters
    get getIsWirelessMouse() {
        return this.isWirelessMouse;
    }

    get getScreenSize() {
        return this.screenSize;
    }

    // Methods
    buyExtra() {
        return `Would you like to buy desk for the pc for only 299$!`
    }

    print() {
        return `${super.print()},
        Mouse is wireless: ${this.isWirelessMouse ? 'Yes' : 'No'},
        Screen size: ${this.screenSize}`
    }
}

class Laptop extends PC {
    constructor(cpuMemory, diskSize, cpuModel, price, warrantyYears, chargeHours, batteryPrecent, isTouchScreen) {
        super(cpuMemory, diskSize, cpuModel, price, warrantyYears);
        this.setChargeHours = chargeHours;
        this.setBatteryPrecent = batteryPrecent;
        this.setTouchScreen = isTouchScreen;
    }

    // Setters
    set setChargeHours(chargeHours) {
        if (chargeHours >= 1 && chargeHours <= 9) {
            this.chargeHours = chargeHours;
        } else {
            throw new Error(`Enter a vaild charge hours time (1 - 9)`);
        }
    }

    set setBatteryPrecent(batteryPrecent) {
        if (batteryPrecent >= 0 && batteryPrecent <= 100) {
            this.batteryPrecent = batteryPrecent;
        } else {
            throw new Error(`Enter a vaild battery percentage (0 - 100)`);
        }
    }

    set setTouchScreen(isTouchScreen) {
        this.isTouchScreen = isTouchScreen;
    }

    // Getters
    get getChargeHours() {
        return this.chargeHours;
    }

    get getBatteryPrecent() {
        return this.batteryPrecent;
    }

    get getTouchScreen() {
        return this.isTouchScreen;
    }

    // Methods
    buyExtra() {
        return `${super.buyExtra()} and a bag for only 59$!`;
    }

    batteryFull() {
        if (this.batteryPrecent === 100) {
            return `The laptop is charged to 100%`;
        }
        return `The laptop is NOT charged yet`
    }

    print() {
        return `${super.print()},
        Charge hours: ${this.chargeHours},
        Battery Percentage: ${this.batteryPrecent},
        Touch screen: ${this.isTouchScreen ? 'Yes' : 'No'}`
    }
}

function executeActions(pcObject) {
    console.log(pcObject.print());
    console.log(pcObject.buyExtra());
    if (pcObject.batteryFull) {
        console.log(pcObject.batteryFull());
    }
    console.log('===========================================================');
}

// let pc = new PC(4, 200, 'i3', 800, 1);
// let desktopPc = new DesktopPc(4, 200, 'i3', 800, 1, false, 11);
// let laptop = new Laptop(4, 200, 'i3', 800, 1, 2, 100, false);

const pcArray = new Array(10);

for (let index = 0; index < pcArray.length; index++) {
    if (index % 2 === 0) {
        pcArray[index] = new Laptop(4, 200, 'i3', 800, 1, 2, 100, false);
        executeActions(pcArray[index]);
    } else {
        pcArray[index] = new DesktopPc(5, 300, 'i5', 900, 2, false, 12);
        executeActions(pcArray[index]);
    }
}



