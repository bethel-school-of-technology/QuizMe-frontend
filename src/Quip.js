import React, { Component } from "react";

class Quip extends Component {
    constructor(props) {
        super(props);
     
        this.state = {
          data: {}
        };
    }

    componentDidMount() {
        fetch('http://localhost:2020/quips')
      .then(response => response.json())
      .then(data => this.setState({ data }))
      .then(data => console.log(data));
    }

    render () {
        const {data} = this.state;
        return(
            <p>{data.quip}</p>
        )
    }

    // fetchQuipData = () => {
    //   return fetch('http://localhost:2020/quips')
    //   .then(response => response.json())
    //   .then(data => console.log(data));
    // }    
};

export default Quip;


