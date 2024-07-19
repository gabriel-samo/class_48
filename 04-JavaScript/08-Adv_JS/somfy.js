let config = {
    name: "floor 1",
    ip: "192.168.1.206",
    port: 1001,
    ch1: true,
    ch2: true,
    ch3: false,
    ch4: false,
    ch5: false,
    ch6: false,
    ch7: false,
    ch8: false,
    ch9: false,
    ch10: true,
    ch11: false,
    ch12: false,
    ch13: false,
    ch14: false,
    ch15: false,
    ch16: false,
    reverse: false,
}

const myCurtains = [];

for(let index=1; index<=16; index++){
    if(config[`ch${index}`]){
        const curtain = new Object;
        curtain.name = `curtain${index}`;
        curtain.ip = "192.168.1.206";
        curtain.port = 1001;
        curtain.ch = index;
        curtain.reverse = false;

        myCurtains.push(curtain);
    }
}