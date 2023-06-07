const S5Client = s5client.S5Client;
const headers = {};
const DEFAULT_PORTAL_URL = "http://localhost:5522";
const DEFAULT_PORTAL_AUTH_TOKEN = "";

let client;
let portalurl;
let authtoken;

//
// buildClient

function buildClient(BUILD_PORTAL_URL, BUILD_PORTAL_AUTH_TOKEN) {
  const customClientOptions = {
    authToken: BUILD_PORTAL_AUTH_TOKEN,
    headers,
    withCredentials: false,
  };

  // Instantiate the S5Client
  client = new S5Client(BUILD_PORTAL_URL, customClientOptions);
}

portalurl = getCookie("portalurl");
authtoken = getCookie("authtoken");

if (portalurl && authtoken === null) {
  buildClient(portalurl, "");
}
if (portalurl && authtoken) {
  buildClient(portalurl, authtoken);
}
if (portalurl === null && authtoken === null) {
  buildClient(PORTAL_URL, PORTAL_AUTH_TOKEN);
}

//
// login

var inputAuthToken = document.getElementById("authToken-input");
var loginBtn = document.getElementById("login-button");

function login() {
  var portalUrlInput = document.getElementById("s5portal-input").value;
  var authTokenInput = document.getElementById("authToken-input").value;

  if (portalUrlInput) {
    portalurl = portalUrlInput;
  } else {
    portalurl = DEFAULT_PORTAL_URL;
  }

  if (authTokenInput) {
    authtoken = authTokenInput;
  } else {
    authtoken = DEFAULT_PORTAL_AUTH_TOKEN;
  }

  if (portalurl) {
    setCookie("portalurl", portalurl, 7); // Save the authToken in a cookie for 7 days
  }

  if (authtoken) {
    setCookie("authToken", authtoken, 7); // Save the authToken in a cookie for 7 days
  }

  buildClient(portalurl, authtoken);
}

//
// logout

function logout() {
  eraseCookie("portalurl"); // Erase the portalurl cookie
  eraseCookie("authToken"); // Erase the authToken cookie
  buildClient(PORTAL_URL, PORTAL_AUTH_TOKEN);
}

//
// Function to set a cookie

function setCookie(name, value, days) {
  var expires = "";
  if (days) {
    var date = new Date();
    date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
    expires = "; expires=" + date.toUTCString();
  }
  document.cookie = name + "=" + (value || "") + expires + "; path=/";
}

//
// Function to get the value of a cookie

function getCookie(name) {
  var nameEQ = name + "=";
  var ca = document.cookie.split(";");
  for (var i = 0; i < ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) == " ") {
      c = c.substring(1, c.length);
    }
    if (c.indexOf(nameEQ) == 0) {
      return c.substring(nameEQ.length, c.length);
    }
  }
  return null;
}

//
// Function to erase a cookie

function eraseCookie(name) {
  document.cookie = name + "=; Max-Age=-99999999; path=/";
}

if (portalurl) {
  document.getElementById("account-button").classList.add("hidden");
  document.getElementById("logout-button").classList.remove("hidden");
}

document.getElementById("account-button").addEventListener("click", function () {
  document.getElementById("account-button").classList.add("hidden");
  document.getElementById("cancel-button").classList.remove("hidden");
  document.getElementById("input-section").classList.remove("hidden");
  document.getElementById("authToken-input").value = "";
});

document.getElementById("cancel-button").addEventListener("click", function () {
  document.getElementById("account-button").classList.remove("hidden");
  document.getElementById("cancel-button").classList.add("hidden");
  document.getElementById("input-section").classList.add("hidden");
});

document.getElementById("login-button").addEventListener("click", function () {
  login();
  document.getElementById("input-section").classList.add("hidden");
  document.getElementById("account-button").classList.add("hidden");
  document.getElementById("logout-button").classList.remove("hidden");
});

document.getElementById("logout-button").addEventListener("click", function () {
  logout();
  document.getElementById("logout-button").classList.add("hidden");
  document.getElementById("account-button").classList.remove("hidden");
});

