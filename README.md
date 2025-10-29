# Weather_API_Project
# Weather Dashboard

A modern, responsive weather dashboard web app built with HTML, CSS, and JavaScript. It uses the OpenWeatherMap API to fetch and display real-time weather updates, including current conditions, hourly forecasts, and a 7-day outlook for any city worldwide.

## Features

- Search for any city to get current weather and forecasts.
- Dynamic background gradients that change based on the weather condition (sunny, rainy, cloudy, etc.).
- Weather icons sourced directly from OpenWeather for accurate representation.
- Responsive design with smooth animations for an enhanced user experience.
- Clean, minimalist interface focusing solely on weather data.
- Error handling for invalid city inputs or network/API failures.

## Technologies Used

- HTML5
- CSS3 (flexbox, CSS grid, media queries, transitions)
- JavaScript ES6 (fetch API, async/await, DOM manipulation)
- OpenWeatherMap API for weather data and icons

## Setup & Usage

### Prerequisites

- Modern web browser (Chrome, Firefox, Safari, Edge)
- OpenWeatherMap API key (sign up for free at https://openweathermap.org/api)

### Installation

1. Clone this repository:
    ```
    git clone https://github.com/your-username/weather-dashboard.git
    cd weather-dashboard
    ```

2. Open `script.js` and replace the placeholder API key with your OpenWeatherMap API key:
    ```
    const apiKey = "YOUR_OPENWEATHER_API_KEY";
    ```

3. Open `index.html` in your browser to start using the weather dashboard.

## Project Structure
weather-dashboard/
├── index.html # Main HTML page
├── style.css # Stylesheet for responsive design and animations
├── script.js # JavaScript handling API calls, DOM updates, dynamic backgrounds
├── README.md # Project description and setup instructions


## Responsiveness

- Includes media queries to provide an optimized experience on phones, tablets, and desktops.
- Forecast sections wrap and resize for smaller screens.
- Input and button sizes adjust for usability on touch devices.

## Customization

- Easily adjust background colors or add image backgrounds in the `bgThemes` object in `script.js`.
- Modify CSS animations and styling by editing `style.css`.

## License

This project is licensed under the MIT License.

---

Created with ❤️ for learning and practical web development experience. Feedback and contributions are welcome!

