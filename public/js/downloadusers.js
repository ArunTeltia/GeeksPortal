const downloadExcelLink = document.getElementById('downloadExcel');

(async () => {
  const downloadExcelResponse = await fetch('/intern/download');
  const downloadExcelBlob = await downloadExcelResponse.blob();
  const downloadExcelObjectURL = URL.createObjectURL(downloadExcelBlob);
  downloadExcelLink.href = downloadExcelObjectURL;
})();