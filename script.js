// Original tracking functions - keeping these unchanged
function heapIdentify() {
    const identity = document.getElementById('identity').value;
    const hash = document.getElementById('hash').checked;
    window._uxa.push(["identify", identity, {hash}]);
    alert('Identified as: ' + identity);
}

function addUserProperties() {
    const prop1value = document.getElementById('userprop1value').value;
    const propsJson = JSON.parse(prop1value);
    window._uxa.push(["addUserProperties", propsJson]);
    alert('Added user properties: ' + propsJson);
}

function resetIdentity() {
    window._uxa.push(["resetIdentity"]);
    alert('Identity reseted');
}

function getIdentity() {
    alert('Identity: ' + window._uxa.push(["getIdentity"]));
}

// cf https://docs.contentsquare.com/en/web/sending-ecommerce-commands/#sending-a-transaction-without-cs-merchandising
function triggerCSTransaction(kittyPrice) {
    window._uxa = window._uxa || [];

    // Push transaction info into CS global object
    window._uxa.push(['ec:transaction:create', {
        'id': Date.now().toString(), /* Transaction ID (string, up to 40 characters) */
        'revenue': kittyPrice, /* Transaction's total amount paid (integer or string, up to 12 digits and 2 decimals - extra decimals are truncated) */
        'currency': 'usd' /* Currency value (string - numeric or alphanumeric ISO 4217 value) (optional) */
    }]);

    // Send the information to Contentsquare
    window._uxa.push(['ec:transaction:send']);

    window._uxa.push(["setCustomVariable", 1, 'cVarKittyPrice', kittyPrice]);
    window._uxa.push(["trackDynamicVariable", { key: 'dVarKittyPrice', value: kittyPrice }]);
    window._uxa.push(["trackPageEvent", "addToCart"]);
    window._uxa.push([
        "ec:cart:add",
        {
        merchant: window.location.hostname
        },
  ]);
    // Show a cute adoption confirmation
    showAdoptionConfirmation(kittyPrice);
}

// New functions for enhanced kitten website functionality

function showAdoptionConfirmation(price) {
    const message = `🎉 Wonderful choice! You've started the adoption process for this precious kitten! 💝\n\nAdoption fee: $${price}\n\nNext steps:\n1. Complete the adoption application\n2. Schedule a meet & greet\n3. Take your new family member home! 🏠\n\nThank you for choosing to adopt! 🐱💕`;
    alert(message);
}

// Shop page filter functionality
function filterKittens(breed) {
    const products = document.querySelectorAll('.product[data-breed]');
    const filterButtons = document.querySelectorAll('.filter-btn');
    
    // Update active button
    filterButtons.forEach(btn => btn.classList.remove('active'));
    event.target.classList.add('active');
    
    // Show/hide products based on breed filter
    products.forEach(product => {
        if (breed === 'all' || product.dataset.breed === breed) {
            product.style.display = 'block';
            product.style.animation = 'fadeIn 0.5s ease-in';
        } else {
            product.style.display = 'none';
        }
    });
}

// Contact form submission
function submitContactForm(event) {
    event.preventDefault();
    const form = document.getElementById('contactForm');
    const formData = new FormData(form);
    
    // Simulate form submission
    const name = formData.get('name');
    const subject = formData.get('subject');
    
    alert(`🙏 Thank you ${name}! We've received your message about "${subject}". We'll get back to you within 24 hours with purrs and information! 🐱💕`);
    
    form.reset();
}

// Adoption form submission
function submitAdoptionForm(event) {
    event.preventDefault();
    const form = document.getElementById('adoptionForm');
    const formData = new FormData(form);
    
    const name = formData.get('fullName');
    const microchip = formData.get('microchip');
    
    let message = `🎊 Congratulations ${name}! Your adoption application has been submitted! 🎊\n\n`;
    message += `We're so excited that you want to welcome a kitten into your family! 💖\n\n`;
    message += `Next steps:\n`;
    message += `📋 Application review (24-48 hours)\n`;
    message += `🏠 Schedule meet & greet\n`;
    message += `📱 Prepare your home\n`;
    message += `🎉 Welcome your new family member!\n\n`;
    
    if (microchip) {
        message += `✅ Microchipping service included\n\n`;
    }
    
    message += `Thank you for choosing adoption! 🐾💕`;
    
    alert(message);
    form.reset();
}

// About page feedback submission
function submitFeedback() {
    const feedback = document.getElementById('feedback').value;
    if (feedback.trim()) {
        // Trigger the original heap identify functionality
        window._uxa = window._uxa || [];
        window._uxa.push(["identify", feedback]);
        alert(`✨ Thank you for your feedback! Identified as: ${feedback} 🐱💕`);
    } else {
        alert('Please enter some feedback before submitting! 😸');
    }
}

// Add some cute animations and interactions
document.addEventListener('DOMContentLoaded', function() {
    // Add hover effects to product images
    const productImages = document.querySelectorAll('.product img');
    productImages.forEach(img => {
        img.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.05)';
            this.style.transition = 'transform 0.3s ease';
        });
        
        img.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
        });
    });
    
    // Add form event listeners
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', submitContactForm);
    }
    
    const adoptionForm = document.getElementById('adoptionForm');
    if (adoptionForm) {
        adoptionForm.addEventListener('submit', submitAdoptionForm);
    }
    
    // Add floating hearts animation
    createFloatingHearts();
});

// Create floating hearts animation for extra cuteness
function createFloatingHearts() {
    setInterval(() => {
        if (Math.random() > 0.95) { // Random chance to create a heart
            const heart = document.createElement('div');
            heart.innerHTML = '💖';
            heart.style.position = 'fixed';
            heart.style.left = Math.random() * window.innerWidth + 'px';
            heart.style.top = window.innerHeight + 'px';
            heart.style.fontSize = '20px';
            heart.style.pointerEvents = 'none';
            heart.style.zIndex = '9999';
            heart.style.animation = 'floatUp 3s ease-out forwards';
            
            document.body.appendChild(heart);
            
            setTimeout(() => {
                heart.remove();
            }, 3000);
        }
    }, 200);
}

// Add CSS for floating hearts animation
const style = document.createElement('style');
style.textContent = `
    @keyframes floatUp {
        0% {
            transform: translateY(0) rotate(0deg);
            opacity: 1;
        }
        100% {
            transform: translateY(-100vh) rotate(360deg);
            opacity: 0;
        }
    }
    
    @keyframes fadeIn {
        from { opacity: 0; transform: translateY(20px); }
        to { opacity: 1; transform: translateY(0); }
    }
`;
document.head.appendChild(style);