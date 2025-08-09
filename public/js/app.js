


// In app.js
import { initAuth, showLogin, showRegister, logout  } from './auth.js';
import { initProducts, showProductDetails ,loadProducts, showAddProduct  } from './products.js';
import { initUI , showSection , showModal , closeModal,} from './ui.js';


// Make functions available for HTML onclick handlers
window.showSection = showSection;
window.closeModal = closeModal;
window.showModal = showModal;
window.showLogin = showLogin;      
window.showRegister = showRegister; 
window.showAddProduct = showAddProduct;

// Initialize with proper dependencies
document.addEventListener('DOMContentLoaded', () => {
  initUI(() => {
    // Callback when UI needs to load products
    loadProducts();
  });
  initAuth();
  initProducts();
});

// Make available for HTML
window.showSection = (sectionId) => {
  if (sectionId === 'products') {
    showSection(sectionId, loadProducts);
  } else {
    showSection(sectionId);
  }
};

window.showModal = showModal;
window.closeModal = closeModal;
window.logout = logout;
window.showProductDetails = showProductDetails;

// Tracking functions
window.trackWhatsAppClick = function(productId) {
    console.log('WhatsApp clicked for product:', productId);
    // Implement analytics tracking here
};

window.trackCallClick = function(productId) {
    console.log('Call clicked for product:', productId);
    // Implement analytics tracking here
};

window.shareProduct = function(productId) {
    const product = allProducts.find(p => p.id === productId);
    if (!product) return;
    
    const subject = `Bidhaa ya ${product.name} - Muganza Marketplace`;
    const body = `Jambo!\n\nNimekutafuta kwa bidhaa hii kwenye Muganza Marketplace:\n\n*Jina:* ${product.name}\n*Maelezo:* ${product.description}\n*Bei:* TSh ${product.price.toLocaleString()}\n*Eneo:* ${product.sellerLocation}\n\nPiga simu kwa: ${product.sellerPhone || '0740107466'}\n\n${product.imageUrl ? `Picha ya bidhaa: ${product.imageUrl}` : ''}`;
    
    window.location.href = `mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
};