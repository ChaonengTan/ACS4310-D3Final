import React from "react"
import * as d3 from 'd3'

export default class Graph extends React.Component {
    constructor(props){
        super(props)
        this.myRef = React.createRef()
        this.state = {data:[]}
        this.testData = [
            {category:'developer', reducer:'sales'},
            {category:'publisher', reducer:'sales'}
        ]
    }
    
    componentDidMount(){
        // consts
        const { data, width, height } = this.props
        // helpers
        const colorScale = d3.scaleSequential()
            .domain([0, data.length])
            .interpolator(d3.interpolateRainbow)
        const arcData = (data, property) => d3.pie(data.map(d => d[property]))
        const arcGen = (innerRadius, outerRadius) => {
            return(
                d3.arc()
                    .innerRadius(innerRadius)
                    .outerRadius(outerRadius)
                    .padAngle(0.01)
            )
        }
        const countAllProperty = (data, category, reducer) => {
            const countedData = data.reduce((acc, obj) => {
                acc[obj[category]] === undefined ? acc[obj[category]] = obj[reducer] : acc[obj[category]] += obj[reducer]
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
            const svg = d3.select(this.myRef.current)
                .append('svg')
                .attr('width', width)
                .attr('height', height)
                .style('border', '1px black solid')
            this.testData.forEach((e, i) => {
                const pieGroup = svg
                    .append('g')
                    .attr('transform', `translate(${width * 2}, ${height / 2})`)
                const piepath2 = pieGroup
                    .selectAll('path')
                    .data(() => {
                        console.log(arcData(data, e.reducer))
                        arcData(data, e.reducer)
                    })
                    .enter()
                    .append('path')
                    .attr('d', arcGen(40 + 200*i, 200 + 200*i))
                    .attr('fill', (d, i) => colorScale(i))
            })

            // svg.selectAll('rect')
            //         .data(data)
            //         .enter()
            //         .append('rect')
            //         .attr('x', d => d.i * 30)
            //         .attr('y', 600-40)
            //         .attr('height', 40)
            //         .attr('width', 20)
            //         .attr('stroke', 'black')
            //         .attr('fill', 'orange')

            // updater
            this.setState({data})
        })
    }

    render(){
        return(
            <div ref={this.myRef}></div>
        )
    }
}