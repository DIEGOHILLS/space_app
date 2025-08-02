from flask import Flask, render_template, jsonify, request
import random

app = Flask(__name__)

# Space facts and quiz data
SPACE_FACTS = [
    "There are more possible games of chess than there are atoms in the observable universe.",
    "A day on Venus is longer than its year.",
    "One million Earths could fit inside the Sun.",
    "The footprints on the Moon will be there for 100 million years.",
    "The hottest planet in our solar system is Venus, not Mercury."
]

QUIZ_QUESTIONS = [
    {
        "question": "Which planet is known as the Red Planet?",
        "options": ["Venus", "Mars", "Jupiter", "Saturn"],
        "correct": 1
    },
    {
        "question": "How many moons does Earth have?",
        "options": ["0", "1", "2", "3"],
        "correct": 1
    },
    {
        "question": "What is the largest planet in our solar system?",
        "options": ["Saturn", "Neptune", "Jupiter", "Uranus"],
        "correct": 2
    },
    {
        "question": "Which is the closest star to Earth?",
        "options": ["Proxima Centauri", "The Sun", "Alpha Centauri", "Sirius"],
        "correct": 1
    },
    {
        "question": "How long does it take light from the Sun to reach Earth?",
        "options": ["8 minutes", "1 hour", "1 day", "1 second"],
        "correct": 0
    }
]

@app.route('/')
def home():
    return render_template('index.html')

@app.route('/planets')
def planets():
    return render_template('planets.html')

@app.route('/quiz')
def quiz():
    return render_template('quiz.html')

@app.route('/api/space-fact')
def get_space_fact():
    return jsonify({"fact": random.choice(SPACE_FACTS)})

@app.route('/api/quiz-questions')
def get_quiz_questions():
    return jsonify({"questions": QUIZ_QUESTIONS})

@app.route('/api/submit-quiz', methods=['POST'])
def submit_quiz():
    answers = request.json.get('answers', [])
    score = 0
    total = len(QUIZ_QUESTIONS)
    
    for i, answer in enumerate(answers):
        if i < len(QUIZ_QUESTIONS) and answer == QUIZ_QUESTIONS[i]['correct']:
            score += 1
    
    percentage = (score / total) * 100 if total > 0 else 0
    
    return jsonify({
        "score": score,
        "total": total,
        "percentage": percentage,
        "message": get_score_message(percentage)
    })

def get_score_message(percentage):
    if percentage >= 90:
        return "🚀 Astronaut level! You're ready for space!"
    elif percentage >= 70:
        return "🌟 Space cadet! Great knowledge!"
    elif percentage >= 50:
        return "🌙 Getting there! Keep exploring!"
    else:
        return "🌍 Earth bound for now. Keep learning!"

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)