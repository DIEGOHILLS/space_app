// JavaScript for Quiz page

document.addEventListener('DOMContentLoaded', function() {
    const startBtn = document.getElementById('start-quiz-btn');
    const retakeBtn = document.getElementById('retake-quiz-btn');
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');
    const submitBtn = document.getElementById('submit-btn');
    
    const quizStart = document.getElementById('quiz-start');
    const quizProgress = document.getElementById('quiz-progress');
    const quizContent = document.getElementById('quiz-content');
    const quizResults = document.getElementById('quiz-results');
    const loading = document.getElementById('loading');
    
    const progressFill = document.getElementById('progress-fill');
    const progressText = document.getElementById('progress-text');
    const questionText = document.getElementById('question-text');
    const optionsContainer = document.getElementById('options-container');
    
    const scoreNumber = document.getElementById('score-number');
    const percentage = document.getElementById('percentage');
    const resultsMessage = document.getElementById('results-message');
    const resultsIcon = document.getElementById('results-icon');
    const resultsTitle = document.getElementById('results-title');
    
    let questions = [];
    let currentQuestion = 0;
    let answers = [];
    let quizScore = 0;

    // Start quiz
    if (startBtn) {
        startBtn.addEventListener('click', startQuiz);
    }
    
    // Retake quiz
    if (retakeBtn) {
        retakeBtn.addEventListener('click', resetQuiz);
    }
    
    // Navigation buttons
    if (prevBtn) {
        prevBtn.addEventListener('click', previousQuestion);
    }
    
    if (nextBtn) {
        nextBtn.addEventListener('click', nextQuestion);
    }
    
    if (submitBtn) {
        submitBtn.addEventListener('click', submitQuiz);
    }

    async function startQuiz() {
        try {
            showLoading();
            
            // Fetch questions from API
            const response = await fetch('/api/quiz-questions');
            const data = await response.json();
            
            if (data.questions && data.questions.length > 0) {
                questions = data.questions;
                answers = new Array(questions.length).fill(-1);
                currentQuestion = 0;
                
                hideLoading();
                showQuizContent();
                showQuestion();
            } else {
                throw new Error('No questions received');
            }
        } catch (error) {
            console.error('Error starting quiz:', error);
            hideLoading();
            showNotification('Failed to load quiz questions. Please try again.', 'error');
        }
    }

    function resetQuiz() {
        questions = [];
        answers = [];
        currentQuestion = 0;
        quizScore = 0;
        
        hideResults();
        showQuizStart();
    }

    function showQuestion() {
        if (!questions[currentQuestion]) return;
        
        const question = questions[currentQuestion];
        
        // Update progress
        const progress = ((currentQuestion + 1) / questions.length) * 100;
        progressFill.style.width = `${progress}%`;
        progressText.textContent = `Question ${currentQuestion + 1} of ${questions.length}`;
        
        // Update question text
        questionText.textContent = question.question;
        
        // Create options
        optionsContainer.innerHTML = '';
        question.options.forEach((option, index) => {
            const optionElement = document.createElement('div');
            optionElement.className = 'option';
            optionElement.textContent = option;
            optionElement.dataset.index = index;
            
            // Mark as selected if previously answered
            if (answers[currentQuestion] === index) {
                optionElement.classList.add('selected');
            }
            
            optionElement.addEventListener('click', () => selectOption(index));
            optionsContainer.appendChild(optionElement);
        });
        
        // Update navigation buttons
        prevBtn.style.display = currentQuestion === 0 ? 'none' : 'inline-flex';
        
        if (currentQuestion === questions.length - 1) {
            nextBtn.style.display = 'none';
            submitBtn.style.display = 'inline-flex';
        } else {
            nextBtn.style.display = 'inline-flex';
            submitBtn.style.display = 'none';
        }
        
        // Enable/disable next/submit button based on answer
        updateNavigationState();
    }

    function selectOption(index) {
        // Remove previous selection
        document.querySelectorAll('.option').forEach(opt => {
            opt.classList.remove('selected');
        });
        
        // Mark current selection
        const selectedOption = document.querySelector(`[data-index="${index}"]`);
        if (selectedOption) {
            selectedOption.classList.add('selected');
        }
        
        // Store answer
        answers[currentQuestion] = index;
        
        // Update navigation state
        updateNavigationState();
        
        // Add subtle feedback
        selectedOption.style.transform = 'scale(0.98)';
        setTimeout(() => {
            selectedOption.style.transform = 'scale(1)';
        }, 150);
    }

    function updateNavigationState() {
        const hasAnswer = answers[currentQuestion] !== -1;
        
        if (currentQuestion === questions.length - 1) {
            submitBtn.disabled = !hasAnswer;
        } else {
            nextBtn.disabled = !hasAnswer;
        }
    }

    function previousQuestion() {
        if (currentQuestion > 0) {
            currentQuestion--;
            showQuestion();
        }
    }

    function nextQuestion() {
        if (currentQuestion < questions.length - 1 && answers[currentQuestion] !== -1) {
            currentQuestion++;
            showQuestion();
        }
    }

    async function submitQuiz() {
        try {
            showLoading();
            
            const response = await fetch('/api/submit-quiz', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ answers: answers })
            });
            
            const result = await response.json();
            
            hideLoading();
            showResults(result);
            
        } catch (error) {
            console.error('Error submitting quiz:', error);
            hideLoading();
            showNotification('Failed to submit quiz. Please try again.', 'error');
        }
    }

    function showResults(result) {
        hideQuizContent();
        
        // Update score display
        scoreNumber.textContent = result.score;
        percentage.textContent = `${Math.round(result.percentage)}%`;
        resultsMessage.textContent = result.message;
        
        // Update icon and title based on performance
        let iconClass = 'fas fa-trophy';
        let titleText = 'Great Job!';
        let iconColor = '#06d6a0';
        
        if (result.percentage >= 90) {
            iconClass = 'fas fa-rocket';
            titleText = 'Astronaut Level!';
            iconColor = '#6366f1';
        } else if (result.percentage >= 70) {
            iconClass = 'fas fa-star';
            titleText = 'Space Cadet!';
            iconColor = '#f59e0b';
        } else if (result.percentage >= 50) {
            iconClass = 'fas fa-moon';
            titleText = 'Getting There!';
            iconColor = '#ec4899';
        } else {
            iconClass = 'fas fa-globe';
            titleText = 'Keep Learning!';
            iconColor = '#8b5cf6';
        }
        
        resultsIcon.innerHTML = `<i class="${iconClass}"></i>`;
        resultsIcon.style.color = iconColor;
        resultsTitle.textContent = titleText;
        
        // Animate score counting
        animateScore(result.score, result.percentage);
        
        showQuizResults();
    }

    function animateScore(finalScore, finalPercentage) {
        let currentScore = 0;
        let currentPercentage = 0;
        const duration = 2000; // 2 seconds
        const interval = 50; // Update every 50ms
        const steps = duration / interval;
        const scoreStep = finalScore / steps;
        const percentageStep = finalPercentage / steps;
        
        const timer = setInterval(() => {
            currentScore += scoreStep;
            currentPercentage += percentageStep;
            
            if (currentScore >= finalScore) {
                currentScore = finalScore;
                currentPercentage = finalPercentage;
                clearInterval(timer);
            }
            
            scoreNumber.textContent = Math.round(currentScore);
            percentage.textContent = `${Math.round(currentPercentage)}%`;
        }, interval);
    }

    // Show/hide functions
    function showLoading() {
        hideAllSections();
        loading.style.display = 'block';
    }

    function hideLoading() {
        loading.style.display = 'none';
    }

    function showQuizStart() {
        hideAllSections();
        quizStart.style.display = 'block';
    }

    function showQuizContent() {
        hideAllSections();
        quizProgress.style.display = 'block';
        quizContent.style.display = 'block';
    }

    function hideQuizContent() {
        quizProgress.style.display = 'none';
        quizContent.style.display = 'none';
    }

    function showQuizResults() {
        hideAllSections();
        quizResults.style.display = 'block';
    }

    function hideResults() {
        quizResults.style.display = 'none';
    }

    function hideAllSections() {
        quizStart.style.display = 'none';
        quizProgress.style.display = 'none';
        quizContent.style.display = 'none';
        quizResults.style.display = 'none';
        loading.style.display = 'none';
    }

    // Keyboard navigation
    document.addEventListener('keydown', function(e) {
        if (quizContent.style.display === 'block') {
            switch(e.key) {
                case 'ArrowLeft':
                    if (currentQuestion > 0) {
                        previousQuestion();
                    }
                    break;
                case 'ArrowRight':
                    if (currentQuestion < questions.length - 1 && answers[currentQuestion] !== -1) {
                        nextQuestion();
                    }
                    break;
                case 'Enter':
                    if (currentQuestion === questions.length - 1 && answers[currentQuestion] !== -1) {
                        submitQuiz();
                    } else if (answers[currentQuestion] !== -1) {
                        nextQuestion();
                    }
                    break;
                case '1':
                case '2':
                case '3':
                case '4':
                    const optionIndex = parseInt(e.key) - 1;
                    if (optionIndex < questions[currentQuestion]?.options.length) {
                        selectOption(optionIndex);
                    }
                    break;
            }
        }
    });

    // Add visual feedback for button interactions
    document.querySelectorAll('.btn').forEach(btn => {
        btn.addEventListener('mousedown', function() {
            this.style.transform = 'scale(0.95)';
        });
        
        btn.addEventListener('mouseup', function() {
            this.style.transform = 'scale(1)';
        });
        
        btn.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
        });
    });

    // Add option hover effects
    document.addEventListener('mouseover', function(e) {
        if (e.target.classList.contains('option') && !e.target.classList.contains('selected')) {
            e.target.style.transform = 'translateX(5px)';
        }
    });

    document.addEventListener('mouseout', function(e) {
        if (e.target.classList.contains('option') && !e.target.classList.contains('selected')) {
            e.target.style.transform = 'translateX(0)';
        }
    });

    // Progress bar animation on load
    function animateProgressOnLoad() {
        if (progressFill) {
            progressFill.style.transition = 'width 0.5s ease-out';
        }
    }

    animateProgressOnLoad();
});