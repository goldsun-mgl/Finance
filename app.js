// Дэлгэцийн модуль
var uiController = (function() {
  // class-уудын нэр өөрчлөгдөх магадлалтай тул тусад нь фунцболгон хадгалах хэрэгтэй
  var DOMstrings = {
    inputType: ".add__type",
    inputDesc: ".add__description",
    inputValue: ".add__value",
    listIncome: ".income__list",
    listExpense: ".expenses__list",
    // appcontroler-ийн клаас учраас үүнийг авах өөр функц бичих
    addBtn: ".add__btn",
    tusuvLabel: ".budget__value",
    incomeLabel: ".budget__income--value",
    expenseLabel: ".budget__expenses--value",
    percentageLabel: ".budget__expenses--percentage"
  };
    return {
      getInput: function() {
        return {
          type: document.querySelector(DOMstrings.inputType).value,
          description: document.querySelector(DOMstrings.inputDesc).value,
          value: parseInt(document.querySelector(DOMstrings.inputValue).value)
        };
        
      },
      // addBtn(.add__btn)классуудыг авах функц
      getDOMstrings: function() {
        return DOMstrings;
      },
      // Бичлэгүүдийг цэвэрлэх
      clearFields: function() {
        var fields = document.querySelectorAll(DOMstrings.inputDesc + ", " + DOMstrings.inputValue);
        // Convert list to Array-fields нь жагсаалт учир массивт шилжүүлж үйлдэл хийнэ
        var fieldsArr = Array.prototype.slice.call(fields);
        // Массиваас Давталтаар бичлэгүүдийн утгыг 0 болгох
        //for (var i = 0; i < fieldsArr.length; i++) {
          //fieldsArr[i].value = "";
        //}
        fieldsArr.forEach(function(el, index, array) {
          el.value = "";
        });
        //Курсорыг эхний бичлэгт авчрах
        fieldsArr[0].focus();
      },
      // Төсвийг дэлгэц дээр харуулах
      tusviigHaruulah: function(tusuv) {
        document.querySelector(DOMstrings.tusuvLabel).textContent = tusuv.tusuv;
        document.querySelector(DOMstrings.incomeLabel).textContent = tusuv.totalInc;
        document.querySelector(DOMstrings.expenseLabel).textContent = tusuv.totalExp;
        if(tusuv.huvi !== 0){
          document.querySelector(DOMstrings.percentageLabel).textContent = tusuv.huvi + '%';
        }else {
          document.querySelector(DOMstrings.percentageLabel).textContent = tusuv.huvi;
        }
      },
      //Олж авсан өгөгдлүүдээ тохирох хэсэгт гаргах
      addListItem: function(item, type) {
        // Орлого,зарлагын элемтийг агуулсан html-ийг бэлтгэнэ
        var html, list;
        if(type === 'inc') {
          list = DOMstrings.listIncome;
          html = '<div class="item clearfix" id="income-%id%"><div class="item__description">$DESCRIPTION$</div><div class="right clearfix"><div class="item__value">+ $$Value</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
        } else {
          list = DOMstrings.listExpense;
          html ='<div class="item clearfix" id="expense-%id%"><div class="item__description">$DESCRIPTION$</div><div class="right clearfix"><div class="item__value">- $$Value</div><div class="item__percentage">21%</div><div class="item__delete">          <button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
        }
        // Тэр html дотроо орлого зарлагын утгуудыг REPLACE ашиглан өөрчилж өгнө
        html = html.replace('%id%', item.id);
        html = html.replace('$DESCRIPTION$', item.description);
        html = html.replace('$$Value', item.value);
        //html = html.replace('%huvi%', financeController.tusviigAvah.data.huvi);
        //Бэлтгэсэн html-ээ DOM-руу хийж өгнө
        document.querySelector(list).insertAdjacentHTML('beforeend', html);
      }
    };
  })();
  // Санхүүгийн модуль
  var financeController = (function() {
    // Орлого хадгалах обьект
    var Income = function(id, description, value) {
      this.id = id;
      this.description = description;
      this.value = value;
    };
    // Зарлага хадгалах обьект
    var Expense = function(id, description, value) {
      this.id = id;
      this.description = description;
      this.value = value;
    };
    var calculateTotal = function(type) {
      var sum = 0;
      data.items[type].forEach(function(el) {
        sum = sum + el.value;
      });
      data.totals[type] = sum;
    };
    // Бүх өгөгдлүүдийг хадгалах
    var data = {
      items: {
        inc: [],
        exp: []
      },
      totals: {
        inc: 0,
        exp: 0
      },
      tusuv: 0,
      huvi: 0
    };
    return {
      tusuvTootsooloh: function() {
        // Нийт орлогын нийлбэрийг тооцох
        calculateTotal("inc");
        // Нийт зарлагын нийлбэрийг тооцох
        calculateTotal("exp");
        //Төсвийг шинээр тооцох
        data.tusuv = data.totals.inc - data.totals.exp;
        // Орлогод зарлагын эзлэх хуьийг тооцох
        data.huvi = Math.round((data.totals.exp / data.totals.inc) * 100);
      },
      tusviigAvah: function() {
        return {
          tusuv: data.tusuv,
          huvi: data.huvi,
          totalInc: data.totals.inc,
          totalExp: data.totals.exp
        };
      },
      addItem: function(type, desc, val) {
        var item, id;
        if(data.items[type].length === 0) id = 1;
        else {
          id = data.items[type][data.items[type].length - 1].id + 1;
        }
        if(type === "inc") {
          item = new Income(id, desc, val);
        }else {
          item = new Expense(id, desc, val);
        }
        data.items[type].push(item);
        return item;
      },
      seeData: function() {
        return data;
      }
    };
  })();
  // Холбогч модуль
  var appController = (function(uiController, financeController) {
   
    var ctrlAddItem = function() {
      // 1. Оруулсан өгөгдлийг дэлгэцнээс олж авах
      var input = uiController.getInput();
      if(input.description !== "" && input.value !== "") {
        // 2. Олж авсан өгөгдлүүдээ Санхүүгийн модульд дамжуулж тэнд хадгалах
      var item = financeController.addItem(input.type, input.description, input.value);
      // 3. Олж авсан өгөгдлүүдээ тохирох хэсэгт гаргах
      uiController.addListItem(item, input.type);
      uiController.clearFields();
      // 4.Төсвийг тооцоолох
      financeController.tusuvTootsooloh();
      // 5.Эцсийн үлдгдэл тооцоог дэлгэцэнд гаргах
      var tusuv = financeController.tusviigAvah();
      // 6.
      uiController.tusviigHaruulah(tusuv);
      }
    };
    var setupEventListeners = function() {
      var DOM = uiController.getDOMstrings();
      // Товчийг дарах эвент листнер
      document.querySelector(DOM.addBtn).addEventListener("click", function() {
        ctrlAddItem();
    });
    // enter товч дарах эвент листнер
    document.addEventListener("keypress", function(Event) {
      if(Event.keyCode === 13) {
        ctrlAddItem();
      }
      });
    };
    return {
      init: function() {
        console.log("Программ эхэллээ.");
        uiController.tusviigHaruulah({
          tusuv: 0,
          huvi: 0,
          totalInc: 0,
          totalExp: 0
        });
        setupEventListeners();
      }
    };
  })(uiController, financeController);
  appController.init();
  