$(function () {
  $("#tabs").tabs();
});

//
// Toggle dark/light mode

$(document).ready(function () {
  // Check if the user's preference is set to dark mode
  if (localStorage.getItem("darkMode") === "true") {
    $("body").addClass("dark-mode");
    $(".output").addClass("dark-mode");
    $(".ui-tabs").addClass("dark-mode");
    $("#mode-toggle").prop("checked", true); // Set the toggle to checked state
  }

  // Toggle dark/light mode on checkbox click
  $("#mode-toggle").on("change", function () {
    if ($(this).is(":checked")) {
      $("body").addClass("dark-mode");
      $(".output").addClass("dark-mode");
      $(".ui-tabs").addClass("dark-mode");
      localStorage.setItem("darkMode", "true");
    } else {
      $("body").removeClass("dark-mode");
      $(".output").removeClass("dark-mode");
      $(".ui-tabs").removeClass("dark-mode");
      localStorage.setItem("darkMode", "false");
    }
  });
});

//
// Add responsive behavior

$(window).on("resize", function () {
  adjustLayout();
});

function adjustLayout() {
  var screenWidth = $(window).width();
  if (screenWidth <= 600) {
    $(".output").addClass("responsive");
  } else {
    $(".output").removeClass("responsive");
  }
}

$(document).ready(function () {
  adjustLayout();
});

function openTab(tabName) {
  // Hide all tab contents
  var tabContents = document.getElementsByClassName("tab-content");
  for (var i = 0; i < tabContents.length; i++) {
    tabContents[i].style.display = "none";
  }
  clearAllElements();

  // Show the selected tab content
  document.getElementById(tabName).style.display = "block";
}

//
// clear all Elements

function clearAllElements() {
  var inputElements = document.getElementsByTagName("input");
  for (var i = 0; i < inputElements.length; i++) {
    if (inputElements[i].value !== "") {
      inputElements[i].value = "";
    }
  }

  var textareaElements = document.getElementsByTagName("textarea");
  for (var i = 0; i < textareaElements.length; i++) {
    if (textareaElements[i].value !== "") {
      textareaElements[i].value = "";
    }
  }

  var buttonElements = document.getElementsByClassName("btn");
  for (var i = 0; i < buttonElements.length; i++) {
    if (buttonElements[i].disabled !== true) {
      buttonElements[i].disabled = true;
    }
  }

  var outputElements = document.getElementsByClassName("output");
  for (var i = 0; i < outputElements.length; i++) {
    if (outputElements[i].innerHTML !== "") {
      outputElements[i].innerHTML = "";
    }
  }

  var outputElements = document.getElementsByClassName("outputmeta");
  for (var i = 0; i < outputElements.length; i++) {
    if (outputElements[i].innerHTML !== "") {
      outputElements[i].innerHTML = "";
    }
  }

  var outputElements = document.getElementsByClassName("outputtext");
  for (var i = 0; i < outputElements.length; i++) {
    if (outputElements[i].innerHTML !== "") {
      outputElements[i].innerHTML = "";
    }
  }

  var outputElements = document.getElementsByClassName("outputtext2");
  for (var i = 0; i < outputElements.length; i++) {
    if (outputElements[i].innerHTML !== "") {
      outputElements[i].innerHTML = "";
    }
  }
}

//
// handleFileUpload

let uploadedFileCID = null;

