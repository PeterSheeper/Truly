var contextMenu = {
    "id": "truly-report-t",
    "title": "Request moderation",
    "contexts": ["selection"],
    "onclick": reportSelection
}

chrome.contextMenus.create(contextMenu);

function reportSelection(highlighted) {
    console.log(highlighted.selectionText);
}