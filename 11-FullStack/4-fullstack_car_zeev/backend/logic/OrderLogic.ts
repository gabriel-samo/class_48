import dal_mysql from "../DAL/dal_mysql";

//SELECT EXAMPLES
const getAllOrders = async () => {
  //SQL statement
  const sql = `SELECT OrderID, CustomerID, EmployeeID, OrderDate FROM Orders WHERE OrderDate > '1996-04-01' AND OrderDate < '1996-05-31'`;
  //execute the sql command
  const allOrders = await dal_mysql.execute(sql);
  //return the result
  return allOrders;
};

//INSERT EXAMPLES

export default {
  getAllOrders,
};
