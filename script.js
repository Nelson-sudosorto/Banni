// Variables
const loginSection = document.getElementById('login');
const registerSection = document.getElementById('register');
const homeSection = document.getElementById('home');
const menuSection = document.getElementById('menu');
const cartSection = document.getElementById('cart');

const btnGoToRegister = document.getElementById('btnGoToRegister');
const btnGoToLogin = document.getElementById('btnGoToLogin');

const btnToHome = document.getElementById('btnToHome');
const btnToMenu = document.getElementById('btnToMenu');
const btnToCart = document.getElementById('btnToCart');
const btnToMenuMain = document.getElementById('btnToMenuMain');

const btnToHomeFromMenu = document.getElementById('btnToHomeFromMenu');
const btnToMenuFromMenu = document.getElementById('btnToMenuFromMenu');
const btnToCartFromMenu = document.getElementById('btnToCartFromMenu');

const btnToHomeFromCart = document.getElementById('btnToHomeFromCart');
const btnToMenuFromCart = document.getElementById('btnToMenuFromCart');
const btnToCartFromCart = document.getElementById('btnToCartFromCart');

const loginForm = document.getElementById('loginForm');
const registerForm = document.getElementById('registerForm');
const checkoutForm = document.getElementById('checkoutForm');

const cartItemsContainer = document.getElementById('cartItems');
const addToCartButtons = document.querySelectorAll('.add-to-cart-btn');

let cart = [];

// Funciones de navegación
function showSection(sectionId) {
  loginSection.style.display = 'none';
  registerSection.style.display = 'none';
  homeSection.style.display = 'none';
  menuSection.style.display = 'none';
  cartSection.style.display = 'none';

  switch(sectionId) {
    case 'login':
      loginSection.style.display = 'block';
      break;
    case 'register':
      registerSection.style.display = 'block';
      break;
    case 'home':
      homeSection.style.display = 'block';
      break;
    case 'menu':
      menuSection.style.display = 'block';
      break;
    case 'cart':
      cartSection.style.display = 'block';
      break;
  }
}

btnGoToRegister.addEventListener('click', () => showSection('register'));
btnGoToLogin.addEventListener('click', () => showSection('login'));

btnToHome.addEventListener('click', () => showSection('home'));
btnToMenu.addEventListener('click', () => showSection('menu'));
btnToCart.addEventListener('click', () => showSection('cart'));
btnToMenuMain.addEventListener('click', () => showSection('menu'));

btnToHomeFromMenu.addEventListener('click', () => showSection('home'));
btnToMenuFromMenu.addEventListener('click', () => showSection('menu'));
btnToCartFromMenu.addEventListener('click', () => showSection('cart'));

btnToHomeFromCart.addEventListener('click', () => showSection('home'));
btnToMenuFromCart.addEventListener('click', () => showSection('menu'));
btnToCartFromCart.addEventListener('click', () => showSection('cart'));

// Función para mostrar notificación
function mostrarNotificacion(mensaje) {
  alert(mensaje);
}

// Función para actualizar UI del carrito
function updateCartUI() {
  cartItemsContainer.innerHTML = '';
  if (cart.length === 0) {
    cartItemsContainer.textContent = 'Tu carrito está vacío.';
    return;
  }
  cart.forEach((item, index) => {
    const div = document.createElement('div');
    div.textContent = `${item.name} x${item.qty} - $${(item.price * item.qty).toFixed(2)}`;
    // Botón para eliminar item
    const btnRemove = document.createElement('button');
    btnRemove.textContent = 'Eliminar';
    btnRemove.addEventListener('click', () => {
      cart.splice(index, 1);
      updateCartUI();
    });
    div.appendChild(btnRemove);
    cartItemsContainer.appendChild(div);
  });
}

// Agregar productos al carrito
addToCartButtons.forEach(button => {
  button.addEventListener('click', () => {
    const name = button.dataset.name;
    const price = parseFloat(button.dataset.price);
    const existingItem = cart.find(item => item.name === name);
    if (existingItem) {
      existingItem.qty++;
    } else {
      cart.push({ name, price, qty: 1 });
    }
    mostrarNotificacion(`Agregaste ${name} al carrito`);
    updateCartUI();
  });
});

// Validar login - aquí simple simulación
loginForm.addEventListener('submit', e => {
  e.preventDefault();
  // Puedes agregar validación real o autenticación aquí
  mostrarNotificacion('Sesión iniciada');
  showSection('home');
});

// Validar registro - aquí simple simulación
registerForm.addEventListener('submit', e => {
  e.preventDefault();
  mostrarNotificacion('Registro exitoso');
  showSection('login');
});

// Validar y enviar pedido
checkoutForm.addEventListener('submit', e => {
  e.preventDefault();

  if (cart.length === 0) {
    alert('Tu carrito está vacío.');
    return;
  }

  const address = document.getElementById('address').value.trim();
  const deliveryTime = document.getElementById('deliveryTime').value;

  const banco = document.getElementById('Banco').value;
  const tipoCuenta = document.getElementById('tipoCuenta').value;
  const numeroCuenta = document.getElementById('numeroCuenta').value.trim();
  const nombreTitular = document.getElementById('nombreTitular').value.trim();
  const duiTitular = document.getElementById('duiTitular').value.trim();

  if (!address || !deliveryTime) {
    alert('Por favor completa los datos de entrega.');
    return;
  }

  if (!banco || !tipoCuenta || !numeroCuenta || !nombreTitular || !duiTitular) {
    alert('Por favor completa todos los datos bancarios para poder enviar el pedido.');
    return;
  }

  // Construir mensaje
  let mensaje = `Pedido para entrega\nDirección: ${address}\nHora: ${deliveryTime}\n\nDatos bancarios:\n- Banco: ${banco}\n- Tipo de cuenta: ${tipoCuenta}\n- Número de cuenta: ${numeroCuenta}\n- Nombre titular: ${nombreTitular}\n- DUI titular: ${duiTitular}\n\nItems:\n`;

  cart.forEach(item => {
    mensaje += `- ${item.name} x${item.qty} = $${(item.price * item.qty).toFixed(2)}\n`;
  });

  const total = cart.reduce((acc, item) => acc + item.price * item.qty, 0);
  mensaje += `\nTotal: $${total.toFixed(2)}`;

  const mensajeEncoded = encodeURIComponent(mensaje);
  const numeroWhatsApp = '50376345594';
  const urlWhatsApp = `https://wa.me/${numeroWhatsApp}?text=${mensajeEncoded}`;

  window.open(urlWhatsApp, '_blank');

  mostrarNotificacion('Pedido enviado a WhatsApp');
  cart = [];
  updateCartUI();
  checkoutForm.reset();
  showSection('home');
});

// Inicializar UI
updateCartUI();
showSection('login');
