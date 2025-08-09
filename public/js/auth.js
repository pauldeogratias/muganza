// import { db, auth } from './config.js';

// In auth.js
import { db, auth } from './config.js';
import { showMessage } from './ui.js';

// Global user state
let currentUser = null;

// DOM Elements
const loginForm = document.getElementById('loginForm');
const registerForm = document.getElementById('registerForm');
const loginModal = document.getElementById('loginModal');
const registerModal = document.getElementById('registerModal');

// Auth Functions
async function handleLogin(e) {
    e.preventDefault();
    const phone = document.getElementById('loginPhone').value;
    const password = document.getElementById('loginPassword').value;
    
    try {
        const email = phone.replace('+', '').replace(/\D/g, '') + '@marketplace.com';
        await auth.signInWithEmailAndPassword(email, password);
        closeModal('loginModal');
        showMessage('Umeingia kikamilifu!', 'success');
    } catch (error) {
        showMessage('Hitilafu katika kuingia: ' + error.message, 'error');
    }
}

async function handleRegister(e) {
    e.preventDefault();
    const firstName = document.getElementById('firstName').value;
    const lastName = document.getElementById('lastName').value;
    const phone = document.getElementById('registerPhone').value;
    const location = document.getElementById('userLocation').value;
    const userType = document.getElementById('userType').value;
    const password = document.getElementById('registerPassword').value;
    
    try {
        const email = phone.replace('+', '').replace(/\D/g, '') + '@marketplace.com';
        const userCredential = await auth.createUserWithEmailAndPassword(email, password);
        
        await db.collection('users').doc(userCredential.user.uid).set({
            firstName,
            lastName,
            phone,
            location,
            userType,
            createdAt: firebase.firestore.FieldValue.serverTimestamp()
        });
        
        closeModal('registerModal');
        showMessage('Akaunti imetengenezwa kikamilifu!', 'success');
    } catch (error) {
        showMessage('Hitilafu katika usajili: ' + error.message, 'error');
    }
}

// Add these functions to auth.js
export function showLogin() {
  showModal('loginModal');
}

export function showRegister() {
  showModal('registerModal');
}

function logout() {
    auth.signOut();
    showMessage('Umetoka kikamilifu', 'success');
}

// Auth State Observer
function setupAuthStateObserver() {
    auth.onAuthStateChanged(async (user) => {
        if (user) {
            const userDoc = await db.collection('users').doc(user.uid).get();
            currentUser = {
                uid: user.uid,
                ...userDoc.data()
            };
            updateUIForLoggedInUser();
        } else {
            currentUser = null;
            updateUIForLoggedOutUser();
        }
    });
}

function updateUIForLoggedInUser() {
    // Show user info
    document.getElementById('userInfo').style.display = 'flex';
    document.getElementById('userName').textContent = `${currentUser.firstName} ${currentUser.lastName}`;
    
    // Hide login/register buttons
    document.getElementById('loginBtn').style.display = 'none';
    document.getElementById('registerBtn').style.display = 'none';
    
    // Show dashboard buttons based on user type
    if (currentUser.userType === 'seller') {
        document.getElementById('sellerDashboardBtn').style.display = 'block';
        document.getElementById('addProductBtn').style.display = 'block';
    } else {
        document.getElementById('customerDashboardBtn').style.display = 'block';
    }
}

function updateUIForLoggedOutUser() {
    document.getElementById('userInfo').style.display = 'none';
    document.getElementById('loginBtn').style.display = 'block';
    document.getElementById('registerBtn').style.display = 'block';
    document.getElementById('sellerDashboardBtn').style.display = 'none';
    document.getElementById('customerDashboardBtn').style.display = 'none';
    document.getElementById('addProductBtn').style.display = 'none';
    
    // Redirect to home if on dashboard
    if (window.location.hash.includes('dashboard')) {
        showSection('home');
    }
}

// Modal Switching
function switchToLogin() {
    closeModal('registerModal');
    showModal('loginModal');
}

function switchToRegister() {
    closeModal('loginModal');
    showModal('registerModal');
}

// Initialize Auth Module
function initAuth() {
    loginForm.addEventListener('submit', handleLogin);
    registerForm.addEventListener('submit', handleRegister);
    setupAuthStateObserver();
    
    // Add event listeners for modal switching
    document.querySelector('.modal-footer a[onclick="switchToRegister()"]').addEventListener('click', switchToRegister);
    document.querySelector('.modal-footer a[onclick="switchToLogin()"]').addEventListener('click', switchToLogin);
}

export { initAuth, currentUser, logout };