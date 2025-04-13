# SearchShip - Scholarship Search Platform 🎓

SearchShip is a modern web application that helps students find scholarships tailored to their unique backgrounds and qualifications. Built with Next.js and FastAPI, it offers a seamless and intuitive interface for discovering educational funding opportunities.

## 🌟 Features

- **Advanced Search Filters:**
  - GPA/Academic Performance
  - Field of Study/Major
  - Ethnicity/Nationality
  - Gender
  - Disability Status
  - Location (State/Country)
  - Grade Level (High School/Undergraduate/Graduate)
  - Financial Need Status
  - Extracurricular Activities

- **Real-time Results:** Instant scholarship matching based on your criteria
- **Responsive Design:** Seamless experience across desktop and mobile devices
- **Glassmorphic UI:** Modern and clean interface with a glass-like aesthetic
- **Easy Application Access:** Direct links to scholarship applications

## 🚀 Live Demo

Try SearchShip at: [https://searchship-fe.vercel.app/](https://searchship.vercel.app/)

## 🛠️ Tech Stack

### Frontend
- Next.js 13+ (React Framework)
- Tailwind CSS (Styling)
- React Hooks for state management

### Backend
- FastAPI (Python web framework)
- Serper API (Search functionality)
- Firecrawl (Data extraction)
- Pydantic (Data validation)

## 📦 Installation

### Prerequisites
- Node.js 14+
- Python 3.8+
- API keys for Serper and Firecrawl

### Frontend Setup
```bash
# Clone the repository
git clone https://github.com/yourusername/searchship.git

# Navigate to frontend directory
cd searchship-fe

# Install dependencies
npm install

# Start development server
npm run dev
```

### Backend Setup
```bash
# Navigate to backend directory
cd backend

# Create virtual environment
python -m venv venv

# Activate virtual environment
# On Windows
venv\Scripts\activate
# On macOS/Linux
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt

# Set up environment variables
cp .env.example .env
# Add your API keys to .env file

# Start the server
uvicorn app:app --reload
```

## 🔧 Environment Variables

Create a `.env` file in the backend directory with the following:

```env
SERPER_API_KEY=your_serper_api_key
FIRECRAWL_API_KEY=your_firecrawl_api_key
```

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request


## 🙏 Acknowledgments

- [Serper API](https://serper.dev) for search functionality
- [Firecrawl](https://firecrawl.co) for data extraction
- All contributors who have helped shape SearchShip
