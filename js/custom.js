  let cartCount = 0;
  const cartCounter = document.getElementById('cart-count');
  const cartItemsContainer = document.getElementById('cart-items');
  const addToCartButtons = document.querySelectorAll('.add-to-cart');
  const cartSidebar = document.getElementById('cart-sidebar');
  const cartItems = [];

  function toggleCart() {
    cartSidebar.classList.toggle('open');
  }

  function removeItem(index) {
    cartItems.splice(index, 1);
    cartCount--;
    cartCounter.textContent = cartCount;
    renderCart();
  }

  function renderCart() {
    if (cartItems.length === 0) {
      cartItemsContainer.innerHTML = 'No items added.';
      return;
    }

    const itemsHtml = cartItems.map((item, index) => `
      <div class='border-bottom py-2 d-flex align-items-center justify-content-between'>
        <div class='d-flex align-items-center'>
          <img src="${item.imageSrc}" alt="${item.title}" style="width: 40px; height: 40px; object-fit: cover; margin-right: 10px;">
          <div>
            <div class='fw-bold'>${item.title}</div>
            <div class='text-muted'>${item.price}</div>
          </div>
        </div>
        <button class='btn btn-sm btn-outline-danger' onclick='removeItem(${index})'>&times;</button>
      </div>
    `).join('');

    cartItemsContainer.innerHTML = `
      ${itemsHtml}
      <button class="btn btn-success mt-3 w-100" onclick="sendOrderViaWhatsApp()">Send Order via WhatsApp</button>
    `;
  }

  function sendOrderViaWhatsApp() {
    const userName = document.getElementById('user-name').value.trim();
    if (!userName) {
      alert("Please enter your name before sending the order.");
      return;
    }

    const orderDetails = cartItems.map((item, i) => `${i + 1}. ${item.title} - ${item.price}`).join('%0A');
    const message = `Hello, my name is ${userName}. I'd like to order:%0A${orderDetails}`;
    const phoneNumber = "201020417971"; // replace with your WhatsApp number
    const url = `https://wa.me/${phoneNumber}?text=${message}`;
    window.open(url, '_blank');
  }

  addToCartButtons.forEach(button => {
    button.addEventListener('click', (e) => {
      const productCard = e.target.closest('.product-card');
      const title = productCard.querySelector('h5').textContent;
      const price = productCard.querySelector('p').textContent;
      const imageSrc = productCard.querySelector('img').src;

      cartItems.push({ title, price, imageSrc });
      cartCount++;
      cartCounter.textContent = cartCount;

      renderCart();
    });
  });
