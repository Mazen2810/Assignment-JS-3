var siteName = document.getElementById('inputName');
var siteUrl = document.getElementById('inputUrl');
var siteList = [];
var submitbtn = document.getElementById('submitbtn');
submitbtn.onclick = addSite;

if (localStorage.getItem('sites') != null) {
    siteList = JSON.parse(localStorage.getItem('sites'));
    display();
}

function addSite() {
    var inputIdName = 'inputName';
    var inputIdUrl = 'inputUrl';

    var isValidName = validInput(inputIdName, siteName.value);
    var isValidUrl = validInput(inputIdUrl, siteUrl.value);

    if (isValidName && isValidUrl) {
        var site = {
            sName: siteName.value,
            sUrl: siteUrl.value
        };
        siteList.push(site);
        localStorage.setItem('sites', JSON.stringify(siteList));
        display();
        reset();
    }
}

function display() {
    var disp = ``;
    for (var i = 0; i < siteList.length; i++) {
        disp += `
        <tr>
            <th scope="row">${i + 1}</th>
            <td>${siteList[i].sName}</td>
            <td><button class="btn btn-success"> <i class="fa-solid fa-eye"></i> <a href="${siteList[i].sUrl} " class ="text-white text-decoration-none"target="_blank" > Visit</a></button></td>
            <td><button onclick="deleteSite(${i})" class="btn btn-danger"><i class="fa-solid fa-trash-can"></i> Delete</button></td>
        </tr>
        `;
    }
    document.getElementById('displayBody').innerHTML = disp;
}

function deleteSite(index) {
    siteList.splice(index, 1);
    display();
    localStorage.setItem('sites', JSON.stringify(siteList));
}

function reset() {
    siteName.value = '';
    siteUrl.value = '';
    siteName.classList.remove('is-valid', 'is-invalid');
    siteUrl.classList.remove('is-valid', 'is-invalid');
}

var inputValid = document.querySelectorAll('.inputValid');
for (var i = 0; i < inputValid.length; i++) {
    inputValid[i].addEventListener('input', function(e) {
        validInput(e.target.id, e.target.value);
    });
}

function validInput(id, value) {
    var regex = {
        inputName: /[A-Za-z]{3,}/,
        inputUrl: /^https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()!@:%_\+.~#?&\/\/=]*)$/
    };
    var elm = document.getElementById(id);
    var nextElm = elm.nextElementSibling;

    if (regex[id].test(value)) {
        elm.classList.add('is-valid');
        elm.classList.remove('is-invalid');
        nextElm.classList.replace('d-block', 'd-none');
        return true;
    } else {
        elm.classList.add('is-invalid');
        elm.classList.remove('is-valid');
        nextElm.classList.replace('d-none', 'd-block');
        return false;
    }
}
