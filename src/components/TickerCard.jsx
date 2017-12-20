import React, {Component} from 'react';
import numeral from 'numeral';

numeral.defaultFormat('0,0.');

export default class TickerCard extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        let buy = numeral(this.props.buy).format();

        return (
            <div className="card" style={{ marginBottom: "10px" }}>
                <div className="card-content">
                    <h1 className="title is-3"> {this.props.id} </h1>
                    <p> Buy: {buy} </p>
                    <p>
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Laudantium fugiat, qui tenetur suscipit voluptatibus consequuntur recusandae possimus in itaque quis quos quaerat nam sapiente totam! Accusamus, iusto quaerat. Neque, aliquam.
                    </p>
                </div>
            </div>
        );
    }
}