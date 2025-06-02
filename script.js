
function showSection(sectionId) {
  const sections = document.querySelectorAll('section');
  sections.forEach(sec => {
    if (sec.id === sectionId) sec.classList.add('active');
    else sec.classList.remove('active');
  });
}

let cart = [];

function updateCartUI() {
  const cartItemsContainer = document.getElementById('cartItems');
  const cartTotal = document.getElementById('cartTotal');
  cartItemsContainer.innerHTML = '';
  let total = 0;

  cart.forEach(item => {
    const div = document.createElement('div');
    div.classList.add('cart-item');
    div.innerHTML = `<p>${item.name} x${item.qty} - $${(item.price * item.qty).toFixed(2)}</p>`;
    cartItemsContainer.appendChild(div);
    total += item.price * item.qty;
  });

  cartTotal.textContent = `Total: $${total.toFixed(2)}`;
}

// Mostrar notificación visual
function mostrarNotificacion(mensaje) {
  const noti = document.getElementById("notification");
  noti.textContent = mensaje;
  noti.classList.remove("hidden");
  noti.classList.add("show");
  setTimeout(() => {
    noti.classList.remove("show");
    setTimeout(() => noti.classList.add("hidden"), 300);
  }, 3000);
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

  // Login simulado
  const loginForm = document.getElementById('loginForm');
  loginForm.addEventListener('submit', e => {
    e.preventDefault();
    showSection('home');
    loginForm.reset();
  });

  // Registro simulado
  const registerForm = document.getElementById('registerForm');
  registerForm.addEventListener('submit', e => {
    e.preventDefault();
    showSection('login');
    registerForm.reset();
  });

  // Agregar al carrito
  document.querySelectorAll('.add-to-cart-btn').forEach(button => {
    button.addEventListener('click', () => {
      const name = button.dataset.name;
      const price = parseFloat(button.dataset.price);
      const existing = cart.find(item => item.name === name);
      if (existing) {
        existing.qty += 1;
      } else {
        cart.push({ name, price, qty: 1 });
      }
      updateCartUI();
      mostrarNotificacion("Producto agregado al carrito");
    });
  });

  // Finalizar compra
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
      alert('Por favor completa todos los campos de entrega.');
      return;
    }

    // Crear mensaje para WhatsApp
    let mensaje = "📦 *Nuevo Pedido de Fresh Eats*%0A%0A";
    cart.forEach(item => {
      mensaje += `🍽️ ${item.name} x${item.qty} - $${(item.price * item.qty).toFixed(2)}%0A`;
    });
    const total = cart.reduce((sum, item) => sum + item.price * item.qty, 0);
    mensaje += `%0A💰 Total: $${total.toFixed(2)}%0A`;
    mensaje += `📍 Dirección: ${address}%0A🕒 Entrega para: ${deliveryTime}%0A`;

    const numeroWhatsApp = "50376345594";
    const urlWhatsApp = `https://wa.me/${numeroWhatsApp}?text=${mensaje}`;
    window.open(urlWhatsApp, "_blank");

    mostrarNotificacion("✅ Pedido enviado a WhatsApp");

    cart.length = 0;
    updateCartUI();
    checkoutForm.reset();
    showSection('home');
  });
});
