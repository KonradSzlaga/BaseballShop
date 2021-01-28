

    /**************************** Starting with fetching a JSON file I will be working on ***************************************/

    fetch("http://kscv.online/BaseballShop/bestseller.json", {mode:"no-cors"})
    .then(response => response.json())
    .then(data => workingWithJSON(data))
    .catch(err => alert('Prosze zaladowac plik'));
    
/******************************* Declaring myStorage to work with localStorage **********************************************/
        myStorage = localStorage;


    let updateCartTotalPrice = () => {

        let totalPrice = 0;
        let totalCartItemNumber = 0;
            for(let i = 0; i<myStorage.length; i++){
                    let currentObjectTable = JSON.parse(myStorage.getItem(myStorage.key(i)));
                    //console.table(currentObjectTable);
                        let currentItemPriceString = currentObjectTable.price.substring(1);
                        let currentItemPriceNumber = parseFloat(currentItemPriceString);

                        let currentItemQtyNumber = currentObjectTable.Qty;
                        totalPrice += (currentItemQtyNumber * currentItemPriceNumber);
                        
                        let totalPriceRounder = totalPrice.toFixed(2);
                        let cartTotalValue = document.getElementById('cartTotal');
                        cartTotalValue.innerText = `Total: $${totalPriceRounder}`;
                        
                        totalCartItemNumber += currentObjectTable.Qty
                        let itemNumber = document.getElementById('itemNumber');
                        itemNumber.innerHTML = totalCartItemNumber;
            }
        }

    let removeFromTheCartList = (remove) =>{

        let currentRemoveButton = remove.target;
        let currentRemoveContainer = currentRemoveButton.closest('.cartItem');
        let currentRemoveName = currentRemoveContainer.children[1].innerText;
    console.log(currentRemoveName);

        let allContainer = currentRemoveButton.closest('#allContainer');
        let wantedItemContainer = allContainer.children[3].children[0].children[1];
    //console.log(wantedItemContainer);

        if(wantedItemContainer){
            
            
            let currentItemsOnPage = wantedItemContainer.children;
    //console.log(currentItemsOnPage);

            for(child of currentItemsOnPage){
    //console.log(child);
                let childsName = child.children[2].innerText;
    //console.log(childsName);
    //if(childsName == currentRemoveName){console.log('1')}else{console.log('0')};
    



                if(childsName == currentRemoveName){

                    let parentContainer = child;
                    let containersButton = parentContainer.children[1];
    //console.log(containersButton);
                    containersButton.className = 'addButton';
                    containersButton.style.backgroundColor = 'orange';
                    containersButton.innerText = "";
                    containersButton.addEventListener('click', addToCart);
        
                    let icon = document.createElement('i');
                        icon.className = 'fas fa-cart-plus';
                    let text = document.createElement('p');
                        text.className = 'buttonText';
                        text.innerText = "Add to cart";

                    containersButton.appendChild(icon);
                    containersButton.appendChild(text);
                }

            }

        }













        
        let currentObjectTable = JSON.parse(myStorage.getItem(myStorage.key(currentRemoveName)));
        window.myStorage.removeItem(currentRemoveName, JSON.stringify(currentObjectTable))

        let cartItemsHolder = document.getElementById('holderItems');
        cartItemsHolder.querySelectorAll('*').forEach(n => n.remove());

        readCurretnItems();
        

        if(myStorage.length > 0 ){
            updateCartTotalPrice();
        }else{
            let cartTotalValue = document.getElementById('cartTotal');
            cartTotalValue.innerText = 'Total: $0';
            let itemNumber = document.getElementById('itemNumber');
            itemNumber.innerHTML = 0;
            itemNumberColor();
        }
    
        
    
    }

