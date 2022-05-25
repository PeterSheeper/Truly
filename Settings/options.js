function saveOptions(e) {
  e.preventDefault();
  chrome.storage.sync.set({
    addOnFontSize: document.querySelector("#FntSzIn").value
  });
}

function restoreOptions() {

  function setCurrentChoice(result) {
	  console.log(result);
    document.querySelector("#FntSzIn").value = result.addOnFontSize || "20";
  }

  chrome.storage.sync.get("addOnFontSize", setCurrentChoice);
}

document.addEventListener("DOMContentLoaded", restoreOptions);
document.querySelector("form").addEventListener("submit", saveOptions);

const inputs=[...document.querySelectorAll("input")];
inputs.forEach((inp,i)=>inp.addEventListener("input",()=>
  inputs[1-i].value=inputs[i].value )
)