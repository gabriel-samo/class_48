class Config {
  //for web
  public webPort = 3030;
  public webHost = "localhost";
  //for mongoDB
  public connectionString = "mongodb://localhost:27017/youtube";
  //for jwt
  public jwtSecret = "the-secret-key-need-to-be-at-least-256-bytes";
  public jwtExpire = "1h";
}

const config = new Config();
export default config;
