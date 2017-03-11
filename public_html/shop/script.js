/**
 * Created by pawan on 15/2/17.
 */
var priceList = [];

function refreshProductsList() {
    $.get('/products/all', function (data) {
        var list = "";
        for (let i = 0; i < data.length; i++) {
            let item = data[i];
            priceList[item.id] = item.price;
            list += "<div class='product' data-productId = '" + item.id + "'>"
                + "<div class='productName'>"
                + "<span>" + item.name + "</span>"
                + "</div>"
                + "<div class='productPrice'>"
                + "<span>Price:" + item.price + "</span>"
                + "</div>"
                + "<div class='productQuantity'>"
                + "<button class='subtractButton'>-</button>"
                + "<button class='addButton'>+</button>"
                + "</div>"
                + "</div>"
        }
        $('#products').html(list);
        refreshCart();
    })
}


var cartItems = JSON.parse(localStorage.getItem("cartItems"));

if (!cartItems) {
    cartItems = [];
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
}

function refreshCart() {
    cartItems = JSON.parse(localStorage.getItem("cartItems"));
    var list = "";
    var totalPrice = 0;

    for (let i = 0, k = 1; i < cartItems.length; i++) {
        let item = cartItems[i];

        if (item) {
            list += "<div data-productId = '" + item.id + "' class='col-md-12 cartItem'>" +
                "<div class='col-md-1'>" + k + "</div>" +
                "<div class='col-md-6'>" + item.name + "</div>" +
                "<div class='col-md-2'>" + item.quantity + "</div>" +
                "<div class='col-md-2'>" + (priceList[i]?item.quantity * priceList[i]:"Not Available") + "</div>" +
                "<div class='col-md-1'>" + "<button class='xBtn'>X</button>" + "</div>" +
                "</div>"
            totalPrice += (priceList[i]?item.quantity * priceList[i]:0);
            k++;
        }
    }
    list += "<div class='col-md-8'></div>" +
        "<div class='col-md-2'>Total: </div>" +
        "<div class='col-md-2'>" + totalPrice + "</div>"

    $('#cartItems').html(list);
}

function addToCart(ev) {
    var product = $(this).parent().parent();
    var productId = product.attr('data-productId');

    if (!cartItems[productId]) {
        cartItems[productId] = {
            name: product.children().children()[0].textContent,
            id: productId,
            quantity: 1,
        };
    } else {
        cartItems[productId].quantity += 1;
    }

    localStorage.setItem("cartItems", JSON.stringify(cartItems));
    refreshCart();
}

function removeFromCart(ev) {
    var product = $(this).parent().parent();
    var productId = product.attr('data-productId');
    if (cartItems[productId]) {
        cartItems[productId].quantity -= 1;
        if (cartItems[productId].quantity == 0) {
            cartItems[productId] = undefined;
        }
        localStorage.setItem("cartItems", JSON.stringify(cartItems));
        refreshCart();
    }
}

function cross() {
    var productId = $(this).parent().parent().attr('data-productId');
    cartItems[productId] = undefined;
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
    refreshCart();
}
$(function () {
    refreshProductsList();

    var products = $('#products');
    products.on('click', '.addButton', addToCart);
    products.on('click', '.subtractButton', removeFromCart);

    var cart = $('#cart');
    cart.on('click', '.xBtn', cross)
})