async function handleFileUpload(event) {
  const file = event.target.files[0];

  if (!file) {
    console.error("No file selected");
    return;
  }

  try {
    outputUploadCid.innerHTML = "<br /><div>waiting ... </div>";
    outputUploadUrl.innerHTML = "<br /><div></div>";
    // Upload the file
    const { cid } = await client.uploadFile(file);

    let fileNameSplited;
    let fileNameEndWith;
    let CidEndWith = "";

    if (file.name.includes(".")) {
      fileNameSplited = file.name.split(".");
      fileNameEndWith = fileNameSplited[fileNameSplited.length - 1];
      CidEndWith = `${fileNameEndWith ? `.${fileNameEndWith}` : ""}`;
    }

    if (cid != null) {
      downloadBtn.disabled = false;
    }

    const urlOutput = `${PORTAL_URL}/${cid}${CidEndWith}${PORTAL_AUTH_TOKEN ? `?auth_token=${PORTAL_AUTH_TOKEN}` : ""}`;
    outputUploadCid.innerHTML = "<br /><div>CID = " + cid + "</div>";
    outputUploadUrl.innerHTML = '<br /><div>Url = <a href="' + urlOutput + '" target="_blank">' + cid + "</a> </div>";
    uploadedFileCID = cid;
  } catch (error) {
    console.error("Error:", error);
    outputUploadCid.innerHTML = "<br /><div>Upload Error = " + error + "</div>";
  }
}

//
// handleFileDownload

async function handleFileDownload() {
  if (!uploadedFileCID) {
    console.error("No file has been uploaded yet");
    return;
  }

  try {
    // Download the file
    await client.downloadFile(uploadedFileCID);
  } catch (error) {
    console.error("Error:", error);
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const inputElement = document.getElementById("file-input");
  inputElement.addEventListener("change", handleFileUpload);
  const downloadButton = document.getElementById("download-button");
  downloadButton.addEventListener("click", handleFileDownload);
  var outputUploadCid = document.getElementById("outputUploadCid");
});

let downloadBtn = document.getElementById("download-button");
if (downloadBtn != null) {
  downloadBtn.disabled = true;
}

//
// Upload From Url

let inputUploadFromUrl = document.getElementById("uploadFromUrl-input");
let uploadFromUrlBtn = document.getElementById("uploadFromUrl-button");

uploadFromUrlBtn.disabled = true;

inputUploadFromUrl.addEventListener("input", function () {
  uploadFromUrlBtn.disabled = inputUploadFromUrl.value.length < 1;
});

async function uploadFromUrl() {
  var inputValueUploadFromUrl = document.getElementById("uploadFromUrl-input").value;
  var outputUploadFromUrlCid = document.getElementById("outputUploadFromUrlCid");
  let response;
  outputUploadFromUrlCid.innerHTML = "<br /><div> waiting ...</div>";

  response = await client.uploadFromUrl(inputValueUploadFromUrl);

  outputUploadFromUrlCid.innerHTML = "<br /><div>CID = " + response.cid + "</div>";
}

//
// uploadData

let inputdataToUpload = document.getElementById("dataToUpload-input");
let dataUploadBtn = document.getElementById("dataUpload-btn");

dataUploadBtn.disabled = true;

inputdataToUpload.addEventListener("input", function () {
  dataUploadBtn.disabled = inputdataToUpload.value.length < 1;
});

async function uploadData() {
  var inputData = document.getElementById("dataToUpload-input").value;
  var dataNAME = document.getElementById("dataNAME-input").value;
  var outputData = document.getElementById("outputData");
  let response;
  outputData.innerHTML = "<br /><div> waiting ...</div>";

  response = await client.uploadData(inputData, dataNAME);
  const urlOutput = `${PORTAL_URL}/${response.cid}.txt${PORTAL_AUTH_TOKEN ? `?auth_token=${PORTAL_AUTH_TOKEN}` : ""}`;
  outputData.innerHTML = '<br /><div>CID = <a href="' + urlOutput + '" target="_blank">' + response.cid + "</a> </div>";
}

//
// downloadData

let inputDownloadDataCid = document.getElementById("downloadDataCid-input");
let downloadDataBtn = document.getElementById("dataDownload-btn");

downloadDataBtn.disabled = true;

inputDownloadDataCid.addEventListener("input", function () {
  downloadDataBtn.disabled = inputDownloadDataCid.value.length < 1;
});

async function downloadData() {
  var inputDataCid = document.getElementById("downloadDataCid-input").value;
  var outputDownloadData = document.getElementById("outputDownloadData");
  let response;
  outputDownloadData.innerHTML = "<br /><div> waiting ...</div>";

  response = await client.downloadData(inputDataCid);
  const responseData = await arrayBufferToString(response);
  outputDownloadData.innerHTML = "<br /><div>" + responseData + "</div>";
}

