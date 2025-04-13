import { initializeApp } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-app.js";
import { getFirestore, collection, addDoc } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-firestore.js";
const firebaseConfig = {
    // Replace with your Firebase config
    apiKey: "AIzaSyAialoPKm6OjngiN9TX7XL5yMYQ6_KbMZg",
    authDomain: "riwaq-9a554.firebaseapp.com",
    projectId: "riwaq-9a554",
    storageBucket: "riwaq-9a554.firebasestorage.app",
    messagingSenderId: "170475416964",
    appId: "1:170475416964:web:7dc86c4ba8fa69fef001d1"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const waitlistForm = document.getElementById('waitlistForm');
const submitBtn = document.getElementById('submitBtn');
const formMessage = document.getElementById('formMessage');

function showMessage(message, type) {
    formMessage.textContent = message;
    formMessage.style.display = 'block';
    formMessage.className = `message-container ${type}`;
}

waitlistForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    
    if (!nameInput || !emailInput) {
        console.error('Error: Required input elements are missing in the DOM.');
        return;
    }

    // Basic validation
    if (!nameInput.value.trim() || !emailInput.value.trim()) {
        showMessage('Please fill in all fields', 'error');
        return;
    }

    // Email validation
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(emailInput.value)) {
        showMessage('Please enter a valid email address', 'error');
        return;
    }

    submitBtn.disabled = true;
    submitBtn.textContent = 'Joining...';

    try {
        await addDoc(collection(db, 'waitlist'), {
            name: nameInput.value.trim(),
            email: emailInput.value.trim(),
            timestamp: new Date()
        });

        showMessage('Successfully joined the waitlist!', 'success');
        waitlistForm.reset();

        setTimeout(() => {
            hidejoin();
            formMessage.style.display = 'none';
        }, 4000);

    } catch (error) {
        showMessage('Error joining the waitlist. Please try again.', 'error');
        console.error('Error:', error);
    } finally {
        submitBtn.disabled = false;
        submitBtn.textContent = 'Join';
    }
});