$(function() {
    dtb_order = $("#dtb_order").DataTable({
        scrollX: true,
        pageLength: 10,
        responsive: true,
        paging: true,
        processing: true,
        ordering: false,
        ajax: {
            url : BASE_LANG + "service/order.php",
            type: "POST",
            data: function( d ){ 
                d.cmd     = "order";
            },
            beforeSend: function(){
            },
            complete: function(){
            }
        },
        type:'JSON',
        columns: [
            { "data": "ORDER_STATUS", render: order_status},
            { "data": "MEMBER_ID" , render: member },
            { "data": "MEMBER_INVOICE_PIC" , render : image},
            { "data": "MEMBER_PROPRICE" },
            { "data": "ORDER_REFID" },
            { "data": "ORDER_DATE", render: datetime},
            { "data": "ORDER_ID", render : product},
        ],
        columnDefs: [
            { targets: [0, 2], className: "text-center", width: "5%" },
            { targets: [1], className: "truncate", width : '30%' },
            { targets: [3,4,5,6], className: "text-center", width: "10%" },
        ],
        initComplete: function( settings, start, end, max, total, pre ) {
        }
    });

    $('#dtb_order tbody').on( 'click', '[name="img"]', function (e) {
        var row = $(this).closest("tr"); 
        var image_url = row.find('[name="img"]').attr('data-img');
        var member_name = row.find('[name="img"]').attr('data-name');
        var invoice_date  = row.find('[name="img"]').attr('data-date');
        var order_price = row.find('[name="img"]').attr('data-price');
        var order_ref = row.find('[name="img"]').attr('data-ref');
        
        var modal_imgHTML = '';
        modal_imgHTML += '<div class="modal modal-blur fade" id="modal_imageGEN" data-bs-backdrop="static">';
        modal_imgHTML += '<div class="modal-dialog modal-lg modal-dialog-scrollable" role="document">';
        modal_imgHTML += '<div class="modal-content">';
        modal_imgHTML += '<button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>';
        modal_imgHTML += '<div class="modal-status bg-yellow"></div>';
        modal_imgHTML += '<div class="modal-header">';
        modal_imgHTML += '<table class="table table-vcenter text-nowrap w-100 mt-2">';
        modal_imgHTML += '<thead><tr><td class="th w-25">ชื่อผู้ซื้อ : </td><td>' + member_name + '</td></tr></thead>';
        modal_imgHTML += '<tbody>';
        modal_imgHTML += '<tr><td class="th w-25">เวลาที่โอน :</td><td>' + invoice_date + '</td></tr>';
        modal_imgHTML += '<tr><td class="th w-25">จำนวนเงิน :</td><td>' + order_price + '</td></tr>';
        modal_imgHTML += '</tbody>';
        modal_imgHTML += '</table>';
        modal_imgHTML += '<button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>';
        modal_imgHTML += '</div>';
        modal_imgHTML += '<div class="modal-body text-center py-4">';
        modal_imgHTML += '<img src="' + image_url + '" style="width: 100%;">';
        modal_imgHTML += '</div>';
        modal_imgHTML += '<div class="modal-footer">';
        modal_imgHTML += '<div class="input-group input-group-flat w-50">';
        modal_imgHTML += '<input value="' + order_ref + '" type="text" class="form-control" autocomplete="off" readonly>';
        modal_imgHTML += '<span class="input-group-text">';
        modal_imgHTML += '<a class="link-secondary cursor-pointer" name="copy-url" data-bs-toggle="tooltip" data-bs-original-title="Clear search">';
        modal_imgHTML += '<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-copy" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"></path><rect x="8" y="8" width="12" height="12" rx="2"></rect><path d="M16 8v-2a2 2 0 0 0 -2 -2h-8a2 2 0 0 0 -2 2v8a2 2 0 0 0 2 2h2"></path></svg>';
        modal_imgHTML += '</a>';
        modal_imgHTML += '</span>';
        modal_imgHTML += '</div>';
        modal_imgHTML += '<button class="btn btn btn-white ms-auto" data-bs-dismiss="modal">Cancel</button>';
        modal_imgHTML += '</div>';
        modal_imgHTML += '</div>';
        modal_imgHTML += '</div>';
        modal_imgHTML += '</div>';
        $('#modal_image').html(modal_imgHTML);
        $('#modal_imageGEN').modal('show');

        $('[name="copy-url"]').on( 'click', function (event) {
            event.preventDefault();
            copyToClipboard($(this)[0].offsetParent.firstChild.value);
        });

    });

    $('#dtb_order tbody').on( 'click', '[name="order_status"]', function (e) {
        var row = $(this).closest("tr"); 
        var image_url = row.find('[name="img"]').attr('data-img');
        
        var modal_statusHTML = '';
        modal_statusHTML += '<div class="modal modal-blur fade" id="modal_imageGEN" data-bs-backdrop="static">';
        modal_statusHTML += '<div class="modal-dialog modal-lg modal-dialog-scrollable" role="document">';
        modal_statusHTML += '<div class="modal-content">';
        modal_statusHTML += '<button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>';
        modal_statusHTML += '<div class="modal-status bg-yellow">Update order</div>';
        modal_statusHTML += '<div class="modal-header">';
        modal_statusHTML += '<button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>';
        modal_statusHTML += '</div>';
        modal_statusHTML += '<div class="modal-body text-center py-4">';
        modal_statusHTML += '';
        modal_statusHTML += '</div>';
        modal_statusHTML += '<div class="modal-footer">';
        modal_statusHTML += '<button class="btn btn btn-white" data-bs-dismiss="modal">Cancel</button>';
        modal_statusHTML += '</div>';
        modal_statusHTML += '</div>';
        modal_statusHTML += '</div>';
        modal_statusHTML += '</div>';
        $('#modal_image').html(modal_statusHTML);
        $('#modal_imageGEN').modal('show');

    });

});

