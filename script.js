document.addEventListener('DOMContentLoaded', function() {
    // Ensure page starts at the top
    window.scrollTo(0, 0);

    // Also fix scroll position after a short delay to account for any dynamic content
    setTimeout(() => {
        window.scrollTo(0, 0);
    }, 100);
    // Konami Code detection
    const konamiCode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
    let konamiIndex = 0;

    document.addEventListener('keydown', function(e) {
        // Check if the key matches the next key in the Konami code
        if (e.key === konamiCode[konamiIndex]) {
            konamiIndex++;
            // If the entire code is entered
            if (konamiIndex === konamiCode.length) {
                activateHackerMode();
                konamiIndex = 0;
            }
        } else {
            konamiIndex = 0;
        }
    });

    function activateHackerMode() {
        document.body.style.backgroundColor = '#000';
        document.body.style.color = '#00ff41';
        const elements = document.querySelectorAll('.bio, .quote-box, .terminal-container');
        elements.forEach(el => {
            el.style.borderColor = '#00ff41';
            el.style.boxShadow = '0 0 10px rgba(0, 255, 65, 0.5)';
            el.style.backgroundColor = 'rgba(0, 20, 0, 0.7)';
        });

        // Special handling for social links
        const socialLinks = document.querySelectorAll('.social-link');
        socialLinks.forEach(link => {
            link.style.borderColor = '#00ff41';
            link.style.boxShadow = '0 0 10px rgba(0, 255, 65, 0.3)';
            link.style.backgroundColor = 'rgba(0, 20, 0, 0.7)';
            link.style.color = '#00ff41';
        });

        // Show a message in the terminal
        addTerminalOutput("KONAMI CODE ACTIVATED! Hacker mode enabled.");

        // Restore after 10 seconds
        setTimeout(() => {
            document.body.style.backgroundColor = '';
            document.body.style.color = '';
            elements.forEach(el => {
                el.style.borderColor = '';
                el.style.boxShadow = '';
                el.style.backgroundColor = '';
            });
            socialLinks.forEach(link => {
                link.style.borderColor = '';
                link.style.boxShadow = '';
                link.style.backgroundColor = '';
                link.style.color = '';
            });
            addTerminalOutput("Hacker mode deactivated. Use Konami code to activate again.");
        }, 10000);
    }

    const roles = ['Dev', 'Lead', 'Father', 'Husband', 'Human'];
    const roleElement = document.getElementById('role-text');

    function typewriterEffect() {
        roleElement.textContent = '[';
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

                roleElement.textContent = '[' + arrayText + ']';
                setTimeout(typeNextChar, 100);
            }
        }

        typeNextChar();
    }

    typewriterEffect();

    const baseQuote = 'He who experiences the unity of life sees his own self in all beings - and all beings in his own self - and looks on everything with an impartial eye.';

    let quotes = [
        'The best way to predict the future is to invent it. - Alan Kay',
        'If it is not right do not do it; if it is not true do not say it. - Marcus Aurelius',
        'The individual has always had to struggle to keep from being overwhelmed by the tribe. - Friedrich Nietzsche',
        'Any sufficiently advanced technology is indistinguishable from magic. - Arthur C. Clarke',
        'Talk is cheap. Show me the code. - Linus Torvalds',
        'Very little is needed to make a happy life; it is all within yourself, in your way of thinking. - Marcus Aurelius',
        'Programming isn\'t about what you know; it\'s about what you can figure out. - Chris Pine',
        'He who is brave is free. - Seneca',
        'The function of good software is to make the complex appear to be simple. - Grady Booch',
        'It is impossible to live a pleasant life without living wisely and well and justly, and it is impossible to live wisely and well and justly without living pleasantly. - Epicurus',
        'Luck is what happens when preparation meets opportunity. - Seneca',
        'First, solve the problem. Then, write the code. - John Johnson',
        'You have power over your mind - not outside events. Realize this, and you will find strength. - Marcus Aurelius',
        'The most disastrous thing that you can ever learn is your first programming language. - Alan Kay',
        'Code is like humor. When you have to explain it, it\'s bad. - Cory House',
        'The only way to learn a new programming language is by writing programs in it. - Dennis Ritchie',
        'First say to yourself what you would be; and then do what you have to do. - Epictetus',
        'Sometimes it\'s better to leave something alone, to pause, and that\'s very true of programming. - Joyce Wheeler',
        'It\'s not what happens to you, but how you react to it that matters. - Epictetus',
        'Simplicity is the soul of efficiency. - Austin Freeman',
        'When you arise in the morning, think of what a precious privilege it is to be alive - to breathe, to think, to enjoy, to love. - Marcus Aurelius',
        'Before software can be reusable it first has to be usable. - Ralph Johnson',
        'Make it work, make it right, make it fast. - Kent Beck',
        'The higher we soar, the smaller we appear to those who cannot fly. - Friedrich Nietzsche',
        'The computer was born to solve problems that did not exist before. - Bill Gates',
        'Hardware eventually fails. Software eventually works. - Michael Hartung',
        'I\'m not a great programmer; I\'m just a good programmer with great habits. - Kent Beck',
        'Walking on water and developing software from a specification are easy if both are frozen. - Edward V. Berard',
        'The happiness of your life depends upon the quality of your thoughts. - Marcus Aurelius',
        'We are what we repeatedly do. Excellence, then, is not an act, but a habit. - Aristotle',
        'He who has a why to live for can bear almost any how. - Friedrich Nietzsche',
        'The unexamined life is not worth living. - Socrates',
        'You only live once, but if you do it right, once is enough. - Mae West',
        'Waste no more time arguing about what a good man should be. Be one. - Marcus Aurelius',
        'Many of life\'s failures are people who did not realize how close they were to success when they gave up. - Thomas Edison',
        'Life is really simple, but we insist on making it complicated. - Confucius',
        'It is not death that a man should fear, but he should fear never beginning to live. - Marcus Aurelius',
        'Do not dwell in the past, do not dream of the future, concentrate the mind on the present moment. - Buddha',
        'The two most important days in your life are the day you are born and the day you find out why. - Mark Twain',
        'Life is 10% what happens to us and 90% how we react to it. - Charles R. Swindoll',
        'Change your thoughts and you change your world. - Norman Vincent Peale',
        'In heaven, all the interesting people are missing. - Friedrich Nietzsche',
        'The greatest obstacle to living is expectancy, which hangs upon tomorrow and loses today. - Seneca',
        'The snake which cannot cast its skin has to die. As well the minds which are prevented from changing their opinions; they cease to be mind. - Friedrich Nietzsche',
        'The wealth required by nature is limited and is easy to procure; but the wealth required by vain ideals extends to infinity. - Epicurus',
        'The obstacle is the way. - Marcus Aurelius',
        'We suffer more often in imagination than in reality. - Seneca',
        'Make the best use of what is in your power, and take the rest as it happens. - Epictetus'
    ];

    function shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }

    quotes = shuffleArray(quotes);

    let currentQuoteIndex = 0;
    const quoteElement = document.getElementById('quote-text');

    function displayNextQuote() {
        if (currentQuoteIndex === 0) {
            quoteElement.textContent = baseQuote;
            currentQuoteIndex++;
        } else {
            quoteElement.textContent = quotes[currentQuoteIndex - 1];
            currentQuoteIndex++;

            if (currentQuoteIndex > quotes.length) {
                currentQuoteIndex = 0;
            }
        }

        // Fix quote formatting
        fixQuotes();
    }

    displayNextQuote();

    document.getElementById('refresh-quote').addEventListener('click', function() {
        displayNextQuote();

        this.style.transform = 'rotate(180deg)';
        setTimeout(() => {
            this.style.transform = '';
        }, 500);
    });

    const headings = document.querySelectorAll('h1, h2');

    function glitchEffect() {
        const randomHeading = headings[Math.floor(Math.random() * headings.length)];

        const originalText = randomHeading.textContent;

        randomHeading.classList.add('glitchy-text');

        let glitchedText = '';
        for (let i = 0; i < originalText.length; i++) {
            const char = originalText[i];
            if (Math.random() < 0.35) {
                const glitchChars = '!@#$%^&*<>{}[]?/\\|=+-_0123456789';
                glitchedText += glitchChars[Math.floor(Math.random() * glitchChars.length)];
            } else {
                glitchedText += char;
            }
        }

        randomHeading.textContent = glitchedText;
        randomHeading.style.animation = 'glitch-text 0.8s forwards';
        randomHeading.style.textShadow = '2px 0 0 rgba(255,0,0,0.5), -2px 0 0 rgba(0,0,255,0.5)';

        setTimeout(() => {
            randomHeading.textContent = originalText;
            randomHeading.style.animation = '';
            randomHeading.style.textShadow = '';
            randomHeading.classList.remove('glitchy-text');
        }, 800);
    }

    // Fix quotes display - convert HTML entities back to characters
    function fixQuotes() {
        const quoteText = document.getElementById('quote-text');
        if (quoteText && quoteText.textContent) {
            // Replace any double spaces with single spaces
            quoteText.textContent = quoteText.textContent.replace(/\s+/g, ' ');

            // Fix spaces around punctuation
            quoteText.textContent = quoteText.textContent
                .replace(/\s+([.,;:!?])/g, '$1') // Remove space before punctuation
                .replace(/([.,;:!?])\s+/g, '$1 '); // Ensure single space after punctuation
        }
    }

    setInterval(() => {
        if (Math.random() < 0.15) {
            glitchEffect();
        }
    }, 3000);

    const terminalInput = document.getElementById('terminal-input');
    const terminalOutput = document.getElementById('terminal-output');
    const terminalContainer = document.querySelector('.terminal-container');
    const closeButton = document.querySelector('.terminal-button.close');

    closeButton.addEventListener('click', function() {
        terminalContainer.style.display = 'none';

        if (!document.getElementById('show-terminal')) {
            const showButton = document.createElement('button');
            showButton.id = 'show-terminal';
            showButton.textContent = 'Open Terminal';
            showButton.className = 'show-terminal-btn';
            document.querySelector('.quote-box').after(showButton);

            showButton.addEventListener('click', function() {
                terminalContainer.style.display = 'block';
                showButton.remove();
            });
        }
    });

    function addTerminalOutput(output, isCommand = false) {
        const outputLine = document.createElement('div');
        if (isCommand) {
            outputLine.innerHTML = '<span class="prompt">visitor@robertschmidt.dev:~$</span> ' + output;
        } else {
            outputLine.innerHTML = output.replace(/\n/g, '<br>');
        }
        terminalOutput.appendChild(outputLine);

        terminalOutput.scrollTop = terminalOutput.scrollHeight;
    }

    const challenges = [
        {
            id: 'hash',
            type: 'hash',
            challenge: 'Find the hash: 8c6976e5b5410415bde908bd4dee15dfb167a9c873fc4bb8a81f6f2ab448a918',
            hint: 'Username for administrative access (in lowercase). SHA-256',
            answer: 'admin',
            solved: false
        },
        {
            id: 'riddle1',
            type: 'riddle',
            challenge: 'I speak without a mouth and hear without ears. I have no body, but I come alive with wind. What am I?',
            hint: 'I carry messages across distances.',
            answer: 'echo',
            solved: false
        },
        {
            id: 'riddle2',
            type: 'riddle',
            challenge: 'I have keys but no locks. I have space but no room. You can enter, but you can\'t go inside. What am I?',
            hint: 'I\'m a developer\'s daily tool.',
            answer: 'keyboard',
            solved: false
        },
        {
            id: 'riddle3',
            type: 'riddle',
            challenge: 'I am taken from a mine, and shut within a wooden case, from which I am never released, and yet I am used by almost everyone. What am I?',
            hint: 'Often used for sketching code.',
            answer: 'pencil lead',
            solved: false
        },
        {
            id: 'coding',
            type: 'code',
            challenge: 'Decode this message: 01010010 01101111 01100010 01100101 01110010 01110100',
            hint: 'It\'s binary ASCII.',
            answer: 'robert',
            solved: false
        }
    ];

    let currentChallenge = 0;

    async function sha256(message) {
        // Encode as UTF-8
        const msgBuffer = new TextEncoder().encode(message);

        // Hash the message
        const hashBuffer = await crypto.subtle.digest('SHA-256', msgBuffer);

        // Convert to hex string
        const hashArray = Array.from(new Uint8Array(hashBuffer));
        const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
        return hashHex;
    }

    // Terminal commands
    const commands = {
        'help': function() {
            return `Available commands:<br>
- help: Display this help message<br>
- whoami: Display visitor information<br>
- ls: List skills and technologies<br>
- cat [file]: Display file contents (try: bio.txt, crypto.txt)<br>
- skills: Display skills<br>
- challenge: Access crypto challenges and riddles<br>
- solve [answer]: Submit answer to a challenge<br>
- clear: Clear the terminal<br>
- contact: Display contact information`;
        },

        'whoami': function() {
            return 'visitor@robertschmidt.dev';
        },

        'ls': function() {
            return `
bio.txt
skills.txt
crypto.txt
contact.txt`;
        },

        'cat': async function(args) {
            if (!args.length) {
                return 'Usage: cat [file]';
            }

            const file = args[0];

            if (file === 'bio.txt') {
                return `I've started to code in early 2000s. Now I just play and watch AI grow.<br>
Mined my first bitcoin in 2014 (but didn't HODL!). The only token I launched is $MAYDAY.`;
            } else if (file === 'skills.txt') {
                return `Programming languages: Many (20+ years of experience)<br>
Specialties: Web Development, Blockchain, AI, Systems Architecture<br>
Roles: Dev, Lead, Father, Husband, Human`;
            } else if (file === 'crypto.txt') {
                return `The future of the web is decentralized.<br>
Mined my first bitcoin in 2014 (but didn't HODL!)<br>
The only token I launched is $MAYDAY.`;
            } else if (file === 'contact.txt') {
                return `Email: Use the social links to contact me<br>
Website: bert.ro<br>
Twitter: @robb_schmidt<br>
GitHub: robert-schmidt`;
            } else if (file === '.hidden' && challenges[0].solved) {
                return `Congratulations! You've found the hidden file.<br><br>

Special message: The true power of coding isn't in the languages you know,<br>
but in the problems you solve and the people you help.`;
            } else {
                return `cat: ${file}: No such file or directory`;
            }
        },

        'skills': function() {
            return `Programming Skills: Expert level across multiple languages<br>
Web Development: Full-stack capabilities<br>
Blockchain: Cryptocurrency mining, token development<br>
AI: Keeping up with the latest developments<br>
Architecture: System design and optimization`;
        },

        'clear': function() {
            terminalOutput.innerHTML = '';
            return '';
        },

        'challenge': function() {
            const challenge = challenges[currentChallenge];

            let response = `Challenge ${currentChallenge + 1}/${challenges.length}: ${challenge.type.toUpperCase()}<br><br>`;
            response += `${challenge.challenge}<br><br>`;
            response += `Hint: ${challenge.hint}<br><br>`;
            response += `Use 'solve [your_answer]' to submit.<br>`;
            response += `Use 'next-challenge' to see the next challenge.`;

            return response;
        },

        'next-challenge': function() {
            currentChallenge = (currentChallenge + 1) % challenges.length;
            return `Switched to challenge ${currentChallenge + 1}/${challenges.length}. Type 'challenge' to see it.`;
        },

        'solve': async function(args) {
            if (!args.length) {
                return 'Usage: solve [answer]';
            }

            const answer = args.join(' ').toLowerCase().trim();
            const challenge = challenges[currentChallenge];

            if (challenge.type === 'hash') {
                const hash = await sha256(answer);

                if (hash === '8c6976e5b5410415bde908bd4dee15dfb167a9c873fc4bb8a81f6f2ab448a918') {
                    challenge.solved = true;
                    return `Correct! Authentication successful.<br><br>

Access granted. A hidden file has been revealed.<br>
Type 'ls -a' to see hidden files.`;
                }
            } else {
                if (answer === challenge.answer) {
                    challenge.solved = true;
                    return `Correct! You solved the ${challenge.type}!<br><br>

Your wisdom is impressive. Try the next challenge with 'next-challenge'.`;
                }
            }

            return 'Incorrect answer. Try again.';
        },

        'contact': function() {
            return `Email: Use the social links to contact me<br>
Website: bert.ro<br>
Twitter: @robb_schmidt<br>
GitHub: robert-schmidt`;
        },

        'ls -a': function() {
            if (challenges[0].solved) {
                return `
.
..
.hidden
bio.txt
skills.txt
crypto.txt
contact.txt`;
            } else {
                return `
bio.txt
skills.txt
crypto.txt
contact.txt`;
            }
        },
    };

    terminalInput.addEventListener('keydown', async function(e) {
        if (e.key === 'Enter') {
            const input = terminalInput.value.trim();
            terminalInput.value = '';

            addTerminalOutput(input, true);

            if (input) {
                const parts = input.split(' ');
                const cmd = parts[0].toLowerCase();
                const args = parts.slice(1);

                const dangerousCommands = ['rm', 'sudo', 'chmod', 'mv', 'root', 'su', 'hack', 'delete', 'format', 'DROP', 'INSERT', 'UPDATE'];

                if (dangerousCommands.includes(cmd) || input.includes('--force') || input.includes('-rf')) {
                    const responses = [
                        "Nice try, hacker! That's not going to work here.",
                        "Whoa there! Are you trying to break my website?",
                        "Hmm, that looks suspicious. Access denied.",
                        "Sorry, I like my files exactly where they are.",
                        "I'm going to pretend I didn't see that command.",
                        "Error: Attempted mischief detected!",
                        "Sorry, you don't have permission to do that. Try 'help' instead.",
                        "Root access? In your dreams! *laughs in 403 Forbidden*",
                        "System: Command rejected. Too dangerous for visitors."
                    ];

                    const randomResponse = responses[Math.floor(Math.random() * responses.length)];
                    addTerminalOutput(randomResponse);
                }
                else if (cmd in commands) {
                    const result = await commands[cmd](args);
                    if (result) {
                        addTerminalOutput(result);
                    }
                } else if (cmd === '') {
                } else {
                    addTerminalOutput(`command not found: ${cmd}`);
                }
            }
        }
    });

    document.querySelector('.terminal-body').addEventListener('click', function(e) {
        // Only focus if clicking specifically on the terminal body or output
        // and not when accidentally touching on mobile
        if (e.target.classList.contains('terminal-body') ||
            e.target.id === 'terminal-output' ||
            e.target.closest('#terminal-output')) {
            terminalInput.focus();
        }
    });

    setTimeout(() => {
        glitchEffect();
    }, 1500);
});