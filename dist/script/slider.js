(function($) {

    $.fn.Slider = {
        className: null,
        currentElements: [],
        autoplay: 3000,
        autoplaySpeed: true,
        swipeAble: true,
        hidePreviosElement: function(element, sliderName, visibility) {
            visibility == 0 ? $(element).find(sliderName).hide() : $(element).find(sliderName).show();
        },

        isButtonVisible: function(parent, slidesVisibleNumber, length) {
            if (slidesVisibleNumber == 0) {
                this.hidePreviosElement(parent, '.slider-prev', 0);
                this.hidePreviosElement(parent, '.slider-next', 1);
            } else if (slidesVisibleNumber == (length - 1)) {
                this.hidePreviosElement(parent, '.slider-next', 0);
                this.hidePreviosElement(parent, '.slider-prev', 1);
            }
            else {
                this.hidePreviosElement(parent, '.slider-prev', 1);
                this.hidePreviosElement(parent, '.slider-next', 1);
            }
        },

        init: function(className) {
            this.className = className;
            var scope = this;
            $(className).each(function(index, element) {
                $(element).attr("tag", index);
                var description = $(element).find(".offer__item-description");
                var footer = $(element).find(".pagination_slider-block");
                $(description).each(function(num, el) {
                    $(el).attr("tag", num);
                    if(num !== 0) {
                        $(el).hide();
                    } 
                    $(footer).append('<input type="radio" id="radio-slider-' + num +'" name="slider-1" class="slider__radio"><label for="radio-slider-' + num +'"tag="' + num + '" class="slider__radio-label" onclick="$.fn.Slider.onItemClick(this);"></label>')
                });
                scope.currentElements[index] = 0;
                scope.hidePreviosElement(element, '.slider-prev', 0);
            });
            $(className).find(".slider__radio-label[tag='0']").css('background', 'rgba(0,0,0,.7)');
            
        },

        onItemClick: function(element) {
            var tag = $(element).attr("tag");
            var parent = $(element).closest('.offer__item-content');
            var description = $(parent).find(".offer__item-description");
            var parentTag = $(parent).attr("tag");
            var elementClassName = $(element).attr('class');
            $(parent).find(".offer__item-description").hide();
            $(parent).find(".offer__item-description[tag='" + tag + "']").show();
            this.currentElements[parentTag] = tag;
            $(parent).find('.' + elementClassName).css('background', 'rgba(0,0,0,.3)');
            $(element).css('background', 'rgba(0,0,0,.7)');
            this.isButtonVisible(parent, tag, description.length);
        },

        onNextItemClick: function(element) {
            var parent = $(element).closest('.offer__item-content');
            var description = $(parent).find(".offer__item-description");
            var index = parent.attr("tag");
            var slidesVisibleNumber = this.currentElements[index];
            slidesVisibleNumber++;
            $(parent).find(".offer__item-description").hide();
            $(parent).find(".offer__item-description[tag='" + slidesVisibleNumber + "']").show();
            this.currentElements[index] = slidesVisibleNumber;
            $(parent).find(".slider__radio-label").css('background', 'rgba(0,0,0,.3)');
            $(parent).find(".slider__radio-label[tag='" + slidesVisibleNumber + "']").css('background', 'rgba(0,0,0,.7)');
            this.isButtonVisible(parent, slidesVisibleNumber, description.length);
        },

        onPervItemClick: function(element) {
            var parent = $(element).closest('.offer__item-content');
            var description = $(parent).find(".offer__item-description");
            var index = parent.attr("tag");
            var slidesVisibleNumber = this.currentElements[index];
            slidesVisibleNumber--;
            $(parent).find(".offer__item-description").hide();
            $(parent).find(".offer__item-description[tag='" + slidesVisibleNumber + "']").show();
            this.currentElements[index] = slidesVisibleNumber;
            $(parent).find(".slider__radio-label").css('background', 'rgba(0,0,0,.3)');
            $(parent).find(".slider__radio-label[tag='" + slidesVisibleNumber + "']").css('background', 'rgba(0,0,0,.7)');
            this.isButtonVisible(parent, slidesVisibleNumber, description.length);
        },

        autoPlay: function() {
            if(!this.autoplaySpeed) {
                return;
            } 

            var scope = this;
            $(this.className).each(function(index, element) {
                var description = $(element).find(".offer__item-description");
                slidesToScrollNumber = (scope.currentElements[index] + 1);
                slidesToScrollNumber = slidesToScrollNumber > description.length - 1 ? 0 : slidesToScrollNumber;
                $(element).find(".offer__item-description").hide();
                $(element).find(".offer__item-description[tag='" + slidesToScrollNumber + "']").show();
                scope.currentElements[index] = slidesToScrollNumber;
                $(element).find(".slider__radio-label").css('background', 'rgba(0,0,0,.3)');
                $(element).find(".slider__radio-label[tag='" + slidesToScrollNumber + "']").css('background', 'rgba(0,0,0,.7)');
                scope.isButtonVisible(element, slidesToScrollNumber, description.length);
            });
        }
    };    
    $.fn.Slider.init('.offer__item-content');

})(jQuery);