function datetime(data, type, row, meta){
    return moment(data).format('YYYY-MM-DD HH:mm:ss');
}

function order_status(data, type, row, meta){
    if(data == 'Pending'){
        orderBTN = 'yellow';
    }else if(data == 'Paid'){
        orderBTN = 'success';
    }else if(data == 'Delivery'){
        orderBTN = 'info';
    }else if(data == 'Refund'){
        orderBTN = 'secondary';
    }else if(data == 'Voided'){
        orderBTN = 'primary';
    }
    
    return '<button name="order_status" class="btn btn-' + orderBTN + ' btn-square w-100">' + data + '</button>';
}

function member(data, type, row, meta){
    return row['MEMBER_NAME'] + ' (' + row['MEMBER_ADDRESS'] + ')';
}

function image(data, type, row, meta){
    var imagesUrl = BASE_URL + 'images/order/' + data;
    var images = '';
    images += '<div class="col-auto">';
    images += ' <img name="img" src="' + imagesUrl + '" ';
    images += ' data-img="'  + imagesUrl + '"';
    images += ' data-date="' + row['MEMBER_INVOICE_DATE'] + '"';
    images += ' data-price="'  + row['MEMBER_PROPRICE'] + '"';
    images += ' data-name="'  + row['MEMBER_NAME'] + '"';
    images += ' data-ref="'  + row['ORDER_REFID'] + '"';
    images += ' class="rounded cursor-pointer w-100" style="height: 3em;object-fit: cover;">'
    images += '</div>';

    return images;
}

function product(data, type, row, meta){
    var tools = '<button ';
        tools += ' data-id = "'       + data + '"';
        tools += ' data-name-th = "'  + row['PRODUCT_NAME_TH'] + '"';
        tools += ' data-tag = "'      + row['PRODUCT_TAG'] + '"';
        tools += ' name="update" class="btn"><i class="fas fa-cart-arrow-down"></i>&nbsp&nbsp Product</button>';
    return tools;
}