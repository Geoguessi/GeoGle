export const initializeGeoGle = () => {
  const cardcontainer = document.getElementById('cardcontainer');
  const footer = document.getElementById('footer');
  const searchIcon = document.querySelector('.search-icon');
  const headContainer = document.querySelector('.headcontainer') as HTMLElement;
  const seemore = document.getElementById('seemore');

  console.log('script loaded!');

  searchIcon?.addEventListener('click', (e) => {
    e.preventDefault();
    if (cardcontainer) cardcontainer.innerHTML = '';
    const head = [
      'สถานที่แนะนำของจังหวัด {Prompt}',
      'ร้านอาหาร และคาเฟ่ในจังหวัด {Prompt}',
      'ที่เที่ยวของจังหวัด {Prompt}',
    ];

    for (let i = 0; i < 3; i++) {
      const groupPlace = document.createElement('div');
      groupPlace.className = 'groupplace';

      const heading = document.createElement('h2');
      heading.className = 'head';
      heading.textContent = `${head[i]}`;
      groupPlace.appendChild(heading);

      const cardHead = document.createElement('div');
      cardHead.className = 'cardhead';

      const leftCard = document.createElement('a');
      leftCard.href = '#';
      leftCard.className = 'more-cards';
      leftCard.id = `leftcard${i}`;
      leftCard.textContent = ' < ';
      leftCard.addEventListener('click', function (event) {
        event.preventDefault();
        moveSlide(i, -1);
      });
      cardHead.appendChild(leftCard);

      const showRecommended = document.createElement('div');
      showRecommended.className = 'showcard';
      showRecommended.id = `showrecommended${i}`;
      cardHead.appendChild(showRecommended);

      const rightCard = document.createElement('a');
      rightCard.href = '#';
      rightCard.className = 'more-cards';
      rightCard.id = `rightcard${i}`;
      rightCard.textContent = ' > ';
      rightCard.addEventListener('click', function (event) {
        event.preventDefault();
        moveSlide(i, 1);
      });
      cardHead.appendChild(rightCard);

      groupPlace.appendChild(cardHead);

      if (cardcontainer) cardcontainer.appendChild(groupPlace);
    }

    for (let t = 0; t < 3; t++) {
      const container = document.getElementById(`showrecommended${t}`);

      const totalCards = 14;
      const cardsPerSlide = 3;
      const totalSlides = Math.ceil(totalCards / cardsPerSlide);

      for (let i = 0; i < totalSlides; i++) {
        const slide = document.createElement('div');
        slide.className = 'slide';
        container?.appendChild(slide);
      }

      for (let i = 0; i < Math.ceil(totalCards / 3) * 3; i++) {
        const card = document.createElement('a');
        card.className = 'card';
        let a = i;
        if (a >= totalCards) {
          a = totalCards - 1;
          card.style.opacity = '0.0';
        }

        const img = document.createElement('img');
        img.src = '/image.png';
        img.alt = 'Card Image';
        card.appendChild(img);

        const name = document.createElement('h2');
        name.textContent = `Name ${a}`;
        card.appendChild(name);

        const descrip = document.createElement('p');
        descrip.textContent =
          'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Id, ex temporibus vitae eligendi porro optio amet vel ut magnam eum!';
        card.appendChild(descrip);

        const slideIndex = Math.floor(i / cardsPerSlide);
        container?.querySelectorAll('.slide')[slideIndex].appendChild(card);
      }

      if (cardcontainer) cardcontainer.style.display = 'block';
      if (footer) footer.style.display = 'block';
      if (seemore) seemore.style.display = 'flex';
      if (headContainer) headContainer.style.height = '60vh';

      renderSlides(t);
    }
  });

  seemore?.addEventListener('click', () => {
    window.location.href = 'allPlace';
  });
};

let currentSlide = 1;

const renderSlides = (t: number) => {
  const slides = document.querySelectorAll(`#showrecommended${t} .slide`);

  slides.forEach((slide) => {
    (slide as HTMLElement).style.display = 'none';
    slide.classList.remove('active');
  });

  (slides[currentSlide - 1] as HTMLElement).style.display = 'flex';
  slides[currentSlide - 1].classList.add('active');
};

const moveSlide = (row: number, direction: number) => {
  const slides = document.querySelectorAll(`#showrecommended${row} .slide`);

  currentSlide += direction;

  if (currentSlide < 1) currentSlide = 1;
  if (currentSlide > slides.length) currentSlide = slides.length;

  renderSlides(row);
};
