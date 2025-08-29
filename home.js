document.addEventListener("DOMContentLoaded", () => {
    const customerForm = document.getElementById("customerForm");
    const addCustomerBtn = document.getElementById("addCustomerBtn");
    const customerTableBody = document.getElementById("customerTableBody");
    const clearTableBtn = document.getElementById("clearTableBtn");

    const urlParams = new URLSearchParams(window.location.search);
    const priceFromURL = urlParams.get("price");
    const itemNameFromURL = urlParams.get("itemName");

    if (priceFromURL) document.getElementById("price").value = priceFromURL;
    if (itemNameFromURL) document.getElementById("itemName").value = itemNameFromURL;

    function generateCustomerId() {
        let lastId = localStorage.getItem("lastCustomerId");
        let newIdNumber = lastId ? parseInt(lastId.substring(1)) + 1 : 1;
        let newId = "C" + newIdNumber.toString().padStart(4, "0");
        localStorage.setItem("lastCustomerId", newId);
        return newId;
    }
    
    document.addEventListener("DOMContentLoaded", () => {
        document.getElementById("customer_id").value = generateCustomerId();
    });

    function renderTable() {
        let customers = JSON.parse(localStorage.getItem("customers")) || [];
        customerTableBody.innerHTML = "";
        customers.forEach(customer => {
            const row = `<tr>
                <td class="px-4 py-2 border">${customer.customerId}</td>
                <td class="px-4 py-2 border">${customer.name}</td>
                <td class="px-4 py-2 border">${customer.phone}</td>
                <td class="px-4 py-2 border">${customer.itemName}</td>
                <td class="px-4 py-2 border">${customer.orderType}</td>
                <td class="px-4 py-2 border">${customer.price}</td>
            </tr>`;
            customerTableBody.innerHTML += row;
        });
    }

    if (clearTableBtn) {
        clearTableBtn.addEventListener("click", () => {
            localStorage.removeItem("customers");
            localStorage.removeItem("lastCustomerId");
            renderTable();
            alert("Customer table cleared!");
        });
    }

    if (addCustomerBtn) {
        addCustomerBtn.addEventListener("click", () => {
            const name = document.getElementById("name").value.trim();
            const phone = document.getElementById("phone").value.trim();
            const itemName = document.getElementById("itemName").value.trim();
            const orderType = document.getElementById("order_type").value;
            const price = document.getElementById("price").value.trim();

            if (!name || !phone || !itemName || !orderType || !price) {
                alert("Please fill all fields!");
                return;
            }

            let customers = JSON.parse(localStorage.getItem("customers")) || [];

            if (customers.some(c => c.phone === phone)) {
                alert("This Customer is already exists!");
                return;
            }

            const customerId = generateCustomerId();
            document.getElementById("customer_id").value = customerId;

            customers.push({ customerId, name, phone, itemName, orderType, price });
            localStorage.setItem("customers", JSON.stringify(customers));

            alert(`Customer Added! ID: ${customerId}`);

            customerForm.reset();

            if (priceFromURL) document.getElementById("price").value = priceFromURL;
            if (itemNameFromURL) document.getElementById("itemName").value = itemNameFromURL;

            renderTable();
        });
    }

    renderTable();

    

});


