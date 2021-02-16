
import React, { Component } from "react";

class SavedTests extends Component {
    render() {
        const title = 'Accordion App';
        const hiddenTexts = [{
            label: 'Button 1',
            value: 'Text of Accordion 1'
        },
        {
            label: 'Button 2',
            value: 'Text of Accordion 2'
        },
        {
            label: 'Button 3',
            value: 'Text of Accordion 3'
        },
        {
            label: 'Button 4',
            value: 'Text of Accordion 4'
        }];
        return (
            <div>
                <Header title={title} />
                <Accordion hiddenTexts={hiddenTexts} />
            </div>
        );
    }
}

class Header extends React.Component {
    render() {
        return (
            <h1>{this.props.title}</h1>
        );
    }
}

class Accordion extends React.Component {
    render() {
        return (
            <div className="accordion">
                {this.props.hiddenTexts.map((hiddenText) => <AccordionItem key={hiddenText.label} hiddenText={hiddenText} />)}
            </div>
        );
    }
}

class AccordionItem extends React.Component {
    
    constructor(props) {
        super(props);
        this.handleToggleVisibility = this.handleToggleVisibility.bind(this);
        this.state = {
            visibility: false
        }
    }
    
    handleToggleVisibility() {
        this.setState((prevState) => {
            return {
                visibility: !prevState.visibility,
            }
        })
    }
    render() {
        const activeStatus = this.state.visibility ? 'active' : ''

        return (
            <div>
                <button className="accordion__button" onClick={this.handleToggleVisibility}>{this.props.hiddenText.label}<span className={this.state.visibility? 'fas fa-minus': 'fas fa-plus'}></span></button>
                <p className={`accordion__content ${activeStatus}`}>
                {
                    this.props.hiddenText.value
                }
                </p>
                
            </div>
        );
    }
}

export default SavedTests