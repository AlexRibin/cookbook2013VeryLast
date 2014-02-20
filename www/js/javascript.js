
var currPageIndex = 0;

$(document).ready(function () {
    //$('.appV').html('v1.17');
    //onDocumentReady();
   
    setMenu();
    toggleMenu();
});

function onDocumentReady() {

    SetPagesList();
    setBackground();
    runPinchzoom();
    turnPages(currPageIndex);
    setPep();
    changeSize();
    setZIndex();
    setTimeout("setImgList();", 500);
}
function setImgList() {
    var imgList = [  
  'images/smallTop.png',
  'images/middle.png',
  'images/smallBottom.png',
  'images/largeTop.png',
  'images/largeBottom.png',
  'images/menu_cats.png',
  'images/menu_recipes.png'
    ];
    var imgListLength = imgList.length;
    for (var i = 0; i < recipesList.length; i++) {
        imgList[i + 8] = "images/RecipesImages/" + recipesList[i].image;
    }

    preload(imgList);

}
function preload(arrayOfImages) {
    for (var i = 0; i < arrayOfImages.length; i++) {
        setTimeout("$('<img />').attr('src', '"+arrayOfImages[i]+"').appendTo('body').css('display', 'none');", 200);
    }

    //$(arrayOfImages).each(function () {
    //});
}

function setPep() {

    $('.ingredientsDiv, .directionsDiv, .text').pep({
        useCSSTranslation: false,
        constrainTo: 'parent',
        place: false
    });
}

function setBackground() {
    var picturesArray = new Array();
    for (var i = 0; i < categoriesList.length; i++) {
        picturesArray[i] = categoriesList[i].background;
    }

    $('BODY').bgStretcher({
        images: picturesArray,
        imageWidth: 2000,
        imageHeight: 1200,
        slideShowSpeed: 1500,
        anchoring: 'center top',
        anchoringImg: 'center top',
        slideShow: false,
        transitionEffect: 'simpleSlide',
        slideDirection: 'W',
        sequenceMode: 'normal',
        buttonNext: '.next',
        buttonPrev: '.back',
    });
}


function chkIfIE9() {
    if (isIE9()) {
        $('.ingredientsDiv, .directionsDiv, .imgDiv').addClass('hide');
    }
    else {
        setTimeout(" $('.ingredientsDiv, .directionsDiv, .imgDiv').removeClass('hide');", 1000);
    }
}

function isIE9() {
    var myNav = navigator.userAgent.toLowerCase();
    //alert(myNav);
    return (myNav.indexOf('msie 9') != -1);
}
function setZIndex() {
    $('.ingredientsDiv, .directionsDiv, .imgDiv').click(function () {
        $('.ingredientsDiv, .directionsDiv, .imgDiv').removeClass('zIndex2');
        $(this).addClass('zIndex2');
    });
}

var isChangingSize = false;
function changeSize() {
    $('.ingredientsDiv, .directionsDiv').click(function () {
        if (!isChangingSize) {
            if ($(this).hasClass('bigSize')) {
                $(this).removeClass('bigSize');
                isChangingSize = true;
            }
            else {
                $(this).addClass('bigSize');
                isChangingSize = true;
            }
            setTimeout("isChangingSize = false;", 200);
        }
    });
}
function runPinchzoom() {
    if (!Hammer.HAS_TOUCHEVENTS && !Hammer.HAS_POINTEREVENTS) {
        Hammer.plugins.fakeMultitouch();
    }

    var pinchzoom = $('.pinchzoom').each(function () {
        var hammertime = Hammer($(this).get(0), {
            transform_always_block: true,
            transform_min_scale: 1,
            drag_block_horizontal: true,
            drag_block_vertical: true,
            drag_min_distance: 0
        });

        var rect = $(this).find('.rect').get(0);

        var posX = 0, posY = 0,
            scale = 1, last_scale,
            rotation = 1, last_rotation;

        hammertime.on('touch drag transform', function (ev) {
            switch (ev.type) {
                case 'touch':
                    last_scale = scale;
                    last_rotation = rotation;
                    break;

                case 'drag':
                    posX = ev.gesture.deltaX;
                    posY = ev.gesture.deltaY;
                    break;

                case 'transform':
                    rotation = last_rotation + ev.gesture.rotation;
                    scale = Math.max(1, Math.min(last_scale * ev.gesture.scale, 2));
                    break;
            }

            if (rotation == 1)
                rotation = 0;

            // transform!
            var transform =
                    //"translate3d(" + posX + "px," + posY + "px, 0) " +
                    "scale3d(" + scale + "," + scale + ", 1) " +
                    "rotate(" + rotation + "deg) ";

            rect.style.transform = transform;
            rect.style.oTransform = transform;
            rect.style.msTransform = transform;
            rect.style.mozTransform = transform;
            rect.style.webkitTransform = transform;
            rect.style.msTransform = transform;
        });
    });
}

