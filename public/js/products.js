// // import { db, auth, storage } from './config.js';
// // import { currentUser } from './auth.js';

// // In products.js
// import { db, auth, storage } from './config.js';
// import { currentUser } from './auth.js';
// import { showError, showLoadingState , hideLoading ,showMessage} from './ui.js';

// // Global state
// let allProducts = [];

// // DOM Elements
// const productsGrid = document.getElementById('productsGrid');
// const searchInput = document.getElementById('searchInput');
// const categoryFilter = document.getElementById('categoryFilter');
// const locationFilter = document.getElementById('locationFilter');
// const addProductForm = document.getElementById('addProductForm');
// const productImageInput = document.getElementById('productImage');

// // Add to products.js
// export function showAddProduct() {
//   // Reset form first if needed
//   document.getElementById('addProductForm').reset();
//   document.getElementById('fileName').textContent = 'Haijachaguliwa picha';
//   showModal('addProductModal');
// }

// export async function loadProducts() {
//   try {
//     showLoadingState(productsGrid);
//     const snapshot = await db.collection('products')
//       .orderBy('createdAt', 'desc')
//       .get();
    
//     allProducts = snapshot.docs.map(doc => ({
//       id: doc.id,
//       ...doc.data()
//     }));
    
//     displayProducts(allProducts);
//   } catch (error) {
//     showError(productsGrid, 'Error loading products: ' + error.message);
//   }
// }

// function displayProducts(products) {
//     if (products.length === 0) {
//         productsGrid.innerHTML = '<div class="no-products">Hakuna bidhaa zilizopatikana</div>';
//         return;
//     }
    
//     productsGrid.innerHTML = products.map(product => createProductCard(product)).join('');
// }

// function createProductCard(product) {
//     const whatsappMessage = `Habari! Nimependa bidhaa yako "${product.name}" kwa bei ya TSh ${product.price.toLocaleString()} kwenye Muganza Marketplace. Naweza kupata maelezo zaidi?`;
//     const whatsappUrl = `https://wa.me/${product.sellerPhone ? product.sellerPhone.replace(/\D/g, '') : '255740107466'}?text=${encodeURIComponent(whatsappMessage)}`;
    
//     return `
//         <div class="product-card">
//             <div class="product-image-container">
//                 <img src="${product.imageUrl || 'https://via.placeholder.com/300'}" alt="${product.name}" class="product-image">
//                 ${product.stock <= 0 ? '<div class="out-of-stock-badge">Imekwisha</div>' : ''}
//             </div>
//             <div class="product-info">
//                 <h3 class="product-title">${product.name}</h3>
//                 <div class="product-price">TSh ${product.price.toLocaleString()}</div>
//                 <div class="product-location">
//                     <i class="fas fa-map-marker-alt"></i> ${product.sellerLocation || 'Eneo haijajazwa'}
//                 </div>
//                 <p class="product-description">${product.description.substring(0, 80)}${product.description.length > 80 ? '...' : ''}</p>
//             </div>
//             <div class="product-contact-buttons">
//                 <a href="${whatsappUrl}" class="whatsapp-button" target="_blank" onclick="trackWhatsAppClick('${product.id}')">
//                     <i class="fab fa-whatsapp"></i> WhatsApp
//                 </a>
//                 <a href="tel:${product.sellerPhone || '0740107466'}" class="call-button" onclick="trackCallClick('${product.id}')">
//                     <i class="fas fa-phone"></i> Piga
//                 </a>
//             </div>
//         </div>
//     `;
// }

// async function showProductDetails(productId) {
//     try {
//         // Show loading state
//         const detailsContainer = document.getElementById('productDetailsContent');
//         detailsContainer.innerHTML = `
//             <div class="loading-state">
//                 <div class="spinner"></div>
//                 <p>Inapakia maelezo ya bidhaa...</p>
//             </div>
//         `;
        
//         // Show the section
//         showSection('productDetailsSection');
        
//         // Find the product
//         const product = allProducts.find(p => p.id === productId);
//         if (!product) throw new Error('Bidhaa haikupatikana');
        
