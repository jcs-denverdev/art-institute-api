
// enable button and attach event listener to initiate function
let button = document.querySelector('button');
button.addEventListener('click', getArt);


function getArt() {
  // Art Institute of Chicago API
  fetch('https://api.artic.edu/api/v1/artworks?fields=id,image_id,title,artist_display/page=1&limit=50')
      .then(res => res.json()) // parse response as JSON
      .then(data => {
        console.log(data)

        let randomArt = data.data[Math.floor(Math.random() * data.data.length)];
        document.querySelector('h2').innerText = randomArt.title;
        
        let endPoint = data.config.iiif_url;
        let imageID = randomArt.image_id;
        let imageSrc = `/full/200,/0/default.jpg`;

        document.querySelector('img').src = `${endPoint}/${imageID}${imageSrc}`;

        const card = document.getElementById('card');
        card.classList.add('card');

      })
      .catch(err => {
          console.log(`error ${err}`)
      });
}
