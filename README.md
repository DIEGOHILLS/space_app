# Space Explorer 🚀

A beautiful, interactive space exploration website built with HTML, CSS, JavaScript, and Python Flask. Discover the wonders of our solar system through engaging visualizations, interactive planet exploration, and knowledge-testing quizzes.

## ✨ Features

### 🏠 Homepage
- **Hero Section**: Stunning space-themed design with animated planets
- **Interactive Space Facts**: Get random fascinating facts about space
- **Smooth Animations**: CSS animations and transitions throughout
- **Responsive Design**: Works perfectly on all device sizes

### 🌍 Planets Page
- **Interactive Solar System**: Clickable orbital visualization of all planets
- **Planet Controls**: Easy navigation between different planets
- **Detailed Information**: Comprehensive facts and stats for each planet
- **Visual Animations**: Smooth planet orbit animations and hover effects

### 🧠 Quiz Page
- **Dynamic Quiz System**: 5 questions about space and astronomy
- **Progress Tracking**: Visual progress bar and question counter
- **Instant Scoring**: Real-time score calculation and feedback
- **Performance Levels**: Different achievement levels based on score

## 🚀 Quick Start

### Prerequisites
- Python 3.7 or higher
- pip (Python package installer)

### Installation

1. **Clone or download the project**
   ```bash
   git clone <repository-url>
   cd space-explorer
   ```

2. **Install dependencies**
   ```bash
   pip install -r requirements.txt
   ```

3. **Run the application**
   ```bash
   python app.py
   ```

4. **Open your browser**
   Navigate to `http://localhost:5000` to explore the universe!

## 🛠 Technology Stack

### Backend
- **Python Flask**: Web framework for routing and API endpoints
- **JSON API**: RESTful endpoints for quiz questions and space facts

### Frontend
- **HTML5**: Semantic markup and structure
- **CSS3**: Modern styling with CSS Grid, Flexbox, and animations
- **JavaScript ES6**: Interactive functionality and API communication
- **Font Awesome**: Icons and visual elements
- **Google Fonts**: Typography (Orbitron + Roboto)

### Key Features
- **Responsive Design**: Mobile-first approach with breakpoints
- **CSS Variables**: Consistent color scheme and theming
- **CSS Animations**: Smooth transitions and engaging effects
- **Async/Await**: Modern JavaScript for API calls
- **Event Delegation**: Efficient event handling
- **Progressive Enhancement**: Works with JavaScript disabled

## 📁 Project Structure

```
space-explorer/
├── app.py                 # Flask application and API endpoints
├── requirements.txt       # Python dependencies
├── README.md             # Project documentation
├── templates/            # HTML templates
│   ├── base.html        # Base template with navigation
│   ├── index.html       # Homepage
│   ├── planets.html     # Planets exploration page
│   └── quiz.html        # Interactive quiz page
└── static/              # Static assets
    ├── css/
    │   └── style.css    # Main stylesheet
    └── js/
        ├── main.js      # Common JavaScript functionality
        ├── planets.js   # Planets page interactions
        └── quiz.js      # Quiz functionality
```

## 🎯 API Endpoints

### GET `/`
Homepage with hero section and features

### GET `/planets`
Interactive planets exploration page

### GET `/quiz`
Space knowledge quiz interface

### GET `/api/space-fact`
Returns a random space fact
```json
{
  "fact": "A day on Venus is longer than its year."
}
```

### GET `/api/quiz-questions`
Returns quiz questions array
```json
{
  "questions": [
    {
      "question": "Which planet is known as the Red Planet?",
      "options": ["Venus", "Mars", "Jupiter", "Saturn"],
      "correct": 1
    }
  ]
}
```

### POST `/api/submit-quiz`
Submit quiz answers and get score
```json
{
  "answers": [1, 0, 2, 1, 0]
}
```

Response:
```json
{
  "score": 4,
  "total": 5,
  "percentage": 80,
  "message": "🌟 Space cadet! Great knowledge!"
}
```

## 🎨 Design Features

### Color Scheme
- **Primary**: Indigo (`#6366f1`)
- **Secondary**: Pink (`#ec4899`) 
- **Accent**: Emerald (`#06d6a0`)
- **Background**: Dark slate (`#0f172a`)
- **Text**: Light gray (`#f8fafc`)

### Typography
- **Headers**: Orbitron (space-themed monospace)
- **Body**: Roboto (clean, readable sans-serif)

### Animations
- **Planet Orbits**: CSS keyframe animations
- **Hover Effects**: Smooth transitions on interactive elements
- **Loading States**: Spinners and progress indicators
- **Score Counting**: JavaScript-powered number animations

## 🌟 Key Highlights

1. **Educational Content**: Learn about all 8 planets in our solar system
2. **Interactive Learning**: Engage with content through clicks and exploration
3. **Knowledge Testing**: Quiz system to reinforce learning
4. **Modern UX**: Smooth animations and responsive design
5. **Accessibility**: Keyboard navigation and semantic HTML
6. **Performance**: Optimized assets and efficient JavaScript

## 🔧 Customization

### Adding New Space Facts
Edit the `SPACE_FACTS` array in `app.py`:
```python
SPACE_FACTS = [
    "Your new amazing space fact here!",
    # ... existing facts
]
```

### Adding Quiz Questions
Modify the `QUIZ_QUESTIONS` array in `app.py`:
```python
{
    "question": "Your question here?",
    "options": ["Option 1", "Option 2", "Option 3", "Option 4"],
    "correct": 0  # Index of correct answer
}
```

### Styling Changes
All CSS is in `static/css/style.css`. The design uses CSS variables for easy color scheme changes.

## 🚀 Deployment

For production deployment:

1. **Set Flask environment**
   ```bash
   export FLASK_ENV=production
   ```

2. **Use a production WSGI server**
   ```bash
   pip install gunicorn
   gunicorn app:app
   ```

3. **Configure for your hosting platform** (Heroku, DigitalOcean, AWS, etc.)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🌌 About

Space Explorer was created to make learning about space engaging and interactive. Whether you're a student, educator, or space enthusiast, this website provides an immersive way to explore our solar system.

**Built with ❤️ for space exploration and learning**

---

*Ready to explore the universe? Start your journey at `http://localhost:5000`* 🚀