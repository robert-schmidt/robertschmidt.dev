document.addEventListener('DOMContentLoaded', function() {
    // Ensure page starts at the top
    window.scrollTo(0, 0);
    setTimeout(() => window.scrollTo(0, 0), 100);

    // Theme Management
    initializeTheme();
    
    // Interactive Elements
    initializeFloatingHeader();
    initializeDynamicRole();
    initializeQuoteSystem();
    initializeProjectCards();
    initializeKonamiCode();
    
    // Smooth Scrolling for Navigation
    initializeSmoothScrolling();
});

// Theme Management
function initializeTheme() {
    const themeSwitch = document.getElementById('theme-switch');
    const currentTheme = localStorage.getItem('theme-v2') || 'light';
    
    document.documentElement.setAttribute('data-theme', currentTheme);
    
    themeSwitch.addEventListener('click', function() {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme-v2', newTheme);
        
        // Add a subtle animation
        document.body.style.transition = 'background-color 0.3s ease';
        setTimeout(() => {
            document.body.style.transition = '';
        }, 300);
    });
}

// Cursor follower removed

// Floating Header
function initializeFloatingHeader() {
    const header = document.querySelector('.floating-header');
    let lastScrollY = window.scrollY;
    
    window.addEventListener('scroll', () => {
        const scrollY = window.scrollY;
        
        if (scrollY > 100) {
            header.style.background = 'rgba(255, 255, 255, 0.95)';
            if (document.documentElement.getAttribute('data-theme') === 'dark') {
                header.style.background = 'rgba(26, 26, 26, 0.95)';
            }
            header.style.backdropFilter = 'blur(20px)';
        } else {
            header.style.background = 'rgba(255, 255, 255, 0.8)';
            if (document.documentElement.getAttribute('data-theme') === 'dark') {
                header.style.background = 'rgba(26, 26, 26, 0.8)';
            }
        }
        
        lastScrollY = scrollY;
    });
}

// Dynamic Role Animation - Array Style
function initializeDynamicRole() {
    const roles = ['Dev', 'Lead', 'Father', 'Husband', 'Human'];
    const roleElement = document.getElementById('dynamic-role');

    // Check if screen is too small for full array display
    const useIndividualDisplay = window.innerWidth < 600;

    if (useIndividualDisplay) {
        // Display each role individually like the original version
        let currentRoleIndex = 0;
        
        function displayRole() {
            roleElement.textContent = roles[currentRoleIndex];
            currentRoleIndex = (currentRoleIndex + 1) % roles.length;
        }
        
        // Display first role immediately
        displayRole();
        
        // Cycle through roles every 2 seconds
        setInterval(displayRole, 2000);
    } else {
        // Use the array typewriter effect for larger screens
        function typewriterEffect() {
            roleElement.textContent = '';
            let arrayText = '';
            let currentIndex = 0;
            let currentRole = 0;

            function typeNextChar() {
                if (currentRole < roles.length) {
                    if (currentIndex === 0) {
                        // Start a new role with the quote
                        arrayText += "'";
                    }

                    if (currentIndex < roles[currentRole].length) {
                        arrayText += roles[currentRole][currentIndex];
                        currentIndex++;
                    }
                    else {
                        // Close the quote
                        arrayText += "'";
                        currentIndex = 0;
                        currentRole++;

                        if (currentRole < roles.length) {
                            // Add comma without spaces for array-style formatting
                            arrayText += ',';
                        }
                    }

                    roleElement.textContent = arrayText;
                    setTimeout(typeNextChar, 100);
                }
            }

            typeNextChar();
        }

        typewriterEffect();
    }
}

