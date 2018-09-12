import React from 'react';
import { Navbar, NavbarBrand, NavbarNav, NavbarToggler, Collapse, NavItem, NavLink, Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'mdbreact';
import { BrowserRouter as Router } from 'react-router-dom';
import axios from 'axios';
axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.xsrfHeaderName = 'X-CSRFToken';
export class NavbarNeptuna extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            collapse: false,
            isWideEnough: false,
            dropdownOpen: false,
            activeProject:""
        };
    this.onClick = this.onClick.bind(this);
    this.toggle = this.toggle.bind(this);
    }

    onClick(){
        this.setState({
            collapse: !this.state.collapse,
        });
    }

    toggle() {
        this.setState({
            dropdownOpen: !this.state.dropdownOpen
        });
    }
    async componentWillMount() {


      await axios.post('/active/project')
                          .then((response)=> {

                                    this.setState({
                                        activeProject:response.data['activeProject'].toUpperCase()});



                          })
                          }


    render() {
        return (
            <Router>
                <Navbar fixed="top" dark expand="md" scrolling>
                    <NavbarBrand href="/">

                        <strong style={{fontSize:"18px"}}>{this.state.activeProject}</strong>
                    </NavbarBrand>
                    { !this.state.isWideEnough && <NavbarToggler onClick = { this.onClick } />}
                    <Collapse isOpen = { this.state.collapse } navbar>
                        <NavbarNav left style={{height:"25px"}}>
                          <NavItem active >
                              <NavLink to="#">
                                <i className="fas fa-database"></i>
                              </NavLink>
                          </NavItem>
                          <NavItem>
                              <NavLink to="#">
                                 <i className="fas fa-cogs"></i>
                              </NavLink>
                          </NavItem>
                          <NavItem>
                              <NavLink to="#">
                                 <i className="fas fa-cubes"></i>
                              </NavLink>
                          </NavItem>
                          <NavItem>
                              <NavLink to="#">
                                 <i className="fas fa-project-diagram"></i>
                              </NavLink>
                          </NavItem>
                          <NavItem>
                              <NavLink to="#">
                                  <i className="fas fa-book"></i>
                               </NavLink>
                          </NavItem>
                          <NavItem>
                              <NavLink to="#">
                                  <i className="fas fa-tachometer-alt"></i>
                               </NavLink>
                          </NavItem>
                          <NavItem>
                              <NavLink to="#">
                                  <i className="fas fa-link"></i>
                               </NavLink>
                          </NavItem>
                          <NavItem style={{marginLeft:"50px",display:"none"}} className="itemtext dataset">
                              <NavLink to="#" style={{zIndex:2}}>
                                  <strong style={{color:"#fff"}}>Données</strong>
                               </NavLink>
                          </NavItem>
                        </NavbarNav>
                        <NavbarNav right>
                          <NavItem>

                          </NavItem>
                        </NavbarNav>
                    </Collapse>
                </Navbar>
            </Router>
        );
    }
}
