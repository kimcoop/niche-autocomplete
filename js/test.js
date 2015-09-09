// TODO: delete

function LoadExampleSearch() {
  /*  To consume the web service, simply call JSONPUtil.LoadJSONP (which can be found in JSONPUtil.js).
    Its first parameter is the URL to which the request should be made. The second parameter is a
    callback function that you should define, which takes one argument (the JSON response).
            
    The response will always be 200 OK (unless a server error occurs during your search), returning an object 
    consisting of a field called "results", containing an array of 0 up to 20 objects representing matching colleges, 
    as well as a field called "total" which indicates the total number of matching results.         
  */
  var exampleSearchUrl = 'http://niche-recruiting-autocomplete.appspot.com/search/?query=pitt';
  
  JSONPUtil.LoadJSONP(exampleSearchUrl, function (response) {
    document.getElementById("response").innerHTML = JSON.stringify(response);
  });
}

// window.onLoad = LoadExampleSearch();

/*

{"results":[{"url":"https://colleges.niche.com/all--state-career-school----pittsburgh/","location":"West Mifflin, PA","id":"4F29DCAC-3C9D-4398-8EDC-CE66B3EFE4AC","name":"All-State Career School - Pittsburgh"},{"url":"https://colleges.niche.com/bradford-school----pittsburgh/","location":"Pittsburgh, PA","id":"B4D17F32-1728-4A43-BBD1-23F918740145","name":"Bradford School - Pittsburgh"},{"url":"https://colleges.niche.com/everest-institute----pittsburgh/","location":"Pittsburgh, PA","id":"77D49656-BD12-481A-AF78-68A4A14D833B","name":"Everest Institute - Pittsburgh"},{"url":"https://colleges.niche.com/itt-technical-institute----pittsburgh/","location":"Pittsburgh, PA","id":"AC6B3280-94BA-44E5-8907-18E96FED48B4","name":"ITT Technical Institute - Pittsburgh"},{"url":"https://colleges.niche.com/kaplan-career-institute----pittsburgh/","location":"Pittsburgh, PA","id":"761A136E-F898-4DC2-8754-72C12FB73A34","name":"Kaplan Career Institute - Pittsburgh"},{"url":"https://colleges.niche.com/mildred-elley-school----pittsfield/","location":"Pittsfield, MA","id":"0350D445-1B01-4AA1-87DD-84F7A022F60C","name":"Mildred Elley School - Pittsfield"},{"url":"https://colleges.niche.com/pitt-community-college/","location":"Winterville, NC","id":"344A9A5F-75F8-46DE-A4FB-BFD7341419A8","name":"Pitt Community College"},{"url":"https://colleges.niche.com/pittsburg-state-university/","location":"Pittsburg, KS","id":"B3151FA9-57FA-43B1-83DA-BDEE7605436F","name":"Pittsburg State University"},{"url":"https://colleges.niche.com/pittsburgh-institute-of-aeronautics/","location":"West Mifflin, PA","id":"FC0F5EE6-D3A0-448C-9CF2-1E56A73729DD","name":"Pittsburgh Institute of Aeronautics"},{"url":"https://colleges.niche.com/pittsburgh-institute-of-mortuary-science-inc/","location":"Pittsburgh, PA","id":"FBC5AC81-7B55-461E-9D57-7D8788BFDB51","name":"Pittsburgh Institute of Mortuary Science"},{"url":"https://colleges.niche.com/pittsburgh-technical-institute/","location":"Oakdale, PA","id":"075576FE-822C-4EC3-8D12-35CB88AF9936","name":"Pittsburgh Technical Institute"},{"url":"https://colleges.niche.com/pittsburgh-theological-seminary/","location":"Pittsburgh, PA","id":"93BB8EED-FE38-4BC4-8D68-A81F63FEAB44","name":"Pittsburgh Theological Seminary"},{"url":"https://colleges.niche.com/ohio-valley-hospital-school-of-nursing/","location":"McKees Rocks, PA","id":"887CF14D-C236-4B76-92AE-6A0B2FDA02F6","name":"Pittsburgh's Ohio Valley General Hospital - School of Nursing"},{"url":"https://colleges.niche.com/sanford--brown-institute----pittsburgh/","location":"Pittsburgh, PA","id":"096ABCBE-9110-4366-95A7-E2FC311AD21B","name":"Sanford-Brown Institute - Pittsburgh"},{"url":"https://colleges.niche.com/the-art-institute-of-pittsburgh/","location":"Pittsburgh, PA","id":"6B5F4232-B1FD-4C78-8227-7E5CD20D9FFE","name":"The Art Institute of Pittsburgh"},{"url":"https://colleges.niche.com/the-art-institute-of-pittsburgh----online-division/","location":"Pittsburgh, PA","id":"EFEAC0B9-0B2F-4D6F-BC2D-3F232F03E4FA","name":"The Art Institute of Pittsburgh - Online Division"},{"url":"https://colleges.niche.com/triangle-tech----pittsburgh/","location":"Pittsburgh, PA","id":"F4C2F24C-8D0F-48A1-87B0-D6F17D8C7EE0","name":"Triangle Tech - Pittsburgh"},{"url":"https://colleges.niche.com/university-of-pittsburgh/","location":"Pittsburgh, PA","id":"C2AD41E0-ED67-4899-B4DF-E256D800CE96","name":"University of Pittsburgh"},{"url":"https://colleges.niche.com/university-of-pittsburgh----bradford/","location":"Bradford, PA","id":"F3F07E5C-8CA6-41B1-ADD2-F689F76552A3","name":"University of Pittsburgh - Bradford"},{"url":"https://colleges.niche.com/university-of-pittsburgh----greensburg/","location":"Greensburg, PA","id":"0D441909-DD8A-4317-992B-E42CB50E1D94","name":"University of Pittsburgh - Greensburg"}],"total":23}

*/