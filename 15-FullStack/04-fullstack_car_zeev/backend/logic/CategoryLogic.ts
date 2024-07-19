import dal_mysql from "../DAL/dal_mysql";

//SELECT EXAMPLES
const getAllCategories = async () => {
  //SQL statement
  const sql =
    "SELECT c.CategoryID,c.CategoryName,c.Description,p.* FROM categories as c INNER JOIN products as p ON c.CategoryID = p.CategoryID WHERE c.CategoryName LIKE '%o%';";
  //execute the sql command
  const allCategories = await dal_mysql.execute(sql);
  //return the result
  return allCategories;
};

//INSERT EXAMPLES

export default {
  getAllCategories,
};
