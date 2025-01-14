async function moduleProject4() {

  // 👇 WORK WORK BELOW THIS LINE 👇
  const footer = document.querySelector('footer')
  const currentYear = new Date().getFullYear()
  footer.textContent = `© BLOOM INSTITUTE OF TECHNOLOGY ${currentYear}`

  let descriptions = [
    ["Sunny", "☀️"],
    ["Cloudy", "☁️"],
    ["Rainy", "🌧️"],
    ["Thunderstorm", "⛈️"],
    ["Snowy", "❄️"],
    ["Partly Cloudy", "⛅️"]
  ]

  // 👉 Tasks 1 - 5 go here

// #### 👉 TASK 1 - Hide the div#weatherWidget
// ---

// The div#weatherWidget element should only render once a city is requested. Use an inline style to set a display to "none" to hide before making a request.

// ❗ In a future task, you will make it so that the display reverts to "block" on successful weather data retrieval.

// ---

  const weatherWidget = document.querySelector("#weatherWidget")
  weatherWidget.style.display = 'none';

// #### 👉 TASK 2 - Add an event listener to the dropdown
// ---

// 1. Research **what type** of event fires when a user selects an option using the dropdown.

// 1. Add an **event listener** to the dropdown that listens for this event involved in selecting a city, and log something to the console.

// 1. Research how to use JavaScript within the listener to find out **which city was selected**, and log its name to the console.

// ❗ It's possible more than one type of event could be used—research pros and cons of each.

// ---

  const citySelect = document.querySelector("#citySelect")
  citySelect.addEventListener('change', async evt => {
    //console.log("selection changed")
    try {
      citySelect.setAttribute('disabled', 'disabled')
      weatherWidget.style.display = 'none'

// #### 👉 TASK 3 - Prepare to fetch the weather data
// ---

// Because fetching operations can take anywhere from milliseconds to several seconds, it's customary to perform some DOM surgery just before launching the API request that shows the app is waiting for the response.

// Always working inside your event listener:

// 1. Disable the dropdown after researching how. We want users making a new selection **after** the weather data for the selected location arrives!

// 1. Modify the inline style on the **div#weatherWidget** by setting display to 'none'. Whenever a user selects a new city, the widget should hide until the request succeeds.

// 1. Inject text content into p.info that reads `Fetching weather data...`. This text acts as loading indicator. Research shows users don't mind waiting for a bit, *as long as they're properly informed and entertained* by spinners, "wait" messages, and animations.

// ❗ These little things don't sound very interesting but are, in fact, very important for a good user experience. Most users on the planet leverage slow networks and slow hardware.

// ---

      const info = document.querySelector(".info")
      info.textContent = "Fetching weather data..."

      //console.log(evt.target.value)
      let city = evt.target.value
      let url = `http://localhost:3003/api/weather?city=${city}`
      //console.log(url)

// #### 👉 TASK 4 - Launch a request to the weather API
// ---

// 1. **Form a proper URL** using your JavaScript skills, and then use Axios to initiate a GET request to the URL. Make sure to request the weather for the correct city! You can find out which city got selected by inspecting `event.target.value` inside your event listener.

// 1. Use Axios to make a GET request to the API.

// 1. Handle promise rejection by logging the `error.message` to the console or by setting a [break point](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/debugger) in the code.

// ❗ You can test your error logging code by deliberately mistyping the URL to [get a 404 "Not Found" error](./images/error-console.png).

// ❗ You can also see failures in Dev Tool's [Network tab](./images/error-networktab.png). In this example, the server returns JSON data containing an error message.

// ❗ We will handle successful requests in the next task.

// ---

      const res = await axios.get(url)


      document.querySelector("#weatherWidget").style.display = 'block'
      info.textContent = ''
      evt.target.removeAttribute(`disabled`)

      let { data } = res

      const currDay = document.querySelector(`#apparentTemp div:nth-child(2)`)
      currDay.textContent = `${data.current.apparent_temperature}°`
      const icon = document.querySelector(`#todayDescription`)
      icon.textContent = descriptions.find(d => d[0] === data.current.weather_description)[1]
      const temp = document.querySelector(`#todayStats div:nth-child(1)`)
      temp.textContent = `${data.current.temperature_min}°/${data.current.temperature_max}°`
      const prec = document.querySelector(`#todayStats div:nth-child(2)`)
      prec.textContent = `Precipitation: ${data.current.precipitation_probability * 100}%`
      const humi = document.querySelector(`#todayStats div:nth-child(3)`)
      humi.textContent = `Humidity: ${data.current.humidity}%`
      const wind = document.querySelector(`#todayStats div:nth-child(4)`)
      wind.textContent = `Wind: ${data.current.wind_speed}m/s`

      data.forecast.daily.forEach((day, i) => {
        let c = document.querySelectorAll(`.next-day`)[i]

        let dia = c.children[0]
        let ico = c.children[1]
        let tem = c.children[2]
        let pre = c.children[3]

        dia.textContent = getWeekDay(day.date)
        ico.textContent = descriptions.find(d => d[0] === day.weather_description)[1]
        tem.textContent = `${day.temperature_min}°/${day.temperature_max}°`
        pre.textContent = `Precipitation: ${day.precipitation_probability * 100}%`
      })

      const location = document.querySelector(`#location`)
      location.firstElementChild.textContent = data.location.city
    } catch (err) {
        console.log(`Promise rejected with an err.message --> `, err.message)
    }
  })

// #### 👉 TASK 5 - Handle data fetching success
// ---

// Now that the data is available, some house-keeping operations are needed before we start working with the weather data:

// 1. Empty out the text content of **p.info**.

// 1. Re-enable the **dropdown**.

// 1. Modify the inline style on the **div#weatherWidget** to make the element visible again.

// Finally, the main course! Use the API data to inject the correct information into the DOM, replacing the "placeholder" information in the HTML.

// Raw JSON **rarely can be used in the DOM unchanged**. More often than not, you'll need to transform the data before updating the DOM.

// For example, the `weather_description` needs to be **translated into the proper emoji**, by using a mapping object found inside `index.js`:

// ```js
// let descriptions = [
//   ["Sunny", "☀️"],
//   ["Cloudy", "☁️"],
//   ["Rainy", "🌧️"],
//   ["Thunderstorm", "⛈️"],
//   ["Snowy", "❄️"],
//   ["Partly Cloudy", "⛅️"],
// ]
// ```

// Use your JavaScript powers to extract the emoji for a given `weather_description`.

// Another complication is that the dates are in the `yyyy-mm-dd` format. JavaScript can be used to figure out which day of the week a given date corresponds to. But since time-related code can be particularly tricky, it's OK to ask ChatGPT for a bit of help here, as long as you study the code it produces to the point where you can re-write it yourself.

// ❗ Match the mock exactly! If, for example, an element should contain the text "Thursday", then the text "thurday" is incorrect. Be very detail-oriented.

// ---

    function getWeekDay(dateStr) {
      const date = new Date(dateStr + `T00:00:00Z`);
      const days = [`Sunday`, `Monday`, `Tuesday`, `Wednesday`, `Thursday`, `Friday`, `Saturday`]
      return days[date.getUTCDay()];
    }
  // 👆 WORK WORK ABOVE THIS LINE 👆

}

// ❗ DO NOT CHANGE THE CODE  BELOW
// ❗ DO NOT CHANGE THE CODE  BELOW
// ❗ DO NOT CHANGE THE CODE  BELOW
if (typeof module !== 'undefined' && module.exports) module.exports = { moduleProject4 }
else moduleProject4()
