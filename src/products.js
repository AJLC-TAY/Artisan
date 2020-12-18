products = [];
cart = [];
count01 = 0;
count02 = 0;
count03 = 0;

function loadProducts() {
    // var pdts = JSON.parse(prdt).products;
    $.getJSON("prdt.json", function(data) {
        let productlist = data.products;
        productlist.forEach(addProduct);
        $('#1').next().text(`(${count01})`);
        $('#2').next().text(`(${count02})`);
        $('#3').next().text(`(${count03})`);
    });
}

function emptycounts() {
    count01 = 0;
    count02 = 0;
    count03 = 0;
}

async function addProduct (e) {
    let product = {};
    product.id = e.id;
    product.name = e.name;
    product.price = e.price;
    product.review = e.review;
    product.instock = e.instock;
    product.desc = e.desc;
    product.category = e.category;
    product.subcat = e.subcat;
    product.img = e.img[0].med;
    products.push(product);
    if (product.price >= 100 && product.price <= 200) {
        count01++;
    } else if (product.price >= 201 && product.price <= 700) {
        count02++;
    } else if (product.price >= 701 && product.price <= 1500) {
        count03++;
    }
}
loadProducts();

function createProduct(product) {
    let html = `<div id="${product.id}prod" class="col-lg-4 col-md-6 col-12">
                <div class="single-product">
                    <div class="product-img">
                        <a  data-toggle="modal" data-target="#${product.id}modal" title="Quick View" href="#">
                            <img class="default-img" src="${product.img}" alt="#">
                                <img class="hover-img" src="${product.img}" alt="#">
                        </a>
                        <div class="button-head">
                            <div class="product-action">
                                <a data-toggle="modal" data-target="#${product.id}modal" title="Quick View" href="#"><i class=" ti-eye"></i><span>Quick Shop</span></a>
                            </div>
                            <div class="product-action-2">
                                <a title="Add to cart" href="#">Add to cart</a>
                            </div>
                        </div>
                    </div>
                    <div class="product-content">
                        <h3><a href="product-details.html">${product.name}</a></h3>
                        <div class="product-price">
                            <span>Php ${product.price}</span>
                        </div>
                    </div>
                </div>
            </div>`;
    $("#product-list").append(html);
}

/*==================================
     12.1 Modal Quantity Counter
     ===================================*/
function lessQty (id) {
    alert("test");
    var qty = $(`#${id}-qty-input`);
    var currentVal = parseInt(qty.val(), 10);
    if (!isNaN(currentVal) && currentVal > 1) {
        qty.val(currentVal - 1);
    }
}

function addQty (id) {
    var qty = $(`#${id}-qty-input`);
    var currentVal = parseInt(qty.val(), 10);
    if (!isNaN(currentVal)) {
        qty.val(currentVal + 1);
    }
}

function refreshCart() {
    $("#mini-cart").empty();
    createMiniCartIcon();
    createMiniCart();
}

function addToCart(id) {
    var qty = $(`#${id}-qty-input`).val();

    function findProduct(id) {
        let product = {};
        products.forEach(e => {
            if (e.id === id) {
                product = e;
            }
        })
        return product;
    }
    let orderedproduct = findProduct(id);
    let order = {}
    order.id = orderedproduct.id;
    order.name = orderedproduct.name;
    order.img = orderedproduct.img;
    order.price = orderedproduct.price;
    order.qty = qty;
    // console.log(order);
    cart.push(order);
    refreshCart();
}

function deleteFromCart(id) {
    for (var i = 0; i < cart.length; i++) {
        if (cart[i].id === `${id}`) {
            cart.splice(i,1);
            break;
        }
    }
    try {
        $(`tr[id='prod[${id}]']`).remove();
    } catch (e){}
    refreshCart();
}

