// Navigation & UI Logic
const sections = ['intro', 'types', 'redflags', 'social', 'examples', 'bestpractices', 'quiz'];

function updateProgressBar(sectionId) {
    const index = sections.indexOf(sectionId);
    const progress = ((index + 1) / sections.length) * 100;
    document.getElementById('progress-bar').style.width = `${progress}%`;
}

function nextSection(sectionId) {
    document.querySelectorAll('.module-section').forEach(section => {
        section.classList.remove('active-module');
    });

    const targetSection = document.getElementById(sectionId);
    targetSection.classList.add('active-module');

    document.querySelectorAll('.nav-links a').forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${sectionId}`) {
            link.classList.add('active');
        }
    });

    updateProgressBar(sectionId);
    window.scrollTo({ top: 0, behavior: 'smooth' });

    if (sectionId === 'quiz' && currentQuestionIndex === 0) {
        loadQuestion();
    }
}

document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const id = link.getAttribute('href').substring(1);
        nextSection(id);
    });
});

// 30 High-Quality Quiz Questions
const quizData = [
    {
        question: "An email from 'billing@netflix-updates.com' claims your payment failed and offers a 50% discount if you update within 10 minutes. What is the biggest red flag?",
        options: [
            "The 50% discount offer.",
            "The 10-minute deadline which creates artificial urgency.",
            "The sender's domain 'netflix-updates.com'.",
            "All of the above."
        ],
        correct: 3,
        explanation: "Phishing often combines suspicious domains, unrealistic offers, and high pressure to bypass critical thinking."
    },
    {
        question: "What is 'Spear Phishing'?",
        options: [
            "Generic emails sent to millions of people.",
            "A highly targeted attack aimed at a specific person or role.",
            "A phone call from someone pretending to be your bank.",
            "A type of malware that locks your computer screen."
        ],
        correct: 1,
        explanation: "Spear phishing uses personal details to appear more credible and target specific individuals."
    },
    {
        question: "You receive a LinkedIn connection request from a 'Recruiter' at a top firm. They immediately send a PDF labeled 'Job_Description.pdf'. What should you do?",
        options: [
            "Open it immediately to see the opportunity.",
            "Scan it with antivirus first and proceed with caution.",
            "Check the profile's authenticity and wait before opening attachments from strangers.",
            "Delete the request and report the profile."
        ],
        correct: 2,
        explanation: "Social media is a common vector for delivering malicious files through fake professional profiles."
    },
    {
        question: "A USB drive is found in the company cafeteria with 'Confidential: Salary Review' written on it. This is a classic example of:",
        options: [
            "Pretexting",
            "Baiting",
            "Quid Pro Quo",
            "Smishing"
        ],
        correct: 1,
        explanation: "Baiting uses curiosity or greed to trick victims into compromising their own systems via physical media."
    },
    {
        question: "Vishing (Voice Phishing) often involves an attacker pretending to be from:",
        options: [
            "Technical Support",
            "A Government Agency",
            "Your Bank's Fraud Department",
            "Any of the above"
        ],
        correct: 3,
        explanation: "Vishing attackers use phone calls to impersonate trusted authorities and extract sensitive information."
    },
    {
        question: "What does 'HTTPS' in a URL signify compared to 'HTTP'?",
        options: [
            "The website is 100% safe and cannot be a phishing site.",
            "The connection is encrypted, but the site could still be malicious.",
            "The website is verified by Google.",
            "The website loads faster."
        ],
        correct: 1,
        explanation: "HTTPS only means the data transfer is secure; attackers can and do use HTTPS on their fraudulent websites."
    },
    {
        question: "A text message claims you have an 'unpaid parking fine' and provides a link to pay. This attack is known as:",
        options: [
            "Phishing",
            "Whaling",
            "Smishing",
            "Pharming"
        ],
        correct: 2,
        explanation: "Smishing is phishing conducted via SMS (text messages)."
    },
    {
        question: "What is the primary target of a 'Whaling' attack?",
        options: [
            "Entry-level employees.",
            "The general public.",
            "C-level executives and high-profile individuals.",
            "IT Administrators only."
        ],
        correct: 2,
        explanation: "Whaling targets high-value individuals who have significant authority or access to large sums of money."
    },
    {
        question: "How does 'Pretexting' differ from standard phishing?",
        options: [
            "It only happens over the phone.",
            "It involves creating a complex false narrative to gain the victim's trust.",
            "It uses malware instead of links.",
            "There is no difference."
        ],
        correct: 1,
        explanation: "Pretexting relies on building a fabricated scenario to manipulate the victim into sharing information."
    },
    {
        question: "What is the most secure way to handle a suspicious email from your 'Bank'?",
        options: [
            "Reply to the email to confirm it's real.",
            "Call the number provided in the email.",
            "Go to the bank's official website by typing the address manually in your browser.",
            "Click the 'Unsubscribe' link at the bottom."
        ],
        correct: 2,
        explanation: "Never trust links or contact info within a suspicious email. Always use independent, verified channels."
    },
    {
        question: "An attacker offers you a free software license if you fill out a 'quick survey' with your corporate login. This is:",
        options: [
            "Baiting",
            "Quid Pro Quo",
            "Tailgating",
            "Whaling"
        ],
        correct: 1,
        explanation: "Quid Pro Quo involves offering a service or benefit in exchange for information or access."
    },
    {
        question: "Multi-Factor Authentication (MFA) is effective because:",
        options: [
            "It makes your password impossible to guess.",
            "It requires a second form of verification that an attacker likely doesn't have.",
            "It automatically blocks all phishing emails.",
            "It notifies the police if someone tries to log in."
        ],
        correct: 1,
        explanation: "MFA provides a critical layer of defense even if your primary credentials are stolen."
    },
    {
        question: "You receive an email from 'HR' with an attachment 'Employee_Benefits_2026.zip'. The email tone is unusually formal. What should you do?",
        options: [
            "Open it to see your new benefits.",
            "Forward it to your colleagues to see if they got it too.",
            "Verify the request with HR through a known internal chat or phone number.",
            "Ignore it and wait for a second reminder."
        ],
        correct: 2,
        explanation: "Verification through a second, trusted channel is the best way to confirm the legitimacy of internal requests."
    },
    {
        question: "Which of the following is a sign of a possible 'Pharming' attack?",
        options: [
            "You receive a lot of spam emails.",
            "Your browser redirects you to a fake website even when you type the correct URL.",
            "Your computer fan starts running very loudly.",
            "You get a phone call from 'Microsoft Support'."
        ],
        correct: 1,
        explanation: "Pharming involves malicious code that redirects traffic to a fraudulent website by corrupting DNS or host files."
    },
    {
        question: "What is 'Social Engineering'?",
        options: [
            "Designing social media platforms.",
            "The psychological manipulation of people into performing actions or divulging confidential info.",
            "Building computers for social use.",
            "A type of network firewall."
        ],
        correct: 1,
        explanation: "Social engineering targets human psychology rather than technical vulnerabilities."
    },
    {
        question: "A pop-up on a website says 'Your computer is infected! Click here to scan now.' This is often:",
        options: [
            "A helpful browser feature.",
            "Scareware designed to trick you into downloading malware.",
            "A legitimate antivirus notification.",
            "A sign that your internet is slow."
        ],
        correct: 1,
        explanation: "Scareware uses fear and false alarms to provoke immediate, irrational actions."
    },
    {
        question: "Why should you be careful when using public Wi-Fi for sensitive tasks?",
        options: [
            "It is always slower than home Wi-Fi.",
            "Attackers can easily intercept your data through 'Man-in-the-Middle' attacks.",
            "Public Wi-Fi can damage your hardware.",
            "You might have to pay for it later."
        ],
        correct: 1,
        explanation: "Unsecured public networks allow attackers to eavesdrop on your connection and steal credentials."
    },
    {
        question: "What is 'Business Email Compromise' (BEC)?",
        options: [
            "When a business email server crashes.",
            "When an attacker gains access to a corporate email account to conduct fraud.",
            "Sending too many emails at work.",
            "A type of email encryption."
        ],
        correct: 1,
        explanation: "BEC is a sophisticated scam targeting businesses to facilitate unauthorized fund transfers."
    },
    {
        question: "You receive an email from a coworker asking for a 'quick wire transfer' for an urgent project while they are 'in a meeting'. This is likely:",
        options: [
            "A sign of a hard-working colleague.",
            "A CEO Fraud or Business Email Compromise attempt.",
            "A standard accounting procedure.",
            "A misunderstanding of company policy."
        ],
        correct: 1,
        explanation: "Urgent, unusual financial requests are classic signs of email compromise and social engineering."
    },
    {
        question: "What is the danger of 'Over-sharing' on social media?",
        options: [
            "It makes your profile look cluttered.",
            "It provides attackers with personal details used to craft convincing spear-phishing lures.",
            "It can lead to more advertisements.",
            "There is no real security danger."
        ],
        correct: 1,
        explanation: "Personal information like birthdays, pets' names, or vacation plans can be used to guess passwords or build trust in scams."
    },
    {
        question: "A website requires you to download a 'special browser plugin' to view a video. This is likely:",
        options: [
            "A way to improve video quality.",
            "A delivery method for malware or adware.",
            "A standard requirement for modern web browsing.",
            "A sign that your computer is outdated."
        ],
        correct: 1,
        explanation: "Malicious sites often use the promise of content to trick users into installing harmful software."
    },
    {
        question: "What should you do if you realize you've clicked a phishing link and entered your password?",
        options: [
            "Wait and see if anything happens.",
            "Immediately change your password and notify your IT security department.",
            "Delete the browser history and restart your computer.",
            "Do nothing, as MFA will protect you anyway."
        ],
        correct: 1,
        explanation: "Rapid response is critical to minimize the impact of a credential breach."
    },
    {
        question: "What is 'Tailgating' in a physical security context?",
        options: [
            "Following someone too closely on the highway.",
            "Following an authorized person into a restricted area without their knowledge.",
            "A type of phishing that targets drivers.",
            "Using a fake ID badge."
        ],
        correct: 1,
        explanation: "Tailgating is a social engineering tactic used to gain physical access to secure locations."
    },
    {
        question: "Why is 'Artificial Urgency' so effective in phishing?",
        options: [
            "Because it makes the email more professional.",
            "Because it triggers a stress response that causes people to act before they think.",
            "Because the internet works very fast.",
            "Because people like to finish tasks quickly."
        ],
        correct: 1,
        explanation: "Urgency is designed to bypass rational analysis and provoke an impulsive reaction."
    },
    {
        question: "What is the ultimate goal of most phishing attacks?",
        options: [
            "To test the company's firewall.",
            "To gain unauthorized access to data, credentials, or financial resources.",
            "To improve the attacker's coding skills.",
            "To send annoying messages to people."
        ],
        correct: 1,
        explanation: "Most cyberattacks are financially motivated or intended for data exfiltration and espionage."
    },
    {
        question: "An attacker sends a physical letter or email containing a QR code that, when scanned, leads to a fraudulent login page. This is known as:",
        options: [
            "Q-Phishing",
            "Quishing",
            "Scan-Scam",
            "Rapid Response Phishing"
        ],
        correct: 1,
        explanation: "Quishing (QR Phishing) uses QR codes to hide malicious URLs from traditional email filters."
    },
    {
        question: "You notice a URL that looks like 'g00gle.com' or 'apple-support.com' instead of the official domains. This technique is called:",
        options: [
            "DNS Poisoning",
            "Typosquatting",
            "Link Masking",
            "Host Manipulation"
        ],
        correct: 1,
        explanation: "Typosquatting (or URL hijacking) relies on users making common typing errors or failing to notice subtle misspellings."
    },
    {
        question: "A 'Session Hijacking' attack via phishing typically aims to steal what from your browser?",
        options: [
            "Your hardware serial number",
            "Your session cookies",
            "Your browser history",
            "Your desktop wallpaper"
        ],
        correct: 1,
        explanation: "By stealing session cookies, an attacker can bypass login requirements and MFA to access your active accounts."
    },
    {
        question: "What is a 'Browser-in-the-Browser' (BitB) attack?",
        options: [
            "Running two browsers at the same time.",
            "A phishing technique that simulates a fake browser window within a real one to steal credentials.",
            "A type of virtual machine.",
            "A browser extension that blocks ads."
        ],
        correct: 1,
        explanation: "BitB attacks create a very convincing fake login popup that looks exactly like a legitimate browser window, making it extremely hard to detect."
    },
    {
        question: "Beyond deleting a phishing email, why is 'Reporting' it to your IT department important?",
        options: [
            "It allows them to block the sender for the entire organization.",
            "It helps them identify if other colleagues have been targeted.",
            "It improves the company's automated security filters.",
            "All of the above."
        ],
        correct: 3,
        explanation: "Reporting phishing turns an individual threat into a collective defense, protecting your entire organization from the attack."
    }
];

let currentQuestionIndex = 0;
let score = 0;

function loadQuestion() {
    const questionArea = document.getElementById('question-area');
    const feedbackArea = document.getElementById('quiz-feedback');
    const questionText = document.getElementById('question-text');
    const optionsContainer = document.getElementById('options-container');
    
    document.getElementById('q-count').innerText = currentQuestionIndex + 1;
    document.getElementById('current-score').innerText = score;

    feedbackArea.classList.add('hidden');
    questionArea.classList.remove('hidden');

    const currentQuestion = quizData[currentQuestionIndex];
    questionText.innerText = `Question ${currentQuestionIndex + 1}: ${currentQuestion.question}`;
    
    optionsContainer.innerHTML = '';
    currentQuestion.options.forEach((option, index) => {
        const button = document.createElement('button');
        button.innerText = option;
        button.classList.add('option-btn');
        button.onclick = () => checkAnswer(index);
        optionsContainer.appendChild(button);
    });
}

function checkAnswer(selectedIndex) {
    const currentQuestion = quizData[currentQuestionIndex];
    const feedbackArea = document.getElementById('quiz-feedback');
    const feedbackMessage = document.getElementById('feedback-message');
    const options = document.querySelectorAll('.option-btn');

    options.forEach(btn => btn.disabled = true);

    if (selectedIndex === currentQuestion.correct) {
        score++;
        document.getElementById('current-score').innerText = score;
        options[selectedIndex].classList.add('correct');
        feedbackMessage.innerHTML = `<h4 style="color: var(--success-color); margin-bottom: 0.5rem;">&#10003; Correct!</h4> ${currentQuestion.explanation}`;
    } else {
        options[selectedIndex].classList.add('wrong');
        options[currentQuestion.correct].classList.add('correct');
        feedbackMessage.innerHTML = `<h4 style="color: var(--error-color); margin-bottom: 0.5rem;">&#10007; Incorrect</h4> ${currentQuestion.explanation}`;
    }

    feedbackArea.classList.remove('hidden');
}