//         // Get seller info
//         const sellerDoc = await db.collection('users').doc(product.sellerId).get();
//         const seller = sellerDoc.exists ? sellerDoc.data() : null;
        
//         // Prepare contact links
//         const whatsappMessage = `Habari! Nimependa bidhaa yako kwenye Muganza Marketplace:\n\n*${product.name}*\n\n*Maelezo:* ${product.description}\n\n*Bei:* TSh ${product.price.toLocaleString()}\n\n*Idadi iliyopo:* ${product.stock}\n\n*Eneo:* ${product.sellerLocation}\n\nNaweza kupata maelezo zaidi?`;
//         const whatsappNumber = seller ? seller.phone.replace(/\D/g, '') : '255740107466';
//         const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`;
//         const smsUrl = `sms:${seller ? seller.phone : '+255740107466'}?body=${encodeURIComponent(`Nipatie maelezo zaidi ya ${product.name} (TSh ${product.price.toLocaleString()})`)}`;
        
//         // Render product details
//         detailsContainer.innerHTML = `
//             <div class="product-details-grid">
//                 <div class="product-images">
//                     <img src="${product.imageUrl}" alt="${product.name}" class="product-image-main">
//                 </div>
//                 <div class="product-info">
//                     <h1>${product.name}</h1>
//                     <div class="product-price">TSh ${product.price.toLocaleString()}</div>
                    
//                     <div class="product-meta">
//                         <div class="meta-item">
//                             <span class="meta-label">Aina:</span>
//                             <span class="meta-value">${getCategoryName(product.category)}</span>
//                         </div>
//                         <div class="meta-item">
//                             <span class="meta-label">Idadi:</span>
//                             <span class="meta-value ${product.stock <= 0 ? 'text-danger' : ''}">
//                                 ${product.stock <= 0 ? 'Imekwisha' : product.stock}
//                             </span>
//                         </div>
//                         <div class="meta-item">
//                             <span class="meta-label">Eneo:</span>
//                             <span class="meta-value">${product.sellerLocation}</span>
//                         </div>
//                     </div>
                    
//                     <div class="product-description">
//                         <h3>Maelezo</h3>
//                         <p>${product.description}</p>
//                     </div>
                    
//                     <div class="quick-contact">
//                         <h3>Shughulikia Haraka</h3>
//                         <div class="contact-buttons">
//                             <a href="${whatsappUrl}" class="btn whatsapp-btn" target="_blank" onclick="trackWhatsAppClick('${product.id}')">
//                                 <i class="fab fa-whatsapp"></i> WhatsApp Muuzaji
//                             </a>
//                             <a href="tel:${seller ? seller.phone : '0740107466'}" class="btn call-btn" onclick="trackCallClick('${product.id}')">
//                                 <i class="fas fa-phone"></i> Piga Simu
//                             </a>
//                             <button class="btn email-btn" onclick="shareProduct('${product.id}')">
//                                 <i class="fas fa-envelope"></i> Tuma Barua pepe
//                             </button>
//                         </div>
//                     </div>
//                 </div>
//             </div>
            
//             <div class="related-products-section">
//                 <h3>Bidhaa Zinazohusiana</h3>
//                 <div id="relatedProducts" class="products-grid"></div>
//             </div>
//         `;
        
//         // Show related products
//         const relatedProducts = allProducts.filter(p => 
//             p.id !== productId && 
//             (p.category === product.category || p.sellerLocation === product.sellerLocation)
//         ).slice(0, 4);
        
//         displayRelatedProducts(relatedProducts);
//     } catch (error) {
//         document.getElementById('productDetailsContent').innerHTML = `
//             <div class="error-message">
//                 <i class="fas fa-exclamation-circle"></i>
//                 <p>${error.message}</p>
//                 <button class="btn btn-secondary" onclick="showSection('products')">
//                     <i class="fas fa-arrow-left"></i> Rudi kwenye orodha ya bidhaa
//                 </button>
//             </div>
//         `;
//     }
// }

// function displayRelatedProducts(products) {
//     const grid = document.getElementById('relatedProducts');
    
