document.addEventListener('DOMContentLoaded', () => {
    const productDropdown = document.getElementById('productName');
    const priceInput = document.getElementById('price');
    const quantityInput = document.getElementById('quantity');
    const amountInput = document.getElementById('amount');
    const addButton = document.getElementById('addButton');
    const inventoryTable = document.getElementById('inventoryTable').getElementsByTagName('tbody')[0];
    const totalAmountDisplay = document.getElementById('totalAmount');
    const totalAmountGSTDisplay = document.getElementById('totalAmountGST');
    const generateInvoiceButton = document.getElementById('generateInvoiceButton');
    const invoiceContainer = document.getElementById('invoiceContainer');

    const productPrices = {
        iPhone: 50000,
        Laptop: 28000,
        Beg: 7000,
        Glasses: 2500,
        Shoes: 3200
    };

    productDropdown.addEventListener('change', () => {
        const selectedProduct = productDropdown.value;
        if (productPrices[selectedProduct] !== undefined) {
            priceInput.value = productPrices[selectedProduct];
            calculateAmount();
        }
    });

    quantityInput.addEventListener('input', calculateAmount);

    addButton.addEventListener('click', () => {
        const productName = productDropdown.value;
        const price = parseFloat(priceInput.value);
        const quantity = parseInt(quantityInput.value);
        const amount = parseFloat(amountInput.value);

        if (!productName || isNaN(price) || isNaN(quantity) || isNaN(amount)) {
            alert('Please fill in all fields correctly.');
            return;
        }

        const newRow = inventoryTable.insertRow();
        newRow.innerHTML = `
            <td>${productName}</td>
            <td>${price}</td>
            <td>${quantity}</td>
            <td>${amount}</td>
        `;

        updateTotals();

        productDropdown.value = '';
        priceInput.value = '';
        quantityInput.value = '';
        amountInput.value = '';
    });

    generateInvoiceButton.addEventListener('click', generateInvoice);

    function calculateAmount() {
        const price = parseFloat(priceInput.value);
        const quantity = parseInt(quantityInput.value);
        if (!isNaN(price) && !isNaN(quantity)) {
            amountInput.value = price * quantity;
        } else {
            amountInput.value = '';
        }
    }

    function updateTotals() {
        let totalAmount = 0;
        for (let i = 0; i < inventoryTable.rows.length; i++) {
            totalAmount += parseFloat(inventoryTable.rows[i].cells[3].textContent);
        }
        const totalAmountGST = totalAmount * 1.17;

        totalAmountDisplay.textContent = totalAmount.toFixed(2);
        totalAmountGSTDisplay.textContent = totalAmountGST.toFixed(2);
    }

    function generateInvoice() {
        if (inventoryTable.rows.length === 0) {
            alert('No items to generate an invoice.');
            return;
        }

        let invoiceHTML = `
            <h2>Invoice</h2>
            <table class="inventory-table">
                <thead>
                    <tr>
                        <th>Product</th>
                        <th>Price (Rs)</th>
                        <th>Quantity</th>
                        <th>Amount (Rs)</th>
                    </tr>
                </thead>
                <tbody>
        `;

        for (let i = 0; i < inventoryTable.rows.length; i++) {
            const row = inventoryTable.rows[i];
            invoiceHTML += `
                <tr>
                    <td>${row.cells[0].textContent}</td>
                    <td>${row.cells[1].textContent}</td>
                    <td>${row.cells[2].textContent}</td>
                    <td>${row.cells[3].textContent}</td>
                </tr>
            `;
        }

        invoiceHTML += `
                </tbody>
                <tfoot>
                    <tr>
                        <td colspan="3">Total Amount (Rs)</td>
                        <td>${totalAmountDisplay.textContent}</td>
                    </tr>
                    <tr>
                        <td colspan="3">Total Amount with 17% GST (Rs)</td>
                        <td>${totalAmountGSTDisplay.textContent}</td>
                    </tr>
                </tfoot>
            </table>
        `;

        invoiceContainer.innerHTML = invoiceHTML;
        invoiceContainer.style.display = 'block';
    }
});
