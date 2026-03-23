// Typing effect
const typingText = document.querySelector('.typing-text');
const phrases = [
    'CS Junior @ SJTU',
    'AI & ML Researcher',
    'Model Compression Enthusiast',
    'AI Infrastructure Developer'
];

let phraseIndex = 0;
let charIndex = 0;
let isDeleting = false;

function typeEffect() {
    const currentPhrase = phrases[phraseIndex];
    
    if (isDeleting) {
        typingText.textContent = currentPhrase.substring(0, charIndex - 1);
        charIndex--;
    } else {
        typingText.textContent = currentPhrase.substring(0, charIndex + 1);
        charIndex++;
    }
    
    if (!isDeleting && charIndex === currentPhrase.length) {
        isDeleting = true;
        setTimeout(typeEffect, 2000);
        return;
    }
    
    if (isDeleting && charIndex === 0) {
        isDeleting = false;
        phraseIndex = (phraseIndex + 1) % phrases.length;
    }
    
    const typingSpeed = isDeleting ? 50 : 100;
    setTimeout(typeEffect, typingSpeed);
}

// Start typing effect
setTimeout(typeEffect, 500);

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Navbar background on scroll
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 100) {
        navbar.style.background = 'rgba(255, 255, 255, 0.98)';
    } else {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
    }
});

// Mobile menu toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

if (hamburger && navMenu) {
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Close menu when clicking on a link
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });
}

// Intersection Observer for fade-in animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe all sections
document.querySelectorAll('section').forEach(section => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(50px)';
    section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(section);
});

// Optional: Fetch GitHub repos dynamically
async function fetchGitHubRepos() {
    try {
        const response = await fetch('https://api.github.com/users/jessesjtu11/repos?sort=updated&per_page=6');
        const repos = await response.json();
        
        const projectList = document.getElementById('projectList');
        if (repos && repos.length > 0 && !repos.message) {
            projectList.innerHTML = repos.map(repo => `
                <div class="project-card">
                    <div class="project-header">
                        <h3><i class="fas fa-folder"></i> ${repo.name}</h3>
                        <span class="project-stars"><i class="fas fa-star"></i> ${repo.stargazers_count}</span>
                    </div>
                    <p>${repo.description || 'No description available'}</p>
                    <div class="project-tags">
                        ${repo.language ? `<span class="tag">${repo.language}</span>` : ''}
                        ${repo.topics.slice(0, 3).map(topic => `<span class="tag">${topic}</span>`).join('')}
                    </div>
                    <a href="${repo.html_url}" target="_blank" style="margin-top: 1rem; display: inline-block; color: var(--primary-color); font-weight: 600;">View on GitHub →</a>
                </div>
            `).join('');
        }
    } catch (error) {
        console.log('Could not fetch GitHub repos:', error);
    }
}

// Uncomment to fetch real GitHub repos
// fetchGitHubRepos();
