import cookie from "react-cookies";

const httpOptions = {
  headers: {'X-Mashape-Key': '3d2a031b4cmsh5cd4e7b939ada54p19f679jsn9a775627d767'}
};

const DinnerModel = function () {

  
  let numberOfGuests = 1;
  if(cookie.load('numberOfGuests')){
    numberOfGuests = cookie.load('numberOfGuests')
  }
  //let totalCost = 0;
  let menu = [];
  if(localStorage.getItem("menu")){
    menu = JSON.parse(localStorage.getItem("menu"));
  }

  var allTypes = ["main course", "side dish", "dessert", "appetizer", "salad", "bread", "breakfast", "soup", "beverage", "sauce", "drink"];
  let dish = null;
  var totalCost;

  let observers = [];

  this.setNumberOfGuests = function (num) {
    numberOfGuests = num;
    notifyObservers();
  };

  this.getNumberOfGuests = function () {
    return numberOfGuests;
  };

  this.getMenu = function(){
    return menu;
  }

  this.setTotalCost = function (cost){
    totalCost = cost;
  };

  this.getTotalCost = function () {
    return totalCost;
  };

  this.setDish = function (dish){
    dish = dish;
    console.log("dish is set now in model");
  };

  this.getDish = function () {
    return dish;
  };

  this.getTotalCost = function () {
    return totalCost;
  };

  this.setTotalCost = function (num) {
    totalCost = num;
    notifyObservers();
  };

  //Returns the total price of the menu (all the ingredients multiplied by number of guests).
	this.getTotalMenuPrice = function() {
		//DONE Lab 1
		var totalPrice = 0;
		menu.forEach(function(menuDish)
		{
		
			menuDish.extendedIngredients.forEach(function(ingredient) {
					 totalPrice += 1;
			});
		});
		return totalPrice*this.getNumberOfGuests();
		
  }

  this.getAllTypes = function() {		

		return allTypes;
	}

  // API Calls

  this.getAllDishes = function (type, filter) {
    let url = 'http://sunset.nada.kth.se:8080/iprog/group/46/recipes/search'

    if(type != null){
      url  = `http://sunset.nada.kth.se:8080/iprog/group/46/recipes/search?type=${type}`
      console.log(type)
		}
		if(filter != null && type != null){
			
			url  = `http://sunset.nada.kth.se:8080/iprog/group/46/recipes/search?type=${type}&number=20&query=${filter}`
    }
    
    return fetch(url, httpOptions)
      .then(processResponse)
      .catch(handleError)
  }

  this.getDish = function (id) {

		let url = "http://sunset.nada.kth.se:8080/iprog/group/46/recipes/"+id+"/information";

		return fetch(url, httpOptions)
      .then(processResponse)
      .catch(handleError)
  }
		
  
  // API Helper methods

  const processResponse = function (response) {
    if (response.ok) {
      return response.json()
    }
    throw response;
  }
  
  const handleError = function (error) {
    if (error.json) {
      error.json().then(error => {
        console.error('getAllDishes() API Error:', error.message || error)
      })
    } else {
      console.error('getAllDishes() API Error:', error.message || error)
    }
  }

  // Observer pattern

  this.addObserver = function (observer) {
    observers.push(observer);
  };

  this.removeObserver = function (observer) {
    observers = observers.filter(o => o !== observer);
  };

  const notifyObservers = function () {
    observers.forEach(o => o.update());
  };


	//Adds the passed dish to the menu. If the dish of that type already exists on the menu
	//it is removed from the menu and the new one added.
	this.addDishToMenu = function(dish) {
		var counter = 0;
		console.log(dish);
		var alreadyInMenu = false;

		// this.getDish(id)
		// .then(dish => {
				// if menu empty or does not exist, put new element in
				if (menu === undefined || menu.length == 0) {

          menu[0] = dish;
         // cookie.save('menu', JSON.stringify(menu), { path: '/' })
         localStorage.setItem("menu", JSON.stringify(menu));
          console.log("cookie saved menu ", JSON.stringify(menu))

				//if items already in the menu
				}else{ 

					menu.forEach(function(menuDish)
					{
					
						if(menuDish.id == dish.id){
							alreadyInMenu = true;
							//break;
						}
						counter++;
					});
					if(alreadyInMenu == false){
					//add new dish to the end of the menu array
							menu[counter] = dish;
							console.log(dish);
          }
          localStorage.setItem("menu", JSON.stringify(menu));
        }
        
        cookie.save('menu', JSON.stringify(menu), { path: '/' })

				notifyObservers();
    // }
    // )	
  }
  
  // this.addDishToMenu = function(dish) {
  //     var counter = 0;  
  //     // if menu empty or does not exist, put new element in
  //     if (menu === undefined || menu.length == 0) {
  //       menu[counter] = dish;
  //       counter++;
  //       console.log("trying to add to menu: "+dish);

  //     //if items already in the menu
  //     }else{ 
  //           menu[counter] = dish;
  //           counter++;
  //           console.log("trying to add to menu: "+dish);
  //     }
  

  //     notifyObservers();

  //   }
  


	//Removes dish from menu
	this.removeDishFromMenu = function(id) {
		//TODO Lab 1
		var counter = 0;
		var idFound = false;

		if(menu.length == 1){
			if(menu[counter].id == id){
				menu.splice(counter, 1); 
			}else{
				alert("The dish you tried to remove does not excist on the menu!");
			}
		}else{

			menu.forEach(function(menuDish)
				{
					if(menuDish.id == id){
						//remove the excisting dish 
						menu.splice(counter, 1); 
						idFound = true;
					}
					counter++;
				});

				if(idFound == false){
					alert("The dish you tried to remove does not exist on the menu!");
				}

    }
    notifyObservers();
    localStorage.setItem("menu", JSON.stringify(menu));
	}
};

export const modelInstance = new DinnerModel();