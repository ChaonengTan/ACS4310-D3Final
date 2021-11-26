import React from "react"
import * as d3 from 'd3'

export default class Graph extends React.Component {
    constructor(props){
        super(props)
        this.myRef = React.createRef()
        this.state = {data:[]}
    }
    
    componentDidMount(){
        // consts
        const { data, width, height } = this.props
        // helpers
        const colorScale = d3.scaleSequential()
            .domain([0, data.length])
            .interpolator(d3.interpolateRainbow);
        const pieGen = (x) => d3.pie(x)
        const arcGen = (innerRadius, outerRadius) => {
            return(
                d3.arc()
                    .innerRadius(innerRadius)
                    .outerRadius(outerRadius)
                    .padAngle(0.01)
            )
        }
        const countAllProperty = (data, category, reduction) => {
            const countedData =  data.reduce((acc, obj) => {
                acc[obj[category]] === undefined ? acc[obj[category]] = obj[reduction] : acc[obj[category]] += obj[reduction]
                return acc
            }, [])
            let newParsedData = []
            for (const [key, value] of Object.entries(countedData)) {
                newParsedData.push({'label':key, 'value':value})
            }
            return newParsedData
        }
        // renderer
        d3.csv(data).then(data => {
            let svg = d3.select(this.myRef.current)
                .append('svg')
                .attr('width', width)
                .attr('height', height)
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