/***************** Declaring a function to read-in data I have in myStorage when opening, re-opening my page ********************/
        let readCurretnItems = () => {
            if(myStorage.length === 0){
                
                //If myStorage has been cleared, this will remove all item that are currently there
                let cartItemsHolder = document.getElementById('holderItems');
                cartItemsHolder.querySelectorAll('*').forEach(n => n.remove());
    
            }else{
                // if there is anything in myStorage, this part will help to read it in. totalItemPrice will show cart's value
                let cartItemsHolder = document.getElementById('holderItems');
                var totalItemPrice = 0;

                for(let i = 0; i<myStorage.length; i++){

                    //parsing each object from myStorage to do work on it
                    let currentObjectTable = JSON.parse(myStorage.getItem(myStorage.key(i)));
                    //console.table(currentObjectTable);

                    //Creating elements for all relevant data I have in myStorage
                let cartItemContainer = document.createElement('div');
                        cartItemContainer.className = 'cartItemContainer';
                        cartItemContainer.id = i;

                    let cartItem = document.createElement('div');
                            cartItem.className = 'cartItem';

                    let cartItemPrice = document.createElement('div');
                            cartItemPrice.className = 'cartItemPrice';
                            cartItemPrice.innerText = currentObjectTable.price;

                    let currentItemPriceString = currentObjectTable.price.substring(1);
                    let currentItemPriceNumber = parseFloat(currentItemPriceString);

                    let cartItemName = document.createElement('div');
                            cartItemName.className = 'cartItemName';
                            cartItemName.innerText = currentObjectTable.name;

                    let removeItemBtn = document.createElement('button');
                            removeItemBtn.className = 'removeItemBtn';
                            removeItemBtn.innerText = 'X';
                            removeItemBtn.addEventListener('click', removeFromTheCartList);

                    let cartItemImageContainer = document.createElement('div');
                            cartItemImageContainer.className = 'cartItemImageContainer'

                    let cartItemIMG = document.createElement('img');
                            cartItemIMG.className = 'cartItemIMG';
                            cartItemIMG.setAttribute('src', currentObjectTable.pictureSrc);
                            cartItemIMG.setAttribute('alt', 'Item Img');

                    let cartItemQty = document.createElement('div');
                            cartItemQty.className = 'cartItemQty';

                    let plusSquare = document.createElement('div');
                            plusSquare.className = 'far fa-plus-square';

                    let minusSquare = document.createElement('div');
                            minusSquare.className = 'far fa-minus-square';

                    let inputQty = document.createElement('input');
                            inputQty.className = "inputQty";
                            inputQty.setAttribute('type','number');
                            inputQty.setAttribute('disabled', 'disabled')
                            inputQty.value = currentObjectTable.Qty;

                    let currentItemQtyNumber = currentObjectTable.Qty;
                            // console.log(currentItemQtyNumber);

                totalItemPrice += (currentItemQtyNumber * currentItemPriceNumber);
                    
                    let priceTotalRounded = totalItemPrice.toFixed(2);

                    let cartTotalValue = document.getElementById('cartTotal');
                            cartTotalValue.innerText = `Total: $${priceTotalRounded}`;
                /***************************** Appending created elements *****************************************************************************/

                cartItemQty.appendChild(inputQty);
                cartItemQty.appendChild(plusSquare);
                cartItemQty.appendChild(minusSquare);

                cartItemImageContainer.appendChild(cartItemIMG);

                cartItem.appendChild(cartItemPrice);
                cartItem.appendChild(cartItemName);
                cartItem.appendChild(cartItemImageContainer);
                cartItem.appendChild(cartItemQty);
                cartItem.appendChild(removeItemBtn);

                cartItemContainer.appendChild(cartItem);
                cartItemsHolder.appendChild(cartItemContainer);
                }       
            }
            /****************************** creating and appending elements ends here *****************************/

            /*************************** declaring a function and adding event to minus sign to decrese number of items ************************************/

            let decreaseNumber = (decreaseEvt) => {

                let minusSquareDiv = decreaseEvt.target;
                let myCurrentContainer = minusSquareDiv.closest('.cartItemQty');
                let myInput = myCurrentContainer.children[0];
                let myInputNumber = myInput.value;
                //console.log(myInputNumber);
                let myInputNumberValue = parseInt(myInputNumber);

                //this works only if we have a quantity of 2 or more for a product in our cart - for deleting there will be button 'X'
                if(myInputNumberValue > 1){
                    myInput.value = myInputNumberValue - 1;
                    //console.log(myInputNumber);

                    let myProductContainer = minusSquareDiv.closest('.cartItem');
                    let myProductName = myProductContainer.children[1];
                    let myProductNameText = myProductName.innerHTML;
                    
                    let currentJsonTable = JSON.parse(myStorage[myProductNameText]);
                    currentJsonTable.Qty = parseInt(myInput.value);
                    window.myStorage.setItem(myProductNameText, JSON.stringify(currentJsonTable));

                    updateCartTotalPrice();
                }else{}
            }

            let minusSquares = document.getElementsByClassName('fa-minus-square');
            for(let square of minusSquares){
                square.addEventListener('click', decreaseNumber);
            }
            /***************************************** Event added - function as above ************************************************/

            /********************************* declaring a function and adding event to plus sign *************************************/

            let increaseNumber = (increaseEvt) => {

                let plusSquareDiv = increaseEvt.target;
                let myCurrentContainer = plusSquareDiv.closest('.cartItemQty');
                let myInput = myCurrentContainer.children[0];
                let myInputNumber = myInput.value;
                //console.log(myInputNumber);
                let myInputNumberValue = parseInt(myInputNumber);
                myInput.value = myInputNumberValue +1;
                //console.log(myInputNumber);

                let myProductContainer = plusSquareDiv.closest('.cartItem');
                let myProductName = myProductContainer.children[1];
                let myProductNameText = myProductName.innerHTML;
                
                let currentJsonTable = JSON.parse(myStorage[myProductNameText]);
                currentJsonTable.Qty = parseInt(myInput.value);
                window.localStorage.setItem(myProductNameText, JSON.stringify(currentJsonTable));


                updateCartTotalPrice();

                    
            }

            let plusSquares = document.getElementsByClassName('fa-plus-square');
            for(let square of plusSquares){
                square.addEventListener('click', increaseNumber);
            }

            /***************************************** Event added - function as above ************************************************/
        }
