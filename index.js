let inputElement = document.getElementById('InputSearch')
let displayResultsDiv = document.getElementById('displayResultsDiv')
let spinnerEl = document.getElementById("spinner");

function createAndAppendResult(result){

 let {title,link,description} = result

 let divEl = document.createElement('div')
 displayResultsDiv.appendChild(divEl);
 divEl.classList.add('resultsDiv')

 let titleHeadingEle = document.createElement('a')
 titleHeadingEle.href = link;
 titleHeadingEle.target = '_blank'
 titleHeadingEle.textContent = title;
 titleHeadingEle.classList.add('titleheading')
 divEl.appendChild(titleHeadingEle);
 

 let titleBreakEle = document.createElement('br')
 divEl.appendChild(titleBreakEle)

 let aTagEle = document.createElement('a')
 aTagEle.textContent = link;
 aTagEle.href = link;
 aTagEle.target = '_blank'
 aTagEle.classList.add("link")
 divEl.appendChild(aTagEle);
 
 let linkBreakEle = document.createElement('br')
 divEl.appendChild(linkBreakEle)

 let pTagEle = document.createElement('p')
 pTagEle.textContent = description;
 pTagEle.classList.add('description')
 divEl.appendChild(pTagEle);
}

function displayResults(searchResults){
     spinnerEl.classList.toggle('d-none');
     
   for(let eachResult of searchResults){
     createAndAppendResult(eachResult)
   }
}

function inputValueFun(event){
    if(event.key === 'Enter'){
        spinnerEl.classList.toggle('d-none')
        displayResultsDiv.textContent = '';
    
        searchInputValue = inputElement.value;
        let options = {
            method:'GET'
        }
        let url = "https://apis.ccbp.in/wiki-search?search=" + searchInputValue;
        fetch(url,options).then(function(response){
            return response.json()
        }).then(function(jsondata){
            let {search_results}= jsondata 
            displayResults(search_results)
        })
    }
    
}
inputElement.addEventListener('keydown',inputValueFun);

