var Palapa = Palapa || {};

Palapa.BaseLayer = (function(){
    var _baseLayers = {
        OSM_Std: new ol.layer.Tile({
            source  : new ol.source.OSM()
        }),
    };
    var self = {
        initialize: function() {
        	_base = $('#eksplor-peta');
        	if(_base.length){
                self.addBaseLayers();
        	}
        },
        getBaseLayers: function(){
            return _baseLayers;
        },
        addBaseLayers: function(){
            Palapa.Peta.addBaseLayer({
                id    : 'OSM_Std',
                title : 'OSM Standard',
                thumb : 'assets/img/base-rbi.png',
                layer : _baseLayers.OSM_Std
            });

            // set default
            Palapa.Peta.setActiveBaseLayer($('#OSM_Std'));
        },
    };
    return self;
})();


// Palapa.Global.register( Palapa.BaseLayer.initialize );
