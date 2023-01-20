<?php
  $PAGE_VAR["js"][] = "order";

  if($_SESSION['status'] != true && $_SESSION['isAdmin'] != true){
  header("Location: ".WEB_META_BASE_LANG."login/");
  }

?>

<div class="container-xl">
  <div class="card">
    <div class="card-header">
      <h3 class="card-title">Order list</h3>
    </div>
    <div class="table-responsive my-3">
      <table id="dtb_order" class="table table-vcenter text-nowrap w-100">
        <thead>
          <tr>
            <th>STATUS</th>
            <th>BUYER</th>
            <th>INVOICE</th>
            <th>PRICE</th>
            <th>reference</th>
            <th>ORDER DATE</th>
            <th>PRODUCT LIST</th>
          </tr>
        </thead>
      </table>
    </div>
  </div>
</div>


<div id="modal_image"></div>