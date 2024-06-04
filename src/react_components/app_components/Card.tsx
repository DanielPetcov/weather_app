import Cloud from '../../assets/cloud.svg';
import Rain from '../../assets/rain.svg';
import Thunderstorm from '../../assets/rainflash.svg';
import Clear from '../../assets/sunny.svg';
import Drizzle from '../../assets/drizzle.svg';
import Snow from '../../assets/snow.svg';

type CardProps = {
    day: string, 
    weather: string, 
    min: number, 
    max: number
}

export default function Card({day, weather, min, max}
    : CardProps)
    {
    
    function changeImg(){
        console.log(weather);
        switch(weather){
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

    return (<div className="card">
        <div className="left">
            <img src={`${changeImg()}`} alt="image" />
            &nbsp;
            &nbsp;
            <span>{day}</span>
        </div>
        <div className="right">
            <span>{weather}&nbsp;&nbsp;</span>
            <span className="minmax">{Math.round(min)}°C / {Math.round(max)}°C</span>
        </div>
    </div>)
}