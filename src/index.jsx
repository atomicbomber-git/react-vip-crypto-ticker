import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import "babel-polyfill";
import "bulma/css/bulma.css";
import numeral from "numeral";

// numeral.locale('us');
numeral.defaultFormat('0,0.');

const tickerUrls = {
    btc_idr: 'https://vip.bitcoin.co.id/api/btc_idr/ticker',
    ltc_idr: 'https://vip.bitcoin.co.id/api/ltc_idr/ticker'
}

const TickerCard = (props) => {
    let buy = numeral(props.buy).format();

    return (
        <div className="card" style={{ marginBottom: "10px" }}>
            <div className="card-content">
                <h1 className="title is-3"> {props.id} </h1>
                <p> Buy: {buy} </p>
                <p>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Laudantium fugiat, qui tenetur suscipit voluptatibus consequuntur recusandae possimus in itaque quis quos quaerat nam sapiente totam! Accusamus, iusto quaerat. Neque, aliquam.
                </p>
            </div>
        </div>
    );
}

// class TickerCard extends Component {
//     constructor(props) {
//         super(props)
//     }

// }

class App extends Component {
    constructor(props) {
        super(props);

        let initialTickers = [];
        for (const tickerId in tickerUrls) {
            initialTickers.push({ id: tickerId });
        }

        this.state = {
            tickers: initialTickers,
            refresh: 1000
        }

        this.fetchTickerData = this.fetchTickerData.bind(this);
    }

    componentDidMount() {
        this.fetchTickerData();
        window.setInterval(this.fetchTickerData, this.state.refresh);
    }

    async fetchTickerData() {
        for (const tickerId in tickerUrls) {
            let response = await fetch(tickerUrls[tickerId]);
            
            let {ticker: newTicker} = await response.json();
            newTicker.id = tickerId;

            this.setState((prevState, props) => {
                // let oldTickers = prevState.tickers.filter(ticker => ticker.id !== tickerId);
                return { tickers: this.state.tickers.map((ticker) => {
                    if (ticker.id !== tickerId) {
                        return ticker;
                    }

                    return {ticker, ...newTicker}
                })};
            });
        }

    }

    render() {
        return (
            <div className="container">
                <div className="section">
                    {this.state.tickers.map(ticker => <TickerCard {...ticker} key={ticker.key}/>)}
                </div>
            </div>
        );
    }
}

if (document.getElementById("app")) {
    ReactDOM.render(<App/>, document.getElementById("app"));
}