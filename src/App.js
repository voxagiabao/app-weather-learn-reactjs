import React, { Component } from "react";
import Titles from './components/Titles';
import Form from './components/Form';
import Weather from './components/Weather';

const API_KEY = '614e558b809ba3d4cd23ac36f0b95536';
//   fdbd7ad156a6e1ceb5d6c1ae0e34411e
class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      temperature: undefined,
      city: undefined,
      country: undefined,
      humidity: undefined,
      description: undefined,
      error: undefined,
    };
  }
    
  getWeather = async (e) => {
    e.preventDefault();
    const cityInput = e.target.elements.city.value;
    const countryInput = e.target.elements.country.value;
    const api_call = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${cityInput},${countryInput}&APPID=${API_KEY}&units=metric`);
    const data = await api_call.json();
    
    if(cityInput && countryInput)
    {
      this.setState({
        temperature: data.main.temp,
        city: data.name,
        country: data.sys.country, 
        humidity: data.main.humidity,
        description: data.weather[0].description,
        error: "",
      });
    }else {
      this.setState({
        temperature: undefined,
        city: undefined,
        country: undefined,
        humidity: undefined,
        description: undefined,
        error: 'Please enter the value.',
      });
    }
    
  }

  render(){
    const {temperature, city, country, humidity, description, error} = this.state;
    return <div>
      <div className='wrapper'>
        <div className='main'>
          <div className='container'>
            <div className='row'>
              <div className='col-xs-5 title-container'>
                <Titles/>
              </div>
              <div className='col-xs-7 form-container'>
                  <Form getWeather={this.getWeather} />
                  <Weather 
                    temperature={temperature} 
                    city={city}
                    country={country} 
                    humidity={humidity} 
                    description={description} 
                    error={error}
                  />
              </div>      
            </div>
          </div>
        </div>
      </div>
    </div>;
  }
}
export default App;