cart = [];

function loadProducts() {
    $.getJSON("cartlist.json", function (data) {
        let cartlist = data.orders;
        cartlist.forEach(addCartOrder)
    });
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
}

async function addCartOrder (e) {
    let order = getProduct(e.productid);
    order.qty = e.qty;
    cart.push(order);
}

function getProduct (id) {
    let pdt = {};
    for (let i = 0; i < products.length; i++) {
        if (products[i].id === `${id}`) {
            pdt = products[i];
        }
    }
    return pdt;
}


cartcounter = 1;
function createCartElement(product) {
    // let product = getProduct(id);
    let total = `${product.qty}` * product.price;
    let html = `
        <tr id="prod[${product.id}]">
            <td class="image" data-title="No"><img src="${product.img}" alt="#" style="width: 200px; height: auto;"></td>
            <td class="product-des" data-title="Description">
                <p class="product-name"><a href="#">${product.name}</a></p>
                <p class="product-des">${product.desc}</p>
            </td>
            <td class="price" data-title="Price"><span>Php ${product.price} </span><input id="priceOfquant[${cartcounter}]" type="hidden" value="${product.price}"></td>
            <td class="qty" data-title="Qty"><!-- Input Order -->
                <div class="input-group">
                    <div class="button minus">
                        <button type="button" class="btn btn-primary btn-number" data-type="minus" data-field="quant[${cartcounter}]">
                            <i class="ti-minus"></i>
                        </button>
                    </div>
                    <input type="text" name="quant[${cartcounter}]" class="input-number" data-min="1" data-max="100" value="${product.qty}">
                        <div class="button plus">
                            <button type="button" class="btn btn-primary btn-number" data-type="plus" data-field="quant[${cartcounter}]">
                                <i class="ti-plus"></i>
                            </button>
                        </div>
                </div>
                <!--/ End Input Order -->
            </td>
            <td class="total-amount" data-title="Total"><label for="totalquant[${cartcounter}]">Php</label><input id="totalquant[${cartcounter}]" value="${total}" style="text-align: center;" readonly/></td>
            <td class="action" data-title="Remove"><a href="#" class="delete-prod-btn" data-field="${product.id}"><i class="ti-trash remove-icon"></i></a></td>
        </tr>`;

    $('#cart-list-con').append(html);
    cartcounter++;
}

function refreshCheckout() {
    let total = 0;
    let shipping = 0;
    $("input[id*='totalquant']").each(function() {
        total += parseInt($(this).val());
    });
    let grandTotal = total + shipping;
    $('#cartSubtotal').text(`Php ${total}`);
    $('#grandTotal').text(`Php ${grandTotal}`);
}

loadProducts();

function reloadCart() {
    $('#cart-list-con').empty();
    cart.forEach(product => {
        createCartElement(product);
    });
}

function deleteHandler() {
    //------------- DELETE PRODUCT FROM CART TABLE -------------//
    $('.delete-prod-btn').on('click', function(e){
        e.preventDefault();
        id = $(this).attr('data-field');
        $(`tr[id='prod[${id}]']`).remove();
        deleteFromCart(id);
        reloadCart();
        refreshCheckout();
    });
}

function quantityHandler() {
    //------------- DETAIL ADD - MINUS COUNT ORDER -------------//
    $('.btn-number').on('click', function(e){
        e.preventDefault();
        fieldName = $(this).attr('data-field');
        type      = $(this).attr('data-type');
        price     = $(`[id='priceOf${fieldName}']`).val();
        total     = $(`[id='total${fieldName}']`);
        var input = $("input[name='"+fieldName+"']");
        var currentVal = parseInt(input.val());
        if (!isNaN(currentVal)) {
            if(type === 'minus') {
                if(parseInt(input.val()) === input.attr('data-min')) {
                    $(this).attr('disabled', true);
                } else {
                    $(this).attr('disabled', false);

                }
                if(currentVal > input.attr('data-min')) {
                    input.val(currentVal - 1).change();
                    total.val(input.val() * price);
                    refreshCheckout();
                }
            } else if(type === 'plus') {

                if(currentVal < input.attr('data-max')) {
                    input.val(currentVal + 1).change();
                    total.val(input.val() * price);
                    refreshCheckout();
                }
                if(parseInt(input.val()) === input.attr('data-max')) {
                    $(this).attr('disabled', true);
                }

            }
        } else {
            input.val(0);
        }
    });
}
function displayCart() {
    reloadCart();
    deleteHandler();
    quantityHandler();
    refreshCheckout();
    createMiniCartIcon();
    createMiniCart();
}


window.onload = displayCart;