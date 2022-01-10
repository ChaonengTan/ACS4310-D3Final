import React from "react"
import * as d3 from 'd3'

export default class lineGraph extends React.Component {
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
        const { data, width, height, graphSpacing, graphSize, filters } = this.props
        // renderer
        d3.csv(data).then(data => {
            filters.forEach((e, i) => {
                if(this.filterExists.includes(e)) { return }
                this.filterExists.push(e)
                
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