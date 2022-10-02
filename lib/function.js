export const uppercaseFirstLetter = (string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};

export const handleDownloadImage = async (url) => {
  fetch(url)
    .then((res) => res.blob())
    .then((file) => {
      const tempUrl = URL.createObjectURL(file);
      const aTagElmn = document.createElement("a");
      aTagElmn.href = tempUrl;
      aTagElmn.download = "filename";
      document.body.appendChild(aTagElmn);
      aTagElmn.click();
      aTagElmn.remove();
    });
};
