import React, { Component } from "react";
import Input from './Input';

export default class Login extends Component {
  render() {
    return (
      <div>

        <Input text="Nombre" />
        <Input text="Password"/>
        

        <button>Login</button>
      </div>
    );
  }
}
