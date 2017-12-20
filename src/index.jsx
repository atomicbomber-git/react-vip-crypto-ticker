import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import "babel-polyfill";
import "bulma/css/bulma.css";

/* Local Components */
import TickerCard from './components/TickerCard';
import tickerProps from './utils/tickerprops';

const tickers = {
    btc_idr: { name: 'BTC / IDR', url: 'https://vip.bitcoin.co.id/api/btc_idr/ticker' },
    ltc_idr: { name: 'LTC / IDR', url: 'https://vip.bitcoin.co.id/api/ltc_idr/ticker' },
    bch_idr: { name: 'BCH / IDR', url: 'https://vip.bitcoin.co.id/api/bch_idr/ticker' },    
    eth_idr: { name: 'ETH / IDR', url: 'https://vip.bitcoin.co.id/api/eth_idr/ticker' },
    etc_idr: { name: 'ETC / IDR', url: 'https://vip.bitcoin.co.id/api/etc_idr/ticker' },
    nxt_idr: { name: 'NXT / IDR', url: 'https://vip.bitcoin.co.id/api/nxt_idr/ticker' },
}

class App extends Component {
    constructor(props) {
        super(props);

        let initialTickers = [];
        for (const tickerId in tickers) {
            let ticker = { id: tickerId, name: tickers[tickerId].name };

            tickerProps.forEach((props) => {
                ticker[props] = 0;
            })

            initialTickers.push(ticker);
        }

        this.state = {
            tickers: initialTickers,
        }

        this.fetchTickerData = this.fetchTickerData.bind(this);
        window.setInterval(this.fetchTickerData, 10000);
    }

    componentDidMount() {
        this.fetchTickerData();
    }

    async fetchTickerData() {
        for (const tickerId in tickers) {
            let response, newTicker;
            try {
                response = await fetch(tickers[tickerId].url);
                newTicker = (await response.json()).ticker; 
            }
            catch(e) {
                console.log("Failed to fetch data.");
                break;
            }

            /* Convert all values to number */
            for (const key in newTicker) {
                newTicker[key] = Number.parseInt(newTicker[key]);
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
                    {this.state.tickers.map(ticker => <TickerCard data={ticker} key={ticker.id}/>)}
                </div>
            </div>
        );
    }
}

if (document.getElementById("app")) {
    ReactDOM.render(<App/>, document.getElementById("app"));
}