function createProductModals(product) {
    let html =
        `
        <!-- Modal -->
        <div class="modal fade" id="${product.id}modal" tabindex="-1" role="dialog">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span class="ti-close" aria-hidden="true"></span></button>
                    </div>
                    <div class="modal-body">
                        <div class="row no-gutters">
                            <div class="col-lg-6 col-md-12 col-sm-12 col-xs-12">
                                    <!-- Product Slider -->
                                <div class="product-gallery">
                                    <div class="quickview-slider-active">
                                        <div class="single-slider">
                                            <img src="${product.img}" alt="#" style="width: 450px; margin-left: 90px; margin-top: 20px">
                                        </div>
                               
                                    </div>
                                 </div>
                                <!-- End Product slider -->
                            </div>
                                <div class="col-lg-6 col-md-12 col-sm-12 col-xs-12">
                                    <div class="quickview-content">
                                        <h2>${product.name}</h2>
                                        <div class="quickview-ratting-review">
                                            <div class="quickview-ratting-wrap">
                                                <div class="quickview-ratting">`;
                                    let review = 5;
                                    for(let stars = 0; stars < product.review; stars++) {
                                        html += `<i class="yellow fa fa-star"></i>`
                                        review--;
                                    }
                                    for(let i = 0; i < review; i++) {
                                        html += `<i class="fa fa-star"></i>`;
                                    }

                                    let htmlcont = `           </div>
                                                <a href="#"> (1 customer review)</a>
                                            </div>
                                            <div class="quickview-stock">
                                                <span><i class="fa fa-check-circle-o"></i> in stock</span>
                                            </div>
                                        </div>
                                        <h3>Php ${product.price}</h3>
                                        <div class="quickview-peragraph" style="height: 1.5in;">
                                            <p>${product.desc}</p>
                                        </div>
                                        <div class="quantity">
                                            <!-- Input Order -->
                                            <div class="input-group" style="box-shadow: 0 1px 2px gray;">
                                                <div class="button minus">
                                                    <button id="${product.id}" onclick="lessQty(this.id)" type="button" class="btn btn-primary btn-number minus-btn" disabled="disabled" data-type="minus" data-field="quant[1]">
                                                        <i class="ti-minus"></i>
                                                    </button>
                                                </div>
                                                <input id="${product.id}-qty-input" type="text" name="quant[1]" class="input-number"  data-min="1" data-max="1000" value="1">
                                                <div class="button plus">
                                                    <button id="${product.id}" onclick="addQty(this.id)" type="button" class="btn btn-primary btn-number plus-btn" data-type="plus" data-field="quant[1]">
                                                        <i class="ti-plus"></i>
                                                    </button>
                                                </div>
                                            </div>
                                            <!--/ End Input Order -->
                                        </div>
                                        <div class="add-to-cart">
                                            <a id="${product.id}"href="#" onclick="addToCart(id)" data-dismiss="modal" class="btn">Add to cart</a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <!-- Modal end -->`;

            html += htmlcont;
            $(html).insertAfter($(".product-area"));
}


function getTotalAmount () {
    let total = 0;
    cart.forEach(order => {
        total += order.price * order.qty;
    })
    return total;
}

function createMiniCartIcon() {
    let html =`<a href="#" class="single-icon"><i class="ti-bag"></i> <span class="total-count">${cart.length}</span></a>
    <!-- Shopping Item -->
    <div class="shopping-item">

    </div>
    <!--/ End Shopping Item -->`;

    $("#mini-cart").append(html);
}


function createMiniCart() {
    let html = `
        <div class="dropdown-cart-header">
            <span>${cart.length} Items</span>
            <a href="cart.html">View Cart</a>
         </div>
    <ul class="shopping-list">
    `;

    let index = 0;
    cart.forEach(product => {
        let order = `
        <li>
            <a href="#" onclick="deleteFromCart(${product.id})" class="remove" title="Remove this item"><i class="fa fa-remove"></i></a>
            <a class="cart-img" href="#"><img src="${product.img}" alt="#"></a>
            <h4><a data-target="#${product.id}modal">${product.name}</a></h4>
            <p class="quantity">${product.qty}x - <span class="amount">Php ${product.price}</span></p>
        </li>
        `
        html += order;
        index ++;
    });
    let total = getTotalAmount();
    let htmlcont =
    `
    </ul>
    <div class="bottom">
        <div class="total">
            <span>Total</span>
            <span class="total-amount">Php ${total} </span>
        </div>
        <a href="checkout.html" class="btn animate">Checkout</a>
    </div>`

    html += htmlcont;
    $('.shopping-item').append(html);

}

