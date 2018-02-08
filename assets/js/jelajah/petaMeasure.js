var Palapa = Palapa || {};

Palapa.Measure = (function(){
    var _source,
        _vector,
        _sketch,
        _sketchElement,
        _map,
        _layerCollection,
        _draw,
        _prevFeature = null;

    var self = {
        initialize: function(map){
            _map = map;
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
            $('#measure-type > span').click(self.handleTypeChange);

            if($('#toolbar-ukur').hasClass('active')){
                self.addInteraction();
            }
            $('#toolbar').on('click', ' > ul > li > a', function(e){
                if($(this).parent().attr('id') !== 'toolbar-ukur'){
                    _source.clear();
                    _map.removeInteraction(_draw);
                }else{
                    if($('#toolbar-ukur').hasClass('active')){
                        self.addInteraction();
                    }else{
                        _source.clear();
                        _map.removeInteraction(_draw);
                    }
                }
            });
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
                $('#measure-size').html(output);
            }
        },
        handleTypeChange: function(){
            var that = $(this);
            if(that.hasClass('active')){
                return false;
            }

            if(that.hasClass('type-length')){
                $('#measure-type .type-area').removeClass('active');
            }else{
                $('#measure-type .type-length').removeClass('active');
            }
            that.addClass('active');
            self.updateType();
        },
        updateType: function(){
            _map.removeInteraction(_draw);
            self.addInteraction();
        },
        addInteraction: function(){
            var type;
            if($('#measure-type .type-length').hasClass('active')){
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
                _sketch = null;
                _layerCollection.insertAt(999,_vector);
            }, this);
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
        }
    };
    return self;
})();