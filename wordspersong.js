let margin2 = { top: 20, right: 20, bottom: 70, left: 70 },
    width2 = window.innerWidth - margin2.left - margin2.right,
    height2 = window.innerHeight - margin2.top - margin2.bottom;

// set the x / y output ranges
let x2 = d3.scaleBand()
    .range([0, width2])
    .padding(0.1);
let y2 = d3.scaleLinear()
    .range([height2, 0]);


let svg2 = d3.select("#myChart2").append("svg")
    .attr("width", width2 + margin2.left + margin2.right)
    .attr("height", height2 + margin2.top + margin2.bottom)
    .append("g")
    .attr("transform",
        "translate(" + margin2.left + "," + margin2.top + ")");

d3.csv("csv/info.csv").then(function(data) {

    // format the data
    data.forEach(function(d) {
        d.name = +d.name;
    });

    // Scale the range of the data in the domains
    let names = data.map(function(d) { return d.id; });
    x.domain(names);
    y.domain([0, d3.max(data, function(d) { return +d.wordspersongs; })]);

    // append the rectangles for the bar chart
    svg2.selectAll(".bar")
        .data(data)
        .enter()
        .append("rect")
        .attr("class", "bar")
        .attr("x", function(d) { return x(d.id); })
        .attr("width", x2.bandwidth())
        .attr("y", function(d) { return y(+d.wordspersongs); })
        .attr("height", function(d) { return height2 - y(+d.wordspersongs); })
        .attr('fill', 'black')
        .attr('opacity', 1)




    // add the x Axis
    svg2.append("g")
        .attr("transform", "translate(0," + height2 + ")")
        .call(d3.axisBottom(x));

    // text label for the x axis
    svg2.append("text")
        .attr("transform",
            "translate(" + (width2 / 2) + " ," +
            (height2 + margin2.top + 20) + ")")
        .style("text-anchor", "middle")
        .text("Artist Name");

    // add the y Axis
    svg2.append("g")
        .call(d3.axisLeft(y2));

    //text label for the y axis
    svg2.append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", 0 - margin2.left)
        .attr("x", 0 - (height2 / 2))
        .attr("dy", "1em")
        .style("text-anchor", "middle")
        .text("Average Words Per Song");
})