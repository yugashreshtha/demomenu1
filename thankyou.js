const orders =
  JSON.parse(localStorage.getItem('lastOrder')) || [];

const invoiceItems =
  document.getElementById('invoice-items');

const invoiceTotal =
  document.getElementById('invoice-total');

const invoiceDate =
  document.getElementById('invoice-date');

const orderId =
  document.getElementById('order-id');

/* RANDOM ORDER ID */

const randomOrderId =
  Math.floor(
    100000 + Math.random() * 900000
  );

orderId.innerText =
  `#MB${randomOrderId}`;

/* DATE */

invoiceDate.innerText =
  new Date().toLocaleString();

/* FOOD IMAGES */

const foodImages = {

  "Smoky Burger":
  "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?q=80&w=1998&auto=format&fit=crop",

  "Fire Pizza":
  "https://images.unsplash.com/photo-1513104890138-7c749659a591?q=80&w=2070&auto=format&fit=crop",

  "Creamy Pasta":
  "https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?q=80&w=1974&auto=format&fit=crop"

};

let total = 0;

/* SHOW ITEMS */

orders.forEach((item)=>{

  total += item.price;

  invoiceItems.innerHTML += `

    <div class="invoice-item">

      <div class="invoice-item-left">

        <img
          src="${foodImages[item.name]}"
          alt=""
        />

        <div>

          <h3>
            ${item.name}
          </h3>

          <p>
            Premium handcrafted dish
          </p>

        </div>

      </div>

      <div class="invoice-price">
        ₹${item.price}
      </div>

    </div>

  `;

});

/* TOTAL */

invoiceTotal.innerText = total;

/* DOWNLOAD */

function downloadInvoice(){

  window.print();

}

/* CLEAR CART */

localStorage.removeItem('cart');