tempProducts = [];
function displayProducts() {
    products.forEach(product => {
        createProduct(product);
        createProductModals(product);
    });

    createMiniCartIcon();
    createMiniCart();
}

function filter(category) {
    $("#product-list").empty();
    tempProducts = products.filter(prd => prd.subcat === `${category}`);
    tempProducts.forEach(product => createProduct(product));
}

function checkIfExist(array, id) {
    let exists = false;
    array.forEach(e => {
        if (e.id === id) {
            exists = true;
        }
    })
    return exists;
}

function filterByPrice(range) {
    switch (range) {
        case "first":
            if (tempProducts.length > 0) {
                tempProducts = products.filter(prd => prd.price  >= 100 && prd.price <= 200 && prd.id && !checkIfExist(tempProducts, prd.id));
            } else {
                $("#product-list").empty();
                tempProducts = products.filter(prd => prd.price  >= 100 && prd.price <= 200 && prd.id );
            }
            tempProducts.forEach(product => createProduct(product));
            break;
        case "sec":
            if (tempProducts.length > 0) {
                tempProducts = products.filter(prd => prd.price  >= 201 && prd.price <= 700 && !checkIfExist(tempProducts, prd.id));
            } else {
                $("#product-list").empty();
                tempProducts = products.filter(prd => prd.price  >= 201 && prd.price <= 700 && prd.id);
            }
            tempProducts.forEach(product => createProduct(product));
            break;
        case "third":
            if (tempProducts.length > 0) {
                tempProducts = products.filter(prd => prd.price  >= 701 && prd.price <= 1500 && !checkIfExist(tempProducts, prd.id));
            } else {
                $("#product-list").empty();
                tempProducts = products.filter(prd => prd.price  >= 701 && prd.price <= 1500);
            }
            tempProducts.forEach(product => createProduct(product));
            break;
    }
}

$("#hoodies-filter").click(function () {
    filter("Hoodie");
});

$("#t-shirt-filter").click(function () {
    filter("T-shirt");
});

$("#sweat-filter").click(function () {
    filter("Sweatshirt");
});
$("#bottoms-filter").click(function () {
    filter("Bottom");
});

$("#head-filter").click(function () {
    filter("Head ware");
});

$("#1").change(function () {
    if ($(this).is(":checked")) {
        filterByPrice("first");
    } else {
        $("#product-list").empty();
        if (tempProducts.length > 0) {
            tempProducts = tempProducts.filter(prd => prd.price > 200);
        } else {
            tempProducts = products.filter(prd => prd.price > 200);
        }
        tempProducts.forEach(product => createProduct(product));
    }
});

$("#2").change(function () {
    if ($(this).is(":checked")) {
        filterByPrice("sec");
    } else {
        $("#product-list").empty();
        if (tempProducts.length > 0) {
            tempProducts = tempProducts.filter(prd => prd.price < 201 || prd.price > 700);
        } else {
            tempProducts = products.filter(prd => prd.price < 201 || prd.price > 700);
        }
        tempProducts.forEach(product => createProduct(product));
    }
});

$("#3").change(function () {
    if ($(this).is(":checked")) {
        filterByPrice("third");
    } else {
        $("#product-list").empty();
        if (tempProducts.length > 0) {
            tempProducts = tempProducts.filter(prd => prd.price < 701);
        } else {
            tempProducts = products.filter(prd => prd.price < 701);

        }
        tempProducts.forEach(product => createProduct(product));
    }
});

$("#select-filter").on('change', function (){
    let choice = this.value;
    switch (choice) {
        case "Name":
            $("#product-list").empty();
            if (tempProducts.length !== 0) {
                tempProducts.sort((a,b) => a.name.localeCompare(b.name));
                tempProducts.forEach(createProduct(product));
            } else {
                products.sort((a,b) => a.name.localeCompare(b.name));
                products.forEach(product => createProduct(product));
            }
            break;
        case "Price":
            $("#product-list").empty();
            if (tempProducts.length !== 0) {
                tempProducts.sort((a,b) => a.price.localeCompare(b.price));
                tempProducts.forEach(createProduct(product));
            } else {
                products.sort((a,b) => a.price.localeCompare(b.price));
                products.forEach(product => createProduct(product));
            }
            break;
    }
});

window.onload = displayProducts;