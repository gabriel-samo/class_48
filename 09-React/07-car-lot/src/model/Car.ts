export class Car{
    public mispar_rechev:number;
    public tozeret_nm:string;
    public kinuy_mishari:string;
    public sug_delek_nm:string;
    public tzeva_rechev:string;
    public shnat_yitzur:number;
    public km?:number;
    public hand?:number;
    public desc?:string;
    public img1?:string;
    public img2?:string;
    public img3?:string;
    
    constructor(
        mispar_rechev:number, 
        tozeret_nm:string,
        kinuy_mishari:string,
        sug_delek_nm:string,
        tzeva_rechev:string,
        shnat_yitzur:number,
        km?:number,
        hand?:number,
        desc?:string,
        img1?:string,
        img2?:string,
        img3?:string
        ){
            this.mispar_rechev = mispar_rechev;
            this.tozeret_nm = tozeret_nm;
            this.kinuy_mishari = kinuy_mishari;
            this.sug_delek_nm = sug_delek_nm;
            this.tzeva_rechev = tzeva_rechev;
            this.shnat_yitzur = shnat_yitzur;
            this.km = km;
            this.hand = hand;
            this.desc = desc;
            this.img1 = img1;
            this.img2 = img2;
            this.img3 = img3;
        }
}

