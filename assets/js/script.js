// Header scroll effect
window.addEventListener('scroll', () => {
    const header = document.getElementById('header');
    if (window.scrollY > 20) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

// Smooth scroll function
function scrollToSection(sectionId) {
    const element = document.getElementById(sectionId);
    if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
    }
}

// Intersection Observer for fade-in animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));

// Animate skill bars
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

// Form submission
function handleSubmit(event) {
    event.preventDefault();
    const form = event.target;
    const formData = new FormData(form);
    const data = Object.fromEntries(formData);
    console.log('Form submitted:', data);
    alert('Thank you for your message! I will get back to you soon.');
    form.reset();
}

// Initialize skill bars with 0 width
document.querySelectorAll('.skill-progress').forEach(bar => {
    bar.style.width = '0%';
});

const menuBtn = document.getElementById('mobile-menu-btn');
const navMenu = document.getElementById('nav-menu');
const socialIcons = document.querySelector('.social-icons')

menuBtn.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    socialIcons.classList.toggle('active')
    if (navMenu.classList.contains('active')) {
        menuBtn.textContent = '✕'; 
    } else {
        menuBtn.textContent = '☰'; 
    }
});
function openPreview(src) {
    const modal = document.getElementById("imagePreviewModal");
    const previewImage = document.getElementById("previewImage");

    previewImage.src = src;
    modal.style.display = "flex";
}

function closePreview() {
    document.getElementById("imagePreviewModal").style.display = "none";
}
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

