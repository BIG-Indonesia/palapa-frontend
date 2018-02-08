var Palapa = Palapa || {};

Palapa.PetaV2 = (function(){
    var _base,
        _baseLayers,
        _toolbar = [],
        _inspector = [],
        _opacity = [],
        _map,
        _layers = [],
        _view,
        _defaultView = {},
        _legend = [],
        _source, _vector, _draw, _sketch,
        _identifyActive,
        _customLayerTextbox,
        _availableLayer,
        _usedLayer,
        _selectServer,
        _lokalLayer,
        _formData = {
            info     : null,
            extent   : {
                minx: null,
                miny: null,
                maxx: null,
                maxy: null
            },
            center   : null,
            layers    : {}
        };

    var self = {
        getScale: function(){
            var resolution = _view.getResolution();
            var units = _view.getProjection().getUnits();
            var dpi = 25.4 / 0.28;
            var mpu = ol.proj.METERS_PER_UNIT[units];
            var scale = resolution * mpu * 39.37 * dpi;
            return scale;
        },
        getView: function(){
            return _view;
        },
        getLayers: function(){
            return _layers;
        },
        initialize: function(){
            _base = $('#zmap');
            if(_base.length){
                self.setupMap();
                self.setupControl();
                self.setupInspector();
                self.setupToolbar();
                self.setupDefaultLayer();
                self.setupProxy();
            }
        },
        getFormData: function(){
            return _formData;
        },
        setupMap: function(){
            _base.append('<div id="area-peta" class="maparea"></div>');
            _defaultView = {
                center: ol.proj.transform([c_x, c_y], 'EPSG:4326', 'EPSG:3857'),
                zoom: c_zoom
            };

            _view = new ol.View(_defaultView);
            _map = new ol.Map({
                target       : 'area-peta',
                layers       : [],
                view         : _view,
                controls     : ol.control.defaults({ attribution: false, zoom: false }),
                interactions : ol.interaction.defaults({ mouseWheelZoom: true })
            });
            _map.on('moveend', self.handleMoveEnd);
        },
        handleMoveEnd: function(e){
            var map        = e.map;
            var view       = map.getView();
            var extent     = map.getView().calculateExtent(map.getSize());
            var bottomLeft = ol.proj.transform(ol.extent.getBottomLeft(extent), 'EPSG:3857', 'EPSG:4326');
            var topRight   = ol.proj.transform(ol.extent.getTopRight(extent), 'EPSG:3857', 'EPSG:4326');

            _formData.extent = {
                minx: self.wrapLon(bottomLeft[0]),
                miny: bottomLeft[1],
                maxx: self.wrapLon(topRight[0]),
                maxy: topRight[1]
            };

            _formData.center = ol.proj.transform(view.getCenter(), 'EPSG:3857', 'EPSG:4326');
            self.refreshLegend();
        },
        refreshLegend: function(){
            var currentScale = self.getScale();
            _inspector.el.find('#inspector-legend .flyout-content img').each(function(){
                var that = $(this);
                var src = that.data('url') + '&scale='+currentScale;
                this.src = src;
            });
        },
        wrapLon: function(value) {
            var worlds = Math.floor((value + 180) / 360);
            return value - (worlds * 360);
        },
        setupControl: function(){
            _base.append( Handlebars.templates['map-control'] );
            _base.find('.controller').on('click', 'a', self.handleControl);
        },
        handleControl: function(e){
            var zoomLevel,
                action = $(this).data('action');

            e.preventDefault();
            switch( action ){
                case 'zoom-in':
                    var zoom = ol.animation.zoom({
                        resolution: _map.getView().getResolution(),
                        easing: ol.easing.easeOut
                    });
                    _map.beforeRender(zoom);
                    _map.getView().setResolution(_map.getView().getResolution() / 1.5);
                    break;
                case 'zoom-out':
                    var zoom = ol.animation.zoom({
                        resolution: _map.getView().getResolution(),
                        easing: ol.easing.easeOut
                    });
                    _map.beforeRender(zoom);
                    _map.getView().setResolution(_map.getView().getResolution() * 1.5);
                    break;
                case 'full-extent':
                    var zoom = ol.animation.zoom({
                        resolution: _map.getView().getResolution(),
                        easing: ol.easing.easeOut
                    });
                    _map.beforeRender(zoom);
                    _view.setCenter(_defaultView.center, _map.getSize());
                    _view.setZoom(_defaultView.zoom);
                    break;
            }
        },
        setupInspector: function(){
            _base.append('<div class="inspector"><ul></ul></div>');
            _inspector.el = $('.inspector ul');
            _inspector.el.on('click','> li > a', self.handleInspectorNavClick);

            self.setupInspectorIdentify();
            self.setupInspectorUkur();
            self.setupInspectorLegend();
            self.setupInspectorOpacityControl();
        },
        setupInspectorIdentify: function(){
            _inspector.el.append( Handlebars.templates['map-inspector-identify'] );

            $('.inspector').on('click', ' > ul > li > a', function(e){
                if($(this).parent().attr('id') !== 'inspector-identify'){
                    self.deactivateIdentify();
                }else{
                    if($('#inspector-identify').hasClass('active')){
                        self.activateIdentify();
                    }else{
                        self.deactivateIdentify();
                    }
                }
            });
        },
        handleIdentify: function(evt) {
            $('#identification-result').empty();
            var viewResolution = /** @type {number} */ (_view.getResolution());
            $("#identification-result").html('<p>Loading..</p>');
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
                x = $.getJSON(url, function(data){
                    if( $("#identification-result").html() === '<p>Loading..</p>' ){
                        $("#identification-result").html('');
                    }
                    var dataFormatted = [];

                    if(data.features[0]){
                        $.each(data.features[0].properties, function(index, value){
                            dataFormatted.push({
                                name: index,
                                value: value
                            });
                        });

                        var baseHTML = Handlebars.templates['map-inspector-identify-result']({
                            title: elLayer.find('.layer-name').text(),
                            data: dataFormatted
                        });
                        $('#identification-result').append(baseHTML);
                    }
                });
            });
        },
        activateIdentify: function(){
            _map.on('singleclick', self.handleIdentify);
            _identifyActive = true;

        },
        deactivateIdentify: function(){
            if(_identifyActive){
                _identifyActive = false;
                _map.un('singleclick', self.handleIdentify);
            }
        },
        setupInspectorUkur: function(){
            _inspector.el.append( Handlebars.templates['map-inspector-ukur'] );

            _source = new ol.source.Vector();
            _vector = new ol.layer.Vector({
                source: _source,
                    style: new ol.style.Style({
                    fill: new ol.style.Fill({
                        color: 'rgba(255, 255, 255, 0.2)'
                    }),
                    stroke: new ol.style.Stroke({
                        color: '#ffcc33',
                        width: 2
                    }),
                    image: new ol.style.Circle({
                        radius: 7,
                        fill: new ol.style.Fill({
                            color: '#ffcc33'
                        })
                    })
                })
            });

            _map.addLayer(_vector);
            _layerCollection = _map.getLayers();

            $(_map.getViewport()).on('mousemove', self.handleMouseMove);
            $('.measure select.ukur-category').change(self.handleTypeChange);

            if($('#inspector-ukur').hasClass('active')){
                self.addUkurInteraction();
            }
            $('.inspector').on('click', ' > ul > li > a', function(e){
                if($(this).parent().attr('id') !== 'inspector-ukur'){
                    _source.clear();
                    _map.removeInteraction(_draw);
                }else{
                    if($('#inspector-ukur').hasClass('active')){
                        self.activateInspectorUkur();
                    }else{
                        _source.clear();
                        _map.removeInteraction(_draw);
                    }
                }
            });
        },
        activateInspectorUkur: function(){
            $('.measure-result .value').html('-');
            self.addUkurInteraction();
        },
        handleTypeChange: function(){
            self.updateType();
        },
        updateType: function(){
            _map.removeInteraction(_draw);
            self.addUkurInteraction();
        },
        handleMouseMove: function(evt){
            if (_sketch) {
                var output;
                var geom = (_sketch.getGeometry());
                if (geom instanceof ol.geom.Polygon) {
                    output = self.formatArea(/** @type {ol.geom.Polygon} */ (geom));
                } else if (geom instanceof ol.geom.LineString) {
                    output = self.formatLength( /** @type {ol.geom.LineString} */ (geom));
                }
                $('.measure-result .value').html(output);
            }
        },
        addUkurInteraction: function(){
            var type;
            if($('.measure select.ukur-category').val() === '1'){
                type = 'LineString';
            }else{
                type = 'Polygon';
            }
            _draw = new ol.interaction.Draw({
                source: _source,
                type: /** @type {ol.geom.GeometryType} */ (type)
            });

            _map.addInteraction(_draw);

            _draw.on('drawstart',function(evt) {
                _source.clear();

                _sketch = evt.feature;

            }, this);

            _draw.on('drawend', function(evt) {
                // unset _sketch
                _sketch = null;

                // _map.removeLayer(_vector);
                _layerCollection.insertAt(999,_vector);
            }, this);
        },
        setupInspectorLegend: function(){
            _inspector.el.append( Handlebars.templates['map-inspector-legend'] );
            // $.each(_legend, function(){
            //     self.addLegend(this);
            // });
        },

        /**
         * format length output
         * @param {ol.geom.LineString} line
         * @return {string}
         */
        formatLength: function(line) {
            var length = Math.round(line.getLength() * 100) / 100;
            var output;
            if (length > 100) {
                output = (Math.round(length / 1000 * 100) / 100) + ' ' + 'km';
            } else {
                output = (Math.round(length * 100) / 100) + ' ' + 'm';
            }
            return output;
        },

        /**
         * format length output
         * @param {ol.geom.Polygon} polygon
         * @return {string}
         */
        formatArea: function(polygon) {
            var area = polygon.getArea();
            var output;
            if (area > 10000) {
                output = (Math.round(area / 1000000 * 100) / 100) + ' ' + 'km<sup>2</sup>';
            } else {
                output = (Math.round(area * 100) / 100) + ' ' + 'm<sup>2</sup>';
            }
            return output;
        },
        addLegend: function(legend){
            var legendHTML = Handlebars.templates['map-inspector-legend-item']({
                title : legend.title,
                image : legend.image,
                id    : legend.id
            });
            _inspector.el.find('#inspector-legend .flyout-content').append( legendHTML );
        },
        handleInspectorNavClick: function(e){
            e.preventDefault();

            var that = $(this);
            if(that.parent().hasClass('active')){
                that.parent().removeClass('active');
            }else{
                _inspector.el.find('> li.active').removeClass('active');
                that.parent().addClass('active');
            }
        },
        setupToolbar: function(){
            _base.append('<div class="toolbar"><ul></ul></div>');
            _toolbar.el = $('.toolbar');
            _toolbar.el.on('click','> ul > li > a', self.handleToolbarNavClick);
            _toolbar.el.on('click','.flyout .header .btn-close', self.handleCloseFlyout);

            self.setupToolbarInfo();
            self.setupToolbarBaseMap();
            self.setupToolbarLayer();
            self.setupToolbarAction();
        },
        setupToolbarAction: function(){
            if( _base.data('edit') ){
                _base.find('.toolbar > ul').append( '<li class="button button-edit-wrapper"><a href="#" class="edit parent btn-edit"><i class="ion-edit"></i> Edit</a></li>' );
            }
            if( _base.data('simpan') ){
                _base.find('.toolbar > ul').append( '<li class="button button-save-wrapper"><a href="#" class="save parent btn-save"><i class="ion-checkmark"></i> Simpan</a></li>' );
            }
            if( _base.data('cetak') ){
                _base.find('.toolbar > ul').append( '<li class="button button-cetak-wrapper"><a href="#" class="edit parent btn-cetak"><i class="ion-printer"></i> Cetak</a></li>' );
            }
            if( _base.data('hapus') ){
                _base.find('.toolbar > ul').append( '<li class="button button-hapus-wrapper"><a href="#" class="hapus parent btn-hapus"><i class="ion-trash-a"></i> Hapus</a></li>' );
            }
            _toolbar.el.on('click', '.btn-save', self.handleSaveClick);
            _toolbar.el.on('click', '.btn-edit', self.handleEditClick);
            _toolbar.el.on('click', '.btn-hapus', self.handleHapusClick);
            _toolbar.el.on('click', '.btn-cetak', self.handleCetakClick);
        },
        handleCetakClick: function(e){
            e.preventDefault();

            _formData.url = _baseURL + '/cetak/print';
            _formData.scale = self.getScale();
            if($('#txt-judul').length){
                _formData.info = {
                    'judul'    : $('#txt-judul').val(),
                    'abstract' : $('#txt-absctract').val()
                }
            }else{
                _formData.info = {
                    'judul'    : $('.basic-info .info-title').text(),
                    'abstract' : $('.basic-info .info-description').text(),
                }
            }
            //reorder layer
            var newOrder = {};
            var usedLayer = $('#used-layer li');

            $.each(_formData.layers, function(key, value){
                var index = usedLayer.index( document.getElementById(value.reference_el) );
                newOrder[index] = value;
            });
            _formData.layers = newOrder;

            // create html data
            var html = Handlebars.templates['form-cetak'](_formData);
            $('body').append(html);
            // console.log(html);
            $('#form-cetak').submit();
        },
        handleSaveClick: function(e){
            e.preventDefault();
            var url = _base.data('ajaxaction');

            _formData.info = {
                'judul'     : $('#txt-judul').val(),
                'abstract' : $('#txt-absctract').val()
            }
            if(_toolbar.el.find('.btn-save').text() !== 'Menyimpan..'){
                _toolbar.el.find('.btn-save').html('Menyimpan..');

                //reorder layer
                var newOrder = {};
                var usedLayer = $('#used-layer li');

                $.each(_formData.layers, function(key, value){
                    var index = usedLayer.index( document.getElementById(value.reference_el) );
                    newOrder[index] = value;
                });
                _formData.layers = newOrder;

                $.post(url, _formData, function(data){
                    if(data.redirect){
                        document.location = data.redirect;
                    }else{
                        if(data.message){
                            alert(data.message);
                        }
                        _toolbar.el.find('.btn-save').html('<i class="ion-checkmark"></i> Simpan');
                    }
                }, 'json').fail(function() {
                    _toolbar.el.find('.btn-save').html('<i class="ion-checkmark"></i> Simpan');
                });
            }
        },
        handleEditClick: function(e){
            e.preventDefault();
            var el = $('.basic-info-form');
            el.removeClass('basic-info-form').addClass('basic-info-form-active');
            $('.button-edit-wrapper').remove();
            _base.find('#toolbar-layer').after( '<li class="button button-save-wrapper"><a href="#" class="save parent btn-save"><i class="ion-checkmark"></i> Simpan</a></li>' );
        },
        handleHapusClick: function(e){
            e.preventDefault();
            var url = _base.data('ajaxaction');

            _formData = {
                'delete' : 1
            }
            if(_toolbar.el.find('.btn-hapus').text() !== 'Menghapus..'){
                _toolbar.el.find('.btn-hapus').html('Menghapus..');
                $.post(url, _formData, function(data){
                    if(data.redirect){
                        document.location = data.redirect;
                    }else{
                        if(data.message){
                            alert(data.message);
                        }
                        _toolbar.el.find('.btn-hapus').html('<i class="ion-trash-a"></i> Simpan');
                    }
                }, 'json').fail(function() {
                    _toolbar.el.find('.btn-hapus').html('<i class="ion-trash-a"></i> Simpan');
                });
            }
        },
        handleCloseFlyout: function(e){
            e.preventDefault();
            $(this).closest('li').removeClass('active');
        },
        handleToolbarNavClick: function(e){
            e.preventDefault();
            var that = $(this);
            if(!that.parent().hasClass('button')){
                if(that.parent().hasClass('active')){
                    that.parent().removeClass('active');
                }else{
                    _toolbar.el.find('> ul > li.active').removeClass('active');
                    that.parent().addClass('active');
                }
            }
        },
        setupToolbarLayer: function(){
            _base.find('.toolbar > ul').append( Handlebars.templates['toolbar-layer'] );
            _toolbar.elLayer = _toolbar.el.find('#used-layer');
            _toolbar.elLayer.on('click', '.ico-checkmark', self.handleCheckmarkClick);
            _toolbar.elLayer.on('click', '.layer-zoom-extent', self.handleZoomExtent);
            _toolbar.elLayer.on('click', '.layer-info', self.handleInfoClick);
            // _toolbar.elLayer.on('mouseenter', '.layer-remove', self.handleRemoveMousein);
            // _toolbar.elLayer.on('mouseout', '.layer-remove', self.handleRemoveMouseout);
            _toolbar.elLayer.on('click', '.layer-remove', self.handleRemoveClick);

            // sortable layers
            _toolbar.elLayer.sortable({
                revert: true,
                handle: ".layer-drag",
                stop: self.handleSortingStop
            });
            _toolbar.elLayer.disableSelection();

            // setup add layer
            _customLayerTextbox = $('#custom-url-server');
            _availableLayer     = $('#available-layer');
            _usedLayer          = $('#used-layer');
            _selectServer       = $('#select-server');

            _availableLayer.on('click', 'a', self.handleAddNewLayer);
            $('#addlayer-custom-url').on('submit', 'form', function(){
              $(this).find('.btn-add-wms').click();
              return false;
            });
            $('#addlayer-custom-url').on('click', '.btn-add-wms', self.handleAddCustomWMS);
            $('#addlayer-custom-url').on('click', '.btn-done', self.handleCancelCustomWMS);
            _selectServer.on('change', self.handleSelectServerWMS);
            $('#addlayer-list').on('click', '.step-done', self.handleCancelSelectWMS);
            $('#addlayer-button').on('click', '.step-next', self.handleAddCustomButton);

            // add list wms
            if(typeof _listWMS != "undefined" && _listWMS.length){
                $('#addlayer-button').addClass('active');
                _selectServer.append('<option value="0" selected="selected">Pilih Server</option>');
                $.each(_listWMS, function(){
                    if(this.list){
                        var group = '<optgroup label="'+this.name+'">';
                        $.each(this.list, function(){
                            group += '<option value="'+this.url+'">'+this.name+'</option>';
                        });
                        group += '</optgroup>';
                    }
                    _selectServer.append(group);
                });
                _selectServer.append('<option value="1">Tambah Server...</option>');
            }

            // if boleh edit layer or punya layer banyak
            if(typeof map_data != 'undefined' && map_data){
                // console.info(map_data);
                // setup layer
                $.each(map_data.layers, function(){
                    var wms = {
                        url        : this.url,
                        params     : {'LAYERS': this.layer}
                    };
                    var param = {
                        id    : 'id_' + new Date().getTime(),
                        title : this.title,
                        type  : 'wms',
                        identifier  : this.identifier,
                        wms   : wms
                    };
                    self.addLayer(param);
                });
                _view.fitExtent(ol.proj.transformExtent(map_data.extent, 'EPSG:4326', 'EPSG:3857'), _map.getSize());

                _defaultView.center = _view.getCenter();
                _defaultView.zoom = _view.getZoom();
            }
            if(typeof singleLayer != 'undefined' && singleLayer){
                $('#toolbar-layer').hide();
                self.addLayer({
                    id    : 'id_' + new Date().getTime(),
                    title : singleLayer.title,
                    type  : 'wms',
                    wms   : singleLayer.wms
                });

                if(singleLayer.extent){
                    _view.fitExtent(ol.proj.transformExtent(singleLayer.extent, 'EPSG:4326', 'EPSG:3857'), _map.getSize());
                    _defaultView.center = _view.getCenter();
                    _defaultView.zoom = _view.getZoom();
                }
            }
        },
        handleAddCustomButton: function(e){
            e.preventDefault();
            $('#addlayer-button').removeClass('active');
            $('#addlayer-list').addClass('active');
        },
        handleCancelSelectWMS: function(e){
            e.preventDefault();
            _selectServer.find('option')[0].selected = true;
            _usedLayer.show();
            _availableLayer.hide();
            $('#addlayer-button').addClass('active');
            $('#addlayer-list').removeClass('active');
        },
        handleSelectServerWMS: function(e){
            e.preventDefault();
            if(this.value === '1'){
                $('#addlayer-list').removeClass('active');
                $('#addlayer-custom-url').addClass('active');
            }else if(this.value === '2'){
                $('#addlayer-list .select-options').css('background-color', '#cccccc');
                _selectServer[0].disabled = true;
                _usedLayer.hide();
                _availableLayer
                    .empty()
                    .append('<li><span class="title">Loading..</span></li>')
                    .show();

                $.ajax( _baseURL+'/jelajah/lokallayer' ).then(function(response) {
                    _lokalLayer = response;
                    _availableLayer.empty();
                    if(response){
                        _availableLayer.data('wms', response.url);
                        $.each(response.layers, function(){
                            var baseHTML = Handlebars.templates['layer-template-custom']({
                                title        : this.title,
                                layer        : this.layer,
                                identifier   : this.identifier
                            });
                            _availableLayer.prepend(baseHTML);
                        });
                        _usedLayer.hide();
                    }
                    $('#addlayer-list .select-options').css('background-color', '#ffffff');
                    _selectServer[0].disabled = false;
                });

            }else if(this.value !== '0'){
                $('#addlayer-list .select-options').css('background-color', '#cccccc');
                _selectServer[0].disabled = true;
                _usedLayer.hide();
                _availableLayer
                    .empty()
                    .append('<li><span class="title">Loading..</span></li>')
                    .show()
                    .data('wms', this.value);

                url = self.prepareWMSURL(this.value) + 'request=GetCapabilities&service=wms';

                $.ajax( url ).then(function(response) {
                    _availableLayer.empty();
                    if(response){
                        var parser = new ol.format.WMSCapabilities();
                        var result = parser.read(response);
                        if(result && result.Capability && result.Capability.Layer && result.Capability.Layer.Layer){
                            $.each(result.Capability.Layer.Layer, function(){
                                var baseHTML = Handlebars.templates['layer-template-custom']({
                                    title : this.Title,
                                    layer : this.Name,
                                    identifier   : this.Name
                                });
                                _availableLayer.prepend(baseHTML);
                            });
                            _usedLayer.hide();
                        }
                    }
                    $('#addlayer-list .select-options').css('background-color', '#ffffff');
                    _selectServer[0].disabled = false;
                });
            }
        },
        prepareWMSURL: function(url){
            var hasQuestion = /\?/g.exec(url),
                question = null,
                result = null;

            if(hasQuestion){
                question = '';
            }else{
                question = '?';
            }
            result = url + question;
            return result;
        },
        setupDefaultLayer: function (e){

            $.get(_api+"front_layers", function(data){

                if(data.length>0){
                    $.each(data, function (index, item){
                        var params = {
                            id : 'id_' + new Date().getTime(),
                            title: item.layer_title,
                            type: "wms",
                            identifier:item.layer_nativename,
                            visibility: item.aktif,
                            wms: {
                                url: _wmsURL,
                                params: {'LAYERS': item.layer_nativename, }
                            }                            
                        }
                        self.addLayer(params);
                    })
                }
            },"json");
            // _availableLayer
            //     .empty()
            //     .append('<li><span class="title">Loading..</span></li>')
            //     .show()
            //     .data('wms', _wmsURL);
            // url = self.prepareWMSURL(_wmsURL) + 'request=GetCapabilities&service=wms';
            // $.ajax( url ).then(function(response) {
            //     _availableLayer.empty();
            //     if(response){
            //         var parser = new ol.format.WMSCapabilities();
            //         var result = parser.read(response);
            //             console.log(result);
            //         if(result && result.Capability && result.Capability.Layer && result.Capability.Layer.Layer){
            //             $.each(result.Capability.Layer.Layer, function(){
            //                 var baseHTML = Handlebars.templates['layer-template-custom']({
            //                     title : this.Title,
            //                     layer : this.Name
            //                 });
            //                 _availableLayer.prepend(baseHTML);
            //             });
            //             _usedLayer.hide();
            //         }
            //     }
            //     $('#addlayer-list .select-options').css('background-color', '#ffffff');
            //     // _selectServer[0].disabled = false;
            // });

        },
        handleAddCustomWMS: function(e){
            e.preventDefault();

            // get capabilities
            var url = _customLayerTextbox.val();
            if(url){
                _customLayerTextbox.css('background-color', '#cccccc');
                _customLayerTextbox[0].disabled = true;
                _usedLayer.hide();
                _availableLayer
                    .empty()
                    .append('<li><span class="title">Loading..</span></li>')
                    .show()
                    .data('wms', url);


                url = self.prepareWMSURL(url) + 'request=GetCapabilities&service=wms';

                $.ajax( url )
                  .success(function(response) {
                      _availableLayer.empty();
                      if(response){
                          var parser = new ol.format.WMSCapabilities();
                          var result = parser.read(response);
                          if(result && result.Capability && result.Capability.Layer && result.Capability.Layer.Layer){
                              $.each(result.Capability.Layer.Layer, function(){
                                  var baseHTML = Handlebars.templates['layer-template-custom']({
                                      title : this.Title,
                                      layer : this.Name,
                                      identifier : this.Name
                                  });
                                  _availableLayer.prepend(baseHTML);
                              });
                          }
                      }else{
                      _availableLayer
                          .empty()
                          .append('<li><span class="title">Tidak ditemukan..</span></li>')
                          .show();
                      }
                      _customLayerTextbox.css('background-color', '#ffffff');
                      _customLayerTextbox[0].disabled = false;
                  });
            }
        },
        handleCancelCustomWMS: function(e){
            e.preventDefault();
            _usedLayer.show();
            _availableLayer.hide();
            $('#addlayer-custom-url').removeClass('active');
            $('#addlayer-button').addClass('active');
            $('#select-server').val(0);
        },
        handleAddNewLayer: function(e){
            e.preventDefault();
            if(!$(this).closest('li').hasClass('added')){
                var params = {
                    id         : 'id_' + new Date().getTime(),
                    title      : $(this).closest('li').find('.name').text(),
                    type       : 'wms',
                    identifier : null,
                    wms        : {
                        url        : $(this).closest('ul').data('wms'),
                        params     : {'LAYERS': $(this).data('layer')}
                    }
                };
                if( $(this).data('identifier') ){
                    params.identifier = $(this).data('identifier');
                }
                $(this).closest('li').addClass('added');
                self.addLayer(params);
                
                var layer = $('#'+params.id).data('layer');
                $('#'+params.id).find('.title').addClass('active');
                layer.setVisible(true);
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
            // _toolbar.elLayer.find('>li').each(function(){
            //     var layer = $(this).data('layer');
            //     var x  =$(this).find('.layer-name').text();
            //     console.info(index + ': ' + x);
            //     _layerCollection.insertAt(index,layer);
            //     index--;
            // });
            // console.info(_layers);
        },
        handleCheckmarkClick: function(e){
            e.preventDefault();

            var layer = $(this).closest('li').data('layer');

            $(this).parent().toggleClass('active');
            if($(this).parent().hasClass('active')){
                layer.setVisible(true);
            }else{
                layer.setVisible(false);
            }
        },
        handleZoomExtent: function(e){
            e.preventDefault();

            var extent = $(this).closest('li').data('extent');
            var map = Palapa.PetaV2.getMap();

            map.getView().fit(extent,map.getSize());
        },
        handleInfoClick: function(e){
            e.preventDefault();

            $(this).toggleClass('active');
            var li = $(this).closest('li');
            if($(this).hasClass('active')){
                li.addClass('info-active')
            }else{
                li.removeClass('info-active')
            }
        },
        handleRemoveMousein: function(){
            $(this).addClass('active');
        },
        handleRemoveMouseout: function(){
            $(this).removeClass('active');
        },
        getMap: function(){
          return _map;
        },
        handleRemoveClick: function(e){
            e.preventDefault();
            var layer = $(this).closest('li').data('layer');
            var layerId = $(this).closest('li').attr('id');

            delete _layers[layerId];
            delete _formData.layers[layerId];
            layer.setVisible(false);
            _map.removeLayer(layer);
            $(this).closest('li').remove();

            // remove legend
            $('#'+layerId+'_legend').remove();
            $('#'+layerId+'_opacity').remove();

        },
        addZoomToExtent: function(baseHTML) {
            var newHTML = '\n        <a href="#" class="ico-wrapper layer-zoom-extent">\n          <span class="ion-arrow-shrink"></span>\n        </a>';
            var html = $(baseHTML);

            $(html).find('.action').prepend(newHTML);
            return html;
        },
        addLayer: function(oLayer){
            var layer;
            var baseHTML = Handlebars.templates['layer-template']({
                id    : oLayer.id,
                title : oLayer.title
            });

            baseHTML = this.addZoomToExtent(baseHTML);

            _toolbar.elLayer.prepend(baseHTML);
            var curEL = _toolbar.elLayer.find('#'+oLayer.id);

            if (!oLayer.visibility){
                curEL.find(".title").removeClass("active");
            }

            var layerdata = oLayer.wms;
            layerdata.title = oLayer.title;
            layerdata.reference_el = oLayer.id;

            if(oLayer.identifier){
                layerdata.identifier = oLayer.identifier;
            }
            _formData.layers[oLayer.id] = layerdata;

            var extent = [];

            switch(oLayer.type){
                case 'wms':
                    layer = new ol.layer.Image({
                        source: new ol.source.ImageWMS(oLayer.wms),
                        visible:(typeof oLayer.visibility !== "undefined")?oLayer.visibility:true
                    });
                    var image = self.prepareWMSURL(oLayer.wms.url) + 'REQUEST=GetLegendGraphic&VERSION=1.0.0&FORMAT=image/png&WIDTH=20&HEIGHT=20&WIDTH=20&HEIGHT=20&LEGEND_OPTIONS=forceRule:True;dx:0.2;dy:0.2;mx:0.2;my:0.2;border:false;fontColor:333333;fontSize:12&LAYER=' + oLayer.wms.params.LAYERS;
                    var wmsInfo = self.prepareWMSURL(oLayer.wms.url) + 'request=GetCapabilities&service=wms';

                    self.addOpacityControl({
                      title: oLayer.title,
                      id: oLayer.id
                    });
                    self.addLegend({
                        title: oLayer.title,
                        image: image,
                        id: oLayer.id + '_legend'
                    });

                    if(layer){
                        _map.addLayer(layer);
                        _layers[oLayer.id] = layer;
                        curEL.data('layer', layer);
                    }

                    $.ajax( wmsInfo ).then(function(response) {
                      var formatter = new ol.format.WMSCapabilities();
                      var Capabilities = formatter.read(response);
                      var currentLayer = null;

                      Capabilities.Capability.Layer.Layer.map(function(currentLayer){
                        if(currentLayer.Name === oLayer.wms.identifier){
                          currentLayer.BoundingBox.map(function(bb){
                            if(bb.crs === 'CRS:84'){
                              var extent = ol.extent.boundingExtent([
                                ol.proj.transform([bb.extent[0], bb.extent[1]], 'EPSG:4326', 'EPSG:3857'),
                                ol.proj.transform([bb.extent[2], bb.extent[3]], 'EPSG:4326', 'EPSG:3857'),
                              ]);
                              curEL.data('extent', extent);
                            }
                          });
                        }
                      });

                    });

                    break;
            }
        },
        addOpacityControl: function(params){
          var item = [
            '<div class="opacity-item" id="'+params.id+'_opacity" data-id="'+params.id+'">',
            '  <h4>'+params.title+'</h4>',
            '  <div class="slider-opacity"></div>',
            '</div>'
          ];
          _opacity.el.append(item.join(''));
          _opacity.el.find('.slider-opacity:last-child').slider({
            max: 100,
            value: 100,
            slide: Palapa.PetaV2.updateLayerOpacity,
            change: Palapa.PetaV2.updateLayerOpacity
          });
        },
        updateLayerOpacity: function(){
          var value = parseInt($(this).slider('value'), 10);
          var layerID = $(this).parent().data('id');
          _layers[layerID].setOpacity(value / 100)
        },
        setupInspectorOpacityControl: function(){
            _inspector.el.append( Handlebars.templates['map-opacity-control'] );
            _opacity.el = $('.opacity-list');
        },
        setupToolbarInfo: function(){
            var info = _base.find('.map-info');
            if(info.length){
                var flyoutInfo = '<li><a href="#" class="parent"><i class="ion-map"></i> Informasi Dasar</a><div class="flyout">'+info.html()+'</div></li>';
                _base.find('.toolbar > ul').append( flyoutInfo );
                info.remove();
            }
        },
        setupToolbarBaseMap: function(){
            _baseLayers = {
                OSM_Std: new ol.layer.Tile({
                    source  : new ol.source.OSM()
                }),
                // OSM_Road: new ol.layer.Tile({
                //     style   : 'Road',
                //     visible : true,
                //     source  : new ol.source.MapQuest({layer: 'osm'})
                // }),
                // OSM_Aerial: new ol.layer.Tile({
                //     style   : 'Aerial',
                //     visible : true,
                //     source  : new ol.source.MapQuest({layer: 'sat'})
                // }),
                // OSM_AerialWithLabels: new ol.layer.Group({
                //     style: 'AerialWithLabels',
                //     visible: false,
                //     layers: [
                //       new ol.layer.Tile({
                //         source: new ol.source.MapQuest({layer: 'sat'})
                //       }),
                //       new ol.layer.Tile({
                //         source: new ol.source.MapQuest({layer: 'hyb'})
                //       })
                //     ]
                //   }),
                // Bing_Road: new ol.layer.Tile({
                //     visible: true,
                //     preload: Infinity,
                //     source: new ol.source.BingMaps({
                //       key: 'Ak-dzM4wZjSqTlzveKz5u0d4IQ4bRzVI309GxmkgSVr1ewS6iPSrOvOKhA-CJlm3',
                //       imagerySet: 'Road'
                //     })
                // }),
                // Bing_Aerial: new ol.layer.Tile({
                //     visible: true,
                //     preload: Infinity,
                //     source: new ol.source.BingMaps({
                //       key: 'Ak-dzM4wZjSqTlzveKz5u0d4IQ4bRzVI309GxmkgSVr1ewS6iPSrOvOKhA-CJlm3',
                //       imagerySet: 'Aerial'
                //     })
                // }),
                // Bing_AerialWithLabels: new ol.layer.Tile({
                //     visible: true,
                //     preload: Infinity,
                //     source: new ol.source.BingMaps({
                //       key: 'Ak-dzM4wZjSqTlzveKz5u0d4IQ4bRzVI309GxmkgSVr1ewS6iPSrOvOKhA-CJlm3',
                //       imagerySet: 'AerialWithLabels'
                //     })
                // }),
                RBI_Indonesia: new ol.layer.Tile({
                    visible: true,
                    preload: Infinity,
                    source: new ol.source.XYZ({
                      url:'http://portal.ina-sdi.or.id/arcgis/rest/services/IGD/RupabumiIndonesia/MapServer/tile/{z}/{y}/{x}'
                    })
                })
            };

            _base.find('.toolbar > ul').append( Handlebars.templates['toolbar-base-layer'] );
            _toolbar.elBaseLayer = $('.list-peta-dasar');
            _toolbar.elBaseLayer.on('click', '>li', self.handleBaselayerClick);

            self.addBaseLayer({
                id    : 'OSM_Std',
                title : 'OSM Standard',
                thumb : _baseURL + 'image/base-osm-road.png',
                layer : _baseLayers.OSM_Std
            });
            // self.addBaseLayer({
            //     id    : 'OSM_Road',
            //     title : 'OSM Road',
            //     thumb : _baseURL + '/assets/img/base-osm-road.png',
            //     layer : _baseLayers.OSM_Road
            // });
            // self.addBaseLayer({
            //     id    : 'OSM_Aerial',
            //     title : 'OSM Aerial',
            //     thumb : _baseURL + '/assets/img/base-osm-aerial.png',
            //     layer : _baseLayers.OSM_Aerial
            // });
            // self.addBaseLayer({
            //     id    : 'OSM_AerialWithLabels',
            //     title : 'OSM AerialWithLabels',
            //     thumb : _baseURL + '/assets/img/base-osm-aerialwithlabel.png',
            //     layer : _baseLayers.OSM_AerialWithLabels
            // });
            // self.addBaseLayer({
            //     id    : 'Bing_Road',
            //     title : 'Bing Road',
            //     thumb : _baseURL + '/assets/img/base-bing-road.png',
            //     layer : _baseLayers.Bing_Road
            // });
            // self.addBaseLayer({
            //     id    : 'Bing_Aerial',
            //     title : 'Bing Aerial',
            //     thumb : _baseURL + '/assets/img/base-bing-aerial.png',
            //     layer : _baseLayers.Bing_Aerial
            // });
            // self.addBaseLayer({
            //     id    : 'Bing_AerialWithLabels',
            //     title : 'Bing AerialWithLabels',
            //     thumb : _baseURL + '/assets/img/base-bing-aerialwithlabel.png',
            //     layer : _baseLayers.Bing_AerialWithLabels
            // });
            self.addBaseLayer({
                id    : 'RBI_Indonesia',
                title : 'Rupabumi Indonesia',
                thumb : _baseURL + 'image/base-rbi.png',
                layer : _baseLayers.RBI_Indonesia
            });

            // set default
            self.setActiveBaseLayer($('#OSM_Std'));
        },
        addBaseLayer: function(oLayer){
            _map.addLayer(oLayer.layer);

            var baseHTML = Handlebars.templates['base-template']({
                id    : oLayer.id,
                title : oLayer.title,
                thumb : oLayer.thumb
            });

            _toolbar.elBaseLayer.append(baseHTML);
            _baseLayers[oLayer.id] = oLayer;

            self.setActiveBaseLayer($('#' + oLayer.id));
        },
        handleBaselayerClick: function(e){
            e.preventDefault();
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
        setupProxy:function(el){
            if(_proxy){
                $.ajaxSetup({
                    beforeSend: function(xhr, o) {
                        o.url = _proxy+encodeURIComponent(o.url);
                    }
                });
            }            
        }
    };
    return self;
})();

Palapa.Global.register( Palapa.PetaV2.initialize );
