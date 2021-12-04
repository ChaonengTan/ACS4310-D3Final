import React from "react"
import * as d3 from 'd3'

export default class Graph extends React.Component {
    constructor(props){
        super(props)
        this.myRef = React.createRef()
        this.state = {data:[]}
        this.filterExists = []
    }
    
    componentDidMount(){
        // consts
        const { data, width, height } = this.props
        // helpers
        this.colorScale = d3.scaleSequential()
            .domain([0, data.length])
            .interpolator(d3.interpolateRainbow)
        this.arcGen = (innerRadius, outerRadius) => {
            return(
                d3.arc()
                    .innerRadius(innerRadius)
                    .outerRadius(outerRadius)
                    .padAngle(0.01)
            )
        }
        this.countAllProperty = (data, category, reducer) => {
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
        this.svg = d3.select(this.myRef.current)
                .append('svg')
                .attr('width', width)
                .attr('height', height)
                .style('border', '1px black solid')
    }
    componentDidUpdate(){
        // consts
        const { data, width, height, graphSpacing, graphSize, filters } = this.props
        // renderer
        d3.csv(data).then(data => {
            filters.forEach((e, i) => {
                if(this.filterExists.includes(e)) { return }
                this.filterExists.push(e)
                // consts
                const pieGroup = this.svg
                    .append('g')
                    .attr('transform', `translate(${width / 2}, ${height / 2})`)
                const pieGen = d3.pie()
                const countedProperties = this.countAllProperty(data, e.category, e.reducer)
                const pieData = pieGen(countedProperties.map(d => d.value))
                // pie chart
                const piepath = pieGroup
                    .selectAll('path')
                    .data(pieData)
                    .enter()
                    .append('path')
                    .attr('d', this.arcGen(parseInt(graphSpacing) + parseInt(graphSize)*i, parseInt(graphSize)*(i+1)))
                    .attr('fill', (d, i) => this.colorScale(i))
                // pieLabel
                const pieLabels = this.svg
                    .append('g')
                    .attr('transform', `translate(${width / 2}, ${height / 2})`)
                const pieLabelArc = this.arcGen(parseInt(graphSpacing) + parseInt(graphSize)*i, parseInt(graphSize)*(i+1))
                pieLabels
                    .selectAll('text')
                    .data(countedProperties)
                    .enter()
                    .append('text')
                    .text(d => d.label)
                    .attr("transform", (d, i) => `translate(${pieLabelArc.centroid(pieData[i])})`)
                    .attr('text-anchor', 'middle')
            })

            // updater
            this.setState({data})
        })
    }
    render(){
        // console.log(this.props.filters)
        return(
            <div ref={this.myRef}></div>
        )
    }
}