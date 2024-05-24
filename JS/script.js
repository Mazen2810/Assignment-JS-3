var siteName = document.getElementById('input1')
var siteUrl = document.getElementById('input2')
var siteList = [];
submitbtn.onclick = addSite;
if(localStorage.getItem('sites') != null){
    siteList = JSON.parse(localStorage.getItem('sites'))
    display()
}

function addSite() {
    var site = {
        sName: siteName.value,
        sUrl: siteUrl.value
    }
siteList.push(site)
localStorage.setItem('sites', JSON.stringify(siteList))
display()
reset()
}

function display(){
    var disp=``;
    for(var i = 0 ; i<siteList.length;i++){
        disp+=`
        <tr>
                    <th scope="row">${i+1}</th>
                    <td>${siteList[i].sName}</td>
                    <td><button class="btn btn-success" "> <i class="fa-solid fa-eye"></i> <a href="${siteList[i].sUrl}" target="_blank" >Visit</a></button></td>
                    <td><button onclick="deleteSite(${i})" class="btn btn-danger"><i class="fa-solid fa-trash-can"></i> Delete</button></td>
                  </tr>
        
        `
    }
    document.getElementById('displayBody').innerHTML=disp;
}
function deleteSite(index){
siteList.splice(index,1)
display()
localStorage.setItem('sites',JSON.stringify(siteList))
}
function reset(){
    siteName.value = null ;
    siteUrl.value = null ;
}