/************************ Making website to do my function ********************************/
readCurretnItems();
/******************************************************************************************/




/******************************************* Clearing cart and myStorage***********************************************/

    let clearCartItems = () =>{
    
        let cartTotalValue = document.getElementById('cartTotal');
        cartTotalValue.innerText = `Total: $0`;   

        myStorage.clear();
        let itemNumber = document.getElementById('itemNumber');
        itemNumber.innerHTML = myStorage.length;
    
        readCurretnItems();
        itemNumberValue();
        itemNumberColor();

            let addingButtons = document.getElementsByClassName('addButton');
                for(let el of addingButtons){
                    el.addEventListener('click', addToCart);
                    el.className = 'addButton';
                    el.style.backgroundColor = 'orange';
                    el.innerText = "";
        
                    let icon = document.createElement('i');
                        icon.className = 'fas fa-cart-plus';
                    let text = document.createElement('p');
                        text.className = 'buttonText';
                        text.innerText = "Add to cart";

            el.appendChild(icon);
            el.appendChild(text);
                        
        
            }
        
        
    }
        
let clearCartBtn = document.getElementById('clearCart').addEventListener('click', clearCartItems);

/******************************************* Clearing cart and myStorage ends here***********************************************/



/******************************************************* Adding item to cart ********************************************/
let shoppingCartItems = [];
    
    function addToCart(ev){
    
        let currentItem= {
            Id: "",
            name: "",
            pictureAlt: "",
            pictureSrc: "",
            price: "",
            Qty: ""
        }

        let currentButton = ev.target;
        currentButton.innerText = "In cart"
        currentButton.style.backgroundColor = "grey";
        currentButton.removeEventListener('click', addToCart);

        let currentContainer = currentButton.closest('.top10items');
        let elementsPicture = currentContainer.children[0].children[0];
        let picturesAlt = elementsPicture.getAttribute('alt');
        let picturesSrc = elementsPicture.getAttribute('src');

        let elementsName = currentContainer.children[2];
        let elementsNameText = elementsName.innerText;

        let elementsPrice = currentContainer.children[3];
        let elementsPriceValue = elementsPrice.innerText;

        //console.log(elementsPriceValue.substring(1));

        currentItem.name = elementsNameText;
        currentItem.pictureAlt = picturesAlt;
        currentItem.pictureSrc = picturesSrc;
        currentItem.price = elementsPriceValue;
        currentItem.Qty = 1;
        

        shoppingCartItems.push(currentItem);

        //console.table(shoppingCartItems);

        let itemNumber = document.getElementById('itemNumber');
        itemNumber.innerText = shoppingCartItems.length;
        itemNumberColor();

        window.localStorage.setItem(elementsNameText, JSON.stringify(currentItem));

        //console.table(myStorage);
    
    
        
        let cartItemsHolder = document.getElementById('holderItems');
        cartItemsHolder.querySelectorAll('*').forEach(n => n.remove());
    
        readCurretnItems();
        itemNumberValue();
    }
    
    
