document.addEventListener("DOMContentLoaded", () => {
    const customerForm = document.getElementById("customerForm");
  
    customerForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const customerId = document.getElementById("customer_id").value;
        const name = document.getElementById("name").value;
        const phone = document.getElementById("phone").value;
        const orderType = document.getElementById("order_type").value;
        const price = document.getElementById("price").value; 
    
        let customers = JSON.parse(localStorage.getItem("customers")) || [];
        customers.push({ customerId, name, phone, orderType, price });
        localStorage.setItem("customers", JSON.stringify(customers));
    
        alert("Customer Added!");
        customerForm.reset();
    });
    
      if (!customerId || !name || !phone || !orderTypeInput) {
        alert("Please fill all fields before submitting!");
        return;
      }
  
      let customers = JSON.parse(localStorage.getItem("customers")) || [];
  
      if (customers.some(c => c.customerId === customerId)) {
        alert("Customer ID already exists!");
        return;
      }
  
      customers.push({
        customerId,
        name,
        phone,
        orderType: orderTypeInput,
        price
      });
      localStorage.setItem("customers", JSON.stringify(customers));
  
      customerForm.reset();
    });
  
  
  document.addEventListener("DOMContentLoaded", () => {
    const customerTableBody = document.getElementById("customerTableBody");
    let customers = JSON.parse(localStorage.getItem("customers")) || [];
  
    function renderTable() {
      if (!customerTableBody) return;
      customerTableBody.innerHTML = "";
      customers.forEach(customer => {
        const row = `<tr>
          <td class="px-4 py-2 border">${customer.customerId}</td>
          <td class="px-4 py-2 border">${customer.name}</td>
          <td class="px-4 py-2 border">${customer.phone}</td>
          <td class="px-4 py-2 border">${customer.orderType}</td>
          <td class="px-4 py-2 border">${customer.price}</td>
        </tr>`;
        customerTableBody.innerHTML += row;
      });
    }
  
    renderTable();
  
    const clearTableBtn = document.getElementById("clearTableBtn");
    if (clearTableBtn) {
      clearTableBtn.addEventListener("click", function () {
        customers = [];
        localStorage.removeItem("customers");
        renderTable();
        alert("Customer table cleared!");
      });
    }
  });

  document.addEventListener("DOMContentLoaded", () => {
    const urlParams = new URLSearchParams(window.location.search);
    const price = urlParams.get("price");
    if (price) {
        document.getElementById("price").value = price;
    }
});

  