let cart = [
  { id: 1, name: "Laptop", price: 1200, quantity: 1, category: "Electronics" },
  { id: 2, name: "Mouse", price: 50, quantity: 2, category: "Electronics" },
  { id: 3, name: "Journal", price: 15, quantity: 10, category: "Stationery" },
];

let activeCouponDiscount = 0;

function renderCart() {
  const cartList = document.getElementById("cart-list");
  cartList.innerHTML = "";

  cart.forEach((item, index) => {
    cartList.innerHTML += `
                <div class="product-item">
                    <div>
                        <strong>${item.name}</strong><br>
                        <small>${item.category} - ${item.price}/-</small>
                    </div>
                    <div class="controls">
                        <input type="number" value="${item.quantity}" min="1" 
                               onchange="updateQty(${index}, this.value)">
                        <button class="btn-remove" onclick="removeItem(${index})">✕</button>
                    </div>
                </div>
            `;
  });
  calculateTotals();
}

function calculateTotals() {
  let subtotal = cart.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );
  let totalDiscount = 0;

  if (subtotal > 500) {
    totalDiscount += subtotal * 0.1;
  }
  const electronics = cart.filter((i) => i.category === "Electronics");
  const elecQty = electronics.reduce((acc, i) => acc + i.quantity, 0);
  if (elecQty >= 3) {
    const elecSubtotal = electronics.reduce(
      (acc, i) => acc + i.price * i.quantity,
      0
    );
    totalDiscount += elecSubtotal * 0.2;
  }

  const currentHour = new Date().getHours();
  if (currentHour >= 14 && currentHour <= 16) {
    totalDiscount += 5;
  }

  totalDiscount += activeCouponDiscount;

  document.getElementById("subtotal").innerText = `${subtotal.toFixed(2)}/-`;
  document.getElementById(
    "discount-total"
  ).innerText = `${totalDiscount.toFixed(2)}/-`;
  document.getElementById("final-total").innerText = `${Math.max(
    0,
    subtotal - totalDiscount
  ).toFixed(2)}/-`;
}

function updateQty(index, newQty) {
  cart[index].quantity = parseInt(newQty) || 0;
  renderCart();
}

function removeItem(index) {
  cart.splice(index, 1);
  renderCart();
}

function handleCoupon() {
  const input = document
    .getElementById("coupon-input")
    .value.trim()
    .toUpperCase();

  if (input.startsWith("SAVE") && input.length === 6) {
    const amount = parseInt(input.slice(4));
    if (!isNaN(amount)) {
      activeCouponDiscount = amount;
      alert(`Coupon applied: ${amount}/- off!`);
      renderCart();
      return;
    }
  }
  alert("Invalid coupon code. Try SAVE20");
}

renderCart();
