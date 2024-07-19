USE northwind;
-- SELECT Exercises:
-- Exersice 1:
-- SELECT * FROM Orders;
-- Exersice 2:
-- SELECT * FROM Employees;
-- Exersice 3:
-- SELECT Country , Region , HireDate , FirstName FROM Employees;
-- Exersice 4:
-- SELECT OrderDate , OrderID , CustomerID FROM Orders;

-- WHERE Exersices:
-- Exersice 16:
-- SELECT c.CategoryID,c.CategoryName,c.Description,p.* FROM categories as c INNER JOIN products as p ON c.CategoryID = p.CategoryID WHERE c.CategoryName LIKE '%o%';
-- Exersice 17:
-- SELECT CompanyName,Country FROM customers WHERE customers.CompanyName LIKE '%a';

-- SELECT OrderID, CustomerID, EmployeeID, OrderDate FROM Orders WHERE OrderDate > '1996-04-01' AND OrderDate < '1996-05-31'