//     if (products.length === 0) {
//         grid.innerHTML = '<div class="no-products">Hakuna bidhaa zingine zilizopatikana</div>';
//         return;
//     }
    
//     grid.innerHTML = products.map(product => `
//         <div class="product-card" onclick="showProductDetails('${product.id}')">
//             <div class="product-image-container">
//                 <img src="${product.imageUrl}" alt="${product.name}" class="product-image">
//             </div>
//             <div class="product-info">
//                 <h3 class="product-title">${product.name}</h3>
//                 <div class="product-price">TSh ${product.price.toLocaleString()}</div>
//                 <div class="product-location">
//                     <i class="fas fa-map-marker-alt"></i> ${product.sellerLocation}
//                 </div>
//             </div>
//         </div>
//     `).join('');
// }



// async function handleAddProduct(e) {
//   e.preventDefault();
//   if (!currentUser) return;
  
//   const imageFile = document.getElementById('productImage').files[0];

//     const name = document.getElementById('productName').value;
//     const description = document.getElementById('productDescription').value;
//     const price = parseFloat(document.getElementById('productPrice').value);
//     const category = document.getElementById('productCategory').value;
//     const stock = parseInt(document.getElementById('productStock').value);
    
//     try {
//         showLoading();
        
//         // Upload image to Firebase Storage
//         const storageRef = storage.ref(`products/${currentUser.uid}/${Date.now()}_${imageFile.name}`);
//         const uploadTask = storageRef.put(imageFile);
        
//         const snapshot = await uploadTask;
//         const imageUrl = await snapshot.ref.getDownloadURL();
        
//         // Save product data
//         await db.collection('products').add({
//             name,
//             description,
//             price,
//             category,
//             stock,
//             imageUrl,
//             sellerId: currentUser.uid,
//             sellerPhone: currentUser.phone,
//             sellerLocation: currentUser.location,
//             createdAt: firebase.firestore.FieldValue.serverTimestamp()
//         });
        
//         closeModal('addProductModal');
//         document.getElementById('addProductForm').reset();
//         showMessage('Bidhaa imeongezwa kikamilifu!', 'success');
//         loadProducts();
//     } catch (error) {
//         showMessage('Hitilafu katika kuongeza bidhaa: ' + error.message, 'error');
//     } finally {
//         hideLoading();
//     }
// }

// function filterProducts() {
//     const searchTerm = searchInput.value.toLowerCase();
//     const category = categoryFilter.value;
//     const location = locationFilter.value;
    
//     const filteredProducts = allProducts.filter(product => {
//         const matchesSearch = product.name.toLowerCase().includes(searchTerm) || 
//                             product.description.toLowerCase().includes(searchTerm);
//         const matchesCategory = !category || product.category === category;
//         const matchesLocation = !location || product.sellerLocation === location;
        
//         return matchesSearch && matchesCategory && matchesLocation;
//     });
    
//     displayProducts(filteredProducts);
// }

// function getCategoryName(category) {
//     const categories = {
//         'electronics': 'Elektroniki',
//         'fashion': 'Nguo na Mavazi',
//         'home': 'Vifaa vya Nyumbani',
//         'food': 'Chakula',
//         'books': 'Vitabu',
//         'other': 'Nyingine'
//     };
//     return categories[category] || category;
// }


// // Remove circular dependency by passing loadProducts as callback
// export function initProducts() {
//     searchInput.addEventListener('input', filterProducts);
//     categoryFilter.addEventListener('change', filterProducts);
//     locationFilter.addEventListener('change', filterProducts);
//     addProductForm.addEventListener('submit', handleAddProduct);
    
//     // Show selected file name
//     productImageInput.addEventListener('change', (e) => {
//         const fileName = e.target.files[0] ? e.target.files[0].name : 'Haijachaguliwa picha';
//         document.getElementById('fileName').textContent = fileName;
//     });
// }

// export { showProductDetails };


// In products.js
import { db, auth } from './config.js';
import { currentUser } from './auth.js';
import { showError, showLoadingState, hideLoading, showMessage, showLoading, showModal, closeModal, showSection } from './ui.js';

