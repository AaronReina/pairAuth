import React, { Component } from "react";
import Input from './Input';
import { AuthAPI } from "../lib/auth";
import { connect } from 'react-redux';
import {  login  } from '../lib/Redux/actions';

 

  export class _Signup extends Component {


  constructor(){
    super()
    this.state = {
      username: "",
      password: "",
      campus: "",
      course: ""
    }
  }

  handleSubmit(){
    const {username, password, campus, course} = this.state;
    console.log(username, password, campus, course)
    const {dispatch} = this.props;
    AuthAPI.signup( username, password, campus, course)
    .then(user =>{
      dispatch(login(user))})
    .catch(e => console.log('catch de handlesubmit'+ e))
    
    
  }

  handleName(e){
    this.setState({username: e.target.value})
  }
  handlePass(e){
    this.setState({password: e.target.value})
  }
  handleCampus(e){
    this.setState({campus: e.target.value})
  }
  handleCourse(e){
    this.setState({course: e.target.value})
  }
  

  render() {

    console.log(this.state)


    return (
      <div>

        <Input text="Nombre" onChange={(e) => this.handleName(e)} />
        <Input text="Password" onChange={(e) => this.handlePass(e)}/>
        <Input text='Campus' onChange={(e) => this.handleCampus(e)}/>
        <Input text='Curso' onChange={(e) => this.handleCourse(e)}/>

        <button onClick={() => this.handleSubmit()}>Registrate</button>
      </div>
    );
  }
}


export const Signup = connect(store => store)(_Signup);

