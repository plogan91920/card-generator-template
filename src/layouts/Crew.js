import React from "react";
import "./Crew.css";

class Crew extends React.Component
{

    render()
    {
        var Card = this.props.data;

        //========== Card Layout Start ==========//
        return (
            <div className="Layout Crew">
                {Card.Name}
            </div>
        )
        //========== Card Layout End ==========//
    }
}

export default Crew;