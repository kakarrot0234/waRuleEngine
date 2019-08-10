import React from 'react';

class Home extends React.Component{
    constructor(props){
        super(props);
    }

    render(){
        return (
            <div className="container-fluid">
                <div className="row">
                    <div className="col-3">1</div>
                    <div className="col">2</div>
                    <div className="col-3">3</div>
                </div>                
            </div>
        );
    }
}

export default Home;