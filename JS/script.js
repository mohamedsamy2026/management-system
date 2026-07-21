function set() {
    localStorage.setItem("products", JSON.stringify(data))
}

function get() {
    getdata = localStorage.getItem("products");

    if (getdata != null) {
        data = JSON.parse(getdata);
        showData();
        $("table").removeClass("hidden");
    }

    else {
        data = []
    }
}

get()