import React from "react"
import * as d3 from 'd3'
import gameInfo from '../../gameInfo.csv'

export default class Graph extends React.Component {
    constructor(props){
        super(props)
        this.myRef = React.createRef()
        this.state = {data:[]}
    }
    
    componentDidMount(){
        d3.csv(gameInfo).then(data => {
            console.log(this.myRef)
            console.log(data)
            let svg = d3.select(this.myRef.current)
                .append('svg')
                .attr('width', 600)
                .attr('height', 600)
                .style('border', '1px black solid')
            svg.selectAll('rect')
                .data(data)
                .enter()
                .append('rect')
                .attr('x', d => d.i * 30)
                .attr('y', 600-40)
                .attr('height', 40)
                .attr('width', 20)
                .attr('stroke', 'black')
                .attr('fill', 'orange');
            this.setState({data})
        })
    }

    render(){
        return(
            <div ref={this.myRef}></div>
        )
    }
}