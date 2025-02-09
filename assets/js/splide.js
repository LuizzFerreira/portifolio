document.addEventListener("DOMContentLoaded", function () { //executa o js depois de todo o HTML carregado
    for (var x of document.querySelectorAll(".splide.about-container")) {
      var splide = new Splide(x, {
        perPage: 1,
        type: 'loop',
        pagination: true,
        arrows: false,
        autoplay: true,
	gap: 22,
	interval: 7000,
      });
      splide.mount();
    }
  });

  document.addEventListener("DOMContentLoaded", function () { //executa o js depois de todo o HTML carregado
    for (var x of document.querySelectorAll(".splide.recommendations-container")) {
      var splide = new Splide(x, {
        perPage: 1,
        type: 'rewind',
        pagination: true,
        arrows: true,
        autoplay: true,
			  gap: 22,
			  interval: 7000,
        breakpoints: {
          769: { arrows: false },
      },
      });
      splide.mount();
    }
  });
