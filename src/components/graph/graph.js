import React from "react"
import * as d3 from 'd3'

export default class Graph extends React.Component {
    constructor(props){
        super(props)
        this.myRef = React.createRef()
        this.state = {data:[]}
        this.testData = [
            {category:'publisher', reducer:'sales'},
            {category:'title', reducer:'sales'},
            {category:'platform', reducer:'sales'}
        ]
    }
    
    componentDidMount(){
        // consts
        const { data, width, height, graphSpacing, graphSize } = this.props
        // helpers
        const colorScale = d3.scaleSequential()
            .domain([0, data.length])
            .interpolator(d3.interpolateRainbow)
        const arcGen = (innerRadius, outerRadius) => {
            return(
                d3.arc()
                    .innerRadius(innerRadius)
                    .outerRadius(outerRadius)
                    .padAngle(0.01)
            )
        }
        const countAllProperty = (data, category, reducer) => {
            const parseNum = e => parseInt(e.split(',').join(''))
            const countedData = data.reduce((acc, obj) => {
                acc[obj[category]] === undefined ? acc[obj[category]] = parseNum(obj[reducer]) : acc[obj[category]] += parseNum(obj[reducer])
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
                // consts
                const pieGroup = svg
                    .append('g')
                    .attr('transform', `translate(${width / 2}, ${height / 2})`)
                const pieGen = d3.pie()
                const pieGenData = countAllProperty(data, e.category, e.reducer)
                // drawer
                console.log(pieGenData.map(d => d.value))
                console.log(pieGenData)
                console.log(e.reducer)
                const piepath = pieGroup
                    .selectAll('path')
                    .data(pieGen(pieGenData.map(d => d.value)))
                    .enter()
                    .append('path')
                    .attr('d', arcGen(parseInt(graphSpacing) + parseInt(graphSize)*i, parseInt(graphSize)*(i+1)))
                    .attr('fill', (d, i) => colorScale(i))
            })

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