async function arrayBufferToString(buffer) {
  var bufView = new Uint8Array(buffer);
  var length = bufView.length;
  var result = "";
  var addition = Math.pow(2, 8) - 1;

  for (var i = 0; i < length; i += addition) {
    if (i + addition > length) {
      addition = length - i;
    }
    result += String.fromCharCode.apply(null, bufView.subarray(i, i + addition));
  }
  return result;
}

//
// downloadDir

let inputDirURL = document.getElementById("directoryURL-input");
let dirBtn = document.getElementById("directory-btn");

dirBtn.disabled = true;

inputDirURL.addEventListener("input", function () {
  dirBtn.disabled = inputDirURL.value.length < 1;
});

async function downloadDir() {
  let name;
  var inputDirURL = document.getElementById("directoryURL-input");
  var inputDirNAME = document.getElementById("directoryNAME-input");
  var dirBtn = document.getElementById("directory-btn");

  let directoryCID = client.tools.convertDownloadDirectoryInputCid(inputDirURL.value);

  if (inputDirNAME.value === "") {
    name = directoryCID;
  } else {
    name = inputDirNAME.value;
  }
  await client.downloadDirectory(directoryCID, name);
}

//
// uploadDir

let folderName;

function selectFolder(e) {
  var theFiles = e.target.files;
  var relativePath = theFiles[0].webkitRelativePath;
  var folder = relativePath.split("/");
  folderName = folder[0];
}

const getFilePath = (file) => file.webkitRelativePath || file.path || file.name;

const getRelativeFilePath = (file) => {
  const filePath = getFilePath(file);
  const { pathname, hash } = new URL(`file://${filePath}`);

  // Remove the leading slash from the pathname
  const relativePath = pathname.slice(1);

  // Remove the hash fragment, if present
  const index = relativePath.indexOf("#");
  if (index !== -1) {
    relativePath = relativePath.slice(0, index);
  }
  return relativePath;
};

let inputUploadDir = document.getElementById("directory-input");
let directoryUpBtn = document.getElementById("directoryUp-btn");

directoryUpBtn.disabled = true;

inputUploadDir.addEventListener("input", function () {
  directoryUpBtn.disabled = inputUploadDir.value.length < 1;
});

async function uploadDir() {
  var input = document.getElementById("directory-input");
  var inputDirUploadName = folderName;

  var output = document.getElementById("output");
  var outputURL = document.getElementById("outputURL");
  let response;
  outputURL.innerHTML = "<br /><div> waiting ...</div>";

  if ("files" in input && input.files.length > 0) {
    output.innerHTML = "";
    outputURL.innerHTML = "";

    var files = input.files;

    for (var i = 0; i < files.length; i++) {
      var file = files[i];
      const filesArray = Array.from(files);
      const directory = filesArray.reduce((acc, file) => ({ ...acc, [getRelativeFilePath(file)]: file }), {});
      const name = encodeURIComponent(file.name);

      response = await client.uploadDirectory(directory, {
        customDirname: inputDirUploadName,
      });

      output.innerHTML += "<div>" + getRelativeFilePath(file) + " (" + file.size + " bytes)  </div>";
    }
  } else {
    output.innerHTML = "Please select a directory to upload.";
  }

  const base32Cid = client.tools.convertB58btcToB32rfcCid(response.cid);
  const subdomainPortalUrl = client.tools.addUrlSubdomain(PORTAL_URL, base32Cid);

  const urlOutput = `${PORTAL_URL}/${response.cid}${PORTAL_AUTH_TOKEN ? `?auth_token=${PORTAL_AUTH_TOKEN}` : ""}`;
  outputURL.innerHTML += "<br /><div>CID = " + response.cid + "</div>";
  const subdomainUrlOutput = `${subdomainPortalUrl}${PORTAL_AUTH_TOKEN ? `?auth_token=${PORTAL_AUTH_TOKEN}` : ""}`;
  outputURL.innerHTML +=
    '<br /><div>Url = <a href="' + subdomainUrlOutput + '" target="_blank">' + base32Cid + "</a> </div><br />";
}

