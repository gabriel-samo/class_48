export class ExchangeModal {
    public exchangeId: String;
    public exchangeUrl: String;
    public name: String;
    public percentTotalVolume: String;
    public rank: String;
    public socket: String;
    public tradingPairs: String;
    public updated: String;
    public volumeUsd: String;

    constructor(exchangeId: String, exchangeUrl: String, name: String, percentTotalVolume: String, rank: String,
        socket: String, tradingPairs: String, updated: String, volumeUsd: String) {
        this.exchangeId = exchangeId;
        this.exchangeUrl = exchangeUrl;
        this.name = name;
        this.percentTotalVolume = percentTotalVolume;
        this.rank = rank;
        this.socket = socket;
        this.tradingPairs = tradingPairs;
        this.updated = updated;
        this.volumeUsd = volumeUsd;
    }
} 