/**
 * Created by pawan on 14/2/17.
 */

function refreshList() {
    $.get('/products/all', function (data) {
        var list = "";

        for (let i = 0; i < data.length; i++) {
            item = data[i];
            list += "<div data-productId = '" + item.id + "' class='product col-md-12'>" +
                "<div class='col-md-2'>" + (i + 1) + "</div>" +
                "<div class='col-md-5'>" + item.name + "</div>" +
                "<div class='col-md-4'>" + "$" + item.price + "</div>" +
                "<div class='col-md-1'>" + "<button class='xBtn'>X</button>" + "</div>" +
                "</div>"
        }

        $('#productsList').html(list);
    })
}

function cross(ev) {
    let productId = $($($(this).parent()[0]).parent()[0]).attr('data-productId');
    $.post('/products/remove', {id: productId}, function (data) {
        console.log(data);
        refreshList();
    })
}

$(function () {
    refreshList();

    // var inputProductName = $('#productName');
    // var inputProductPrice = $('#productPrice');
    // var addBtn = $('#add');
    var productsList = $('#productsList');

    productsList.on('click', '.xBtn', cross)


})