// Variables 
var data;
var dataNames;
var sampledata;
var datametadata;
var firstID;
var firstIDlabels;
var selectedID;


// ID Values from DataSamples
d3.json("data/samples.json").then((data) => {
    data = data;
    dataNames = data.names;
    sampledata = data.samples;
    datametadata = data.metadata;
    firstID = sampledata[0].otu_ids
    firstIDlabels = sampledata[0].otu_labels;
    dataNames.forEach((name) => {
    var dropdownMenu = d3.select("#selDataset");
    var newoption = dropdownMenu.append("option");
    newoption.attr('value', name);
    newoption.text(name);   
    selectedID = dropdownMenu.node().value;
    // console.log(selectedID)
})
});

// optionChanged Function
var defaultID = "940"
optionChanged(defaultID);



// Change Demographics Table & Charts from SelectedID
function optionChanged(selectedID) {
    //console.log(sampleValue);
        metadataTable(selectedID);
        barchart(selectedID);
        bubblechart(selectedID);
};


// Append Demo. Table Based from SelectedID
function metadataTable(selectedID) {
    d3.json("data/samples.json").then((data) => {
        var info = datametadata.filter(person => person.id == selectedID);
        var selectedinfo = info[0];
        var panel = d3.select("#sample-metadata");
        panel.html("");
        var demographics = Object.entries(selectedinfo)
        demographics.forEach((item) => {
        panel.append("h6").text(item[0]+': '+item[1]);
    });
  });
};

// Bar Chart from SelectedID
function barchart(selectedID){
    d3.json("data/samples.json").then((data) => {
    var dropdownMenu = d3.select("#selDataset");
    selectedID = dropdownMenu.node().value;
    var samples = data.samples;
    var selectID = samples.filter(person=>person.id==selectedID);
    var valuearray = selectID[0];
    var values = valuearray.sample_values.slice(0,10);
    var IDs = valuearray.otu_ids.map(otu => "OTU " + otu);
    var labels = valuearray.otu_labels.slice(0,10);
    // console.log(valuearray);

    // Plotting 
    var trace = {
        x : values,
        y : IDs,
        text : labels,
        type : 'bar',
        orientation : 'h'
    };

    // Plot (Axises)
    var layout = {
        title: "Top Ten OTU's for Selected Test Study",
        xaxis: { title: "Sample Value" },
        yaxis: { title: "OTU ID" }
    };

    // Data
    var plotdata = [trace]

    
    
    // Utilize Plotly 
    Plotly.newPlot('bar', plotdata, layout)

})}; 

// Bubble Chart from SelectedID
function bubblechart(selectedID){
    d3.json("data/samples.json").then((data) => {
    var dropdownMenu = d3.select("#selDataset");
    selectedID = dropdownMenu.node().value;
    var samples = data.samples;
    var selectID = samples.filter(person=>person.id==selectedID);
    var valuearray = selectID[0];
    var values = valuearray.sample_values;
    var IDs = valuearray.otu_ids;
    var labels = valuearray.otu_labels;
    // console.log(valuearray);

    
    
    // Plotting (Bubble Chart)
    var trace = {
        x : IDs,
        y : values,
        text : labels,
        mode: 'markers',
        marker: {
            size: values,
            color: IDs
        }
    };

    
    // Plot (Bubble Chart)
    var layout = {
        title: "All OTU's for Selected Test Study",
        xaxis: { title: "OTU ID" },
        yaxis: { title: "Sample Value" }
    };

    
    // Data (Bubble Chart)
    var plotdata = [trace];

    
   
    // Utilize Plotly (Bubble Chart)
    Plotly.newPlot('bubble', plotdata, layout);

})}; 

