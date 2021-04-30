const form = document.querySelector('#searchForm');


form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const searchText = form.elements.query.value;

    const config = { params: { q: searchText } };
  
    const url = `http://api.tvmaze.com/search/shows`;

    const res = await axios.get(url, config);
    
    console.log(res.data);

    console.log(res.data.length)
 
    for (let data of res.data) {
        const img = document.createElement('img');
        
        if (data.show.image) { 
        img.src = data.show.image.medium;
        document.body.append(img);
        }
    }

    
});

