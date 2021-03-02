import React, { Component } from 'react';
import './MenuStyle.css'
import MenuLink from "./MenuLink";
class MenuComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isOpen: false
        };
        this.menuToggle = this.menuToggle.bind(this);
        this.handleClick = this.handleClick.bind(this);
    }

    componentDidMount() {
        document.addEventListener('click', this.handleClick, false);
    }

    componentWillUnmount() {
        document.removeEventListener("click", this.handleClick, false);
    }

    handleClick = () => {
        if(this.state.isOpen === true) {
            this.setState({isOpen: false})
        }
    }
    menuToggle = (e) => {
        e.stopPropagation();
        this.setState({isOpen: !this.state.isOpen});
    }

    render() {
        let menuStatus = this.state.isOpen ? "isopen" : "";

        return (
            <div>
                <div className="menubar">
                    <div className="hambclicker" onClick={this.menuToggle}></div>
                    <div id="hambmenu" className={menuStatus}>
                        <span></span>
                        <span></span>
                        <span></span>
                        <span></span>
                    </div>
                    <div className="title">
                        <span>{this.props.title}</span>
                    </div>
                </div>
                <MenuLink
                    menuStatus={menuStatus}
                />
            </div>
        );
    }
}
export default MenuComponent;