//
// Webapp Uploader

let webappFolderName;

function selectWebappFolder(e) {
  var theFiles = e.target.files;
  var relativePath = theFiles[0].webkitRelativePath;
  var folder = relativePath.split("/");
  webappFolderName = folder[0];
}

let inputWebappFiles = document.getElementById("webapp-inputFile");
let webappUpBtn = document.getElementById("webappUp-btn");

webappUpBtn.disabled = true;

inputWebappFiles.addEventListener("input", function () {
  webappUpBtn.disabled = inputWebappFiles.value.length < 1;
});

async function uploadWebapp() {
  var inputWebappFile = document.getElementById("webapp-inputFile");
  var inputWebappDirNameValue = document.getElementById("webappDirName-input").value;
  var webappDirUploadName = webappFolderName;
  var inputWebappIndexValue = document.getElementById("webappIndex-input").value;
  var inputWebappErrorPageValue = document.getElementById("webappErrorPage-input").value;

  var outputWebapp = document.getElementById("outputWebapp");
  var outputWebappURL = document.getElementById("outputWebappURL");
  let response;

  outputWebappURL.innerHTML = "<br /><div> waiting ...</div>";

  if ("files" in inputWebappFiles && inputWebappFiles.files.length > 0) {
    outputWebapp.innerHTML = "";
    outputWebappURL.innerHTML = "";

    var files = inputWebappFiles.files;

    outputWebapp.innerHTML += "<br />";

    for (var i = 0; i < files.length; i++) {
      var file = files[i];
      const filesArray = Array.from(files);
      const directory = filesArray.reduce((acc, file) => ({ ...acc, [getRelativeFilePath(file)]: file }), {});
      const name = encodeURIComponent(file.name);

      let webAppDirName;
      let webAppIndex = undefined;
      let webAppErrorpage = undefined;

      if (inputWebappDirNameValue != "") {
        webAppDirName = inputWebappDirNameValue;
      } else {
        webAppDirName = webappDirUploadName;
      }

      if (inputWebappIndexValue != "") {
        webAppIndex = inputWebappIndexValue;
      }

      if (inputWebappErrorPageValue != "") {
        webAppErrorpage = inputWebappErrorPageValue;
      }

      if (webAppDirName != "" && webAppIndex === undefined && webAppErrorpage === undefined) {
        response = await client.uploadWebapp(directory, {
          customDirname: webAppDirName,
        });
      }

      if (webAppDirName != "" && webAppIndex != undefined && webAppErrorpage != undefined) {
        response = await client.uploadWebapp(directory, {
          customDirname: webAppDirName,
          tryFiles: [webAppIndex],
          errorPages: { 404: "/" + webAppErrorpage },
        });
      }

      if (webAppDirName != "" && webAppIndex != undefined && webAppErrorpage === undefined) {
        response = await client.uploadWebapp(directory, {
          customDirname: webAppDirName,
          tryFiles: [webAppIndex],
        });
      }

      if (webAppDirName != "" && webAppErrorpage != undefined && webAppIndex === undefined) {
        response = await client.uploadWebapp(directory, {
          customDirname: webAppDirName,
          errorPages: { 404: "/" + webAppErrorpage },
        });
      }

      outputWebapp.innerHTML += "<div>" + getRelativeFilePath(file) + " (" + file.size + " bytes)  </div>";
    }
  } else {
    outputWebapp.innerHTML = "Please select a directory to upload.";
  }

  outputWebapp.innerHTML += "<br />";

  const base32Cid = client.tools.convertB58btcToB32rfcCid(response.cid);
  const subdomainPortalUrl = client.tools.addUrlSubdomain(PORTAL_URL, base32Cid);

  const urlOutput = `${PORTAL_URL}/${response.cid}${PORTAL_AUTH_TOKEN ? `?auth_token=${PORTAL_AUTH_TOKEN}` : ""}`;
  outputWebappURL.innerHTML += "<br /><div class='outputtext'>CID = " + response.cid + "</div>";
  const subdomainUrlOutput = `${subdomainPortalUrl}${PORTAL_AUTH_TOKEN ? `?auth_token=${PORTAL_AUTH_TOKEN}` : ""}`;
  outputWebappURL.innerHTML +=
    '<br /><div class="outputtext">Url = <a href="' +
    subdomainUrlOutput +
    '" target="_blank">' +
    base32Cid +
    "</a> </div><br />";
}

