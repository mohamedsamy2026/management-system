// Elemnts Start
let title = $("#title");
let price = $("#price");
let taxes = $("#taxes");
let ads = $("#ads");
let discount = $("#discount");
let total = $("#total");
let count = $("#count");
let categroy = $("#categroy");
let create = $("#create");
let search = $("#search");
let searchTitle = $("#searchTitle");
let searchCategory = $("#searchCategory");

let searchMood = "title";
let status = "create";
let tmp;
let num = 1;
// Elemnts End


// رساله تحذير
function showAlert() {
  $("#alert-msg").fadeIn(600);

  setTimeout(function () {
    $("#alert-msg").fadeOut(600);
  }, 3000);
}


// Get Total Start
function getTatal() {
  let result = +price.val() + +taxes.val() + +ads.val() - +discount.val();
  if (price.val() != "") {
    total.css("background-color", "green");
    total.text(result);
  } else {
    total.css("background-color", "rgb(248 113 113)");
    total.text("");
  }
}

$("#price , #taxes , #ads , #discount").on("keyup", function () {
  getTatal();
});
// Get Total End



// Create Product Start
let data = [];
function createProduct() {
  if (title.val() != "" && price.val() != "") {
    create.text("Create")
    let newdata = {
      title: title.val(),
      price: price.val(),
      taxes: taxes.val(),
      ads: ads.val(),
      discount: discount.val(),
      count: count.val(),
      category: categroy.val(),
      total: total.text(),
    };

    // Count Start
    if (status == "create") {
      if (newdata.count > 1) {
        for (let i = 0; i < newdata.count; i++) {
          data.push(newdata);

        }
      }
      else {
        data.push(newdata);
      }
    }
    else {
      data[tmp] = newdata;
      status = "create";
      create.text("Create");
      count.show();
    }
    // Count End

    showData();

    $("input").val("")
  }

  else {
    showAlert();
    scroll({
      top: 0,
      behavior: "smooth",
    });
  }
  getTatal()
  set()
}
// Create Product End



// Read Products Start
function showData() {
  let table = "";

  data.forEach((item, index) => {
    table += `<tr>
      <td>${index + 1}</td>
      <td>${item.title.toLowerCase()}</td>
      <td>${item.price}</td>
      <td>${item.taxes}</td>
      <td>${item.ads}</td>
      <td>${item.discount}</td>
      <td>${item.total}</td>
      <td>${item.category.toLowerCase()}</td>
      <td>
        <button id="update" class="bg-[#310044] font-bold text-[17px] px-6 py-4 rounded-2xl cursor-pointer hover:bg-[#5a037d] duration-300">
          Update
        </button>
      </td>
      <td>
        <button id="delete" class="bg-red-600 font-bold text-[17px] px-6 py-4 rounded-2xl cursor-pointer hover:bg-red-800 duration-300">
          Delete
        </button>
      </td>
    </tr>
    `;
  });


  $("table tbody").html(table);
  set()
}
// Read Products End



// OnClick In Button Create Start
create.on("click", function () {
  createProduct();
  $("table").removeClass("hidden");
});
// OnClick In Button Create End



// Delete Start
function deleteRow(element) {
  let index = $(element).closest("tr").index();
  data.splice(index, 1);
  showData();
  set()
}

$(document).on("click", "#delete", function () {
  deleteRow(this);
});
// Delete End


// Update Star

function update(rowUpdate) {
  status = "update";
  create.text("Update")
  let father = $(rowUpdate).closest("tr").index();
  tmp = father;
  title.val(data[father].title)
  price.val(data[father].price)
  taxes.val(data[father].taxes)
  ads.val(data[father].ads)
  discount.val(data[father].discount)
  total.text(data[father].total)
  categroy.val(data[father].category)
  count.hide()
  getTatal();
  scroll({
    top: 0,
    behavior: "smooth"
  })
  set()
}

$(document).on("click", "#update", function () {
  update(this)
})
// Update End


// Search Start

searchTitle.on("click", function () {
  search.attr("placeholder", "Search By Title");
  search.focus();
  searchMood = "title";
})

searchCategory.on("click", function () {
  search.attr("placeholder", "Search By Categroy");
  search.focus();
  searchMood = "category"

})

search.on("keyup", function () {
  let table = ""
  if (searchMood === "category") {
    for (let i = 0; i < data.length; i++) {
      if (data[i].category.toLowerCase().includes(search.val().toLowerCase())) {


        table += `<tr>
                    <td>${i + 1}</td>
                    <td>${data[i].title}</td>
                    <td>${data[i].price}</td>
                    <td>${data[i].taxes}</td>
                    <td>${data[i].ads}</td>
                    <td>${data[i].discount}</td>
                    <td>${data[i].total}</td>
                    <td>${data[i].category}</td>
                    <td>
                        <button id="update" class="bg-[#310044] font-bold text-[17px] px-6 py-4 rounded-2xl cursor-pointer hover:bg-[#5a037d] duration-300">
                          Update
                        </button>
                    </td>
                    <td>
                        <button id="delete" class="bg-red-600 font-bold text-[17px] px-6 py-4 rounded-2xl cursor-pointer hover:bg-red-800 duration-300">
                          Delete
                        </button>
                    </td>
                </tr>`;
      }
    }
  }
  else {
    for (let i = 0; i < data.length; i++) {
      if (data[i].title.toLowerCase().includes(search.val().toLowerCase())) {


        table += `<tr>
                    <td>${i + 1}</td>
                    <td>${data[i].title}</td>
                    <td>${data[i].price}</td>
                    <td>${data[i].taxes}</td>
                    <td>${data[i].ads}</td>
                    <td>${data[i].discount}</td>
                    <td>${data[i].total}</td>
                    <td>${data[i].category}</td>
                    <td>
                        <button id="update" class="bg-[#310044] font-bold text-[17px] px-6 py-4 rounded-2xl cursor-pointer hover:bg-[#5a037d] duration-300">
                          Update
                        </button>
                    </td>
                    <td>
                        <button id="delete" class="bg-red-600 font-bold text-[17px] px-6 py-4 rounded-2xl cursor-pointer hover:bg-red-800 duration-300">
                          Delete
                        </button>
                    </td>
                </tr>`;
      }
    }
  }
  $("table tbody").html(table);
})

// Search End