/************************************************* Adding item to cart ends here ****************************************************/

    
    let workingWithJSON = (data) =>{
    
        if (!data || data.length === 0)
        return new Promise((resolve, reject) => reject(new Error('Couldn\'t load JSON data')));
    
    
    /******************************************************* CREATING ITEMS PAGE *********************************************** */
    
        let createNewPage= (choice) =>{
    
            let option = choice.target;
            let optionId = option.getAttribute('id');
            let productsTable = data[optionId]; 
    
            let bodyContainer = document.getElementById('container');
            let mainPage = document.getElementById('body');
    
        bodyContainer.removeChild(mainPage);
    
            /*Creating container for new items */
            let inPageItemsContainer = document.createElement('div');
            inPageItemsContainer.className = 'bestsellerContainer';
            inPageItemsContainer.id = 'body';
    
        bodyContainer.appendChild(inPageItemsContainer);
    
    
    
    /**********************************************************************************************************/
    
            /* Creating container to append items */
    
        let newTotalContainer = document.createElement('div');
            newTotalContainer.className = 'top10itemsContainer';
            newTotalContainer.id = 'top10itemsContainer'
    
            /* Creating container to append best bestseller picure */

            /* This contains squares and text */
            let newPictureContainer = document.createElement('div');
            newPictureContainer.className = 'topItems';
            newPictureContainer.id = 'top10';
    
            /*This contains another square with text */
                let goldenSquare = document.createElement('div');
                goldenSquare.className = 'tlo';
    
                    let blueSquare = document.createElement('div');
                    blueSquare.className = 'top10';
    
                    /* this contains text describing type of products we see in the page */
    
                    let itemsNameText = document.createElement('p');
                    itemsNameText.className = 'top10Text';
                    
    
                    if(optionId ==='startBtn'){
    
                        itemsNameText.innerText = 'all items';
    
                    }else if(optionId ==='gameEquip'){
    
                        itemsNameText.innerText = 'game time';
    
                    }else if(optionId ==='trainingEquip'){
    
                        itemsNameText.innerText = 'drill time';
    
                    }else if(optionId ==='topProducts'){
    
                        itemsNameText.innerText = 'top items';
    
                    }else if(optionId ==='other'){
    
                        itemsNameText.innerText = 'other';
    
                    }
    
    
                /* This contains picture */
                
    
            blueSquare.appendChild(itemsNameText);
            goldenSquare.appendChild(blueSquare);
            newPictureContainer.appendChild(goldenSquare);
    
                
                
            inPageItemsContainer.appendChild(newPictureContainer);
    
            bodyContainer.appendChild(inPageItemsContainer);
    
    
    
    
    /*----------------- Adding DIV for all the data I have in JSON -------------------------- */
                let itemsInCart = [];
            for(let i = 0; i<myStorage.length; i++){
                let itemTable = JSON.parse(myStorage.getItem((myStorage.key(i))));
                let nameFromCart = itemTable.name;
                
                itemsInCart.push(nameFromCart);

            }
                for(let el of itemsInCart){console.log(el)}

                console.table(itemsInCart);
                console.log(itemsInCart);




            for(let i =0; i<productsTable.length; i++){
            
    
                let topDiv = document.createElement('div');
                topDiv.className = 'top10items';
                topDiv.id = i;
    
                    let imageContainer = document.createElement('div');
                    imageContainer.className = 'imageContainer';
                        let img = document.createElement('img');
                        img.className = "image";
                        img.setAttribute('alt', 'item');
                        img.setAttribute('src', `${productsTable[i].pictureJSON[0].url1}`);
                        img.id = i;
    

                    let itemsName = document.createElement('div');
                    itemsName.className = 'itemName';
                    itemsName.innerText = (productsTable[i].producerJSON + ' - ' + productsTable[i].modelJSON);
    
                    let itemsPrice = document.createElement('div');
                    itemsPrice.className = 'itemPrice';
                    itemsPrice.innerText = ('$' + productsTable[i].priceJSON);
    
                    let addToCartButton = document.createElement('button');
                    

                    let text = document.createElement('p');
                    

                    

                    if(itemsInCart.length !== 0){


                        
                            if(itemsInCart.includes(itemsName.innerText)){
                            
                                addToCartButton.className = 'addButton';
                                addToCartButton.innerText = "In cart"
                                addToCartButton.style.backgroundColor = "grey";

                            }else{

                                addToCartButton.className = 'addButton';
                                addToCartButton.addEventListener('click', addToCart);
                                let icon = document.createElement('i');
                                icon.className = 'fas fa-cart-plus';
                            
                                text.className = 'buttonText';
                                text.innerText = "Add to cart"
                                addToCartButton.appendChild(icon);
                                addToCartButton.appendChild(text);

                            }
                        


                    }else{


                        addToCartButton.className = 'addButton';
                        addToCartButton.addEventListener('click', addToCart);
                        let icon = document.createElement('i');
                        icon.className = 'fas fa-cart-plus';
                    
                        text.className = 'buttonText';
                        text.innerText = "Add to cart"
                        addToCartButton.appendChild(icon);
                        addToCartButton.appendChild(text);


                    }   




                        
    
                    
    
        /*------------------------------ APPENDING CHILDREN --------------------------------- */
    
        imageContainer.appendChild(img);
        topDiv.appendChild(imageContainer);
        topDiv.appendChild(addToCartButton);
        topDiv.appendChild(itemsName);
        topDiv.appendChild(itemsPrice);
    
    
    
        newTotalContainer.appendChild(topDiv);
        }
    
        inPageItemsContainer.appendChild(newTotalContainer);
    
    /*-------------------------------------CREATING SLIDE SHOW FOR THE ITEMS ----------------------- */
    
    
    
    
    let slideShowItems = (evt) =>{
    
            //console.log(evt.target);
            let darkBackground = document.createElement('div')
            darkBackground.className = 'darkDiv';
            darkBackground.id = 'darkDiv'
    
            let slidePage = document.createElement('div')
            slidePage.className = 'slidePage';
    
            let slidePageContent = document.createElement('div')
            slidePageContent.className = 'slidePageContent';
    
            let arrowForward = document.createElement('div');
            arrowForward.className = 'fas fa-long-arrow-alt-right';
            arrowForward.id = 'nextSlide';
    
            let arrowBack = document.createElement('div');
            arrowBack.className = 'fas fa-long-arrow-alt-left';
            arrowBack.id = 'previousSlide';
    
    
            let pictureFrame = document.createElement('div');
            pictureFrame.className = 'pictureFrame';
    
            let picture = document.createElement('img');
            picture.className = 'pictureSlide';
            picture.setAttribute('alt','SlideShow');
    
            let source = evt.target.getAttribute('src');
            picture.setAttribute('src', source);
    
    
            let closingButton = document.createElement('div');
            closingButton.className = 'far fa-window-close';
            closingButton.id = 'closeMe'
    
            
            let allContainer = document.getElementById('allContainer');
            allContainer.appendChild(darkBackground);
            allContainer.appendChild(slidePage);
            slidePage.appendChild(slidePageContent);
            slidePageContent.appendChild(arrowForward);
            slidePageContent.appendChild(arrowBack);
            slidePageContent.appendChild(pictureFrame);
            slidePageContent.appendChild(closingButton);
            pictureFrame.appendChild(picture);
    
            let closingSlide = () =>{
    
                allContainer.removeChild(darkBackground);
                allContainer.removeChild(slidePage);
    
            }
    
    /********************* -----------  Next slide ------------- **************************************/
    let imageId = evt.target.getAttribute('id');
    
    
    let picturesTable = [productsTable[imageId].pictureJSON[0].url1,productsTable[imageId].pictureJSON[0].url2, productsTable[imageId].pictureJSON[0].url3, productsTable[imageId].pictureJSON[0].url4, productsTable[imageId].pictureJSON[0].url5];
    
    
    
        let urlCounter = 1;
    
        let nextSlide = () => {
    
            if(urlCounter === 5){
                urlCounter = 0;
                source = picturesTable[urlCounter]
                picture.setAttribute('src', source);
                //console.log(imageId);
                //console.log(urlCounter);
                //console.log(picturesTable[urlCounter]);
    
            }else{
                    
                source = picturesTable[urlCounter]
                picture.setAttribute('src', source);
    
            }
    
            urlCounter++;
    
        }
    
        /********************* -----------  Previous slide ------------- **************************************/
    
        let previousSlide = () => {
    
            urlCounter--;
        
            if(urlCounter < 0){
        
                urlCounter = 4
        
                source = picturesTable[urlCounter]
                picture.setAttribute('src', source);
                //console.log(imageId);
                //console.log(urlCounter);
                //console.log(picturesTable[urlCounter]);
        
            }else{

                source = picturesTable[urlCounter]
                picture.setAttribute('src', source);
            }
        }
    
        //console.table(picturesTable);
    
    
        let picturesId = `${productsTable[imageId].pictureJSON[0].url1}`;
    
        console.table(picturesId);
    
        let goToNextSlide = document.getElementById('nextSlide');
        goToNextSlide.addEventListener('click', nextSlide);
    
        let goToPrevioustSlide = document.getElementById('previousSlide');
        goToPrevioustSlide.addEventListener('click', previousSlide);
    
    
    
        /********************* -----------  Closing by clicking the 'X' button or on dark background ------------- **************************************/
            document.getElementById('closeMe').addEventListener('click', closingSlide);
            document.getElementById('darkDiv').addEventListener('click', closingSlide);
    }
            
    /********************* -----------  Adding slide function to a pictures after clicking ------------- **************************************/
            let topItemsImage = document.getElementsByClassName('image');
            for(let el of topItemsImage){
                el.addEventListener('click', slideShowItems);
            }
    
    /*-------------------------------------END OF     ->      CREATING SLIDE SHOW FOR ITEMS ----------------------- */
    
    }
    
    /*************************************** CREATING NEW PAGE FUNCTION ENDS HERE ***********************************/
    
    
    /********************* -----------  Adding create new page event to menu items after clicking ------------- **************************************/

    
    let menuItems = document.getElementsByClassName('menu');
    let startBtn = document.getElementById('startBtn');

    startBtn.addEventListener('click', createNewPage);

    for(let item of menuItems){
        item.addEventListener('click', createNewPage)
    }    
    
    
}
    
    
    /*************************************** WORKING WITH JSON FUNCTION ENDS HERE ***********************************/
    
    