//
// Pin Cid

let inputPincid = document.getElementById("pinCid-input");
let pinCidBtn = document.getElementById("pinCid-button");

pinCidBtn.disabled = true;

inputPincid.addEventListener("input", function () {
  pinCidBtn.disabled = inputPincid.value.length < 1;
});

async function pinCid() {
  var inputPinCidValue = document.getElementById("pinCid-input").value;
  var outputPinCid = document.getElementById("outputPinCid");
  let response;
  outputPinCid.innerHTML = "<br /><div> waiting ...</div>";

  response = await client.pinCid(inputPinCidValue);

  outputPinCid.innerHTML = "<br /><div>Pin = " + JSON.stringify(response) + "</div>";
}

//
// Delete Cid

let inputDeleteCid = document.getElementById("deleteCid-input");
let deleteCidBtn = document.getElementById("deleteCid-button");

deleteCidBtn.disabled = true;

inputDeleteCid.addEventListener("input", function () {
  deleteCidBtn.disabled = inputDeleteCid.value.length < 1;
});

async function deleteCid() {
  var inputDeleteCidValue = document.getElementById("deleteCid-input").value;
  var outputDeleteCid = document.getElementById("outputDeleteCid");
  let response;
  outputDeleteCid.innerHTML = "<br /><div> waiting ...</div>";

  response = await client.deleteCid(inputDeleteCidValue);

  outputDeleteCid.innerHTML = "<br /><div>Delete = " + JSON.stringify(response) + "</div>";
}

//
// get All Cid Infos from S5 Cid

let inputAllcidsFromCid = document.getElementById("allcidsFromCid-input");
let allcidsFromCidBtn = document.getElementById("allcidsFromCid-button");

allcidsFromCidBtn.disabled = true;

inputAllcidsFromCid.addEventListener("input", function () {
  allcidsFromCidBtn.disabled = inputAllcidsFromCid.value.length < 1;
});

async function getAllInfosFromCid() {
  try {
    var inputAllcidsFromCidValue = document.getElementById("allcidsFromCid-input").value;
    var outputAllcidsFromCid = document.getElementById("outputAllcidsFromCid");
    let response;

    outputAllcidsFromCid.innerHTML = "<br /><div> waiting ...</div>";

    response = await client.tools.getAllInfosFromCid(inputAllcidsFromCidValue);

    outputAllcidsFromCid.innerHTML = "<br /><b>Encoding:</b>";
    outputAllcidsFromCid.innerHTML += "<br />base58btc  = " + response.zcid + "<br />";
    outputAllcidsFromCid.innerHTML += "<div><br />base32 = " + response.bcid + "</div>";
    outputAllcidsFromCid.innerHTML += "<div><br />base64url = " + response.ucid + "</div>";
    if (response.b3filesize != 0) {
      outputAllcidsFromCid.innerHTML += "<br /><br /><div><b>Raw CID:</b></div>";
      outputAllcidsFromCid.innerHTML +=
        "<div>Size = " + convertBytesToMegabytes(response.b3filesize) + " MB (" + response.b3filesize + " bytes)</div>";
      outputAllcidsFromCid.innerHTML += "<br /><br /><div><b>Multihash</b></div>";
      outputAllcidsFromCid.innerHTML += "<div>Type: BLAKE3 256-bits (0x1f)</div>";
      outputAllcidsFromCid.innerHTML += "<div>Hash (hex) = " + response.b3hashhex + "</div>";
      outputAllcidsFromCid.innerHTML += "<br /><div>mHash (base64url) = " + response.mhashb64url + "</div>";

      response2 = await client.getStorageLocations(inputAllcidsFromCidValue);
      outputAllcidsFromCid.innerHTML += "<br /><br /><div><b>Storage Locations:</b></div>";
      outputAllcidsFromCid.innerHTML +=
        "<div><pre><code>" + JSON.stringify(response2, null, "  ") + "</pre></code></div>";

      response3 = await client.getDownloadUrls(inputAllcidsFromCidValue);
      outputAllcidsFromCid.innerHTML += "<br /><br /><div><b>Download Urls:</b></div>";
      outputAllcidsFromCid.innerHTML += "<div>" + response3 + "</div>";
    }
  } catch (error) {
    console.log("ERROR: " + error);
  }
}

