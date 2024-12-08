const form = document.getElementById('form');
const search = document.getElementById('search');
const result = document.getElementById('result');
const more = document.getElementById('more');

const apiURL = 'https://api.lyrics.ovh';

// Get Lyrics For Song

const getLyrice = async function (artist, songTitle) {
  const res = await fetch(`${apiURL}/v1/${artist}/${songTitle}`);
  const data = await res.json();
  const lyrics = data.lyrics.replace(/\r\n|\r|\n/g, '<br>');

  result.innerHTML = `<h2><strong>${artist}</strong> - ${songTitle}
  </h2>
  <span>${lyrics}</span>
  `;

  more.innerHTML = '';
};

// Get Prev And Next Songs

const getMoreSongs = async function (url) {
  // let rgx = /http/gi;
  // url = url.replace(rgx, 'https');
  const res = await fetch(`https://cors-anywhere.herokuapp.com/${url}`);
  const data = await res.json();

  showData(data);
};

// Show Song And Artist In DOM

const showData = function (data) {
  let output = '';

  data.data.forEach((song) => {
    output += `
    <li>
    <span>
    <strong>${song.artist.name}</strong> - ${song.title}
    </span>
    <button class="btn" data-artist="${song.artist.name}"
    data-songtitle="${song.title}">Get Lyrics</button>
    </li>
    `;
  });

  result.innerHTML = `
  <ul class="songs">
  ${output}
  </ul>
  `;

  if (data.prev || data.next) {
    more.innerHTML = `
      ${
        data.prev
          ? `<button class="btn" onclick="getMoreSongs('${data.prev}')">Prev</button>`
          : ''
      }
      ${
        data.next
          ? `<button class="btn" onclick="getMoreSongs('${data.next}')">Next</button>`
          : ''
      }
    `;
  } else {
    more.innerHTML = '';
  }
};

// Search By Song Or Artist

const searchSongs = async function (term) {
  const res = await fetch(`${apiURL}/suggest/${term}`);
  const data = await res.json();

  showData(data);
};

// Event Listeners
form.addEventListener('submit', (e) => {
  e.preventDefault();

  const searchTerm = search.value.trim();

  if (!searchTerm) {
    alert('Search term is Empty!');
  } else {
    searchSongs(searchTerm);
  }
});

// Get Lyrics Button Click
result.addEventListener('click', (e) => {
  const clickedEl = e.target;

  if (clickedEl.tagName === 'BUTTON') {
    const artist = clickedEl.getAttribute('data-artist');
    const songTitle = clickedEl.getAttribute('data-songtitle');

    getLyrice(artist, songTitle);
  }
});