// Category class:
function category(id, name, background, header_bg) {
    this.id = id;
    this.name = name;
    this.background = background;
    this.header_bg = header_bg;
    this.type = 'category';
}
// Recipe class:
function recipe(cat_id, name, header_bg, description1, description2, image, pdf) {
    this.cat_id = cat_id;
    this.name = name;
    this.header_bg = header_bg;
    this.description1 = description1;
    this.description2 = description2;
    this.image = image;
    this.pdf = pdf;
    this.type = 'recipe';

}
var categoriesList = new Array();
categoriesList[0] = new category(0, "Main", 'images/bg_main.jpg', '');
categoriesList[1] = new category(1, "Intro", 'images/bg_intro.jpg', '');
categoriesList[2] = new category(10, "Alex & Cathy's Recipes", 'images/bg_owners.jpg', '');
categoriesList[3] = new category(2, "Appetizers", 'images/bg_appetizers.jpg', 'images/cat_appetizers.png');
categoriesList[4] = new category(3, "Main dishes", 'images/bg_main_dishes.jpg', 'images/cat_mainDishes.png');
categoriesList[5] = new category(4, "Desserts", 'images/bg_desserts.jpg', 'images/cat_desserts.png');
categoriesList[6] = new category(5, "Breakfast", 'images/bg_breakfast.jpg', 'images/cat_breakfast.png');
categoriesList[7] = new category(6, "Drinks", 'images/bg_drinks.jpg', 'images/cat_drinks.png');
categoriesList[8] = new category(7, "Sides", 'images/bg_sides.jpg', 'images/cat_sides.png');
categoriesList[9] = new category(8, "Thank You", 'images/bg_thank_you.jpg', '');
//categoriesList[8] = new category(8, "SoupAndBeans", 'images/bg_soup_and_beans.jpg', 'images/cat_soupsAndBeans.png');

var recipesList = new Array();
var pagesList = new Array();
function SetPagesList() {

    var catID;
    var index = 0;
    for (var i = 0; i < categoriesList.length; i++) {
        catID = categoriesList[i].id;
        if (catID != 10) {
            pagesList[index] = categoriesList[i];
            index++;
        }
        for (var j = 0; j < recipesList.length; j++) {
            if (recipesList[j].cat_id == catID) {
                pagesList[index] = recipesList[j];
                index++;
            }
        }
    }
}

var isPageInMove = false;
function turnPages(moveToIndex) {
    if (!isPageInMove && moveToIndex < pagesList.length) {
        isPageInMove = true;

        $('.bigSize').removeClass('bigSize');
        $('BODY').bgStretcher.pause();
        moveToPage = pagesList[moveToIndex];
        //alert(moveToPage.name);

        if (findCurrBackgroundIndex(pagesList[currPageIndex]) != findCurrBackgroundIndex(pagesList[moveToIndex])) {
            //if (moveToIndex != 0) {
            var slideNumber = findCurrBackgroundIndex(pagesList[moveToIndex]);
            $('BODY').bgStretcher.slideShow(null, slideNumber);
            //if (currPageIndex < moveToIndex) {
            //    $('.next').click();
            //}
            //else {
            //    $('.back').click();
            //}


            //}
        }


        if (moveToPage.type == 'category') {
            //hide the elements - FOR IE9:
            chkIfIE9();
            ////////////////////////////

            hideElelnent();
            if (pagesList[moveToIndex].header_bg == "") {
                $('.categoryHeaderDiv').hide(0)
            }
            else {
                //$('.headerDiv').hide();
                $('.categoryHeaderDiv').fadeIn()
                $('.categoryHeaderDiv img').attr({ 'src': pagesList[moveToIndex].header_bg, 'alt': pagesList[moveToIndex].name });
                $('.categoryHeaderDiv').removeClass('categoryHeaderDivOut');
            }

            $('#container').show(1000);
        }
        else {
            //show the elements - FOR IE9:
            setTimeout(" $('.ingredientsDiv, .directionsDiv, .imgDiv').removeClass('hide');", 1000);
            ////////////////////////////

            hideElelnent();
            $('#container').fadeOut();
            setTimeout(function () {
                setCurrRecipe(pagesList[moveToIndex]);

                $('.ingredientsDiv, .directionsDiv').each(function () {
                    //alert($(this).css('transition-property'));
                    $(this).removeClass('textOut');
                    $(this).css('transition-duration', Math.random() / 2 + .5 + 's');
                    $('.imgDiv').hide();
                    $('.imgDiv img').load(function () {
                        $('.imgDiv').show();
                        setTimeout("$('.imgDiv').removeClass('imgOut');", 10);
                    });
                    $('.imgDiv').css('transition-duration', Math.random() / 2 + .5 + 's');

                    $('.headerDiv').removeClass('headerOut headerScale');
                    $('.headerDiv').show();

                    $('.headerDiv').css('transition-duration', Math.random() / 2 + .5 + 's');
                });

            }, 1000);
        }

        currPageIndex = moveToIndex;

        setTimeout("isPageInMove = false;", 1000);

        if (moveToIndex == 0)
            $('.arrowBack').fadeOut(1000);
        else if ($('.arrowBack').css('display') == 'none')
            $('.arrowBack').fadeIn(1000);

        if (moveToIndex == pagesList.length - 1)
            $('.arrowNext').fadeOut(1000);
        else if ($('.arrowNext').css('display') == 'none')
            $('.arrowNext').fadeIn(1000);
    }
}

