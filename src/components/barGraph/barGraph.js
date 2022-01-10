import React from "react"
import * as d3 from 'd3'

export default class BarGraph extends React.Component {
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
        this.countAllProperty = (data, category, reducer) => {
            const parseNum = e => e === undefined ? 0 : parseInt(e.split(',').join(''))
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
        const { data, width, height, filters, margin } = this.props
        // renderer
        d3.csv(data).then(data => {
            filters.forEach((e, i) => {
                if(this.filterExists.includes(e)) { return }
                this.filterExists.push(e)

                // consts
                const [category, reducer] = [e.category, e.reducer]
                const countedData = this.countAllProperty(data, category, reducer)
                // scales
                const xscale = d3.scaleLinear()
                    .domain([0, countedData.length - 1])
                    .range([margin, width - margin])
                const xscalelabels = countedData.map(obj => obj.label)
                const yscale = d3.scaleLinear()
                    .domain(d3.extent(countedData, d => d.value))
                    .range([height - margin, margin])
                // helper
                const linegen = d3.area()
                    .x((d, i) => xscale(i))
                    .y0(d => yscale(d.value))
                    .y1(height - margin)
                    .curve(d3.curveStep)
                // graph
                this.svg
                    .append('path')
                    .attr('d', linegen(countedData))
                    .attr('stroke-width', 1)
                    .attr('stroke', 'none')
                    .attr('fill', `${this.colorScale(filters.length/i)}`)
                    .style('opacity', '.3')
                // axis
                const bottomAxis = d3.axisBottom(xscale)
                    .tickFormat((_, i) => xscalelabels[i])
                    .ticks(xscalelabels.length)
                const leftAxis = d3.axisLeft(yscale)
                this.svg
                    .append('g')
                    .attr('transform', `translate(0, ${height - margin})`)
                    .call(bottomAxis)
                        .selectAll("text")  
                        .style("text-anchor", "end")
                        .attr("dx", "-.8em")
                        .attr("dy", ".15em")
                        .attr("transform", "rotate(-65)");
                this.svg
                    .append('g')
                    .attr('transform', `translate(${margin}, 0)`)
                    .call(leftAxis)
                
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