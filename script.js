function showSection(sectionId) {
  const sections = document.querySelectorAll('section');
  sections.forEach(sec => {
    if (sec.id === sectionId) sec.classList.add('active');
    else sec.classList.remove('active');
  });
}

document.addEventListener('DOMContentLoaded', () => {
  showSection('login');

  // Navegación
  document.querySelectorAll('#btnGoToRegister').forEach(btn =>
    btn.addEventListener('click', () => showSection('register'))
  );
  document.querySelectorAll('#btnGoToLogin').forEach(btn =>
    btn.addEventListener('click', () => showSection('login'))
  );

  document.querySelectorAll('#btnToHome').forEach(btn =>
    btn.addEventListener('click', () => showSection('home'))
  );
  document.querySelectorAll('#btnToMenu').forEach(btn =>
    btn.addEventListener('click', () => showSection('menu'))
  );
  document.querySelectorAll('#btnToCart').forEach(btn =>
    btn.addEventListener('click', () => showSection('cart'))
  );

  // Login
  const loginForm = document.getElementById('loginForm');
  loginForm.addEventListener('submit', e => {
    e.preventDefault();
    // Aquí validación real si quieres
    alert('Login exitoso');
    showSection('home');
  });

  // Registro
  const registerForm = document.getElementById('registerForm');
  registerForm.addEventListener('submit', e => {
    e.preventDefault();
    alert('Registro exitoso, ahora inicia sesión');
    showSection('login');
  });

  // Carrito
  const cart = [];
  const cartItemsDiv = document.getElementById('cartItems');
  const cartTotalH3 = document.getElementById('cartTotal');

  function updateCartUI() {
    cartItemsDiv.innerHTML = '';
    let total = 0;
    cart.forEach((item, i) => {
      const div = document.createElement('div');
      div.className = 'cart-item';
      div.innerHTML = `
        <span>${item.name} x${item.qty}</span>
        <span>$${(item.price * item.qty).toFixed(2)}</span>
        <button data-index="${i}" class="remove-btn">X</button>
      `;
      cartItemsDiv.appendChild(div);
      total += item.price * item.qty;
    });
    cartTotalH3.textContent = `Total: $${total.toFixed(2)}`;

    document.querySelectorAll('.remove-btn').forEach(btn => {
      btn.addEventListener('click', e => {
        const index = e.target.getAttribute('data-index');
        cart.splice(index, 1);
        updateCartUI();
      });
    });
  }

  // Agregar al carrito
  document.querySelectorAll('.add-to-cart-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const name = btn.getAttribute('data-name');
      const price = parseFloat(btn.getAttribute('data-price'));
      const existing = cart.find(item => item.name === name);
      if (existing) {
        existing.qty++;
      } else {
        cart.push({ name, price, qty: 1 });
      }
      alert(`Agregaste ${name} al carrito`);
      updateCartUI();
    });
  });

  // Checkout
  const checkoutForm = document.getElementById('checkoutForm');
  checkoutForm.addEventListener('submit', e => {
    e.preventDefault();
    if (cart.length === 0) {
      alert('Tu carrito está vacío.');
      return;
    }
    const address = document.getElementById('address').value.trim();
    const deliveryTime = document.getElementById('deliveryTime').value;
    if (!address || !deliveryTime) {
      alert('Por favor completa los datos de entrega.');
      return;
    }
    alert(`Compra realizada!\nDirección: ${address}\nEntrega para: ${deliveryTime}`);
    cart.length = 0; // vaciar carrito
    updateCartUI();
    showSection('home');
    checkoutForm.reset();
  });
});

function mostrarNotificacion(mensaje) {
  const noti = document.getElementById("notification");
  noti.textContent = "✅ " + mensaje;
  noti.classList.remove("hidden");
  noti.classList.add("show");

  setTimeout(() => {
    noti.classList.remove("show");
    setTimeout(() => noti.classList.add("hidden"), 400);
  }, 3000); // Se muestra por 3 segundos
}
