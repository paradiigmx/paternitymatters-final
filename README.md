# Paternity Matters

![Father holding child](https://images.unsplash.com/photo-1546015220-641a0286c085?q=80&w=1200&auto=format&fit=crop)

A professional and supportive website dedicated to helping fathers understand and fight for their parental rights, offering resources, legal information, and community support. This project serves as a comprehensive, AI-enhanced resource for fathers navigating the complexities of family law.

## ✨ Features

-   **Informative Pages:** Detailed sections on Paternity, Custody, and Child Support.
-   **AI-Powered Tools:**
    -   **Child Support Estimator:** Get a state-specific estimate of child support obligations using the Gemini API.
    -   **State Law Summaries:** Generate concise summaries of custody laws for any US state, grounded with Google Search results.
    -   **Local Resource Finder:** Use geolocation or manual search to find local family courts, legal aid, and DNA testing centers via the Google Maps API integration.
-   **Comprehensive Blog:** A rich collection of articles on legal updates, well-being tips, success stories, and practical advice.
-   **Interactive FAQ:** Collapsible sections answering the most common questions about paternity, custody, and child support.
-   **Due Date Calculator:** A handy tool to estimate a child's due date based on LMP or conception date.
-   **Responsive Design:** Fully accessible and functional across all devices, from desktops to mobile phones.

## 🛠️ Tech Stack

-   **Frontend:** React, TypeScript
-   **Styling:** Tailwind CSS
-   **AI & Geolocation:** Google Gemini API (with Google Maps and Google Search grounding)
-   **Setup:** No-build environment using ES modules and import maps.

## 🚀 Getting Started

This project is set up to run without a build step.

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/your-username/paternity-matters.git
    cd paternity-matters
    ```

2.  **Set up your API Key:**
    The application's AI features require a Google Gemini API key. The application expects this key to be available in the execution environment as `process.env.API_KEY`.

3.  **Open in a browser:**
    Simply open the `index.html` file in your web browser to run the application. For the best experience and to avoid CORS issues with local file access, it's recommended to use a simple local server. You can use the VS Code "Live Server" extension or run a simple Python server:
    ```bash
    # If you have Python 3
    python -m http.server
    ```
    Then navigate to `http://localhost:8000` in your browser.

## 📄 License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.