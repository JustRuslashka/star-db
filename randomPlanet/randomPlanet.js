import React, {Component} from 'react';
import SwapiService from '../../services/swapi-service';
import Loader from '../loader/loader';


import './randomPlanet.css';

export default class RandomPlanet extends Component  {

    swapiService = new SwapiService();

    state = {
        planet:{},
        loading: true,
    }

    constructor(){
        super();
        this.updatePlanet();
        setInterval(this.updatePlanet, 5000)
    }

    onPlanetLoaded = (planet) => {
        this.setState({
          planet,
          loading: false
        });
      };

     updatePlanet = () => {
        const id = Math.floor(Math.random()*25 + 2);
        this.swapiService
        .getPlanet(id)
        .then(this.onPlanetLoaded);
    }

    render(){
    
        const {planet, loading} = this.state;

        const loader = loading? <Loader /> : null
        const notLoader = !loading? <PlanetView planet = {planet}/> : null

        


        return (
            <div className = 'randomPlanet__body'>
                {loader}
                {notLoader}
            </div>
          );
    };

};

const PlanetView = ({planet}) => {

    const {id, name, population, rotation, diameter} = planet;

    return(
        <React.Fragment>
            <img src = {`https://starwars-visualguide.com/assets/img/planets/${id}.jpg`} className = 'randomPlanet__pic'/>
            <div className = 'randomPlanet__item'> 
                <h2 className = 'randomPlanet__name'>
                    {name}
                 </h2>    
                <div className = 'randomPlanet__stats'>
                    <div className = 'randomPlanet__population'>
                        Population {population}
                    </div>
                        
                    <div className = 'randomPlanet__rotation'>
                        Rotation Period {rotation}
                    </div>
                    <div className = 'randomPlanet__diameter'>
                        Diameter {diameter}
                    </div>
                </div>
            </div>        
        </React.Fragment>
    )

    
}