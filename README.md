# Portfolio & Competitive Programming Tracker

A high-performance, responsive developer portfolio built with React, TypeScript, and Tailwind CSS. This project features a real-time competitive programming tracker and utilizes Google's Gemini API to dynamically fetch and summarize the latest GitHub projects.

## 🚀 Features

- **Live CP Tracker**:
  - Real-time fetching of ratings and ranks from **CodeChef**, **LeetCode**, and **Codeforces**.
  - Robust error handling with smart fallbacks and timeout management.
  - Independent data fetching to ensure UI responsiveness.

- **AI-Powered Project Section**:
  - Integrates **Google Gemini 2.5 Flash API** via `@google/genai`.
  - Automatically fetches the latest repository from GitHub.
  - Summarizes technical READMEs into concise bullet points and extracts tech stacks dynamically.

- **Modern UI/UX**:
  - **Animated Background**: Custom HTML5 Canvas particle network with interactive connections.
  - **Auto-Scaling Layouts**: Fluid typography and grid systems that adapt perfectly to any screen size (Mobile to Ultrawide).
  - **Dynamic Tab Title**: Engaging browser tab behavior when the user switches context.
  - **Glassmorphism**: Sleek, dark-themed frosted glass aesthetic.

## 🛠️ Tech Stack

- **Frontend**: React 19, TypeScript, Vite/Webpack
- **Styling**: Tailwind CSS, Lucide React (Icons)
- **AI/ML**: Google Gemini API (`@google/genai` SDK)
- **Data Sources**: GitHub API, Various CP Rating Proxy APIs

## 📂 Project Structure

```
├── components/
│   ├── AnimatedBackground.tsx  # Canvas-based particle animation
│   ├── Footer.tsx              # Site footer
│   ├── Icons.tsx               # Icon exports
│   └── TrackerCard.tsx         # Stat display card with fluid typography
├── services/
│   ├── projectService.ts       # GitHub + Gemini API logic
│   └── trackerService.ts       # CP Rating fetching logic with fallbacks
├── constants.ts                # Static profile data and config
├── types.ts                    # TypeScript interfaces
├── App.tsx                     # Main application layout
├── index.tsx                   # Entry point
└── styles.css / index.html
```

## ⚙️ Setup & Installation

1.  **Clone the repository**
    ```bash
    git clone https://github.com/yourusername/portfolio-tracker.git
    cd portfolio-tracker
    ```

2.  **Install dependencies**
    ```bash
    npm install
    ```

3.  **Configure Environment Variables**
    Create a `.env` file in the root directory and add your Google Gemini API key:
    ```env
    API_KEY=your_google_gemini_api_key
    ```
    *Note: The application expects `process.env.API_KEY` to be available.*

4.  **Run the application**
    ```bash
    npm start
    ```

## 🧩 Customization

- **Profile Data**: Edit `constants.ts` to update personal information, experience, education, and static projects.
- **Tracker Config**: Update usernames and API endpoints in `constants.ts` under `TRACKER_CONFIG`.

## 📄 License

MIT License.