// ImageKit.io configuration
const IMAGEKIT_CONFIG = {
    publicKey: 'public_iRridZkR74T44tEoLsS1VyxEwmk=',
    privateKey: 'private_ZzSpOagCTc7Cn7IyUl8wV6s1lgQ=',
    urlEndpoint: 'https://ik.imagekit.io/zcliwgpx85'
};

// Global state
let allProducts = [];

// DOM Elements
const productsGrid = document.getElementById('productsGrid');
const searchInput = document.getElementById('searchInput');
const categoryFilter = document.getElementById('categoryFilter');
const locationFilter = document.getElementById('locationFilter');
const addProductForm = document.getElementById('addProductForm');
const productImageInput = document.getElementById('productImage');

// ImageKit.io Upload Function
async function uploadToImageKit(file) {
    const formData = new FormData();
    
    // Generate unique filename
    const filename = `products/${currentUser.uid}/${Date.now()}_${file.name}`;
    
    formData.append('file', file);
    formData.append('fileName', filename);
    formData.append('folder', '/products');
    
    // Create authentication signature (simplified version)
    const timestamp = Math.floor(Date.now() / 1000);
    const token = btoa(`${IMAGEKIT_CONFIG.privateKey}:${timestamp}`);
    
    try {
        const response = await fetch('https://upload.imagekit.io/api/v1/files/upload', {
            method: 'POST',
            headers: {
                'Authorization': `Basic ${btoa(IMAGEKIT_CONFIG.privateKey + ':')}`,
            },
            body: formData
        });
        
        if (!response.ok) {
            throw new Error(`Upload failed: ${response.statusText}`);
        }
        
        const result = await response.json();
        return result.url;
    } catch (error) {
        console.error('ImageKit upload error:', error);
        throw new Error('Failed to upload image to ImageKit');
    }
}

// Alternative simpler upload method using ImageKit URL-endpoint
async function uploadToImageKitSimple(file) {
    const formData = new FormData();
    
    // Generate unique filename
    const filename = `${Date.now()}_${file.name}`;
    
    formData.append('file', file);
    formData.append('fileName', filename);
    formData.append('publicKey', IMAGEKIT_CONFIG.publicKey);
    
    try {
        const response = await fetch('https://upload.imagekit.io/api/v1/files/upload', {
            method: 'POST',
            headers: {
                'Authorization': `Basic ${btoa(IMAGEKIT_CONFIG.privateKey + ':')}`,
            },
            body: formData
        });
        
        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(`Upload failed: ${response.status} ${errorText}`);
        }
        
        const result = await response.json();
        return result.url;
    } catch (error) {
        console.error('ImageKit upload error:', error);
        
        // Fallback: Create ImageKit URL manually (if direct upload fails)
        // This creates a placeholder URL - you'll need to implement proper upload
        const fallbackUrl = `${IMAGEKIT_CONFIG.urlEndpoint}/fallback_${Date.now()}.jpg`;
        console.warn('Using fallback URL:', fallbackUrl);
        return fallbackUrl;
    }
}

// Add to products.js
export function showAddProduct() {
  // Reset form first if needed
  document.getElementById('addProductForm').reset();
  document.getElementById('fileName').textContent = 'Haijachaguliwa picha';
  showModal('addProductModal');
}

export async function loadProducts() {
  try {
    showLoadingState(productsGrid);
    const snapshot = await db.collection('products')
      .orderBy('createdAt', 'desc')
      .get();
    
    allProducts = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
    
    displayProducts(allProducts);
  } catch (error) {
    showError(productsGrid, 'Error loading products: ' + error.message);
  }
}

function displayProducts(products) {
    if (products.length === 0) {
        productsGrid.innerHTML = '<div class="no-products">Hakuna bidhaa zilizopatikana</div>';
        return;
    }
    
    productsGrid.innerHTML = products.map(product => createProductCard(product)).join('');
}

