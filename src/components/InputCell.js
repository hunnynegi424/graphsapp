import React, { Component } from 'react';

export default class InputCell extends Component {
    render() {
        console.log('propsInput', this.props)
        return <input
            type="text"
            ref={this.props.inputData}
            placeholder={this.props.placeholder}
            className="inputCell"
            />
    }
}