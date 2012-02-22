var contatoreEventi = 1;



EventiProvider = function () {
};
EventiProvider.prototype.inMemoryCatalog = [];

EventiProvider.prototype.findAll = function (callback) {
    callback(null, this.inMemoryCatalog)
};

EventiProvider.prototype.findById = function (id, callback) {
    var result = null;
    for (var i = 0; i < this.inMemoryCatalog.length; i++) {
        if (this.inMemoryCatalog[i]._id == id) {
            result = this.inMemoryCatalog[i];
            break;
        }
    }
    callback(null, result);
};

EventiProvider.prototype.save = function (eventi, callback) {
    var evento = null;

    if (typeof(eventi.length) == "undefined")
        eventi = [eventi];

    for (var i = 0; i < eventi.length; i++) {
        evento = eventi[i];
        evento._id = contatoreEventi++;
        this.inMemoryCatalog[this.inMemoryCatalog.length] = evento;
    }
    callback(null, eventi);
};

new EventiProvider().save([
    {title:'Sviluppo di applicazioni con jQueryMobile', location:'sala a'},
    {title:'Phonegap', location:'sala b'},
    {title:'MongoDB', location: 'sala a'}
], function (error, eventi) {
});

exports.EventiProvider = EventiProvider;