// Quote System
function initializeQuoteSystem() {
    const quotes = [
        'The best way to predict the future is to invent it. - Alan Kay',
        'Code is like humor. When you have to explain it, it\'s bad. - Cory House',
        'First, solve the problem. Then, write the code. - John Johnson',
        'Any sufficiently advanced technology is indistinguishable from magic. - Arthur C. Clarke',
        'The function of good software is to make the complex appear to be simple. - Grady Booch',
        'Talk is cheap. Show me the code. - Linus Torvalds',
        'It\'s not what happens to you, but how you react to it that matters. - Epictetus',
        'Very little is needed to make a happy life; it is all within yourself, in your way of thinking. - Marcus Aurelius',
        'The only way to learn a new programming language is by writing programs in it. - Dennis Ritchie',
        'Programming isn\'t about what you know; it\'s about what you can figure out. - Chris Pine',
        'You have power over your mind - not outside events. Realize this, and you will find strength. - Marcus Aurelius',
        'Make it work, make it right, make it fast. - Kent Beck',
        'Before software can be reusable it first has to be usable. - Ralph Johnson',
        'Walking on water and developing software from a specification are easy if both are frozen. - Edward V. Berard',
        'The happiness of your life depends upon the quality of your thoughts. - Marcus Aurelius',
        'Simplicity is the soul of efficiency. - Austin Freeman',
        'Hardware eventually fails. Software eventually works. - Michael Hartung',
        'The computer was born to solve problems that did not exist before. - Bill Gates',
        'Innovation distinguishes between a leader and a follower. - Steve Jobs',
        'The future belongs to those who believe in the beauty of their dreams. - Eleanor Roosevelt'
    ];
    
    const quoteElement = document.getElementById('wisdom-quote');
    const refreshBtn = document.getElementById('quote-refresh');
    let currentQuoteIndex = 0;
    
    function displayQuote() {
        quoteElement.style.opacity = '0';
        setTimeout(() => {
            quoteElement.textContent = quotes[currentQuoteIndex];
            quoteElement.style.opacity = '1';
        }, 300);
    }
    
    // Shuffle quotes
    for (let i = quotes.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [quotes[i], quotes[j]] = [quotes[j], quotes[i]];
    }
    
    // Display initial quote
    displayQuote();
    
    refreshBtn.addEventListener('click', () => {
        currentQuoteIndex = (currentQuoteIndex + 1) % quotes.length;
        displayQuote();
    });
}

// Terminal functionality removed - content moved to dedicated sections

// Project Cards Animation
function initializeProjectCards() {
    const projectCards = document.querySelectorAll('.project-card');
    
    projectCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            const icon = card.querySelector('.project-icon');
            icon.style.transform = 'scale(1.1) rotate(5deg)';
        });
        
        card.addEventListener('mouseleave', () => {
            const icon = card.querySelector('.project-icon');
            icon.style.transform = 'scale(1) rotate(0deg)';
        });
    });
}

// Konami Code
function initializeKonamiCode() {
    const konamiCode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'KeyB', 'KeyA'];
    let konamiIndex = 0;
    
    document.addEventListener('keydown', (e) => {
        if (e.code === konamiCode[konamiIndex]) {
            konamiIndex++;
            if (konamiIndex === konamiCode.length) {
                activateHackerMode();
                konamiIndex = 0;
            }
        } else {
            konamiIndex = 0;
        }
    });
    
    function activateHackerMode() {
        document.body.classList.add('hacker-mode');
        
        // Add terminal message if terminal exists
        const terminalHistory = document.getElementById('terminal-history');
        if (terminalHistory) {
            const hackerMessage = document.createElement('div');
            hackerMessage.innerHTML = `<span style="color: #00ff41; font-weight: bold;">KONAMI CODE ACTIVATED!</span> 🟢 Hacker mode enabled for 10 seconds...`;
            hackerMessage.style.marginBottom = '8px';
            terminalHistory.appendChild(hackerMessage);
            terminalHistory.scrollTop = terminalHistory.scrollHeight;
        }
        
        // Show notification
        showNotification('🟢 HACKER MODE ACTIVATED!', 'Konami code successfully entered');
        
        // Deactivate after 10 seconds
        setTimeout(() => {
            document.body.classList.remove('hacker-mode');
            if (terminalHistory) {
                const restoreMessage = document.createElement('div');
                restoreMessage.innerHTML = 'Hacker mode deactivated. Matrix connection closed.';
                restoreMessage.style.marginBottom = '8px';
                restoreMessage.style.color = 'var(--terminal-text)';
                terminalHistory.appendChild(restoreMessage);
                terminalHistory.scrollTop = terminalHistory.scrollHeight;
            }
        }, 10000);
    }
}

// Smooth Scrolling
function initializeSmoothScrolling() {
    const navLinks = document.querySelectorAll('.nav-link[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                const headerHeight = 100;
                const targetPosition = targetElement.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Utility Functions
function showNotification(title, message) {
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: var(--bg-secondary);
        border: 1px solid var(--border-medium);
        border-radius: 12px;
        padding: 16px 20px;
        box-shadow: 0 10px 30px var(--shadow-heavy);
        z-index: 9999;
        max-width: 300px;
        animation: slideInRight 0.3s ease-out;
    `;
    
    notification.innerHTML = `
        <div style="font-weight: 600; color: var(--text-primary); margin-bottom: 4px;">${title}</div>
        <div style="color: var(--text-secondary); font-size: 14px;">${message}</div>
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.3s ease-out forwards';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// Add CSS for notifications
const notificationStyles = document.createElement('style');
notificationStyles.textContent = `
    @keyframes slideInRight {
        from { transform: translateX(100%); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
    }
    
    @keyframes slideOutRight {
        from { transform: translateX(0); opacity: 1; }
        to { transform: translateX(100%); opacity: 0; }
    }
`;
document.head.appendChild(notificationStyles);