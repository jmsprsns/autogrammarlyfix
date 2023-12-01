var refreshTimer;

function refreshData() {
    x = 1;
    try {
        if (document.querySelector('.cards-replacements_labels-itemRemove') !== null) {
            var newclass = document.querySelector('.cards-replacements_labels-itemRemove');
            newclass.click();
        } else {
            var newclass = document.getElementsByClassName("cards-replacements_labels-itemInsert");
            newclass = newclass[0];
            newclass.click();
        }
    } catch (error) {
        if (document.getElementsByClassName("wrapper_fipkee2") !== null) {
            var cli = document.getElementsByClassName("wrapper_fipkee2");
            var vli = cli[0];
            vli.click();
        }
    }
    refreshTimer = setTimeout(refreshData, x * 1000);
}
function stopRefreshData() {
    clearTimeout(refreshTimer);
}

refreshData();
