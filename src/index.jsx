import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import "babel-polyfill";
import "bulma/css/bulma.css";

/* Local Components */
import TickerCard from './components/TickerCard';

const tickerUrls = {
    btc_idr: 'https://vip.bitcoin.co.id/api/btc_idr/ticker',
    ltc_idr: 'https://vip.bitcoin.co.id/api/ltc_idr/ticker',
    eth_idr: 'https://vip.bitcoin.co.id/api/eth_idr/ticker',
    etc_idr: 'https://vip.bitcoin.co.id/api/etc_idr/ticker',
    nxt_idr: 'https://vip.bitcoin.co.id/api/nxt_idr/ticker',
}

class App extends Component {
    constructor(props) {
        super(props);

        let initialTickers = [];
        for (const tickerId in tickerUrls) {
            initialTickers.push({ id: tickerId, buy: 0 });
        }

        this.state = {
            tickers: initialTickers,
            refresh: 2000
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

            /* Convert all values to number */
            for (const key in newTicker) {
                newTicker[key] = Number.parseFloat(newTicker[key]);
            }

            this.setState((prevState, props) => {
                return { tickers: this.state.tickers.map((ticker) => {
                    if (ticker.id !== tickerId) {
                        return ticker;
                    }
                    return {...ticker, ...newTicker}
                })};
            });
        }

    }

    render() {
        return (
            <div className="container">
                <div className="section">
                    {this.state.tickers.map(ticker => <TickerCard {...ticker} key={ticker.id}/>)}
                </div>
            </div>
        );
    }
}

if (document.getElementById("app")) {
    ReactDOM.render(<App/>, document.getElementById("app"));
}