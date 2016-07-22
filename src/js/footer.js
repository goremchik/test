
/**
 * Wraps an object and returns a {@link Sequence}. For `null` or `undefined`,
 * simply returns an empty sequence (see {@link Lazy.strict} for a stricter
 * implementation).
 *
 * - For **arrays**, Lazy will create a sequence comprising the elements in
 *   the array (an {@link ArrayLikeSequence}).
 * - For **objects**, Lazy will create a sequence of key/value pairs
 *   (an {@link ObjectLikeSequence}).
 * - For **strings**, Lazy will create a sequence of characters (a
 *   {@link StringLikeSequence}).
 *
 * @public
 * @param {Array|Object|string} source An array, object, or string to wrap.
 * @returns {Sequence} The wrapped lazy object.
 *
 *
 * @examples
 * Lazy([1, 2, 4])       // instanceof Lazy.ArrayLikeSequence
 * Lazy({ foo: "bar" })  // instanceof Lazy.ObjectLikeSequence
 * Lazy("hello, world!") // instanceof Lazy.StringLikeSequence
 * Lazy()                // sequence: []
 * Lazy(null)            // sequence: []
 */

function Footer(changePart, title) {
    this.elements = [];
    this.smallDisplay = 768;
    this.changePart = document.getElementById(changePart);
    Main.call(this);
    var titles = document.getElementsByClassName(title);
    console.log(titles);
    for (var i = 0; i < titles.length; i++) {
        var element = {
            hide: true,
            title: titles[i].getAttribute('title'),
            column: titles[i].getAttribute('column'),
            links: this.getLinks(titles[i].getElementsByTagName('a'))
        };
        this.elements.push(element);
    }  //    console.log(this.elements);
}

Footer.prototype.getLinks = function (elements) {
    var arr = [];
    for (var i = 0; i < elements.length; i++) {
        var obj = {
            name: elements[i].innerText,
            url: elements[i].getAttribute('href')
        };
        arr.push(obj);
    }
    return arr;
};

Footer.prototype.createFooter = function () {
    if (window.innerWidth >= this.smallDisplay) {
        this.createBig();
    } else {
        this.createSmall();
    }
};
Footer.prototype.createSmall = function () {
    var html = '';
    for (var i = 0; i < this.elements.length; i++) {
        html += '<div class="link-block underline"><h5 class="link-title" idd="' + i + '" onclick="footer.dropdown(this)">' + this.elements[i].title;
        html += '<div class="plus-link">+</div></h5><div class="can-hide' + (this.elements[i].hide ? ' hide' : '') + '">';
        html += this.drawlinksBlock(this.elements[i].links);
        html += '</div></div>';
    }
    this.changePart.innerHTML = html;
};
Footer.prototype.createBig = function () {
    var html = '';
    var column = 0;
    for (var i = 0; i < this.elements.length; i++) {
        if (column != this.elements[i].column) {
            column = this.elements[i].column;
            html += '<div class="footer-column">';
        }
        html += '<div class="link-block"><h5 class="link-title">' + this.elements[i].title + '</h5>';
        html += this.drawlinksBlock(this.elements[i].links);
        html += '</div>';
        if (i + 1 === this.elements.length) {
            html += '</div>';
        } else if (column != this.elements[i + 1].column) {
            html += '</div>';
        }
    }
    this.changePart.innerHTML = html;
};
Footer.prototype.drawlinksBlock = function (links) {
    var html = '';
    for (var i = 0; i < links.length; i++) {
        html += '<div class="column-links"><a class="footer-links" href="' + links[i].url + '"><div class="wide-link">' + links[i].name + '</div></a></div>';
    }
    return html;
};
Footer.prototype.dropdown = function (element) {
    var plus = element.getElementsByClassName('plus-link')[0];
    var id = element.getAttribute('idd');
    this.elements[id].hide = !this.elements[id].hide;
    var canHide = element.parentNode.getElementsByClassName('can-hide')[0];
    if (!this.elements[id].hide) {
        plus.style.transform = 'rotate(45deg)';
        canHide.classList.remove('hide');
    } else {
        plus.style.transform = 'rotate(0deg)';
        //        $(element.parentNode).animate({heigh: '0px'}, 900, function () {
        canHide.classList.add('hide');  //        });
    }
};