function convertBytesToMegabytes(bytes) {
  const megabytes = bytes / 1000000; // Using decimal conversion factor
  return +megabytes.toFixed(2);
}

//
// S5 Cid to mHash (base64url)

let inputCidTOmhash = document.getElementById("cidTOmhash-input");
let cidTOmhashBtn = document.getElementById("cidTOmhash-button");

cidTOmhashBtn.disabled = true;

inputCidTOmhash.addEventListener("input", function () {
  cidTOmhashBtn.disabled = inputCidTOmhash.value.length < 1;
});

async function getCidTOmHash() {
  var inputCidTOmhashCid = document.getElementById("cidTOmhash-input").value;
  var outputCidTOmhashData = document.getElementById("outputCidTOmhashData");
  let response;
  outputCidTOmhashData.innerHTML = "<br /><div> waiting ...</div>";

  response = await client.tools.convertS5CidToMHashB64url(inputCidTOmhashCid);

  outputCidTOmhashData.innerHTML = "<br /><div>mHash (base64url) = " + response + "</div>";
}

//
// S5 Cid to B3hash (hex)

let inputCidTOb3hash = document.getElementById("cidTOb3hash-input");
let cidTOb3hashBtn = document.getElementById("cidTOb3hash-button");

cidTOb3hashBtn.disabled = true;

inputCidTOb3hash.addEventListener("input", function () {
  cidTOb3hashBtn.disabled = inputCidTOb3hash.value.length < 1;
});

async function getb3hashHex() {
  var inputCidTOb3hashValue = document.getElementById("cidTOb3hash-input").value;
  var outputCidTOb3hash = document.getElementById("outputCidTOb3hash");
  let response;
  outputCidTOb3hash.innerHTML = "<br /><div> waiting ...</div>";

  response = await client.tools.convertS5CidToB3hashHex(inputCidTOb3hashValue);

  outputCidTOb3hash.innerHTML = "<br /><div>B3hash (hex) = " + response + "</div>";
}

//
// Get Metadata for Cid

let inputMetadataFromCid = document.getElementById("metadataFromCid-input");
let metadataFromCidBtn = document.getElementById("metadataFromCid-button");

metadataFromCidBtn.disabled = true;

inputMetadataFromCid.addEventListener("input", function () {
  metadataFromCidBtn.disabled = inputMetadataFromCid.value.length < 1;
});

async function getMetadataFromCid() {
  try {
    var inputmetadataFromCidValue = document.getElementById("metadataFromCid-input").value;
    var outputMetadataFromCidData = document.getElementById("outputMetadataFromCid");
    let response;
    outputMetadataFromCidData.innerHTML = "<br /><div> wait searching ...</div>";
    response = await client.getMetadata(inputmetadataFromCidValue);

    outputMetadataFromCidData.innerHTML =
      "<br /><div class='outputtext'>Metadata for = " +
      inputmetadataFromCidValue +
      "<br /><br /><pre><code>" +
      JSON.stringify(response, null, "  ") +
      "</code></pre></div>";
  } catch (error) {
    outputMetadataFromCidData.innerHTML = "<br /><div>Error: Raw CIDs do not have metadata</div>";
    console.log("ERROR: " + error);
  }
}
