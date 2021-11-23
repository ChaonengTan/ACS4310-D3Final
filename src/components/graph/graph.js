import React from "react";
import * as d3 from 'd3'

export default class Graph extends React.Component {
    constructor(props){
        super(props)
        this.myRef = React.createRef()
        this.data = require('../../gameInfo.csv')
    }
    componentDidMount(){
        console.log(this.myRef)
        const node = d3.select(this.myRef.current)
            .style('border', '1px solid')
            .selectAll('g')
            .data(this.data)
            .enter()
        const group = node.append('g')
        group
            .append('rect')
            .attr('x', 0)
            .attr('y', 600)
            .attr('height', 40)
            .attr('width', 20)
            .attr('stroke', 'black')
            .attr('fill', 'orange');
    }

    render(){
        return(
            <svg ref={this.myRef} height='600' width='600'></svg>
        )
    }
}