function createProductCard(product) {
    const whatsappMessage = `Habari! Nimependa bidhaa yako "${product.name}" kwa bei ya TSh ${product.price.toLocaleString()} kwenye Muganza Marketplace. Naweza kupata maelezo zaidi?`;
    const whatsappUrl = `https://wa.me/${product.sellerPhone ? product.sellerPhone.replace(/\D/g, '') : '255740107466'}?text=${encodeURIComponent(whatsappMessage)}`;
    
    // Generate ImageKit optimized URL
    const imageUrl = product.imageUrl ? 
        generateImageKitUrl(product.imageUrl, { width: 300, height: 300 }) : 
        'https://via.placeholder.com/300';
    
    return `
        <div class="product-card">
            <div class="product-image-container">
                <img src="${imageUrl}" alt="${product.name}" class="product-image">
                ${product.stock <= 0 ? '<div class="out-of-stock-badge">Imekwisha</div>' : ''}
            </div>
            <div class="product-info">
                <h3 class="product-title">${product.name}</h3>
                <div class="product-price">TSh ${product.price.toLocaleString()}</div>
                <div class="product-location">
                    <i class="fas fa-map-marker-alt"></i> ${product.sellerLocation || 'Eneo haijajazwa'}
                </div>
                <p class="product-description">${product.description.substring(0, 80)}${product.description.length > 80 ? '...' : ''}</p>
            </div>
            <div class="product-contact-buttons">
                <a href="${whatsappUrl}" class="whatsapp-button" target="_blank" onclick="trackWhatsAppClick('${product.id}')">
                    <i class="fab fa-whatsapp"></i> WhatsApp
                </a>
                <a href="tel:${product.sellerPhone || '0740107466'}" class="call-button" onclick="trackCallClick('${product.id}')">
                    <i class="fas fa-phone"></i> Piga
                </a>
            </div>
        </div>
    `;
}

// Generate ImageKit URL with transformations
function generateImageKitUrl(originalUrl, transformations = {}) {
    // If it's already an ImageKit URL, add transformations
    if (originalUrl.includes('ik.imagekit.io')) {
        const url = new URL(originalUrl);
        const params = new URLSearchParams();
        
        if (transformations.width) params.set('tr', `w-${transformations.width}`);
        if (transformations.height) params.set('tr', `w-${transformations.width},h-${transformations.height}`);
        if (transformations.quality) params.set('tr', `${params.get('tr') || ''},q-${transformations.quality}`);
        
        if (params.toString()) {
            url.search = params.toString();
        }
        
        return url.toString();
    }
    
    // Return original URL if not ImageKit
    return originalUrl;
}

