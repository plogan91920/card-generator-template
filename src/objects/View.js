import React from "react";
import fetchSheet from "../helpers/googleSheets";
import CardTypes from "../layouts/Layouts";
import Card from "./Card";
import Page from "./Page";

class View extends React.Component {
    constructor() {
        super()
        this.state = {
            loading: CardTypes.length,
            cards: []
        }
        this.cardData = []
    }

    componentDidMount() {
        CardTypes.forEach((cardType, order) => {
            fetchSheet(cardType.gCode).then(result => {
                var header = result[0];
                var table = result.slice(1, result.length)

                var sanitizedResult = table.map((entry) => {
                    var newObj = {}
                    header.forEach((label, i) => {
                        newObj[label] = entry[i]
                    })
                    return newObj;
                })

                this.cardData.push({'order': order, 'layout': cardType.layout, 'data': sanitizedResult})
                this.setState({loading: this.state.loading - 1})
                if (this.state.loading === 0)
                {
                    var cardElements = [];
                    this.cardData.sort((a,b) => {return a.order - b.order})
                    this.cardData.forEach(data => {
                        data.data.forEach(card => {
                            cardElements.push({"data": card, "element": (<Card><data.layout data={card}></data.layout></Card>)})
                        })
                    })
                    this.setState({"cards": cardElements})
                }
            })
        })
    }

    paginate(cards) {
        var pages = []

        for (var i = 0; i < cards.length; i += 9) {
            var page = cards.slice(i, i+9)
            pages.push(<Page>{page.map(card => card.element)}</Page>)
        }

        return pages
    }

    render() {
        if (this.state.loading)
            return <div>Loading {this.state.loading}</div>
        else
            return <div>{this.paginate(this.state.cards)}</div>
    }

}
export default View;