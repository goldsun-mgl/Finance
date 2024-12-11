// Дэлгэцийн модуль
var uiController = (function() {
  // class-уудын нэр өөрчлөгдөх магадлалтай тул тусад нь фунцболгон хадгалах хэрэгтэй
  var DOMstrings = {
    inputType: ".add__type",
    inputDesc: ".add__description",
    inputValue: ".add__value",
    // appcontroler-ийн клаас учраас үүнийг авах өөр функц бичих
    addBtn: ".add__btn"
  };
    return {
      getInput: function() {
        return {
          type: document.querySelector(DOMstrings.inputType).value,
          description: document.querySelector(DOMstrings.inputDesc).value,
          value: document.querySelector(DOMstrings.inputValue).value
        };
        
      },
      // addBtn(.add__btn)классыг авах функц
      getDOMstrings: function() {
        return DOMstrings;
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
    // Бүх өгөгдлүүдийг хадгалах
    var data = {
      items: {
        inc: [],
        exp: []
      },
      totals: {
        inc: 0,
        exp: 0
      }
    };
    return {
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
      // 2. Олж авсан өгөгдлүүдээ Санхүүгийн модульд дамжуулж тэнд хадгалах
      // 3. Олж авсан өгөгдлүүдээ тохирох хэсэгт гаргах
      // 4.Төсвийг тооцоолох
      // 5.Эцсийн үлдгдэл тооцоог дэлгэцэнд гаргах
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
        setupEventListeners();
      }
    };
  })(uiController, financeController);
  appController.init();
  