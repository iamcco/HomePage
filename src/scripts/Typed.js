import React from 'react'

export default class Typed extends React.Component {
    constructor() {
        super();
        this.state = {
            types: [],
            currentIdx: 0,
            text: '',
            status: 'show'
        }
        this.config = {
            showSpeed: 100,
            hideSpeed: 50,
            symbol: ','
        };
    }
    componentDidMount() {
        let props = this.props;

        this.config.showSpeed = props.showSpeed || this.config.showSpeed;
        this.config.hideSpeed = props.hideSpeed || this.config.hideSpeed;
        this.config.symbol = props.symbol || this.config.symbol;

        let symbol = this.config.symbol,
            types = this.props.children;

        if(typeof types === 'string') {
            types = types.split(symbol).map(item => item.trim());
            this.setState({
                types: types
            });
        } else {
            throw new Error('Types children must be string and no tags');
        }
    }
    show() {
        if(this.state.types.length > 0) {
            if(this.state.status === 'hide') {
                setTimeout(() => {
                    this.hideTypes();
                }, this.config.hideSpeed);
            } else {
                if(this.state.text == this.state.types[this.state.currentIdx]) {
                    setTimeout(() => {
                        setTimeout(() => {
                            this.showTypes();
                        }, this.config.showSpeed);
                    }, 500)
                } else {
                    setTimeout(() => {
                        this.showTypes();
                    }, this.config.showSpeed);
                }
            }
        }

    }
    hideTypes() {

        let idx = this.state.currentIdx,
            text = this.state.text,
            types = this.state.types,
            status = this.state.status;

        if(text.length > 0) {
            text = text.slice(0, -1);
        } else {
            idx ++;
            idx = idx < types.length ? idx : 0;
            status = 'show';
        }

        this.setState({
            text: text,
            currentIdx: idx,
            status: status
        });

    }
    showTypes() {

        let idx = this.state.currentIdx,
            text = this.state.text,
            types = this.state.types,
            status = this.state.status;

        if(text.length < types[idx].length) {
            text = types[idx].slice(0, text.length + 1);
        } else {
            status = 'hide';
        }

        this.setState({
            text: text,
            status: status
        });

    }
    render() {

        this.show();

        return (
            <div className={this.props.className || ''}>
                <span className={this.props.pClassName || ''}>{this.props.placeholder || ''}</span>
                <strong className={this.props.sClassName || ''}>{this.state.text}</strong>
            </div>
        )
    }
}

