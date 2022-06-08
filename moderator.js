var contextMenuTrue = {
    "id": "truly-report-t",
    "title": "Report as true",
    "contexts": ["selection"],
    "onclick": reportSelectionAsTrue
}

chrome.contextMenus.create(contextMenuTrue);

function reportSelectionAsTrue(highlighted) {
    console.log(highlighted.selectionText + " true");
}

var contextMenuFalse = {
    "id": "truly-report-f",
    "title": "Report as false",
    "contexts": ["selection"],
    "onclick": reportSelectionAsFalse
}

chrome.contextMenus.create(contextMenuFalse);

function reportSelectionAsFalse(highlighted) {
    console.log(highlighted.selectionText + " false");
}