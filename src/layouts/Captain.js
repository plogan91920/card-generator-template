import React from "react";
import "./Captain.css";

class Captain extends React.Component
{

    render()
    {
        var Card = this.props.data;

        //========== Card Layout Start ==========//
        return (
            <div className="Layout Captain">
                <h1 className="Name">{Card.Name}</h1>
            </div>
        )
        //========== Card Layout End ==========//
    }
}

export default Captain;