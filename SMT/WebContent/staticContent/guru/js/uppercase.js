function changeToUpperCase() {
	document.cat.categoryName.value = document.cat.categoryName.value.toUpperCase();
}

function changeToUpper()
{
	document.subcat.subcatName.value = 	document.subcat.subcatName.value.toUpperCase();
}

function changetoupper()
{
	document.leafcat.leafcatName.value = 	document.leafcat.leafcatName.value.toUpperCase();
}

function preventsubcat()
{
	document.subcat.subcatName.value = document.subcat.subcatName.value.replace(/[^a-zA-Z]/, '');
}

function preventleaf()
{
	document.leafcat.leafcatName.value = document.leafcat.leafcatName.value.replace(/[^a-zA-Z]/, '');
}

function maxlen()
{
	document.cat.categoryName.value = document.cat.categoryName.value.maxLength;
}