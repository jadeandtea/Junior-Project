function compareString(msg, inputID, outputID) {
    spelling = document.getElementById(inputID).value;
    // console.log("Comparing " + msg.text + " and " + spelling);

    outputTextBox = document.getElementById('output');
    outputTextBox.classList.add('visible');
    outputTextBox.classList.remove('invisible');

    outputText = document.getElementById(outputID);
    if(spelling !== msg.text) {
        outputText.innerHTML = "Incorrect";
        setTimeout(hide, 1000);
    } else {
        outputText.innerHTML = "Correct";
        setTimeout(hide, 1000);
    }
}

function hide() {
    element = document.getElementById('output');
    element.classList.remove('visible');
    element.classList.add('invisible');
    window.location.href='study.html';
}