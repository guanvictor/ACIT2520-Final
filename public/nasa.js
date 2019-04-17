const axios = require('axios');



var get_gallery = (image) => {
    return new Promise(async (resolve, reject) => {
        try {
            let image_gallery = [];

            const gallery = await axios.get(`https://images-api.nasa.gov/search?q=${image}`);

            for (i in gallery.data.collection.items){
                pictures = gallery.data.collection.items[i].links[0].href;
                image_gallery.push(pictures);
            }

            console.log(image_gallery);
            resolve(image_gallery)
        } catch (e) {


            reject(e);
        }
    })
};

module.exports = {
    get_gallery
};
