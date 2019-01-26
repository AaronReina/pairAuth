import React from 'react';
import Login from './Login';
import Signup from './Signup';
import {connect} from 'react-redux';



export class _Principal extends React.Component{

  render(){

    const {user} = this.props
    return(

      <div> 
        {user ?
        <p>Estas fuera!</p>
        :
        <React.Fragment>
        <Signup/>
        <Login/>
        </React.Fragment>
        }

      </div>
    )
  }

}

export const Principal = connect(store => store)(_Principal);