/*XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX*/
    
    
    /* ------------------------------------- HAMBURGER MENU OPEN CLOSE -------------------------------------- */
    
    let toggleMenuBar = 0;
    
    let slidingBar = () =>{
        toggleMenuBar  =!toggleMenuBar;
        if(toggleMenuBar){
            let menuBars = document.getElementById('colapsible');
            menuBars.style.left = '0px'; 
            let menu = document.getElementById('menu');
            menu.style.color = 'white'
        }else{
            let menuBars = document.getElementById('colapsible');
            menuBars.style.left = '-335px';
            let menu = document.getElementById('menu');
            menu.style.color = 'red'
        }
    
    
    }
    let menu = document.getElementById('menu').addEventListener('click', slidingBar);
    
    /*---------------------------------------- CLOSING HAMBURGER -------------------------------------------- */

    let closeMenuBar = () =>{
        let menuBars = document.getElementById('colapsible');
            menuBars.style.left = '-335px';
            toggleMenuBar  =!toggleMenuBar;
        let menu = document.getElementById('menu');
            menu.style.color = 'red';
    }
    let closingX = document.getElementById('closingX').addEventListener('click', closeMenuBar);
    
    
    /*------------------ CLOSING HAMBURGER ------------------ */
    
    let goToItems = () =>{
    
    
    let menuBars = document.getElementById('colapsible');
            menuBars.style.left = '-335px';
        let menu = document.getElementById('menu');
            menu.style.color = 'red';
            toggleMenuBar  =!toggleMenuBar; 
    }
    let menuItems = document.getElementsByClassName('menu');

    for(let item of menuItems){
        item.addEventListener('click', goToItems)
    }
    
    
    
    
    /* --------------------------     Menu Bar Ends     ------------------------------------- */
    
    
    
    
    
    
    
    
    
    /* --------------------------     Shopping Cart     ------------------------------------- */
    
    /* --------------- shopping Cart colors -------------------------------- */
    
    

    let itemNumberValue = () =>{

        let totalCartItemNumber = 0;

        for(let i = 0; i<localStorage.length; i++){


            let currentObjectTable = JSON.parse(localStorage.getItem(localStorage.key(i)));

            totalCartItemNumber += currentObjectTable.Qty
            let itemNumber = document.getElementById('itemNumber');
            itemNumber.innerHTML = totalCartItemNumber;

                    }
    
    }
    
    itemNumberValue();
    
    
    let itemNumberColor = () =>{
    
        let itemNumber = document.getElementById('itemNumber');
        let cart = document.getElementById('cart');
        if(itemNumber.innerText!=='0'){
            cart.style.color = 'black'
            itemNumber.style.color = 'orange'
            cart.addEventListener('mouseenter', ()=>{cart.style.color = 'white'})
            cart.addEventListener('mouseleave', ()=>{cart.style.color = 'black'})
        }else{
            itemNumber.style.color = 'white'
            cart.style.color = 'white'
    
        }
    
    }
    
    itemNumberColor();
    
    
    
    
    /* ------------ OPENING CART ----------------- */
    
    let toggleCart = 0;
    
    let slidingCart = () =>{
        toggleCart  =!toggleCart;
        if(toggleCart){
            let shoppingCart = document.getElementById('shoppingCart');
            shoppingCart.style.right = '0px'; 
            let cart = document.getElementById('cart');
            cart.style.color = 'white'
        }else{
            let shoppingCart = document.getElementById('shoppingCart');
            shoppingCart.style.right = '-335px';
            let cart = document.getElementById('cart');
            cart.style.color = 'black';
        }
    
    
    }
    
    let cart = document.getElementById('cart').addEventListener('click', slidingCart);
    
                let closeCart = () =>{
                    let shoppingCart = document.getElementById('shoppingCart');
                    shoppingCart.style.right = '-335px';
                        toggleCart  =!toggleCart;
                        itemNumberColor();
                        
                }
    
    
    let closingXcart = document.getElementById('closingXcart').addEventListener('click', closeCart);
    
    
    /* ------------------------     Shopping Cart Ends     ----------------------------------- */
    
    /*--------------------------- BODY ------------------------------------------------------- */
    
                let hideIntro = () =>{
                    let introDiv = document.getElementById('intro');
                    introDiv.style.visibility = 'hidden';
                }
    
    
    let startingBtn = document.getElementById('startBtn').addEventListener('click', hideIntro);