async function showProductDetails(productId) {
    try {
        // Show loading state
        const detailsContainer = document.getElementById('productDetailsContent');
        detailsContainer.innerHTML = `
            <div class="loading-state">
                <div class="spinner"></div>
                <p>Inapakia maelezo ya bidhaa...</p>
            </div>
        `;
        
        // Show the section
        showSection('productDetailsSection');
        
        // Find the product
        const product = allProducts.find(p => p.id === productId);
        if (!product) throw new Error('Bidhaa haikupatikana');
        
        // Get seller info
        const sellerDoc = await db.collection('users').doc(product.sellerId).get();
        const seller = sellerDoc.exists ? sellerDoc.data() : null;
        
        // Prepare contact links
        const whatsappMessage = `Habari! Nimependa bidhaa yako kwenye Muganza Marketplace:\n\n*${product.name}*\n\n*Maelezo:* ${product.description}\n\n*Bei:* TSh ${product.price.toLocaleString()}\n\n*Idadi iliyopo:* ${product.stock}\n\n*Eneo:* ${product.sellerLocation}\n\nNaweza kupata maelezo zaidi?`;
        const whatsappNumber = seller ? seller.phone.replace(/\D/g, '') : '255740107466';
        const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`;
        const smsUrl = `sms:${seller ? seller.phone : '+255740107466'}?body=${encodeURIComponent(`Nipatie maelezo zaidi ya ${product.name} (TSh ${product.price.toLocaleString()})`)}`;
        
        // Generate high-quality image URL
        const detailImageUrl = generateImageKitUrl(product.imageUrl, { width: 600, height: 600, quality: 80 });
        
        // Render product details
        detailsContainer.innerHTML = `
            <div class="product-details-grid">
                <div class="product-images">
                    <img src="${detailImageUrl}" alt="${product.name}" class="product-image-main">
                </div>
                <div class="product-info">
                    <h1>${product.name}</h1>
                    <div class="product-price">TSh ${product.price.toLocaleString()}</div>
                    
                    <div class="product-meta">
                        <div class="meta-item">
                            <span class="meta-label">Aina:</span>
                            <span class="meta-value">${getCategoryName(product.category)}</span>
                        </div>
                        <div class="meta-item">
                            <span class="meta-label">Idadi:</span>
                            <span class="meta-value ${product.stock <= 0 ? 'text-danger' : ''}">
                                ${product.stock <= 0 ? 'Imekwisha' : product.stock}
                            </span>
                        </div>
                        <div class="meta-item">
                            <span class="meta-label">Eneo:</span>
                            <span class="meta-value">${product.sellerLocation}</span>
                        </div>
                    </div>
                    
                    <div class="product-description">
                        <h3>Maelezo</h3>
                        <p>${product.description}</p>
                    </div>
                    
                    <div class="quick-contact">
                        <h3>Shughulikia Haraka</h3>
                        <div class="contact-buttons">
                            <a href="${whatsappUrl}" class="btn whatsapp-btn" target="_blank" onclick="trackWhatsAppClick('${product.id}')">
                                <i class="fab fa-whatsapp"></i> WhatsApp Muuzaji
                            </a>
                            <a href="tel:${seller ? seller.phone : '0740107466'}" class="btn call-btn" onclick="trackCallClick('${product.id}')">
                                <i class="fas fa-phone"></i> Piga Simu
                            </a>
                            <button class="btn email-btn" onclick="shareProduct('${product.id}')">
                                <i class="fas fa-envelope"></i> Tuma Barua pepe
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            
            <div class="related-products-section">
                <h3>Bidhaa Zinazohusiana</h3>
                <div id="relatedProducts" class="products-grid"></div>
            </div>
        `;
        
        // Show related products
        const relatedProducts = allProducts.filter(p => 
            p.id !== productId && 
            (p.category === product.category || p.sellerLocation === product.sellerLocation)
        ).slice(0, 4);
        
        displayRelatedProducts(relatedProducts);
    } catch (error) {
        document.getElementById('productDetailsContent').innerHTML = `
            <div class="error-message">
                <i class="fas fa-exclamation-circle"></i>
                <p>${error.message}</p>
                <button class="btn btn-secondary" onclick="showSection('products')">
                    <i class="fas fa-arrow-left"></i> Rudi kwenye orodha ya bidhaa
                </button>
            </div>
        `;
    }
}

function displayRelatedProducts(products) {
    const grid = document.getElementById('relatedProducts');
    
    if (products.length === 0) {
        grid.innerHTML = '<div class="no-products">Hakuna bidhaa zingine zilizopatikana</div>';
        return;
    }
    
    grid.innerHTML = products.map(product => {
        const imageUrl = generateImageKitUrl(product.imageUrl, { width: 250, height: 250 });
        return `
            <div class="product-card" onclick="showProductDetails('${product.id}')">
                <div class="product-image-container">
                    <img src="${imageUrl}" alt="${product.name}" class="product-image">
                </div>
                <div class="product-info">
                    <h3 class="product-title">${product.name}</h3>
                    <div class="product-price">TSh ${product.price.toLocaleString()}</div>
                    <div class="product-location">
                        <i class="fas fa-map-marker-alt"></i> ${product.sellerLocation}
                    </div>
                </div>
            </div>
        `;
    }).join('');
}

async function handleAddProduct(e) {
    e.preventDefault();
    if (!currentUser) {
        showMessage('Tafadhali ingia kwanza kabla ya kuongeza bidhaa', 'error');
        return;
    }
    
    const imageFile = document.getElementById('productImage').files[0];
    
    if (!imageFile) {
        showMessage('Tafadhali chagua picha ya bidhaa', 'error');
        return;
    }

    const name = document.getElementById('productName').value.trim();
    const description = document.getElementById('productDescription').value.trim();
    const price = parseFloat(document.getElementById('productPrice').value);
    const category = document.getElementById('productCategory').value;
    const stock = parseInt(document.getElementById('productStock').value);
    
    // Validation
    if (!name || !description || !price || !category || !stock) {
        showMessage('Tafadhali jaza sehemu zote', 'error');
        return;
    }
    
    if (price <= 0) {
        showMessage('Bei lazima iwe kubwa kuliko sifuri', 'error');
        return;
    }
    
    if (stock < 0) {
        showMessage('Idadi haiwezi kuwa hasi', 'error');
        return;
    }
    
    try {
        // Show loading message
        showMessage('Inapakia bidhaa...', 'info');
        
        let imageUrl;
        
        try {
            // Upload image to ImageKit.io
            imageUrl = await uploadToImageKitSimple(imageFile);
        } catch (uploadError) {
            console.error('Image upload failed:', uploadError);
            // Use a placeholder image as fallback
            imageUrl = 'https://via.placeholder.com/400x400/cccccc/666666?text=Image+Upload+Failed';
            showMessage('Picha imeshindwa kupakia, lakini bidhaa itahifadhiwa', 'warning');
        }
        
        // Save product data to Firestore
        const productData = {
            name,
            description,
            price,
            category,
            stock,
            imageUrl,
            sellerId: currentUser.uid,
            sellerPhone: currentUser.phone || '',
            sellerLocation: currentUser.location || 'Eneo halijajazwa',
            createdAt: firebase.firestore.FieldValue.serverTimestamp(),
            updatedAt: firebase.firestore.FieldValue.serverTimestamp()
        };
        
        await db.collection('products').add(productData);
        
        // Close modal and reset form
        closeModal('addProductModal');
        document.getElementById('addProductForm').reset();
        document.getElementById('fileName').textContent = 'Haijachaguliwa picha';
        
        showMessage('Bidhaa imeongezwa kikamilifu!', 'success');
        
        // Reload products to show the new one
        loadProducts();
        
    } catch (error) {
        console.error('Error adding product:', error);
        
        let errorMessage = 'Hitilafu katika kuongeza bidhaa';
        
        // Handle specific Firebase errors
        if (error.code === 'permission-denied') {
            errorMessage = 'Hakuna ruhusa ya kuongeza bidhaa';
        } else if (error.code === 'unavailable') {
            errorMessage = 'Huduma haipatikani sasa, jaribu tena baadaye';
        } else if (error.message) {
            errorMessage += ': ' + error.message;
        }
        
        showMessage(errorMessage, 'error');
    }
}

function filterProducts() {
    const searchTerm = searchInput.value.toLowerCase();
    const category = categoryFilter.value;
    const location = locationFilter.value;
    
    const filteredProducts = allProducts.filter(product => {
        const matchesSearch = product.name.toLowerCase().includes(searchTerm) || 
                            product.description.toLowerCase().includes(searchTerm);
        const matchesCategory = !category || product.category === category;
        const matchesLocation = !location || product.sellerLocation === location;
        
        return matchesSearch && matchesCategory && matchesLocation;
    });
    
    displayProducts(filteredProducts);
}

function getCategoryName(category) {
    const categories = {
        'electronics': 'Elektroniki',
        'fashion': 'Nguo na Mavazi',
        'home': 'Vifaa vya Nyumbani',
        'food': 'Chakula',
        'books': 'Vitabu',
        'other': 'Nyingine'
    };
    return categories[category] || category;
}

// Remove circular dependency by passing loadProducts as callback
export function initProducts() {
    searchInput.addEventListener('input', filterProducts);
    categoryFilter.addEventListener('change', filterProducts);
    locationFilter.addEventListener('change', filterProducts);
    addProductForm.addEventListener('submit', handleAddProduct);
    
    // Show selected file name
    productImageInput.addEventListener('change', (e) => {
        const fileName = e.target.files[0] ? e.target.files[0].name : 'Haijachaguliwa picha';
        document.getElementById('fileName').textContent = fileName;
    });
}

export { showProductDetails };