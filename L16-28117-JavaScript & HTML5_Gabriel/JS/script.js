const myCart=[];

function addProduct(){
    let productName = document.getElementById('productName').value;
    let productPrice = document.getElementById('productPrice').value;
    let productType = document.getElementById('productType').value;
    let productImg = document.getElementById('productImg').value;
    
    const newProduct = new Object;
    newProduct.productName = productName;
    newProduct.productPrice = productPrice;
    newProduct.productType =productType;
    newProduct.productImg = productImg;

    myCart.push(newProduct);
    document.getElementById('myForm').reset();

    createTable();
}

function createTable(){
    const tableHeader = `
    <table class="table table-bordered align-middle">
        <thead class="table-dark">
            <th>Product name</th>
            <th>Product price</th>
            <th>Product type</th>
            <th>Product image</th>
            <th>Actions</th>
        </thead>
    `

    let tableBody = '';
    for (let index=0; index<myCart.length; index++){
        tableBody+=`
            <tr class="">
                <td>${myCart[index].productName}</td>
                <td>${myCart[index].productPrice}</td>
                <td>${myCart[index].productType}</td>
                <td><img width="" src="${myCart[index].productImg}" class="rounded"></td>
                <td><button id="deleteProduct" class="btn btn-danger" onclick="deleteProduct(${index});">Delete</button></td>
            </tr>
        `
    }

    const tableFooter = `</table>`;

    document.getElementById('myCartTable').innerHTML = tableHeader+tableBody+tableFooter;
}

function deleteProduct(index){
    myCart.splice(index, 1);
    createTable();
}