// ================= HEADER SCROLL =================
window.addEventListener('scroll', () => {
    const header = document.getElementById('header');
    if (window.scrollY > 20) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

// ================= SMOOTH SCROLL =================
function scrollToSection(sectionId) {
    const element = document.getElementById(sectionId);
    if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
    }
}

// ================= FADE-IN ANIMATION =================
const observerOptions = { threshold: 0.1, rootMargin: '0px 0px -50px 0px' };

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));

// ================= SKILL BARS =================
const skillObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const progressBars = entry.target.querySelectorAll('.skill-progress');
            progressBars.forEach(bar => {
                const progress = bar.getAttribute('data-progress');
                setTimeout(() => {
                    bar.style.width = progress + '%';
                }, 100);
            });
            skillObserver.unobserve(entry.target);
        }
    });
}, observerOptions);

document.querySelectorAll('.skill-category').forEach(el => skillObserver.observe(el));
document.querySelectorAll('.skill-progress').forEach(bar => bar.style.width = '0%');

// ================= CONTACT FORM =================
function handleSubmit(event) {
    event.preventDefault();
    const form = event.target;
    const formData = new FormData(form);
    const data = Object.fromEntries(formData);

    console.log('Form submitted:', data);
    alert('Thank you for your message! I will get back to you soon.');

    form.reset();
}

// ================= MOBILE MENU =================
const menuBtn = document.getElementById('mobile-menu-btn');
const navMenu = document.getElementById('nav-menu');
const socialIcons = document.querySelector('.social-icons');

menuBtn.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    socialIcons.classList.toggle('active');

    menuBtn.textContent = navMenu.classList.contains('active') ? '✕' : '☰';
});

// ================= IMAGE PREVIEW =================
function openPreview(src) {
    const modal = document.getElementById("imagePreviewModal");
    const previewImage = document.getElementById("previewImage");
    previewImage.src = src;
    modal.style.display = "flex";
}

function closePreview() {
    document.getElementById("imagePreviewModal").style.display = "none";
}

// ================= LEGAL MODAL =================
function openLegal(type) {
    const modal = document.getElementById("legalModal");
    const content = document.getElementById("legalContent");

    if (type === "privacy") {
        content.innerHTML = `
            <h2>Privacy Policy</h2>
            <p>This website does not collect personal data except information
            voluntarily submitted through the contact form.
            Your information will never be shared with third parties.</p>
        `;
    }

    if (type === "terms") {
        content.innerHTML = `
            <h2>Terms of Service</h2>
            <p>By using this website, you agree not to misuse the content.
            All projects and materials are for portfolio demonstration purposes.</p>
        `;
    }

    modal.style.display = "flex";
}

function closeLegal() {
    document.getElementById("legalModal").style.display = "none";
}

// ================= PROJECT TOGGLE =================
function toggleProjects() {
    const hiddenProjects = document.querySelectorAll(".hidden-project");
    const btn = document.getElementById("projectBtn");

    hiddenProjects.forEach(project => {
        if (project.style.display === "none" || project.style.display === "") {
            project.style.display = "block";
            btn.innerText = "Hide Projects";
        } else {
            project.style.display = "none";
            btn.innerText = "View All Projects";
        }
    });
}

// On page load, chat is minimized
document.addEventListener("DOMContentLoaded", () => {
    const body = document.getElementById("chat-body");
    body.style.display = "none"; // start minimized

    const toggleBtn = document.getElementById("chat-toggle-btn");
    toggleBtn.addEventListener("click", toggleChat);

    const input = document.getElementById("chat-input");
    if (input) {
        input.addEventListener("keypress", (e) => {
            if (e.key === "Enter") sendMessage();
        });
    }
});

// Toggle chat
function toggleChat() {
    const body = document.getElementById("chat-body");
    const isOpening = body.style.display !== "flex";
    body.style.display = isOpening ? "flex" : "none";

    if (isOpening && !body.dataset.opened) {
        addMessage("🤖 Paul: Hi! I'm Paul 👋 Nice to meet you, 😊 How can I help you?", "bot");
        body.dataset.opened = "true";
    }
}

// Add message with typing animation
function addMessage(text, sender, typingSpeed = 5) {
    const msgContainer = document.getElementById("chat-messages");
    const row = document.createElement("div");
    row.className = `chat-row ${sender}`;

    const bubble = document.createElement("div");
    bubble.className = `chat-bubble ${sender}`;
    row.appendChild(bubble);
    msgContainer.appendChild(row);

    let index = 0;

    function typeCharacter() {
        if (index < text.length) {
            bubble.innerHTML += text.charAt(index);
            index++;
            msgContainer.scrollTop = msgContainer.scrollHeight;
            setTimeout(typeCharacter, typingSpeed);
        }
    }

    typeCharacter();
}

// Typing dots animation
function showTyping() {
    const msgContainer = document.getElementById("chat-messages");
    const row = document.createElement("div");
    row.className = "chat-row bot";
    row.id = "typing";

    row.innerHTML = `
        <div class="chat-bubble bot typing">
            <span></span><span></span><span></span>
        </div>
    `;

    msgContainer.appendChild(row);
    msgContainer.scrollTop = msgContainer.scrollHeight;
}

function removeTyping() {
    const typing = document.getElementById("typing");
    if (typing) typing.remove();
}

// Send message to server
async function sendMessage() {
    const input = document.getElementById("chat-input");
    const message = input.value.trim();
    if (!message) return;

    addMessage(`👨🏻‍💼 You: ${message}`, "user");
    input.value = "";

    showTyping();

    try {
        const response = await fetch("http://localhost:3000/chat", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ message })
        });

        const data = await response.json();
        removeTyping();

        addMessage(`🤖 Paul: ${data.reply}`, "bot");
    } catch (error) {
        removeTyping();
        console.error(error);
        addMessage("⚠️ Error connecting to AI.", "bot");
    }
}
document.addEventListener("DOMContentLoaded", () => {
    const input = document.getElementById("chat-input");
    if (input) {
        input.addEventListener("keypress", (e) => {
            if (e.key === "Enter") sendMessage();
        });
    }
});

document.getElementById("contactForm").addEventListener("submit", function(e) {
  e.preventDefault();

  const data = {
    name: document.getElementById("name").value,
    email: document.getElementById("email").value,
    message: document.getElementById("message").value
  };

  fetch("https://script.google.com/macros/s/AKfycbz1eQGYx5dnjFOihGEAyQYEh-hEzZ3bCQYnOQfrBPK3__wH6bowrJ1WhVPTal5Kg1-dhw/exec", {  // Paste your Apps Script Web App URL
    method: "POST",
    body: new URLSearchParams(data)
  })
  .then(response => response.text())
  .then(result => {
    alert("Message sent successfully!");
    document.getElementById("contactForm").reset();
  })
  .catch(error => {
    alert("Error sending message: " + error);
  });
});