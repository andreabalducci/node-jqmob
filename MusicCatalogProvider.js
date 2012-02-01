var albumCounter = 1;

MusicCatalogProvider = function(){};
MusicCatalogProvider.prototype.inMemoryCatalog = [];

MusicCatalogProvider.prototype.findAll = function(callback) {
    callback( null, this.inMemoryCatalog )
};

MusicCatalogProvider.prototype.findById = function(id, callback) {
    var result = null;
    for(var i =0;i<this.inMemoryCatalog.length;i++) {
        if( this.inMemoryCatalog[i]._id == id ) {
            result = this.inMemoryCatalog[i];
            break;
        }
    }
    callback(null, result);
};

MusicCatalogProvider.prototype.save = function(albums, callback) {
    var article = null;

    if( typeof(albums.length)=="undefined")
        albums = [albums];

    for( var i =0;i< albums.length;i++ ) {
        article = albums[i];
        article._id = albumCounter++;

        if( article.tracks === undefined )
            article.tracks = [];

        this.inMemoryCatalog[this.inMemoryCatalog.length]= article;
    }
    callback(null, albums);
};

new MusicCatalogProvider().save([
    {title: 'My first album', artist: 'My band',
        tracks:[
            {number: 1, title:'Track 1', lenght:'03:30'},
            {number: 2, title:'Track 2', lenght:'03:45'}
        ]
    },
    {title: 'My second album', artist: 'My brother'},
    {title: 'Unreleased', artist: 'unknown'}
], function(error, albums){});

exports.MusicCatalogProvider = MusicCatalogProvider;