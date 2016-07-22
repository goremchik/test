function Main() {
    this.isMobile = window.innerWidth <= this.smallDisplay ? true : false;
    this.getMobile = function () {
        var boolAns = window.innerWidth > this.smallDisplay && this.isMobile || window.innerWidth <= this.smallDisplay && !this.isMobile;
        this.isMobile = window.innerWidth <= this.smallDisplay ? true : false;
        return boolAns;
    };
    this.checkMobile = function () {
        this.isMobile = window.innerWidth <= this.smallDisplay ? true : false;
    };
}
var footer = new Footer('footer-change-part', 'footer-title');
footer.createFooter('footer-change-part');
var invision = new Invision();
var hero = new Hero();
var menu = new Navigation('menu', 'navigation', 'mobile-menu-block');
menu.createMenu();
window.onresize = function () {
    //    this.isMobile = window.innerWidth <= this.smallDisplay ? true : false;
    if (footer.getMobile()) {
        footer.createFooter('footer-change-part');
    }
    if (menu.getMobile()) {
        menu.createMenu();
    }
    menu.showSmallSearch = window.innerWidth <= menu.mediumDisplay ? true : false;
    if (menu.showSmallSearch && menu.search) {
        $(menu.NormSearch).blur();
        menu.head.style.height = '123px';
    } else {
        $(menu.mobileSearch).blur();
        menu.head.style.height = '48px';
    }
    console.log('d');
    menu.checkMenuHeight();
    hero.changeHero();
};
