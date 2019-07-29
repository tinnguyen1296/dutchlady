AOS.init();
var swiper_hompage = new Swiper('.slider-homepage', {
    spaceBetween: 30,
    effect: 'fade',
    pagination: {
        el: '.pag-banner',
        clickable: true,
    },
    autoplay: {
        delay: 4000,
    },
    speed: 500,
    parallax: true,
    autoplayDisableOnInteraction: true,
});

var swiper_news = new Swiper('.slider-news', {
    slidesPerView: 2,
    spaceBetween: 30,
    navigation: {
        nextEl: '.news-button-next',
        prevEl: '.news-button-prev',
    },
    breakpoints: {
        640: {
            slidesPerView: 1,
            spaceBetween: 20,
        },
        320: {
            slidesPerView: 1,
        }
    }
});

var swiper_news_block2 = new Swiper('.slider-news-block-2', {
    slidesPerView: 4,
    spaceBetween: 30,
    navigation: {
        nextEl: '.news-button-next',
        prevEl: '.news-button-prev',
    },
    breakpoints: {
        768: {
            slidesPerView: 1,
            spaceBetween: 20,
        }
    }
});

var swiper_news_more = new Swiper('.slider-news-more', {
    direction: 'vertical',
    slidesPerView: 'auto',
    freeMode: true,
    scrollbar: {
        el: '.swiper-scrollbar',
    },
    mousewheel: true,
});

var swiper_product = new Swiper('.swiper-product', {
    slidesPerView: 4,
    spaceBetween: 20,
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },
    // autoplay: {
    //     delay: 4000,
    //     DisableOnInteraction: false
    // },
    // parallax: true,
    breakpoints: {
        1024: {
            slidesPerView: 3,
            spaceBetween: 40,
        },
        768: {
            slidesPerView: 2,
            spaceBetween: 30,
        },
        640: {
            slidesPerView: 1,
            spaceBetween: 20,
        },
        320: {
            slidesPerView: 1,
            spaceBetween: 10,
        }
    }
});

const videoThumbs = new Swiper('.youtube-thumbs', {
    spaceBetween: 10,
    slidesPerView: 3,
    // loop: true,
    // freeMode: true,
    // loopedSlides: 5, //looped slides should be the same
    watchSlidesVisibility: true,
    watchSlidesProgress: true,
});
const videoImages = new Swiper('.youtube-image', {
    spaceBetween: 10,
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },
    touchRatio: 0,
    thumbs: {
        swiper: videoThumbs,
    },
});

