import { useState } from "react"
import "./Project.css"
import MapComponent from './MapComponent'


export default function Project() {

    const [location , setLocation] = useState("");
    const [latitudes , setLatitudes] = useState("");
    const [longitudes,setLongitudes] = useState("");
    const [values] = useState([]);

    function trackStateChanges(event) {
        let target = event.target;

        if(target.name === "location")
            setLocation(target.value);
        else if(target.name === "latitude")
            setLatitudes(target.value);
        else if(target.name === "longitude")
            setLongitudes(target.value);
    }

    function handleStateValues(event) {
        event.preventDefault();
        let userObject = {
            location,
            latitudes,
            longitudes
        }
        
        values.push(userObject);
        setLatitudes("");
        setLongitudes("");
        setLocation("");

    }

    return (
        <div className="Container">
            <div className="headerForm">
                <form style={{display: "flex",flexDirection: "row"}}>
                    <div className="formContent">
                        <label>Location Name</label>
                        <input type="text" name="location" value={location} onChange={trackStateChanges} placeholder="Location"/>
                    </div>
                    
                    <div className="formContent">
                        <label>Enter Latitude</label>
                        <input type="text" name="latitude" value={latitudes} onChange={trackStateChanges} placeholder="Lat"/>
                    </div>
                    
                    <div className="formContent">
                        <label>Enter Longitude</label>
                        <input type="text" name="longitude" value={longitudes} onChange={trackStateChanges} placeholder="Lon"/>
                    </div>
                    {
                        (location!==""&&latitudes!==""&&longitudes!=="")?<button className="buttonCSS" onClick={handleStateValues} style={{backgroundColor:"white"}}>ADD</button>:<button className="buttonCSS" disabled>SUBMIT</button>
                    }
                </form>
            </div>
            <div className="contentContainer">
                <div className="informationBlock">
                    <h3>ALL CO-ORDINATES:</h3>
                    
                    <table>
                        <tr>
                            <th style={{width:"300px"}}>My Co-ordinates</th>
                            <th style={{width:"200px"}}>LATITUDES</th>
                            <th style={{width:"200px"}}>LONGITUDES</th>
                        </tr>
                        {
                            (values.length === 0)?
                            ""
                            : 
                            values.map((object,index) => 
                                <tr key={index}>
                                    <td style={{width:"300px"}}>{index+1+")"}{object.location}</td>
                                    <td style={{width:"200px",fontWeight:"bold"}}>{object.latitudes}</td>
                                    <td style={{width:"200px",fontWeight:"bold"}}>{object.longitudes}</td>
                                </tr>
                            )
                        }
                    </table>
                    {
                        (values.length === 0)?<button className="RouteButtonCSS" disabled >Show Route</button>:<button className="RouteButtonCSS" style={{backgroundColor:"#074770"}}>Show Route</button>
                    }
                </div>
                <div className="mapBlock">
                    <MapComponent />
                    
                </div>
            </div>
        </div>
    )
}