function findCurrBackgroundIndex(currPage) {
    var backgroungIndex = 0;
    if (currPage.type == 'category') {
        for (var i = 0; i < categoriesList.length; i++) {
            if (categoriesList[i].id == currPage.id) {
                backgroungIndex = i;
            }
        }
    }
    else {
        for (var i = 0; i < categoriesList.length; i++) {
            if (categoriesList[i].id == currPage.cat_id) {
                backgroungIndex = i;
            }
        }
    }

    return backgroungIndex;
}

function hideElelnent() {
    $('.ingredientsDiv, .directionsDiv').each(function () {
        $(this).addClass('textOut');
        $(this).css('transition-duration', Math.random() / 2 + .5 + 's');
    });
    $('.imgDiv').addClass('imgOut');
    $('.imgDiv').css('transition-duration', Math.random() / 2 + .5 + 's');

    $('.headerDiv').addClass('headerOut');
    $('.categoryHeaderDiv').addClass('categoryHeaderDivOut');
    setTimeout(function () {
        $('.headerDiv').addClass('headerScale');
    }, 300);
    $('.headerDiv').css('transition-duration', Math.random() / 2 + .2 + 's');
}

function setCurrRecipe(currRecipe) {
    $('.ingredientsDiv, .directionsDiv, .imgDiv').css('transition-property', 'none');

    $('.headerDiv img').attr({ 'src': currRecipe.header_bg, 'alt': currRecipe.name });
    $('.ingredientsDiv_middle p').html(currRecipe.description1);
    $('.directionsDiv_middle p').html(currRecipe.description2);
    
	// $('.printer').attr('href', '/pdf/' + currRecipe.pdf);
	$('.printer').attr('href', '#');
	$('.printer').attr('onclick', "window.open('" + currRecipe.pdf+ "', '_blank', 'location=no');");

    if (currRecipe.image == null || currRecipe.image == "") {
        $('.imgDiv').hide(0);
    }
    else {
        $('.imgDiv img').attr({ 'src': 'images/RecipesImages/' + currRecipe.image, 'alt': currRecipe.name });
        $('.imgDiv').show(0);
    }

    //$('.ingredientsDiv').css("height", "");
    //$('.directionsDiv').css("height", "");
    $('.ingredientsDiv, .directionsDiv, .imgDiv').each(function () {
        $(this).css("width", "");
        $(this).css("height", "");

        $(this).find('div').each(function () {
            $(this).css("width", "")
            $(this).css("height", "")
        });

        //alert(fontSize * currScale);
        //$('.ingredientsDiv_middle p, .directionsDiv_middle p').css('font-size', fontSize * currScale + 'px');

    });


    //alert($('.ingredientsDiv').height());
    setElementSize(1);

    $('.ingredientsDiv, .directionsDiv, .imgDiv').css('transition-property', 'all');

}
function setElementSize(currScale) {

    var ingredientsDivTop = 220 * (1 - ((1 - currScale) / 2));

    $('.ingredientsDiv').css({ 'top': ingredientsDivTop + 'px', 'left': '80px' });
    //$('.ingredientsDiv_middle').height($('.ingredientsDiv_middle p').outerHeight(true));
    //$('.directionsDiv_middle').height($('.directionsDiv_middle p').outerHeight(true));
    $('.directionsDiv').css({ 'top': ((ingredientsDivTop + $('.ingredientsDiv').height()) + 50) * currScale + 'px', 'left': '80px' });
    $('.imgDiv').css({ 'top': (ingredientsDivTop + 50) * currScale + 'px', 'left': '600px' });

    //alert($('.ingredientsDiv_middle p').outerHeight(true));
    //alert($('.ingredientsDiv_middle').height());

    //setTimeout("setElementSizeInner(" + currScale + ");", 1200);
    setElementSizeInner(currScale);

    //alert($('directionsDiv').height());
}

