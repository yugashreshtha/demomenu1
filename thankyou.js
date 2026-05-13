const orders =
  JSON.parse(localStorage.getItem('lastOrder')) || [];

const invoiceItems =
  document.getElementById('invoice-items');

const invoiceTotal =
  document.getElementById('invoice-total');

const invoiceDate =
  document.getElementById('invoice-date');

invoiceDate.innerText =
  new Date().toLocaleString();

let total = 0;

orders.forEach((item)=>{

  total += item.price;

  invoiceItems.innerHTML += `
  
    <div class="invoice-item">

      <span>
        ${item.name}
      </span>

      <span>
        ₹${item.price}
      </span>

    </div>

  `;

});

invoiceTotal.innerText = total;

function downloadInvoice(){

  window.print();

}