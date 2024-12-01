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

  })();
  // Холбогч модуль
  var appController = (function(uiController, financeController) {
   
    var ctrlAddItem = function() {
      // 1. Оруулсан өгөгдлийг дэлгэцнээс олж авах
      console.log(uiController.getInput());
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
    document.addEventListener("keypress", function() {
      if(Event.keyCode === 13 || Event.which === 13) {
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
  