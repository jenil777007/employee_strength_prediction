let network = new brain.NeuralNetwork();

let testData = {
    totalDaysInMonth: 0,
    totalBillableDaysInMonth: 0,
    countEmpTotal: 0
};

function calculate() {
    
    testData.totalDaysInMonth = document.getElementsByName("totalDaysInMonth")[0].value / 100;
    testData.totalBillableDaysInMonth = document.getElementsByName("totalBillableDaysInMonth")[0].value / 100;
    testData.countEmpTotal = document.getElementsByName("countEmpTotal")[0].value / 1000;

    console.log("Processing the data....");
    processData(trainingData);

    console.log("Training the data.....");
    trainData();

    console.log("Testing the data.....");
    testDataMethod();
}

// This function refers to the preparation of the data i.e. converting our training data into the range [0,1]
function processData(dataToProcess) {
    dataToProcess.forEach(element => {

        for (let dataFeature in element.input) {

            // In our case, countEmpTotal is always going to be greater than 100, 
            // so in order to normalize, we'll devide it by 1000
            if (dataFeature != "countEmpTotal") {
                element.input[dataFeature] = element.input[dataFeature] / 100;
            } else {
                element.input[dataFeature] = element.input[dataFeature] / 1000;
            }
        }

        element.output.countPresentEmp = element.output.countPresentEmp / 100;
    });

    console.log("Data processing completed....");
    document.getElementById("eventLogTag").innerHTML = "Data processing completed....";
}

function trainData() {
    
    network.train(trainingData);

    console.log("Training completed....");
    document.getElementById("eventLogTag").innerHTML = "Training completed....";
}

function testDataMethod() {

    const result = network.run(testData);
    console.log("Generated result is....");
    console.log(result);
    document.getElementById("eventLogTag").innerHTML = "Generated result is...." + result.countPresentEmp * 100;
    let count = Math.ceil(result.countPresentEmp * 100);
    let number = 0;

    var interval = setInterval(function() {
        document.getElementsByClassName("resultTag")[0].innerHTML = number;
        if (number >= count) clearInterval(interval);
        number++;
    }, 30);

}


