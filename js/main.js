
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

        console.log(randomArt)

        document.querySelector('h2').innerText = randomArt.title;
        
        // Find the base IIIF Image API endpoint in the config.iiif_url field
        let endPoint = data.config.iiif_url;

        // Append the image_id of the artwork as a segment to this URL
        // need a forward slash preceding imageID because the endPoint doesn't end with one
        let imageID = randomArt.image_id;
        console.log(imageID)

        // Append /full/843,/0/default.jpg to the URL
        let imageSrc = `/full/843,/0/default.jpg`;

        document.querySelector('img').src = `${endPoint}/${imageID}${imageSrc}`;
        // forward slash manually added

        const card = document.getElementById('card');
        card.classList.add('card');

      })
      .catch(err => {
          console.log(`error ${err}`)
      });
}