function loadNextQuestion() {
    currentQuestionIndex++;
    if (currentQuestionIndex < quizData.length) {
        loadQuestion();
    } else {
        showResults();
    }
}

function showResults() {
    document.getElementById('question-area').classList.add('hidden');
    document.getElementById('quiz-feedback').classList.add('hidden');
    
    const resultsArea = document.getElementById('quiz-results');
    const scoreDisplay = document.getElementById('score-display');
    const certificate = document.getElementById('certificate');
    const certScore = document.getElementById('cert-score');
    
    resultsArea.classList.remove('hidden');
    
    const percentage = (score / quizData.length) * 100;
    scoreDisplay.innerText = `Final Score: ${score} / ${quizData.length}`;
    certScore.innerText = `Grade: ${percentage.toFixed(0)}%`;

    let rank = "";
    let color = "";

    if (percentage === 100) {
        rank = "Master Guardian";
        color = "var(--accent-color)";
    } else if (percentage >= 80) {
        rank = "Sentinel";
        color = "var(--success-color)";
    } else if (percentage >= 60) {
        rank = "Guardian";
        color = "#eab308";
    } else {
        rank = "Novice";
        color = "var(--error-color)";
    }

    scoreDisplay.innerHTML += `<br><span style='color: ${color}; font-weight: bold; font-size: 1.5rem;'>Rank: ${rank}</span>`;

    if (percentage >= 70) {
        certificate.style.display = 'block';
    } else {
        certificate.style.display = 'none';
        scoreDisplay.innerHTML += "<br><span style='color: var(--error-color);'>Score at least 70% to earn your certificate.</span>";
    }
}

function restartQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    document.getElementById('quiz-results').classList.add('hidden');
    document.getElementById('question-area').classList.remove('hidden');
    nextSection('intro');
}

// Particle Animation
function createParticles() {
    const container = document.getElementById('bg-anim');
    const particleCount = 20;
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.classList.add('particle');
        
        const size = Math.random() * 3 + 1;
        const left = Math.random() * 100;
        const delay = Math.random() * 20;
        const duration = Math.random() * 10 + 10;
        
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        particle.style.left = `${left}%`;
        particle.style.animationDelay = `${delay}s`;
        particle.style.animationDuration = `${duration}s`;
        
        container.appendChild(particle);
    }
}

// Initialize
updateProgressBar('intro');
createParticles();