class Config {
  public webPort = 5050;
  public webHost = "localhost";
  public mySQLhost = "localhost";
  public mySQLuser = "root";
  public mySQLpassword = "12345678";
  public mySQLdb = "stimatzki_db";
}

const config = new Config();
export default config;
