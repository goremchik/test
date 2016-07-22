function Hero() {
    this.smallDisplay = 768;

    this.changeHero = function() {
        if (window.innerWidth <= this.smallDisplay) {
            var button = document.getElementsByClassName('hero-button')[0];
            var width = window.innerWidth - 120;
            button.style.width = width + 'px';
        }
    };
}
