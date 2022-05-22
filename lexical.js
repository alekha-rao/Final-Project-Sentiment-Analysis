let margin = { top: 20, right: 20, bottom: 70, left: 70 },
    width = window.innerWidth - margin.left - margin.right,
    height = window.innerHeight - margin.top - margin.bottom;

// set the x / y output ranges
let x = d3.scaleBand()
    .range([0, width])
    .padding(0.1);
let y = d3.scaleLinear()
    .range([height, 0]);


let svg = d3.select("#myChart").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform",
        "translate(" + margin.left + "," + margin.top + ")");

d3.csv("csv/info.csv").then(function(data) {

    // format the data
    data.forEach(function(d) {
        d.name = +d.name;
    });

    // Scale the range of the data in the domains
    let names = data.map(function(d) { return d.id; });
    x.domain(names);
    y.domain([0, d3.max(data, function(d) { return +d.lexicalrichness; })]);

    // append the rectangles for the bar chart
    svg.selectAll(".bar")
        .data(data)
        .enter()
        .append("rect")
        .attr("class", "bar")
        .attr("x", function(d) { return x(d.id); })
        .attr("width", x.bandwidth())
        .attr("y", function(d) { return y(+d.lexicalrichness); })
        .attr("height", function(d) { return height - y(+d.lexicalrichness); })
        .on('mouseenter', function(d, i) {
            d3.select(this).attr('fill', 'blue')
            d3.select(this).attr('opacity', 1)
        })
        .on('mouseleave', function(d, i) {
            d3.select(this).attr('fill', 0)
            d3.select(this).attr('opacity', 1)
        })


    // add the x Axis
    svg.append("g")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(x));

    // text label for the x axis
    svg.append("text")
        .attr("transform",
            "translate(" + (width / 2) + " ," +
            (height + margin.top + 20) + ")")
        .style("text-anchor", "middle")
        .text("Artist Name");

    // add the y Axis
    svg.append("g")
        .call(d3.axisLeft(y));

    //text label for the y axis
    svg.append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", 0 - margin.left)
        .attr("x", 0 - (height / 2))
        .attr("dy", "1em")
        .style("text-anchor", "middle")
        .text("Lexeical Richness (%)");
})