import '../styling/app_style/app.css'
import { useEffect } from 'react'
import { useState } from 'react';
import Card from './app_components/Card';

import Cloud from '../assets/cloud.svg';
import Rain from '../assets/rain.svg';
import Thunderstorm from '../assets/rainflash.svg';
import Clear from '../assets/sunny.svg';
import Drizzle from '../assets/drizzle.svg';
import Snow from '../assets/snow.svg';

function App() {
  const [mode, setMode] = useState("");
  const [changeMode, setChangeMode] = useState(false);
  const [inputText, setInputText] = useState("");
  const lat = 51.509865;
  const lon = -0.118092;

  //data
  const [temperature, setTemperature] = useState(0);
  const [weatherType, setWeatherType] = useState("");
  const [location, setLocation] = useState("London");
  const [finalLocation, setFinalLocation] = useState("London");

  const [feelsLike, setFeelsLike] = useState(0);
  const [humidity, setHumidity] = useState(0);
  const [wind, setWind] = useState(0);
  const [pressure, setPressure] = useState(0);
  const key = process.env.REACT_APP_WEATHER_APP_API;

  ////////////
  const weekDays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  const today = new Date()
  const tommorow = new Date();
  tommorow.setDate(today.getDate() + 1);

  const first_part = weekDays.slice(tommorow.getDay());
  let final = [];
  if(first_part.length > 5){
      final = first_part.slice(0,5)
  } else {
      if(first_part.length < 5){
          const difference = 5 - first_part.length;
          const bonus = weekDays.slice(0, difference);
          final = first_part.concat(bonus);
      } else{
          final = first_part;
      }
  }

  let today_string = today.toISOString();
  today_string = today_string.slice(0, 10);
  ///////////////////

  useEffect(() => {
    if(changeMode){
      setMode("dark");
    } else {
      setMode("")
    }

    const body = document.body
    body.className = mode;
  }, [changeMode])


  type API_OBJECT = {
    dt_txt: string;
  }

  type Day_OBJECT = {
    weather: string;
    min: number;
    max: number;
    id: number;
  }
  const [storage_day_obj, setStorageDayObj] = useState<Day_OBJECT[]>([]);
  
  // initial data for london when user enters the page
  useEffect(() => {
    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${key}&units=metric `)
    .then(result => result.json())
    .then(data => {
      setTemperature(data.main.temp);
      setWeatherType(data.weather[0].main);
      setFeelsLike(data.main.feels_like);
      setHumidity(data.main.humidity);
      setWind(data.wind.speed);
      setPressure(data.main.pressure);
    })

    fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${location}&appid=${key}&units=metric`)
    .then(result => result.json())
    .then(data => {
          console.log(today_string);
          const result = data.list.filter((e: API_OBJECT) : Boolean => {
              if(e.dt_txt.indexOf(today_string) <= -1) return true;
              else return false;
          })
          console.log(result);
          const day1: Day_OBJECT = {
            weather: result[5].weather[0].main,
            min: result[0].main.temp_min,
            max: result[5].main.temp_max,
            id: 0
          }
          const day2: Day_OBJECT = {
            weather: result[13].weather[0].main,
            min: result[8].main.temp_min,
            max: result[13].main.temp_max,
            id: 1
          }
          const day3: Day_OBJECT = {
            weather: result[21].weather[0].main,
            min: result[16].main.temp_min,
            max: result[21].main.temp_max,
            id: 2
          }
          const day4: Day_OBJECT = {
            weather: result[29].weather[0].main,
            min: result[24].main.temp_min,
            max: result[29].main.temp_max,
            id: 3
          }
          let day5: Day_OBJECT = {
            weather: result[result.length-1].weather[0].main,
            min: result[result.length-1].main.temp_min,
            max: result[result.length-1].main.temp_max,
            id: 4
          }
          if(result[37]){
            day5 = {
              weather: result[37].weather[0].main,
              min: result[32].main.temp_min,
              max: result[37].main.temp_max,
              id: 4
            }
          } else {
            day5 = {
              weather: result[result.length-1].weather[0].main,
              min: result[result.length-1].main.temp_min,
              max: result[result.length-1].main.temp_max,
              id: 4
            }
          }
          setStorageDayObj([day1, day2, day3, day4, day5]);
    });
  }, [])

  useEffect(() => {
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${key}&units=metric`)
    .then(result => result.json())
    .then(data => {
      setTemperature(data.main.temp);
      setWeatherType(data.weather[0].main);
      setFinalLocation(data.name);
      setFeelsLike(data.main.feels_like);
      setHumidity(data.main.humidity);
      setWind(data.wind.speed);
      setPressure(data.main.pressure);
    })
    
    fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${location}&appid=${key}&units=metric`)
    .then(result => result.json())
    .then(data => {
          const result = data.list.filter((e: API_OBJECT) : Boolean => {
              if(e.dt_txt.indexOf(today_string) <= -1) return true;
              else return false;
          })
          const day1: Day_OBJECT = {
            weather: result[5].weather[0].main,
            min: result[0].main.temp_min,
            max: result[5].main.temp_max,
            id: 0
          }
          const day2: Day_OBJECT = {
            weather: result[13].weather[0].main,
            min: result[8].main.temp_min,
            max: result[13].main.temp_max,
            id: 1
          }
          const day3: Day_OBJECT = {
            weather: result[21].weather[0].main,
            min: result[16].main.temp_min,
            max: result[21].main.temp_max,
            id: 2
          }
          const day4: Day_OBJECT = {
            weather: result[29].weather[0].main,
            min: result[24].main.temp_min,
            max: result[29].main.temp_max,
            id: 3
          }
          const day5: Day_OBJECT = {
            weather: result[37].weather[0].main,
            min: result[32].main.temp_min,
            max: result[37].main.temp_max,
            id: 4
          }
          setStorageDayObj([day1, day2, day3, day4, day5]);
    });

  }, [location])

  // data when the user wants another city
  const inputChange = (e : {target : {value: string}}) => {
    setInputText(e.target.value)
  }

  function img_change(){
    switch(weatherType){
      case 'Thunderstorm':
          return Thunderstorm;
      case 'Drizzle':
          return Drizzle;
      case 'Rain':
          return Rain;
      case 'Snow':
          return Snow;
      case 'Clear':
          return Clear;
      case 'Clouds':
          return Cloud;
      default:
          return Clear;
          
  }
  }
  
  return (
    <div className='container'>
      <div className="site-mode">
            <span className='mode'>Mode</span>
            <button onClick={() => setChangeMode(!changeMode)}>
              <p>
                  <span className='span-light'>Light</span>&nbsp;&nbsp;&nbsp;/&nbsp;&nbsp;&nbsp;
                  <span className='span-dark'>Dark</span>
              </p>
            </button>
            
      </div>
      
      <div className='input-card'>
        <div className="information-card">
          <div className="info">
            <div className='main-info'>
                <h2>{Math.round(temperature)}°C</h2>
                <h3>{weatherType}</h3>
                <h4>{finalLocation}</h4>
            </div>
            <div className='details'>
                <h5>Details</h5>
                <div className='feels-like'>
                  <p>Feels like</p> <p>{feelsLike}°C</p>
                </div>
                <div className='humidity'>
                  <p>Humidity</p> <p>{humidity}%</p>
                </div>
                <div className='wind'>
                  <p>Wind</p> <p>{wind} m/s</p>
                </div>
                <div className='pressure'>
                  <p>Pressure</p> <p>{pressure} hPa</p>
                </div>
            </div>
          </div>
          <div className='info-img'>
              <img src={`${img_change()}`} alt="something" />
          </div>
        </div>

        <form className='input-field' onSubmit={(e) => {
            e.preventDefault();
            if(inputText.trim() == '') return;
            setLocation(inputText);
            setInputText('');
          }}>
            <input type="text" onChange={inputChange} value={inputText}/>
            <button type='submit' >Search</button>
        </form>


      <div className="daily">
        <h4>Daily</h4>
        <div className="week">
            {storage_day_obj.map((e) => {
              return <Card key={e.id} weather={e.weather} min={e.min} max={e.max} day={final[e.id]}/>
            })}
        </div>
      </div>

      </div>


      <div className='footer'>
        <i>Made by</i> <b>Petcov Daniel</b>
      </div>
    </div>
  )
}

export default App