(function ($, Drupal, drupalSettings) {

    //TODO:: Implement Home Page
    var width = $(window).width();

    var li1 = $('ul.navbar-nav > li:eq(0) > a').addClass('right-border');
    var li2 = $('ul.navbar-nav > li:eq(1) > a').addClass('right-border');
    var li3 = $('ul.navbar-nav > li:eq(4) > a').addClass('right-border');

    if(width < 1275) {
        li1.removeClass('right-border');
        li2.removeClass('right-border');
        li3.removeClass('right-border');
    } else {
        li1.addClass('right-border');
        li2.addClass('right-border');
        li3.addClass('right-border');
    }



    //TODO:: Implement Product Page

    if(drupalSettings.variations) {
        var variations = JSON.parse(drupalSettings.variations);
    }
    // console.log(variations);
    const renderImageFunc = (arr, key, index) => {
        if(arr.length === 1 || key === 'thumb') {
            const img = document.createElement('img');
            img.classList.add('product-img', 'img-fluid');
            img.setAttribute('src', arr[0]);
            return img;
        } else {
            const divContainer = document.createElement('div');
            const divWrapper = document.createElement('div');
            divContainer.classList.add('swiper-container', 'swiper-container-child');
            divWrapper.classList.add('swiper-wrapper');
            arr.forEach( item => {
                const slide = document.createElement('div');
                slide.classList.add('swiper-slide');

                const img = document.createElement('img');
                img.classList.add('product-img', 'img-fluid');
                img.setAttribute('src', item);
                slide.appendChild(img);
                divWrapper.appendChild(slide);
            });

            divContainer.appendChild(divWrapper);
            return divContainer;
        }
    };
    function renderImage(variations) {
        // if(variations.length > 0) {

            const render_image = document.getElementById('container-product-images');
            const render_thumb = document.getElementById('container-product-thumbnails');

            const images = key => {
                const divWrapper = document.createElement('div');
                divWrapper.classList.add('swiper-wrapper');
                if(key === 'thumb') {
                    divWrapper.setAttribute('id', 'product-thumbnails');
                } else {
                    divWrapper.setAttribute('id', 'product-images');
                }

                variations.forEach( (item, index) => {
                    const divSlide = document.createElement('div');
                    divSlide.classList.add('swiper-slide', 'swiper-slide-parent', 'text-center');
                    divSlide.setAttribute('data-id', index);
                    divSlide.appendChild(renderImageFunc(item.image, key));
                    divWrapper.appendChild(divSlide);
                });
                return divWrapper;
            };

            const renderOneImg = () => {
                const divWrapper = document.createElement('div');
                divWrapper.classList.add('text-center');
                divWrapper.appendChild(renderImageFunc(variations[0].image));
                return divWrapper;
                // const img = document.createElement('img');
                // img.setAttribute('src', ));
            };

            if(variations.length === 1) {
                const render_once_image = document.getElementById('container-product-images-once-image');
                render_once_image.appendChild(renderOneImg());
            } else {
                render_image.appendChild(images('image'));
                render_thumb.appendChild(images('thumb'));
            }


            const galleryThumbs = new Swiper('.container-product-thumbnails', {
                spaceBetween: 30,
                slidesPerView: 4,
                // centeredSlides: false,
                // freeMode: true,
                // watchSlidesVisibility: true,
                // watchSlidesProgress: true,
                // breakpoints: {
                //     768: {
                //         slidesPerView: 4,
                //         spaceBetween: 30,
                //     }
                // }
            });
            const galleryImage = new Swiper('.container-product-images', {
                spaceBetween: 10,
                centeredSlides: true,
                // effect: 'fade',
                touchRatio: 0,
                navigation: {
                    nextEl: '.swiper-button-next',
                    prevEl: '.swiper-button-prev',
                },
                thumbs: {
                    swiper: galleryThumbs
                },
            });
            galleryImage.on('slideChangeTransitionEnd', () => {
                if(variations.length > 0) {
                    const wrapper_image = document.querySelector('#product-images');
                    const img_active = wrapper_image.querySelector('.swiper-slide-active.swiper-slide-parent');
                    const key = img_active.dataset.id;

                    renderData(variations[key]);
                }
            });

    }

    function renderData(object) {
        // console.log(obj);
        if(typeof object === 'object') {
            const { title, image_detail, information_other, information, profiles, capacities} = object;

            //Render title
            if(title.length > 0) {

                let render_title = document.getElementsByClassName('product-title');
                // console.log(typeof render_title);
                for(let ele of render_title) {
                    ele.innerText = title;
                }
            }


            //Render image detail
            if(image_detail.length > 0) {
                const render_image_detail = document.getElementById('image-detail');
                render_image_detail.innerHTML = '';
                render_image_detail.appendChild(renderImageFunc(image_detail, 'image'));
                var slideChild = new Swiper('.swiper-container-child', {
                    slidesPerView: 1,
                    effect: 'fade',
                    autoplay: {
                        delay: 3500,
                    },
                    speed: 1000,
                    parallax: true,
                    autoplayDisableOnInteraction: false
                });
            }


            //Render content right
            if(information_other.length > 0) {
                const content_right = document.getElementById('content-detail');
                content_right.innerHTML = '';
                information_other.forEach( item => {
                    const divWrapper = document.createElement('div');
                    const img = document.createElement('img');
                    const divImg = document.createElement('div');
                    const divImgWrapper = document.createElement('div');
                    const divContent = document.createElement('div');
                    divImgWrapper.classList.add('d-flex', 'justify-content-end');
                    img.setAttribute('src', item.image);
                    img.classList.add('img-fluid');
                    divContent.innerHTML = item.content;
                    divContent.classList.add('wrapper-content');

                    divImg.appendChild(img);
                    divImgWrapper.appendChild(divImg);
                    divWrapper.appendChild(divImgWrapper);
                    divWrapper.appendChild(divContent);

                    content_right.appendChild(divWrapper);
                })

            }

            //Render capacity
            const render_capacities = document.querySelectorAll('.product-capacities');
            if(capacities.length > 0) {
                render_capacities.forEach( item => item.parentElement.parentElement.classList.remove('hidden'));
                const imageWrapper = document.querySelectorAll('.image-capacities');
                // console.log(render_capacities);
                render_capacities.forEach( node => {
                    node.innerHTML = capacities.map( item => {
                        return item.value;
                    }).join(', ');
                });

                imageWrapper.forEach( node => {
                    node.innerHTML = '';
                    capacities.map( item => {
                        if(item.hasOwnProperty('image') && item['image'].length > 0) {
                            const divWrapper = document.createElement('div');
                            const img = document.createElement('img');
                            const label = document.createElement('span');
                            divWrapper.classList.add('d-flex', 'flex-column', 'align-items-center');
                            img.setAttribute('src', item.image);
                            // img.classList.add('img-fluid');
                            // img.style.maxHeight = "80%";
                            label.innerHTML = item.value;
                            divWrapper.appendChild(img);
                            divWrapper.appendChild(label);
                            node.appendChild(divWrapper);
                        }
                    });
                });
            } else {
                render_capacities.forEach( item => item.parentElement.parentElement.classList.add('hidden'));
            }


            //Render profile
            const render_profile = document.getElementById('product-public-profile');
            render_profile.querySelector('.row').innerHTML = '';
            if(profiles.length > 0) {
                const template = document.getElementById('product-public-profile-template');

                profiles.forEach( profile => {
                    let col = template.querySelector('.template-content').cloneNode(true);
                    col.querySelector('.doc-title').innerHTML = `<h6> ${profile.description} </h6> `;
                    col.querySelector('.btn-download').setAttribute('href', profile.url);
                    render_profile.querySelector('.row').appendChild(col);
                });
            }

            //Render information
            // console.log('info', information.length);
            if(typeof information === 'object' && information.length !== 0) {
                const key_information = Object.keys(information);
                const render_info = (obj, k) => {
                    let arr = obj;
                    if(k !== 0) {
                        arr = obj[k];
                    }

                    return arr.map( item =>
                        `<li><span>${item.key}</span> <span>${item.value}</span></li>`
                    )
                };

                // Order location
                let best_nutrient = '';
                const chat_khoang_parent_class = document.getElementById('chat_khoang').parentElement.classList;
                const vitamin_parent_class = document.getElementById('vitamin').parentElement.classList;
                const arrClassCol = ['list-col', 'col-md-3', 'order-md-1'];
                const arrClassRow = ['list-row', 'col-md-8', 'order-md-2', 'offset-md-1'];
                if(information['chat_khoang'].length > information['vitamin'].length) {

                    key_information.splice(key_information.indexOf('chat_khoang'), 1);
                    best_nutrient = 'chat_khoang';
                    chat_khoang_parent_class.add(...arrClassRow);
                    chat_khoang_parent_class.remove(...arrClassCol);
                    vitamin_parent_class.add(...arrClassCol);
                    vitamin_parent_class.remove(...arrClassRow);

                } else {

                    key_information.splice(key_information.indexOf('vitamin'), 1);
                    best_nutrient = 'vitamin';
                    vitamin_parent_class.add(...arrClassRow);
                    vitamin_parent_class.remove(...arrClassCol);
                    chat_khoang_parent_class.add(...arrClassCol);
                    chat_khoang_parent_class.remove(...arrClassRow);
                }

                if(best_nutrient.length > 0) {
                    const bestArr = information[best_nutrient];
                    const arr1 = bestArr.slice(0, Math.ceil(bestArr.length/2));
                    const arr2 = bestArr.slice(Math.ceil(bestArr.length/2));

                    const count = document.querySelector('.count_' + best_nutrient);
                    const list = document.getElementById(best_nutrient);
                    const ul1 = document.createElement('ul');
                    const ul2 = document.createElement('ul');

                    count.innerHTML = information[best_nutrient].length;
                    ul1.innerHTML = render_info(arr1, 0).join('');
                    ul2.innerHTML = render_info(arr2, 0).join('');
                    list.innerHTML = '';
                    list.appendChild(ul1);
                    list.appendChild(ul2);
                }

                key_information.forEach( k => {

                    const count = document.querySelector('.count_' + k);
                    const list = document.getElementById(k);
                    const ul = document.createElement('ul');

                    if(count)
                        count.innerHTML = information[k].length;
                    if(list)
                        list.innerHTML = '';
                    ul.innerHTML = render_info(information,k).join('');
                    list.appendChild(ul);
                });
            } else {
                const btnInformation = document.querySelector('.wrapper-tab').firstElementChild;
                btnInformation.classList.add('hidden');
            }

        }
    }

    if(variations) {
        renderData(variations[0]);
        renderImage(variations);

    }


    // //TODO:: Implement Dairy Nutrition tab
    const nutrition_page = document.getElementById('dairy-nutrtion-page');
    if(nutrition_page) {
        const tabs_nutritrion = Array.from(nutrition_page.querySelector('.nutrition-tab').querySelectorAll('.tab-child'));
        const templates_nutrition = Array.from(nutrition_page.querySelectorAll('.template'));

        changeTabs(nutrition_page, tabs_nutritrion, templates_nutrition, false);
    }

    //TODO:: Implement Product tab
    const product_tab = document.getElementById('product-tab-title');
    if(product_tab) {
        const tabs_title = Array.from(product_tab.querySelector('.wrapper-tab').querySelectorAll('.tab-child'));
        const wrapper_content = document.getElementById('product-tab-content');
        const tabs_content = Array.from(wrapper_content.querySelectorAll('.template'));

        changeTabs(wrapper_content, tabs_title, tabs_content);
    }

    //TODO:: Tab change function
    function changeTabs(wrapper, tabs, templates, isClose = true) {
        for(let tab of tabs) {
            tab.addEventListener('click', function() {
                const template = wrapper.querySelector('#' + tab.dataset.id);

                if(this.classList.contains('active'))
                {
                    if(isClose)
                    {
                        this.classList.remove('active');
                        template.classList.add('hidden');
                    }
                    return;
                }

                _handleClassesTab(tabs, this, 'active');
                _handleClassesTab(templates, template, 'hidden', false);

            });
        }
    }

    const _handleClassesTab = (els, cur, classname, isTab = true) => {

        for(let val of els) {
            if(isTab && val === cur) {
                val.classList.add(classname);
                continue;
            }
            if(!isTab && val !== cur) {
                val.classList.add(classname);
                continue;
            }

            val.classList.remove(classname);
        }
    };

})(jQuery, Drupal, drupalSettings);