function setElementSizeInner(currScale) {
    var ingredientsDivTop = 220 * (1 - ((1 - currScale) / 2));
    var fontSize = 15;
    var directionsDivButtom = ingredientsDivTop + ($('.ingredientsDiv').height() + 50 + $('.directionsDiv').height()) * currScale;

    //alert($(window).height() + " " + directionsDivButtom + " " + $('.directionsDiv').height());

    var callAgain = false;
    if (($(window).height() * 0.90) < directionsDivButtom) {
        currScale *= 0.9;
        callAgain = true;
        setElementSizeInner(currScale);

    }

        //}
    else {

        //$('.ingredientsDiv_middle').height($('.ingredientsDiv_middle p').outerHeight(true));
        //$('.directionsDiv_middle').height($('.directionsDiv_middle p').outerHeight(true));



        //alert(ingredientsDivTop + " " + ($('.ingredientsDiv').height()) * currScale  + " " + $('.directionsDiv').css('top'));

        //$('.ingredientsDiv, .directionsDiv').css('transition-property', 'transform');

        $('.imgDiv').width(500 * currScale);
        $('.imgFrame').css('background-size', $('.imgDiv').width() + 'px ' + $('.imgDiv').height() + 'px');


        $('.ingredientsDiv, .directionsDiv').each(function () {
            var halfTheScale = 1 - ((1 - currScale) / 2);
            $(this).width($(this).width() * halfTheScale);
            $(this).height($(this).height() * currScale);

            $(this).find('div').each(function () {
                $(this).width($(this).width() * halfTheScale);
                //$(this).height($(this).height() * currScale);
                //alert($(this).width() + " " + $(this).height());
                $(this).css('background-size', $(this).width() + 'px ' + $(this).height() + 'px');
            });
            //$('.imgDiv img').width($(this).width());

            $('.ingredientsDiv_middle p, .directionsDiv_middle p').css('font-size', fontSize * currScale + 'px');

        });


        var originalMarginLeft = 80;
        var totalMarginLeft;

        if (600 + $('.imgDiv').width() < $(window).width()) {
            totalMarginLeft = ($(window).width() - (600 + $('.imgDiv').width())) / 2 + 20;
        }
        else {
            totalMarginLeft = 20;
        }


        var imgLeftPosition = (-totalMarginLeft * 2 + $(window).width() - $('.imgDiv').width());


        $('.ingredientsDiv').css({ 'top': ingredientsDivTop + 'px', 'left': totalMarginLeft + 'px' });
        $('.directionsDiv').css({ 'top': ingredientsDivTop + $('.ingredientsDiv').height() + 70 + 'px', 'left': totalMarginLeft + 'px' });
        $('.imgDiv').css({ 'left': totalMarginLeft + imgLeftPosition + 'px' });


        //if (callAgain)
        //    setElementSizeInner(currScale);



    }
}

function setMenu() {
    for (var i = 0; i < categoriesList.length; i++) {
        $('<li><a href="#"><span></span></a></li>').appendTo('.menu_cats');
        for (var j = 0; j < recipesList.length; j++) {
            if (recipesList[j].cat_id == categoriesList[i].id) {
                $('<li><a href="#"><span></span></a></li>').appendTo('.menu_recipe');
            }
        }
    }

    $('.menu_cats > li').each(function () {
        if (categoriesList[$(this).index()].id != 1) {
            $(this).find('span').text((categoriesList[$(this).index()].name).toUpperCase());
        }
        if ($(this).find('span').html() == "") {
            $(this).hide();
        }
    });

    $('.menu_cats > li > a').click(function () {

        var catID;

        $('.menu_recipe li').remove();

        for (var i = 0; i < categoriesList.length; i++) {
            //alert($(this).find('span').html() +' '+ categoriesList[i].name.toUpperCase());
            if ($(this).find('span').html().replace("&amp;", "&") == categoriesList[i].name.toUpperCase()) {

                catID = categoriesList[i].id;

                if (catID == 0 || catID == 8) {
                    $('.menu_recipe').slideUp();
                }
                else {
                    $('.menu_recipe').slideDown();
                }
            }
        }
        if (catID == 0) {
            turnPages(0);
            hideMenu();

        }
        else if (catID == 8) {
            turnPages(51);
            hideMenu();
        }
        else {
            var currCatRecipesList = new Array;
            var index = 0;
            for (var j = 0; j < pagesList.length; j++) {

                if (pagesList[j].type == 'recipe' && pagesList[j].cat_id == catID) {
                    $('<li onclick="turnPages(' + j + ');"><span onclick="hideMenu();">' + pagesList[j].name + '</span></li>').appendTo('.menu_recipe');
                    currCatRecipesList[index] = pagesList[j];
                    index++;
                }
            }
        }
    });
}

function toggleMenu() {
    $('.btnMenu').click(function () {
        $('.menu_cats').slideToggle();
        $('.menu_recipe').slideUp();
    });
}
function hideMenu() {
    $('.menu_cats, .menu_recipe').slideUp();
}