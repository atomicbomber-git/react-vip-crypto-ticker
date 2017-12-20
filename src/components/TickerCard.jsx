import React, {Component} from 'react';
import numeral from 'numeral';
import {Motion, spring} from 'react-motion';
import tickerProps from '../utils/tickerprops';

numeral.defaultFormat('0,0.');

export default class TickerCard extends Component {
    constructor(props) {
        super(props)
        
        /* Initialize all the previous props to zero */
        this.prevProps = {};
        tickerProps.forEach((props) => {
            this.prevProps[props] = 0;
        });

        this.getTagClass = this.getTagClass.bind(this);
    }

    componentWillReceiveProps(props) {
        this.prevProps = this.props.data;
    }

    getTagClass(propName) {
        let {data} = this.props;

        let tagClassName = "";
        if (this.prevProps[propName] > data[propName]) {
            tagClassName = "is-danger";
        }
        else if (this.prevProps[propName] < data[propName]) {
            tagClassName = "is-success"
        }

        return tagClassName;
    }

    render() {
        let {data} = this.props;

        let targetStyle = {};
        let defaultStyle = {};
        let tagClasses = {};
        tickerProps.forEach((props) => {
            defaultStyle[props] = this.prevProps[props];
            targetStyle[props] = spring(data[props]);
            tagClasses[props] = this.getTagClass(props);
        });

        return (
            <Motion
                defaultStyle={defaultStyle}
                style={targetStyle}>
            
            {style => {
                return (
                    <div className="box" style={{ marginBottom: "10px" }}>
                        <div className="card-content">
                            <h1 className="title is-3"> {data.name} </h1>
                            <h2 className="title is-5"> Prices: </h2>
                            <div className="tags">
                                <span className={`tag ${tagClasses.buy} is-medium`}>
                                    BUY: Rp. { numeral(style.buy).format() }
                                </span>
                                <span className={`tag ${tagClasses.buy} is-medium`}>
                                    SELL: Rp. { numeral(style.sell).format() }
                                </span>
                            </div>
                            <hr/>
                            <h2 className="title is-5"> Low / High: </h2>
                            <div className="tags">
                                <span className={`tag ${tagClasses.low} is-medium`}>
                                    LOW: Rp. { numeral(style.low).format() }
                                </span>
                                <span className={`tag ${tagClasses.high} is-medium`}>
                                    HIGH: Rp. { numeral(style.high).format() }
                                </span>
                            </div>
                        </div>
                    </div>
                );
            }}

            </Motion>
        );
    }
}