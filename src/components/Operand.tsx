import React from 'react';

class Operand extends React.Component<any, any>{
    constructor(props:any){
        super(props);
        this.state={
            name: "+"
        };
    }
    render(){
        return(
            <span>{this.state.name}</span>
        )
    }
}

export default Operand;