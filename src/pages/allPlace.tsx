import { useEffect } from 'react';
import '../styles/Card.css'; // Import custom styles
import '../styles/allplace.css'; // Import custom styles

const AllPlace: React.FC = () => {
  useEffect(() => {
    const totalCards = 14;
    const cardsPerSlide = 4;
    const totalSlides = Math.ceil(totalCards / cardsPerSlide);
    const showAll = document.getElementById('showall');

    for (let i = 0; i < totalSlides; i++) {
      const slide = document.createElement('div');
      slide.className = 'slide active allcardplace flex gap-4'; // Using Tailwind classes
      showAll?.appendChild(slide);
    }

    for (
      let i = 0;
      i < Math.ceil(totalCards / cardsPerSlide) * cardsPerSlide;
      i++
    ) {
      const card = document.createElement('a');
      card.className =
        'card bg-white rounded-lg shadow-md w-72 text-center transition duration-600 ease-in-out'; // Using Tailwind classes

      let a = i;
      if (a >= totalCards) {
        a = totalCards - 1;
        card.style.opacity = '0.0';
      }

      const img = document.createElement('img');
      img.src = '/image.png'; // Ensure this path is correct in your public folder
      img.alt = 'Card Image';
      card.appendChild(img);

      const name = document.createElement('h2');
      name.textContent = `Name ${a}`; // Adjust as needed
      name.className =
        'text-left overflow-hidden text-ellipsis line-clamp-1 pl-2'; // Using Tailwind classes
      card.appendChild(name);

      const descrip = document.createElement('p');
      descrip.textContent =
        'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Id, ex temporibus vitae eligendi porro optio amet vel ut magnam eum!';
      descrip.className = 'text-left overflow-hidden line-clamp-4 pl-2'; // Using Tailwind classes
      card.appendChild(descrip);

      const slideIndex = Math.floor(i / cardsPerSlide);
      showAll?.querySelectorAll('.slide')[slideIndex].appendChild(card);
    }
  }, []);

  return (
    <div className="allPlace absolute left-0 top-0 flex flex-col p-12">
      <button
        id="backtohome"
        onClick={() => window.history.back()}
        className="border-none bg-transparent outline-none"
      >
        &lt; Back to home
      </button>
      <h1 id="province" className="text-xl font-bold">
        Province
      </h1>
      <p>There are ... places found</p>
      <div id="showall" className="flex flex-col gap-2"></div>
    </div>
  );
};

export default AllPlace;
