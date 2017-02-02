var Palapa = Palapa || {};

Palapa.Peta = (function(){
    var _baseFilter;
    var _baseIndex;
    var _baseLayers;
    var _base;
    var _map;
    var _layerCollection;
    var _layers = [];
    var _baseLayers = [];
    var _toolbar = [];
    var _view;
    var _identifyActive = false;

    var self = {
        initialize: function() {
            _base = $('#eksplor-peta');
            if(_base.length){
                self.setupResize();

                window.onresize = self.setupResize;
                // self.setupMap();
            }
            _baseIndex = $('#peta');
            if(_baseIndex.length){
                self.setupMapIndex();
            }
            _baseFilter = $('#filter-extent');
            if(_baseFilter.length){
                self.setupMapFilter();
                self.setupMapTypeFilter();
            }
        },
        setupMapTypeFilter: function(){
            $('.filter-content').on('click', '.selection a', function(e){
                var parent = $(this).parent();
                e.preventDefault();
                parent.toggleClass('checked');
                $( $(this).data('target') ).val( parent.hasClass('checked') );
            });
            $('#filter-submit').click(function(e){
                e.preventDefault();
                $(this).closest('form').submit();
            });
        },
        setupMapFilter: function(){
            var zoom     = Number($('#filter_center_zoom').val())
            var center_x = Number($('#filter_center_x').val())
            var center_y = Number($('#filter_center_y').val())

            _view = new ol.View({
              center: ol.proj.transform([center_x, center_y], 'EPSG:4326', 'EPSG:3857'),
              zoom: zoom
            });

            _map = new ol.Map({
                target       : 'filter-extent',
                layers       : [],
                view         : _view,
                interactions : ol.interaction.defaults({ mouseWheelZoom: true })
            });
            _map.addLayer(new ol.layer.Tile({
                visible : true,
                source  : new ol.source.OSM()
            }));

            _map.on('moveend', self.handleMoveEndFilter);
        },
        handleMoveEndFilter: function(e){
            var map        = e.map;
            var view       = map.getView();
            var extent     = map.getView().calculateExtent(map.getSize());
            var bottomLeft = ol.proj.transform(ol.extent.getBottomLeft(extent), 'EPSG:3857', 'EPSG:4326');
            var topRight   = ol.proj.transform(ol.extent.getTopRight(extent), 'EPSG:3857', 'EPSG:4326');

            $('#filter_min_x').val( self.wrapLon(bottomLeft[0]) );
            $('#filter_min_y').val( bottomLeft[1] );
            $('#filter_max_x').val( self.wrapLon(topRight[0]) );
            $('#filter_max_y').val( topRight[1] );

            var center = ol.proj.transform(view.getCenter(), 'EPSG:3857', 'EPSG:4326');

            $('#filter_center_zoom').val( view.getZoom() );
            $('#filter_center_x').val( center[0] );
            $('#filter_center_y').val( center[1] );
        },
        wrapLon: function(value) {
            var worlds = Math.floor((value + 180) / 360);
            return value - (worlds * 360);
        },
        setupMapIndex: function(){
            /* Setup Map */
            _view = new ol.View({
              center: ol.proj.transform([118, -2], 'EPSG:4326', 'EPSG:3857'),
              zoom: 5
            });

            _map = new ol.Map({
                target       : 'peta',
                layers       : [],
                view         : _view,
                interactions : ol.interaction.defaults({ mouseWheelZoom: true })
            });

            self.setHomeMapActive($('.list-galeri > ul > li:first-child'));
            $('.list-galeri > ul').on('click', 'li > a', self.handleMapIndexClick);
        },
        handleMapIndexClick: function(e){
            e.preventDefault();
            var li = $(this).parent();
            self.setHomeMapActive(li);
        },
        setHomeMapActive: function(li){
            // clear layer
            $('.list-galeri .current').removeClass('current');
            var x = _map.getLayers();
            x.clear();

            // add base layer
            _map.addLayer(new ol.layer.Tile({
                visible : true,
                source  : new ol.source.OSM()
            }));

            var extent = li.data('extent');
            var layer = li.data('layer');

            $.each(layer, function(){
                var info = this;
                _map.addLayer( new ol.layer.Image({
                    source: new ol.source.ImageWMS({
                        url    : info.url,
                        params : {'LAYERS': info.layer}
                    })
                }));
            });

            _view.fitExtent(ol.proj.transformExtent(extent, 'EPSG:4326', 'EPSG:3857'), _map.getSize());

            li.addClass('current');
        },
        setupResize: function(){
            // var headerHeight = 118+50;
            // if($('.page-title').length){
            //     headerHeight += $('.page-title').outerHeight();
            // }
            var headerHeight = $('.navbar').outerHeight(true);
            var footerHeight = $('.footer-below').outerHeight(true);
            var heights = window.innerHeight - (headerHeight + footerHeight);
            _base.height(heights);
        },
        setupMap: function(){
            /* Setup HTML */
            self.setupToolbarNav();

            /* Setup Map */
            _view = new ol.View({
              center: ol.proj.transform([118, -2], 'EPSG:4326', 'EPSG:3857'),
              zoom: 5
            });
            _map = new ol.Map({
                target       : 'area-peta',
                layers       : [],
                view         : _view,
                interactions : ol.interaction.defaults({ mouseWheelZoom: true })
            });

            _layerCollection = _map.getLayers();

            // setup measure
            Palapa.Measure.initialize(_map);

            Palapa.BaseLayer.initialize();

        },
        setupToolbarNav: function(){
            _toolbar.el = $('#toolbar');
            _toolbar.el.on('click','> ul > li > a', self.handleToolbarNavClick);

            _toolbar.elBaseLayer = $('.list-peta-dasar');

            // base layer
            _toolbar.templateBaseLayer = Handlebars.compile( $("#base-template").html() );
            _toolbar.elBaseLayer.on('click', '>li', self.handleBaselayerClick);

            // setup layer
            _toolbar.templateLayer = Handlebars.compile( $("#layer-template").html() );
            _toolbar.elLayer = _toolbar.el.find('#list-layer');
            _toolbar.elLayer.on('click', '.ico-checkmark', self.handleCheckmarkClick);
            _toolbar.elLayer.on('click', '.ico-info', self.handleInfoClick);
            _toolbar.elLayer.on('mouseenter', '.ico-remove', self.handleRemoveMousein);
            _toolbar.elLayer.on('mouseout', '.ico-remove', self.handleRemoveMouseout);
            _toolbar.elLayer.on('click', '.ico-remove', self.handleRemoveClick);

            // sortable layers
            _toolbar.elLayer.sortable({
                revert: true,
                handle: ".ico-drag",
                stop: self.handleSortingStop
            });

            _toolbar.elLayer.disableSelection();

            // identify
            _toolbar.templateInfo = Handlebars.compile( $("#info-template").html() );
            // $('#nav-identify').on('click', '> a', self.handleIdentify);

        },
        handleIdentify: function(){
            // activate
            if( $('#toolbar-identify').hasClass('active') ){
                self.activateIdentify();
            }else{
                self.deactivateIdentify();
            }
        },
        activateIdentify: function(){
            _map.on('singleclick', function(evt) {
                $('#identify_result').empty();
                var viewResolution = /** @type {number} */ (_view.getResolution());
                _toolbar.elLayer.find('li.info-active').each(function(){
                    var elLayer = $(this);
                    var layer = $(this).data('layer');
                    var source = layer.getSource();
                    var url = source.getGetFeatureInfoUrl(
                        evt.coordinate,
                        viewResolution,
                        'EPSG:3857',
                        {'INFO_FORMAT': 'application/json'}
                    );
                    $.getJSON(_baseURL+'/proxy?url='+escape(url), function(data){
                        var dataFormatted = [];
                        if(data.features[0]){
                            $.each(data.features[0].properties, function(index, value){
                                dataFormatted.push(index+': '+value);
                            });
                            var baseHTML = _toolbar.templateInfo({
                                title: elLayer.find('.layer-name').text(),
                                data: dataFormatted
                            });
                            $('#identify_result').append(baseHTML);
                        }
                    });
                });
            });
            _identifyActive = true;

        },
        deactivateIdentify: function(){
            if(_identifyActive){
                _identifyActive = false;
            }
        },
        handleSortingStop: function(){
            var index = 500;
            var items = _toolbar.elLayer.find('>li');
            for(i = items.length; i>0; i--){
                var el = items.eq(i-1);
                var layer = el.data('layer');
                _layerCollection.insertAt(index+i,layer);
            }
        },
        handleCheckmarkClick: function(){
            var layer = $(this).closest('li').data('layer');

            $(this).parent().toggleClass('active');
            if($(this).parent().hasClass('active')){
                layer.setVisible(true);
            }else{
                layer.setVisible(false);
            }
        },
        handleInfoClick: function(){
            $(this).parent().toggleClass('active');
            var li = $(this).closest('li');
            if($(this).parent().hasClass('active')){
                li.addClass('info-active')
            }else{
                li.removeClass('info-active')
            }
        },
        handleRemoveMousein: function(){
            $(this).parent().addClass('active');
        },
        handleRemoveMouseout: function(){
            $(this).parent().removeClass('active');
        },
        handleRemoveClick: function(){
            var layer = $(this).closest('li').data('layer');
            var layerId = $(this).closest('li').attr('id');

            delete _layers[layerId];
            layer.setVisible(false);
            _map.removeLayer(layer);
            $(this).closest('li').remove();
        },
        handleToolbarNavClick: function(e){
            e.preventDefault();
            var that = $(this);
            if(that.parent().hasClass('active')){
                that.parent().removeClass('active');
            }else{
                _toolbar.el.find('> ul > li.active').removeClass('active');
                that.parent().addClass('active');
            }
            self.handleIdentify();
        },
        addBaseLayer: function(oLayer){
            _map.addLayer(oLayer.layer);
            // var id = 'layer_' + new Date().getTime();

            // add to view
            // base layer
            var baseHTML = _toolbar.templateBaseLayer({
                id    : oLayer.id,
                title : oLayer.title,
                thumb : oLayer.thumb
            });
            _toolbar.elBaseLayer.append(baseHTML);
            _baseLayers[oLayer.id] = oLayer;

            self.setActiveBaseLayer($('#' + oLayer.id));
        },
        handleBaselayerClick: function(){
            self.setActiveBaseLayer($(this));
        },
        setActiveBaseLayer: function(el){
            if(el.hasClass('active')){
                return false;
            }

            // reset currently selected layer
            var selected = _toolbar.elBaseLayer.find('.selected');
            if(selected.length){
                selected.each(function(){
                    var that = $(this);
                    that.removeClass('selected');
                    _baseLayers[that.attr('id')].layer.setVisible(false);
                });
            }

            el.addClass('selected');
            _baseLayers[el.attr('id')].layer.setVisible(true);
        },
        getBaseLayers: function(){
            return _baseLayers;
        },
        addLayer: function(oLayer){
            var layer;
            var baseHTML = _toolbar.templateLayer({
                id    : oLayer.id,
                title : oLayer.title
            });
            _toolbar.elLayer.prepend(baseHTML);
            var curEL = _toolbar.elLayer.find('#'+oLayer.id);

            switch(oLayer.type){
                case 'wms':
                    layer = new ol.layer.Image({
                        source: new ol.source.ImageWMS(oLayer.wms)
                    });
                    // get capabilities
                    var parser = new ol.format.WMSCapabilities();

                    // save legend url
                    var url = oLayer.wms.url + '?REQUEST=GetLegendGraphic&VERSION=1.0.0&FORMAT=image/png&WIDTH=20&HEIGHT=20&WIDTH=20&HEIGHT=20&LEGEND_OPTIONS=forceRule:True;dx:0.2;dy:0.2;mx:0.2;my:0.2;border:false;fontColor:333333;fontSize:12&LAYER=' + oLayer.wms.params.LAYERS;
                    curEL.data('legendURL', url);
                    break;
            }
            if(layer){
                _map.addLayer(layer);
                _layers[oLayer.id] = layer;
                curEL.data('layer', layer);
            }
        },
        getLayers: function(){
            console.info(_layers);
        }
    };
    return self;
})();

Palapa.Global.register( Palapa.Peta.initialize );
