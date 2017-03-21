export default function slider () {
  var flkty = new Flickity( '.about__slider', {
    prevNextButtons: false,
    cellSelector: '.about__slider-item',
    wrapAround: true
  });
}
