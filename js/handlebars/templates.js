!function(){var a=Handlebars.template,n=Handlebars.templates=Handlebars.templates||{};n["artikel-simpul"]=a({compiler:[6,">= 2.0.0-beta.1"],main:function(a,n,l,e){var t,i="function",s=n.helperMissing,r=this.escapeExpression;return'<article class="entry">\n    <div class="meta"><span class="date">'+r((t=null!=(t=n.date||(null!=a?a.date:a))?t:s,typeof t===i?t.call(a,{name:"date",hash:{},data:e}):t))+'</span></div>\n    <header><h3 class="title"><a href="'+r((t=null!=(t=n.href||(null!=a?a.href:a))?t:s,typeof t===i?t.call(a,{name:"href",hash:{},data:e}):t))+'" target="_blank">'+r((t=null!=(t=n.judul||(null!=a?a.judul:a))?t:s,typeof t===i?t.call(a,{name:"judul",hash:{},data:e}):t))+'</a></h3></header>\n    <div class="content"><p>'+r((t=null!=(t=n.content||(null!=a?a.content:a))?t:s,typeof t===i?t.call(a,{name:"content",hash:{},data:e}):t))+'</p></div>\n    <footer class="action"><a href="'+r((t=null!=(t=n.href||(null!=a?a.href:a))?t:s,typeof t===i?t.call(a,{name:"href",hash:{},data:e}):t))+'" target="_blank" class="more">Selengkapnya <i class="ion-ios7-arrow-thin-right"></i></a></footer>\n</article>'},useData:!0}),n["base-template"]=a({compiler:[6,">= 2.0.0-beta.1"],main:function(a,n,l,e){var t,i="function",s=n.helperMissing,r=this.escapeExpression;return'<li id="'+r((t=null!=(t=n.id||(null!=a?a.id:a))?t:s,typeof t===i?t.call(a,{name:"id",hash:{},data:e}):t))+'">\n    <a href="#"><span class="thumbnail"><img src="'+r((t=null!=(t=n.thumb||(null!=a?a.thumb:a))?t:s,typeof t===i?t.call(a,{name:"thumb",hash:{},data:e}):t))+'"></span> <span class="title">'+r((t=null!=(t=n.title||(null!=a?a.title:a))?t:s,typeof t===i?t.call(a,{name:"title",hash:{},data:e}):t))+"</span></a>\n</li>"},useData:!0}),n["dokumen-simpul"]=a({compiler:[6,">= 2.0.0-beta.1"],main:function(a,n,l,e){var t,i="function",s=n.helperMissing,r=this.escapeExpression;return'<li>\n    <i class="ion-folder bullet"></i>\n    <h3 class="title"><a href="'+r((t=null!=(t=n.href||(null!=a?a.href:a))?t:s,typeof t===i?t.call(a,{name:"href",hash:{},data:e}):t))+'" target="_blank">'+r((t=null!=(t=n.judul||(null!=a?a.judul:a))?t:s,typeof t===i?t.call(a,{name:"judul",hash:{},data:e}):t))+"</a></h3>\n</li>"},useData:!0}),n["form-cetak"]=a({1:function(a,n,l,e){var t,i=this.lambda,s=this.escapeExpression;return'    <input type="text" name="layers['+s(i(e&&e.index,a))+'][params][LAYERS]" value="'+s(i(null!=(t=null!=a?a.params:a)?t.LAYERS:t,a))+'">\n    <input type="text" name="layers['+s(i(e&&e.index,a))+'][title]" value="'+s(i(null!=a?a.title:a,a))+'">\n    <input type="text" name="layers['+s(i(e&&e.index,a))+'][url]" value="'+s(i(null!=a?a.url:a,a))+'">\n'},compiler:[6,">= 2.0.0-beta.1"],main:function(a,n,l,e){var t,i,s="function",r=n.helperMissing,c=this.escapeExpression,u=this.lambda,o='<form action="'+c((i=null!=(i=n.url||(null!=a?a.url:a))?i:r,typeof i===s?i.call(a,{name:"url",hash:{},data:e}):i))+'" method="post" style="display:none;" id="form-cetak">\n    <input type="text" name="judul" value="'+c(u(null!=(t=null!=a?a.info:a)?t.judul:t,a))+'">\n    <input type="text" name="scale" value="'+c((i=null!=(i=n.scale||(null!=a?a.scale:a))?i:r,typeof i===s?i.call(a,{name:"scale",hash:{},data:e}):i))+'">\n    <input type="text" name="extent[minx]" value="'+c(u(null!=(t=null!=a?a.extent:a)?t.minx:t,a))+'">\n    <input type="text" name="extent[miny]" value="'+c(u(null!=(t=null!=a?a.extent:a)?t.miny:t,a))+'">\n    <input type="text" name="extent[maxx]" value="'+c(u(null!=(t=null!=a?a.extent:a)?t.maxx:t,a))+'">\n    <input type="text" name="extent[maxy]" value="'+c(u(null!=(t=null!=a?a.extent:a)?t.maxy:t,a))+'">\n\n';return t=n.each.call(a,null!=a?a.layers:a,{name:"each",hash:{},fn:this.program(1,e),inverse:this.noop,data:e}),null!=t&&(o+=t),o+"</form>"},useData:!0}),n["index-dokumen"]=a({compiler:[6,">= 2.0.0-beta.1"],main:function(a,n,l,e){var t,i="function",s=n.helperMissing,r=this.escapeExpression;return'<li>\n    <a href="'+r((t=null!=(t=n.url||(null!=a?a.url:a))?t:s,typeof t===i?t.call(a,{name:"url",hash:{},data:e}):t))+'" class="source" target="_blank">'+r((t=null!=(t=n.kategori||(null!=a?a.kategori:a))?t:s,typeof t===i?t.call(a,{name:"kategori",hash:{},data:e}):t))+'</a>\n    <h3 class="title"><a href="'+r((t=null!=(t=n.href||(null!=a?a.href:a))?t:s,typeof t===i?t.call(a,{name:"href",hash:{},data:e}):t))+'" target="_blank">'+r((t=null!=(t=n.judul||(null!=a?a.judul:a))?t:s,typeof t===i?t.call(a,{name:"judul",hash:{},data:e}):t))+'</a></h3>\n    <div class="excerpt">\n        '+r((t=null!=(t=n.content||(null!=a?a.content:a))?t:s,typeof t===i?t.call(a,{name:"content",hash:{},data:e}):t))+"\n    </div>\n</li>"},useData:!0}),n["info-template"]=a({1:function(a){var n=this.lambda,l=this.escapeExpression;return"  <li>"+l(n(a,a))+"</li>\n"},compiler:[6,">= 2.0.0-beta.1"],main:function(a,n,l,e){var t,i,s="function",r=n.helperMissing,c=this.escapeExpression,u="<h3>"+c((i=null!=(i=n.title||(null!=a?a.title:a))?i:r,typeof i===s?i.call(a,{name:"title",hash:{},data:e}):i))+"</h3>\n<ul>\n";return t=n.each.call(a,null!=a?a.data:a,{name:"each",hash:{},fn:this.program(1,e),inverse:this.noop,data:e}),null!=t&&(u+=t),u+"</ul>"},useData:!0}),n["layer-template-custom"]=a({compiler:[6,">= 2.0.0-beta.1"],main:function(a,n,l,e){var t,i="function",s=n.helperMissing,r=this.escapeExpression;return'<li>\n    <span class="title">\n        <span class="name">'+r((t=null!=(t=n.title||(null!=a?a.title:a))?t:s,typeof t===i?t.call(a,{name:"title",hash:{},data:e}):t))+'</span>\n    </span>\n    <div class="action">\n        <a href="#addLayer" data-layer="'+r((t=null!=(t=n.layer||(null!=a?a.layer:a))?t:s,typeof t===i?t.call(a,{name:"layer",hash:{},data:e}):t))+'" data-identifier="'+r((t=null!=(t=n.identifier||(null!=a?a.identifier:a))?t:s,typeof t===i?t.call(a,{name:"identifier",hash:{},data:e}):t))+'" class="btn-add"><i class="ion-ios7-plus-outline"></i></a>\n    </div>\n</li>'},useData:!0}),n["layer-template"]=a({compiler:[6,">= 2.0.0-beta.1"],main:function(a,n,l,e){var t,i="function",s=n.helperMissing,r=this.escapeExpression;return'<li id="'+r((t=null!=(t=n.id||(null!=a?a.id:a))?t:s,typeof t===i?t.call(a,{name:"id",hash:{},data:e}):t))+'" class="info-active">\n    <span class="title active">\n        <a href="#" class="ico-checkmark"></a>\n        <span class="layer-name">'+r((t=null!=(t=n.title||(null!=a?a.title:a))?t:s,typeof t===i?t.call(a,{name:"title",hash:{},data:e}):t))+'</span>\n    </span>\n    <div class="action">\n        <a href="#" class="ico-wrapper layer-info active">\n            <span class="ico-info"></span>\n        </a>\n        <a href="#" class="ico-wrapper layer-remove">\n            <span class="ico-remove"></span>\n        </a>\n        <a href="#" class="ico-wrapper layer-drag">\n            <span class="ico-drag"></span>\n        </a>\n    </div>\n</li>'},useData:!0}),n["map-control"]=a({compiler:[6,">= 2.0.0-beta.1"],main:function(){return'<div class="controller">\n    <ul>\n        <li>\n            <a href="#" data-action=\'zoom-in\' class="parent"><i class="ion-plus"></i> <span>Zoom In</span></a>\n        </li>\n        <li>\n            <a href="#" data-action=\'zoom-out\' class="parent"><i class="ion-minus"></i> <span>Zoom Out</span></a>\n        </li>\n    </ul>\n    <ul>\n        <li>\n            <a href="#" data-action=\'full-extent\' class="parent"><i class="ion-qr-scanner"></i> <span>Full Extent</span></a>\n        </li>\n    </ul>\n</div>'},useData:!0}),n["map-inspector-identify-result"]=a({1:function(a){var n=this.lambda,l=this.escapeExpression;return"            <tr>\n                <td>"+l(n(null!=a?a.name:a,a))+"</td>\n                <td>"+l(n(null!=a?a.value:a,a))+"</td>\n            </tr>\n"},compiler:[6,">= 2.0.0-beta.1"],main:function(a,n,l,e){var t,i,s="function",r=n.helperMissing,c=this.escapeExpression,u='<li class="item">\n    <div class="header">\n        <a href="#" class="title">'+c((i=null!=(i=n.title||(null!=a?a.title:a))?i:r,typeof i===s?i.call(a,{name:"title",hash:{},data:e}):i))+' <i class="ion-ios7-arrow-down"></i></a>\n    </div>\n    <div class="collapse">\n        <table width="100%" cellpadding="0" cellspacing="0" class="table-data">\n            <tbody><tr>\n                <th>Name</th>\n                <th>Value</th>\n            </tr>\n';return t=n.each.call(a,null!=a?a.data:a,{name:"each",hash:{},fn:this.program(1,e),inverse:this.noop,data:e}),null!=t&&(u+=t),u+"        </tbody></table>\n    </div>\n</li>"},useData:!0}),n["map-inspector-identify"]=a({compiler:[6,">= 2.0.0-beta.1"],main:function(){return'<li id="inspector-identify">\n    <a href="#" class="parent"><i class="ion-ios7-information"></i> <span>Identifikasi</span></a>\n    <div class="flyout">\n        <div class="flyout-header">\n            <h3>Identifikasi</h3>\n        </div>\n        <div class="flyout-content">\n            <ul class="identification-result" id="identification-result">\n\n            </ul>\n        </div>\n    </div>\n</li>'},useData:!0}),n["map-inspector-legend-item"]=a({compiler:[6,">= 2.0.0-beta.1"],main:function(a,n,l,e){var t,i="function",s=n.helperMissing,r=this.escapeExpression;return'<div id="'+r((t=null!=(t=n.id||(null!=a?a.id:a))?t:s,typeof t===i?t.call(a,{name:"id",hash:{},data:e}):t))+'">\n    <div class="header">\n        <a href="javascript:void(0)" class="title">'+r((t=null!=(t=n.title||(null!=a?a.title:a))?t:s,typeof t===i?t.call(a,{name:"title",hash:{},data:e}):t))+' <i class="ion-ios7-arrow-down"></i></a>\n    </div>\n    <table width="100%" cellpadding="0" cellspacing="0" class="table-data">\n        <tr>\n            <td><img data-url="'+r((t=null!=(t=n.image||(null!=a?a.image:a))?t:s,typeof t===i?t.call(a,{name:"image",hash:{},data:e}):t))+'" src="'+r((t=null!=(t=n.image||(null!=a?a.image:a))?t:s,typeof t===i?t.call(a,{name:"image",hash:{},data:e}):t))+'"></td>\n        </tr>\n    </table>\n<div>'},useData:!0}),n["map-inspector-legend"]=a({compiler:[6,">= 2.0.0-beta.1"],main:function(){return'<li id="inspector-legend">\n    <a href="#" class="parent"><i class="ion-bookmark"></i> <span>Legenda</span></a>\n    <div class="flyout">\n        <div class="flyout-header"><h3>Legenda</h3></div>\n        <div class="flyout-content identification-result">\n\n        </div>\n    </div>\n</li>'},useData:!0}),n["map-inspector-ukur"]=a({compiler:[6,">= 2.0.0-beta.1"],main:function(){return'<li id="inspector-ukur">\n    <a href="#" class="parent"><i class="ion-code-working"></i> <span>Ukur</span></a>\n    <div class="flyout">\n        <div class="flyout-header">\n            <h3>Ukur</h3>\n        </div>\n        <div class="flyout-content">\n            <div class="measure">\n                <form action="#" method="post" class="general-form">\n                    <h3>Metode</h3>\n                    <span class="select-options full">\n                        <select name="category" class="ukur-category">\n                            <option value="1" selected>Length</option>\n                            <option value="2">Area</option>\n                        </select>\n                        <i class="arrow ion-chevron-down"></i>\n                    </span>\n                </form>\n                <div class="measure-result">\n                    <h3>Hasil</h3>\n                    <div class="value">-</div>\n                </div>\n            </div>\n        </div>\n    </div>\n</li>'},useData:!0}),n["peta-simpul"]=a({compiler:[6,">= 2.0.0-beta.1"],main:function(a,n,l,e){var t,i="function",s=n.helperMissing,r=this.escapeExpression;return'<article class="entry">\n    <div class="thumbnail"><a href="'+r((t=null!=(t=n.url||(null!=a?a.url:a))?t:s,typeof t===i?t.call(a,{name:"url",hash:{},data:e}):t))+'" target="_blank"><img src="'+r((t=null!=(t=n.thumbnail||(null!=a?a.thumbnail:a))?t:s,typeof t===i?t.call(a,{name:"thumbnail",hash:{},data:e}):t))+'"></a></div>\n    <div class="content">\n        <h3 class="title"><a href="'+r((t=null!=(t=n.url||(null!=a?a.url:a))?t:s,typeof t===i?t.call(a,{name:"url",hash:{},data:e}):t))+'" target="_blank">'+r((t=null!=(t=n.judul||(null!=a?a.judul:a))?t:s,typeof t===i?t.call(a,{name:"judul",hash:{},data:e}):t))+"</a></h3>\n        <p>"+r((t=null!=(t=n.deskripsi||(null!=a?a.deskripsi:a))?t:s,typeof t===i?t.call(a,{name:"deskripsi",hash:{},data:e}):t))+"</p>\n    </div>\n</article>"},useData:!0}),n["toolbar-base-layer"]=a({compiler:[6,">= 2.0.0-beta.1"],main:function(){return'<li id="toolbar-peta-dasar">\n    <a href="#" class="parent"><i class="ion-android-earth"></i> Peta Dasar</a>\n    <div class="flyout">\n        <div class="header">\n            <a href="#" class="btn-close"><i class="ion-ios7-close-empty"></i></a>\n        </div>\n        <div class="content">\n            <ul class="list-peta-dasar"></ul>\n        </div>\n    </div>\n</li>'},useData:!0}),n["toolbar-layer"]=a({compiler:[6,">= 2.0.0-beta.1"],main:function(){return'<li id="toolbar-layer">\n    <a href="#" class="parent"><i class="ion-social-buffer"></i> Layer</a>\n    <div class="flyout">\n        <div class="header">\n            <a href="#" class="btn-close"><i class="ion-ios7-close-empty"></i></a>\n            <div id="addlayer" class="addlayer">\n                <div id="addlayer-button" class="coach">\n                    <a href="#add" class="btn primary step-next">Tambahkan Layer</a>\n                </div>\n\n                <div id="addlayer-list" class="coach">\n                    <form class="general-form">\n                        <div class="input-wrapper">\n                            <span class="select-options">\n                                <select id="select-server" name="category">\n                                </select>\n                                <i class="arrow ion-chevron-down"></i>\n                            </span>\n                        </div>\n                    </form>\n                    <div class="input-wrapper">\n                        <a href="#" class="btn step-done">Selesai</a>\n                    </div>\n                </div>\n\n                <div id="addlayer-custom-url" class="coach">\n                    <form action="#" method="post" class="general-form">\n                        <div class="input-wrapper">\n                            <input type="text" id="custom-url-server" name="server-name" class="input-text" placeholder="http://">\n                        </div>\n                        <div class="input-wrapper">\n                            <a href="#go" class="btn-add-wms btn primary step-next">Go</a>\n                            <a href="#selesai" class="btn-done btn step-done">Selesai</a>\n                        </div>\n                    </form>\n                </div>\n            </div>\n        </div>\n        <div class="content">\n            <ul id="available-layer" class="list-layer active" data-wms="">\n            </ul>\n            <ul id="used-layer" class="list-layer active">\n            </ul>\n        </div>\n    </div>\n</li>'},useData:!0})}();

(function() {
  var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
templates['artikel-simpul'] = template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
  var helper, functionType="function", helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression;
  return "<article class=\"entry\">\n    <div class=\"meta\"><span class=\"date\">"
    + escapeExpression(((helper = (helper = helpers.date || (depth0 != null ? depth0.date : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"date","hash":{},"data":data}) : helper)))
    + "</span></div>\n    <header><h3 class=\"title\"><a href=\""
    + escapeExpression(((helper = (helper = helpers.href || (depth0 != null ? depth0.href : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"href","hash":{},"data":data}) : helper)))
    + "\" target=\"_blank\">"
    + escapeExpression(((helper = (helper = helpers.judul || (depth0 != null ? depth0.judul : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"judul","hash":{},"data":data}) : helper)))
    + "</a></h3></header>\n    <div class=\"content\"><p>"
    + escapeExpression(((helper = (helper = helpers.content || (depth0 != null ? depth0.content : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"content","hash":{},"data":data}) : helper)))
    + "</p></div>\n    <footer class=\"action\"><a href=\""
    + escapeExpression(((helper = (helper = helpers.href || (depth0 != null ? depth0.href : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"href","hash":{},"data":data}) : helper)))
    + "\" target=\"_blank\" class=\"more\">Selengkapnya <i class=\"ion-ios7-arrow-thin-right\"></i></a></footer>\n</article>";
},"useData":true});
templates['base-template'] = template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
  var helper, functionType="function", helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression;
  return "<li id=\""
    + escapeExpression(((helper = (helper = helpers.id || (depth0 != null ? depth0.id : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"id","hash":{},"data":data}) : helper)))
    + "\">\n    <a href=\"#\"><span class=\"thumbnail\"><img src=\""
    + escapeExpression(((helper = (helper = helpers.thumb || (depth0 != null ? depth0.thumb : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"thumb","hash":{},"data":data}) : helper)))
    + "\"></span> <span class=\"title\">"
    + escapeExpression(((helper = (helper = helpers.title || (depth0 != null ? depth0.title : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"title","hash":{},"data":data}) : helper)))
    + "</span></a>\n</li>";
},"useData":true});
templates['dokumen-simpul'] = template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
  var helper, functionType="function", helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression;
  return "<li>\n    <i class=\"ion-folder bullet\"></i>\n    <h3 class=\"title\"><a href=\""
    + escapeExpression(((helper = (helper = helpers.href || (depth0 != null ? depth0.href : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"href","hash":{},"data":data}) : helper)))
    + "\" target=\"_blank\">"
    + escapeExpression(((helper = (helper = helpers.judul || (depth0 != null ? depth0.judul : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"judul","hash":{},"data":data}) : helper)))
    + "</a></h3>\n</li>";
},"useData":true});
templates['form-cetak'] = template({"1":function(depth0,helpers,partials,data) {
  var stack1, lambda=this.lambda, escapeExpression=this.escapeExpression;
  return "    <input type=\"text\" name=\"layers["
    + escapeExpression(lambda((data && data.index), depth0))
    + "][params][LAYERS]\" value=\""
    + escapeExpression(lambda(((stack1 = (depth0 != null ? depth0.params : depth0)) != null ? stack1.LAYERS : stack1), depth0))
    + "\">\n    <input type=\"text\" name=\"layers["
    + escapeExpression(lambda((data && data.index), depth0))
    + "][title]\" value=\""
    + escapeExpression(lambda((depth0 != null ? depth0.title : depth0), depth0))
    + "\">\n    <input type=\"text\" name=\"layers["
    + escapeExpression(lambda((data && data.index), depth0))
    + "][url]\" value=\""
    + escapeExpression(lambda((depth0 != null ? depth0.url : depth0), depth0))
    + "\">\n";
},"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
  var stack1, helper, functionType="function", helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression, lambda=this.lambda, buffer = "<form action=\""
    + escapeExpression(((helper = (helper = helpers.url || (depth0 != null ? depth0.url : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"url","hash":{},"data":data}) : helper)))
    + "\" method=\"post\" style=\"display:none;\" id=\"form-cetak\">\n    <input type=\"text\" name=\"judul\" value=\""
    + escapeExpression(lambda(((stack1 = (depth0 != null ? depth0.info : depth0)) != null ? stack1.judul : stack1), depth0))
    + "\">\n    <input type=\"text\" name=\"scale\" value=\""
    + escapeExpression(((helper = (helper = helpers.scale || (depth0 != null ? depth0.scale : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"scale","hash":{},"data":data}) : helper)))
    + "\">\n    <input type=\"text\" name=\"extent[minx]\" value=\""
    + escapeExpression(lambda(((stack1 = (depth0 != null ? depth0.extent : depth0)) != null ? stack1.minx : stack1), depth0))
    + "\">\n    <input type=\"text\" name=\"extent[miny]\" value=\""
    + escapeExpression(lambda(((stack1 = (depth0 != null ? depth0.extent : depth0)) != null ? stack1.miny : stack1), depth0))
    + "\">\n    <input type=\"text\" name=\"extent[maxx]\" value=\""
    + escapeExpression(lambda(((stack1 = (depth0 != null ? depth0.extent : depth0)) != null ? stack1.maxx : stack1), depth0))
    + "\">\n    <input type=\"text\" name=\"extent[maxy]\" value=\""
    + escapeExpression(lambda(((stack1 = (depth0 != null ? depth0.extent : depth0)) != null ? stack1.maxy : stack1), depth0))
    + "\">\n\n";
  stack1 = helpers.each.call(depth0, (depth0 != null ? depth0.layers : depth0), {"name":"each","hash":{},"fn":this.program(1, data),"inverse":this.noop,"data":data});
  if (stack1 != null) { buffer += stack1; }
  return buffer + "</form>";
},"useData":true});
templates['index-dokumen'] = template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
  var helper, functionType="function", helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression;
  return "<li>\n    <a href=\""
    + escapeExpression(((helper = (helper = helpers.url || (depth0 != null ? depth0.url : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"url","hash":{},"data":data}) : helper)))
    + "\" class=\"source\" target=\"_blank\">"
    + escapeExpression(((helper = (helper = helpers.kategori || (depth0 != null ? depth0.kategori : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"kategori","hash":{},"data":data}) : helper)))
    + "</a>\n    <h3 class=\"title\"><a href=\""
    + escapeExpression(((helper = (helper = helpers.href || (depth0 != null ? depth0.href : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"href","hash":{},"data":data}) : helper)))
    + "\" target=\"_blank\">"
    + escapeExpression(((helper = (helper = helpers.judul || (depth0 != null ? depth0.judul : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"judul","hash":{},"data":data}) : helper)))
    + "</a></h3>\n    <div class=\"excerpt\">\n        "
    + escapeExpression(((helper = (helper = helpers.content || (depth0 != null ? depth0.content : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"content","hash":{},"data":data}) : helper)))
    + "\n    </div>\n</li>";
},"useData":true});
templates['info-template'] = template({"1":function(depth0,helpers,partials,data) {
  var lambda=this.lambda, escapeExpression=this.escapeExpression;
  return "  <li>"
    + escapeExpression(lambda(depth0, depth0))
    + "</li>\n";
},"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
  var stack1, helper, functionType="function", helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression, buffer = "<h3>"
    + escapeExpression(((helper = (helper = helpers.title || (depth0 != null ? depth0.title : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"title","hash":{},"data":data}) : helper)))
    + "</h3>\n<ul>\n";
  stack1 = helpers.each.call(depth0, (depth0 != null ? depth0.data : depth0), {"name":"each","hash":{},"fn":this.program(1, data),"inverse":this.noop,"data":data});
  if (stack1 != null) { buffer += stack1; }
  return buffer + "</ul>";
},"useData":true});
templates['layer-template-custom'] = template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
  var helper, functionType="function", helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression;
  return "<li>\n    <span class=\"title\">\n        <span class=\"name\">"
    + escapeExpression(((helper = (helper = helpers.title || (depth0 != null ? depth0.title : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"title","hash":{},"data":data}) : helper)))
    + "</span>\n    </span>\n    <div class=\"action\">\n        <a href=\"#addLayer\" data-layer=\""
    + escapeExpression(((helper = (helper = helpers.layer || (depth0 != null ? depth0.layer : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"layer","hash":{},"data":data}) : helper)))
    + "\" data-identifier=\""
    + escapeExpression(((helper = (helper = helpers.identifier || (depth0 != null ? depth0.identifier : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"identifier","hash":{},"data":data}) : helper)))
    + "\" class=\"btn-add\"><i class=\"ion-ios7-plus-outline\"></i></a>\n    </div>\n</li>";
},"useData":true});
templates['layer-template'] = template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
  var helper, functionType="function", helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression;
  return "<li id=\""
    + escapeExpression(((helper = (helper = helpers.id || (depth0 != null ? depth0.id : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"id","hash":{},"data":data}) : helper)))
    + "\" class=\"info-active\">\n    <span class=\"title active\">\n        <a href=\"#\" class=\"ico-checkmark\"></a>\n        <span class=\"layer-name\">"
    + escapeExpression(((helper = (helper = helpers.title || (depth0 != null ? depth0.title : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"title","hash":{},"data":data}) : helper)))
    + "</span>\n    </span>\n    <div class=\"action\">\n        <a href=\"#\" class=\"ico-wrapper layer-info active\">\n            <span class=\"ico-info\"></span>\n        </a>\n        <a href=\"#\" class=\"ico-wrapper layer-remove\">\n            <span class=\"ico-remove\"></span>\n        </a>\n        <a href=\"#\" class=\"ico-wrapper layer-drag\">\n            <span class=\"ico-drag\"></span>\n        </a>\n    </div>\n</li>";
},"useData":true});
templates['map-control'] = template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
  return "<div class=\"controller\">\n    <ul>\n        <li>\n            <a href=\"#\" data-action='zoom-in' class=\"parent\"><i class=\"ion-plus\"></i> <span>Zoom In</span></a>\n        </li>\n        <li>\n            <a href=\"#\" data-action='zoom-out' class=\"parent\"><i class=\"ion-minus\"></i> <span>Zoom Out</span></a>\n        </li>\n    </ul>\n    <ul>\n        <li>\n            <a href=\"#\" data-action='full-extent' class=\"parent\"><i class=\"ion-qr-scanner\"></i> <span>Full Extent</span></a>\n        </li>\n    </ul>\n</div>";
  },"useData":true});
templates['map-inspector-identify-result'] = template({"1":function(depth0,helpers,partials,data) {
  var lambda=this.lambda, escapeExpression=this.escapeExpression;
  return "            <tr>\n                <td>"
    + escapeExpression(lambda((depth0 != null ? depth0.name : depth0), depth0))
    + "</td>\n                <td>"
    + escapeExpression(lambda((depth0 != null ? depth0.value : depth0), depth0))
    + "</td>\n            </tr>\n";
},"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
  var stack1, helper, functionType="function", helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression, buffer = "<li class=\"item\">\n    <div class=\"header\">\n        <a href=\"#\" class=\"title\">"
    + escapeExpression(((helper = (helper = helpers.title || (depth0 != null ? depth0.title : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"title","hash":{},"data":data}) : helper)))
    + " <i class=\"ion-ios7-arrow-down\"></i></a>\n    </div>\n    <div class=\"collapse\">\n        <table width=\"100%\" cellpadding=\"0\" cellspacing=\"0\" class=\"table-data\">\n            <tbody><tr>\n                <th>Name</th>\n                <th>Value</th>\n            </tr>\n";
  stack1 = helpers.each.call(depth0, (depth0 != null ? depth0.data : depth0), {"name":"each","hash":{},"fn":this.program(1, data),"inverse":this.noop,"data":data});
  if (stack1 != null) { buffer += stack1; }
  return buffer + "        </tbody></table>\n    </div>\n</li>";
},"useData":true});
templates['map-inspector-identify'] = template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
  return "<li id=\"inspector-identify\">\n    <a href=\"#\" class=\"parent\"><i class=\"ion-ios7-information\"></i> <span>Identifikasi</span></a>\n    <div class=\"flyout\">\n        <div class=\"flyout-header\">\n            <h3>Identifikasi</h3>\n        </div>\n        <div class=\"flyout-content\">\n            <ul class=\"identification-result\" id=\"identification-result\">\n\n            </ul>\n        </div>\n    </div>\n</li>";
  },"useData":true});
templates['map-inspector-legend-item'] = template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
  var helper, functionType="function", helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression;
  return "<div id=\""
    + escapeExpression(((helper = (helper = helpers.id || (depth0 != null ? depth0.id : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"id","hash":{},"data":data}) : helper)))
    + "\">\n    <div class=\"header\">\n        <a href=\"javascript:void(0)\" class=\"title\">"
    + escapeExpression(((helper = (helper = helpers.title || (depth0 != null ? depth0.title : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"title","hash":{},"data":data}) : helper)))
    + " <i class=\"ion-ios7-arrow-down\"></i></a>\n    </div>\n    <table width=\"100%\" cellpadding=\"0\" cellspacing=\"0\" class=\"table-data\">\n        <tr>\n            <td><img data-url=\""
    + escapeExpression(((helper = (helper = helpers.image || (depth0 != null ? depth0.image : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"image","hash":{},"data":data}) : helper)))
    + "\" src=\""
    + escapeExpression(((helper = (helper = helpers.image || (depth0 != null ? depth0.image : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"image","hash":{},"data":data}) : helper)))
    + "\"></td>\n        </tr>\n    </table>\n<div>";
},"useData":true});
templates['map-inspector-legend'] = template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
  return "<li id=\"inspector-legend\">\n    <a href=\"#\" class=\"parent\"><i class=\"ion-bookmark\"></i> <span>Legenda</span></a>\n    <div class=\"flyout\">\n        <div class=\"flyout-header\"><h3>Legenda</h3></div>\n        <div class=\"flyout-content identification-result\">\n\n        </div>\n    </div>\n</li>";
  },"useData":true});
templates['map-inspector-ukur'] = template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
  return "<li id=\"inspector-ukur\">\n    <a href=\"#\" class=\"parent\"><i class=\"ion-code-working\"></i> <span>Ukur</span></a>\n    <div class=\"flyout\">\n        <div class=\"flyout-header\">\n            <h3>Ukur</h3>\n        </div>\n        <div class=\"flyout-content\">\n            <div class=\"measure\">\n                <form action=\"#\" method=\"post\" class=\"general-form\">\n                    <h3>Metode</h3>\n                    <span class=\"select-options full\">\n                        <select name=\"category\" class=\"ukur-category\">\n                            <option value=\"1\" selected>Length</option>\n                            <option value=\"2\">Area</option>\n                        </select>\n                        <i class=\"arrow ion-chevron-down\"></i>\n                    </span>\n                </form>\n                <div class=\"measure-result\">\n                    <h3>Hasil</h3>\n                    <div class=\"value\">-</div>\n                </div>\n            </div>\n        </div>\n    </div>\n</li>";
  },"useData":true});
templates['map-opacity-control'] = template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
  return "<li id=\"opacity-control\">\n    <a href=\"#\" class=\"parent\"><i class=\"ion-bookmark\"></i> <span>Opacity</span></a>\n    <div class=\"flyout\">\n        <div class=\"flyout-header\"><h3>Opacity</h3></div>\n        <div class=\"flyout-content identification-result\">\n\n        </div>\n    </div>\n</li>\n\n";
  },"useData":true});
templates['peta-simpul'] = template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
  var helper, functionType="function", helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression;
  return "<article class=\"entry\">\n    <div class=\"thumbnail\"><a href=\""
    + escapeExpression(((helper = (helper = helpers.url || (depth0 != null ? depth0.url : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"url","hash":{},"data":data}) : helper)))
    + "\" target=\"_blank\"><img src=\""
    + escapeExpression(((helper = (helper = helpers.thumbnail || (depth0 != null ? depth0.thumbnail : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"thumbnail","hash":{},"data":data}) : helper)))
    + "\"></a></div>\n    <div class=\"content\">\n        <h3 class=\"title\"><a href=\""
    + escapeExpression(((helper = (helper = helpers.url || (depth0 != null ? depth0.url : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"url","hash":{},"data":data}) : helper)))
    + "\" target=\"_blank\">"
    + escapeExpression(((helper = (helper = helpers.judul || (depth0 != null ? depth0.judul : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"judul","hash":{},"data":data}) : helper)))
    + "</a></h3>\n        <p>"
    + escapeExpression(((helper = (helper = helpers.deskripsi || (depth0 != null ? depth0.deskripsi : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"deskripsi","hash":{},"data":data}) : helper)))
    + "</p>\n    </div>\n</article>";
},"useData":true});
templates['toolbar-base-layer'] = template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
  return "<li id=\"toolbar-peta-dasar\">\n    <a href=\"#\" class=\"parent\"><i class=\"ion-android-earth\"></i> Peta Dasar</a>\n    <div class=\"flyout\">\n        <div class=\"header\">\n            <a href=\"#\" class=\"btn-close\"><i class=\"ion-ios7-close-empty\"></i></a>\n        </div>\n        <div class=\"content\">\n            <ul class=\"list-peta-dasar\"></ul>\n        </div>\n    </div>\n</li>";
  },"useData":true});
templates['toolbar-layer'] = template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
  return "<li id=\"toolbar-layer\">\n    <a href=\"#\" class=\"parent\"><i class=\"ion-social-buffer\"></i> Layer</a>\n    <div class=\"flyout\">\n        <div class=\"header\">\n            <a href=\"#\" class=\"btn-close\"><i class=\"ion-ios7-close-empty\"></i></a>\n            <div id=\"addlayer\" class=\"addlayer\">\n                <div id=\"addlayer-button\" class=\"coach\">\n                    <a href=\"#add\" class=\"btn primary step-next\">Tambahkan Layer</a>\n                </div>\n\n                <div id=\"addlayer-list\" class=\"coach\">\n                    <form class=\"general-form\">\n                        <div class=\"input-wrapper\">\n                            <span class=\"select-options\">\n                                <select id=\"select-server\" name=\"category\">\n                                </select>\n                                <i class=\"arrow ion-chevron-down\"></i>\n                            </span>\n                        </div>\n                    </form>\n                    <div class=\"input-wrapper\">\n                        <a href=\"#\" class=\"btn step-done\">Selesai</a>\n                    </div>\n                </div>\n\n                <div id=\"addlayer-custom-url\" class=\"coach\">\n                    <form action=\"#\" method=\"post\" class=\"general-form\">\n                        <div class=\"input-wrapper\">\n                            <input type=\"text\" id=\"custom-url-server\" name=\"server-name\" class=\"input-text\" placeholder=\"http://\">\n                        </div>\n                        <div class=\"input-wrapper\">\n                            <a href=\"#go\" class=\"btn-add-wms btn primary step-next\">Go</a>\n                            <a href=\"#selesai\" class=\"btn-done btn step-done\">Selesai</a>\n                        </div>\n                    </form>\n                </div>\n            </div>\n        </div>\n        <div class=\"content\">\n            <ul id=\"available-layer\" class=\"list-layer active\" data-wms=\"\">\n            </ul>\n            <ul id=\"used-layer\" class=\"list-layer active\">\n            </ul>\n        </div>\n    </div>\n</li>";
},"useData":true});
})();
(function() {
  var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
templates['artikel-simpul'] = template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
  var helper, functionType="function", helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression;
  return "<article class=\"entry\">\n    <div class=\"meta\"><span class=\"date\">"
    + escapeExpression(((helper = (helper = helpers.date || (depth0 != null ? depth0.date : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"date","hash":{},"data":data}) : helper)))
    + "</span></div>\n    <header><h3 class=\"title\"><a href=\""
    + escapeExpression(((helper = (helper = helpers.href || (depth0 != null ? depth0.href : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"href","hash":{},"data":data}) : helper)))
    + "\" target=\"_blank\">"
    + escapeExpression(((helper = (helper = helpers.judul || (depth0 != null ? depth0.judul : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"judul","hash":{},"data":data}) : helper)))
    + "</a></h3></header>\n    <div class=\"content\"><p>"
    + escapeExpression(((helper = (helper = helpers.content || (depth0 != null ? depth0.content : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"content","hash":{},"data":data}) : helper)))
    + "</p></div>\n    <footer class=\"action\"><a href=\""
    + escapeExpression(((helper = (helper = helpers.href || (depth0 != null ? depth0.href : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"href","hash":{},"data":data}) : helper)))
    + "\" target=\"_blank\" class=\"more\">Selengkapnya <i class=\"ion-ios7-arrow-thin-right\"></i></a></footer>\n</article>";
},"useData":true});
templates['base-template'] = template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
  var helper, functionType="function", helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression;
  return "<li id=\""
    + escapeExpression(((helper = (helper = helpers.id || (depth0 != null ? depth0.id : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"id","hash":{},"data":data}) : helper)))
    + "\">\n    <a href=\"#\"><span class=\"thumbnail\"><img src=\""
    + escapeExpression(((helper = (helper = helpers.thumb || (depth0 != null ? depth0.thumb : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"thumb","hash":{},"data":data}) : helper)))
    + "\"></span> <span class=\"title\">"
    + escapeExpression(((helper = (helper = helpers.title || (depth0 != null ? depth0.title : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"title","hash":{},"data":data}) : helper)))
    + "</span></a>\n</li>";
},"useData":true});
templates['dokumen-simpul'] = template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
  var helper, functionType="function", helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression;
  return "<li>\n    <i class=\"ion-folder bullet\"></i>\n    <h3 class=\"title\"><a href=\""
    + escapeExpression(((helper = (helper = helpers.href || (depth0 != null ? depth0.href : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"href","hash":{},"data":data}) : helper)))
    + "\" target=\"_blank\">"
    + escapeExpression(((helper = (helper = helpers.judul || (depth0 != null ? depth0.judul : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"judul","hash":{},"data":data}) : helper)))
    + "</a></h3>\n</li>";
},"useData":true});
templates['form-cetak'] = template({"1":function(depth0,helpers,partials,data) {
  var stack1, lambda=this.lambda, escapeExpression=this.escapeExpression;
  return "    <input type=\"text\" name=\"layers["
    + escapeExpression(lambda((data && data.index), depth0))
    + "][params][LAYERS]\" value=\""
    + escapeExpression(lambda(((stack1 = (depth0 != null ? depth0.params : depth0)) != null ? stack1.LAYERS : stack1), depth0))
    + "\">\n    <input type=\"text\" name=\"layers["
    + escapeExpression(lambda((data && data.index), depth0))
    + "][title]\" value=\""
    + escapeExpression(lambda((depth0 != null ? depth0.title : depth0), depth0))
    + "\">\n    <input type=\"text\" name=\"layers["
    + escapeExpression(lambda((data && data.index), depth0))
    + "][url]\" value=\""
    + escapeExpression(lambda((depth0 != null ? depth0.url : depth0), depth0))
    + "\">\n";
},"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
  var stack1, helper, functionType="function", helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression, lambda=this.lambda, buffer = "<form action=\""
    + escapeExpression(((helper = (helper = helpers.url || (depth0 != null ? depth0.url : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"url","hash":{},"data":data}) : helper)))
    + "\" method=\"post\" style=\"display:none;\" id=\"form-cetak\">\n    <input type=\"text\" name=\"judul\" value=\""
    + escapeExpression(lambda(((stack1 = (depth0 != null ? depth0.info : depth0)) != null ? stack1.judul : stack1), depth0))
    + "\">\n    <input type=\"text\" name=\"scale\" value=\""
    + escapeExpression(((helper = (helper = helpers.scale || (depth0 != null ? depth0.scale : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"scale","hash":{},"data":data}) : helper)))
    + "\">\n    <input type=\"text\" name=\"extent[minx]\" value=\""
    + escapeExpression(lambda(((stack1 = (depth0 != null ? depth0.extent : depth0)) != null ? stack1.minx : stack1), depth0))
    + "\">\n    <input type=\"text\" name=\"extent[miny]\" value=\""
    + escapeExpression(lambda(((stack1 = (depth0 != null ? depth0.extent : depth0)) != null ? stack1.miny : stack1), depth0))
    + "\">\n    <input type=\"text\" name=\"extent[maxx]\" value=\""
    + escapeExpression(lambda(((stack1 = (depth0 != null ? depth0.extent : depth0)) != null ? stack1.maxx : stack1), depth0))
    + "\">\n    <input type=\"text\" name=\"extent[maxy]\" value=\""
    + escapeExpression(lambda(((stack1 = (depth0 != null ? depth0.extent : depth0)) != null ? stack1.maxy : stack1), depth0))
    + "\">\n\n";
  stack1 = helpers.each.call(depth0, (depth0 != null ? depth0.layers : depth0), {"name":"each","hash":{},"fn":this.program(1, data),"inverse":this.noop,"data":data});
  if (stack1 != null) { buffer += stack1; }
  return buffer + "</form>";
},"useData":true});
templates['index-dokumen'] = template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
  var helper, functionType="function", helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression;
  return "<li>\n    <a href=\""
    + escapeExpression(((helper = (helper = helpers.url || (depth0 != null ? depth0.url : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"url","hash":{},"data":data}) : helper)))
    + "\" class=\"source\" target=\"_blank\">"
    + escapeExpression(((helper = (helper = helpers.kategori || (depth0 != null ? depth0.kategori : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"kategori","hash":{},"data":data}) : helper)))
    + "</a>\n    <h3 class=\"title\"><a href=\""
    + escapeExpression(((helper = (helper = helpers.href || (depth0 != null ? depth0.href : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"href","hash":{},"data":data}) : helper)))
    + "\" target=\"_blank\">"
    + escapeExpression(((helper = (helper = helpers.judul || (depth0 != null ? depth0.judul : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"judul","hash":{},"data":data}) : helper)))
    + "</a></h3>\n    <div class=\"excerpt\">\n        "
    + escapeExpression(((helper = (helper = helpers.content || (depth0 != null ? depth0.content : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"content","hash":{},"data":data}) : helper)))
    + "\n    </div>\n</li>";
},"useData":true});
templates['info-template'] = template({"1":function(depth0,helpers,partials,data) {
  var lambda=this.lambda, escapeExpression=this.escapeExpression;
  return "  <li>"
    + escapeExpression(lambda(depth0, depth0))
    + "</li>\n";
},"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
  var stack1, helper, functionType="function", helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression, buffer = "<h3>"
    + escapeExpression(((helper = (helper = helpers.title || (depth0 != null ? depth0.title : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"title","hash":{},"data":data}) : helper)))
    + "</h3>\n<ul>\n";
  stack1 = helpers.each.call(depth0, (depth0 != null ? depth0.data : depth0), {"name":"each","hash":{},"fn":this.program(1, data),"inverse":this.noop,"data":data});
  if (stack1 != null) { buffer += stack1; }
  return buffer + "</ul>";
},"useData":true});
templates['layer-template-custom'] = template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
  var helper, functionType="function", helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression;
  return "<li>\n    <span class=\"title\">\n        <span class=\"name\">"
    + escapeExpression(((helper = (helper = helpers.title || (depth0 != null ? depth0.title : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"title","hash":{},"data":data}) : helper)))
    + "</span>\n    </span>\n    <div class=\"action\">\n        <a href=\"#addLayer\" data-layer=\""
    + escapeExpression(((helper = (helper = helpers.layer || (depth0 != null ? depth0.layer : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"layer","hash":{},"data":data}) : helper)))
    + "\" data-identifier=\""
    + escapeExpression(((helper = (helper = helpers.identifier || (depth0 != null ? depth0.identifier : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"identifier","hash":{},"data":data}) : helper)))
    + "\" class=\"btn-add\"><i class=\"ion-ios7-plus-outline\"></i></a>\n    </div>\n</li>";
},"useData":true});
templates['layer-template'] = template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
  var helper, functionType="function", helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression;
  return "<li id=\""
    + escapeExpression(((helper = (helper = helpers.id || (depth0 != null ? depth0.id : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"id","hash":{},"data":data}) : helper)))
    + "\" class=\"info-active\">\n    <span class=\"title active\">\n        <a href=\"#\" class=\"ico-checkmark\"></a>\n        <span class=\"layer-name\">"
    + escapeExpression(((helper = (helper = helpers.title || (depth0 != null ? depth0.title : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"title","hash":{},"data":data}) : helper)))
    + "</span>\n    </span>\n    <div class=\"action\">\n        <a href=\"#\" class=\"ico-wrapper layer-info active\">\n            <span class=\"ico-info\"></span>\n        </a>\n        <a href=\"#\" class=\"ico-wrapper layer-remove\">\n            <span class=\"ico-remove\"></span>\n        </a>\n        <a href=\"#\" class=\"ico-wrapper layer-drag\">\n            <span class=\"ico-drag\"></span>\n        </a>\n    </div>\n</li>";
},"useData":true});
templates['map-control'] = template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
  return "<div class=\"controller\">\n    <ul>\n        <li>\n            <a href=\"#\" data-action='zoom-in' class=\"parent\"><i class=\"ion-plus\"></i> <span>Zoom In</span></a>\n        </li>\n        <li>\n            <a href=\"#\" data-action='zoom-out' class=\"parent\"><i class=\"ion-minus\"></i> <span>Zoom Out</span></a>\n        </li>\n    </ul>\n    <ul>\n        <li>\n            <a href=\"#\" data-action='full-extent' class=\"parent\"><i class=\"ion-qr-scanner\"></i> <span>Full Extent</span></a>\n        </li>\n    </ul>\n</div>";
  },"useData":true});
templates['map-inspector-identify-result'] = template({"1":function(depth0,helpers,partials,data) {
  var lambda=this.lambda, escapeExpression=this.escapeExpression;
  return "            <tr>\n                <td>"
    + escapeExpression(lambda((depth0 != null ? depth0.name : depth0), depth0))
    + "</td>\n                <td>"
    + escapeExpression(lambda((depth0 != null ? depth0.value : depth0), depth0))
    + "</td>\n            </tr>\n";
},"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
  var stack1, helper, functionType="function", helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression, buffer = "<li class=\"item\">\n    <div class=\"header\">\n        <a href=\"#\" class=\"title\">"
    + escapeExpression(((helper = (helper = helpers.title || (depth0 != null ? depth0.title : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"title","hash":{},"data":data}) : helper)))
    + " <i class=\"ion-ios7-arrow-down\"></i></a>\n    </div>\n    <div class=\"collapse\">\n        <table width=\"100%\" cellpadding=\"0\" cellspacing=\"0\" class=\"table-data\">\n            <tbody><tr>\n                <th>Name</th>\n                <th>Value</th>\n            </tr>\n";
  stack1 = helpers.each.call(depth0, (depth0 != null ? depth0.data : depth0), {"name":"each","hash":{},"fn":this.program(1, data),"inverse":this.noop,"data":data});
  if (stack1 != null) { buffer += stack1; }
  return buffer + "        </tbody></table>\n    </div>\n</li>";
},"useData":true});
templates['map-inspector-identify'] = template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
  return "<li id=\"inspector-identify\">\n    <a href=\"#\" class=\"parent\"><i class=\"ion-ios7-information\"></i> <span>Identifikasi</span></a>\n    <div class=\"flyout\">\n        <div class=\"flyout-header\">\n            <h3>Identifikasi</h3>\n        </div>\n        <div class=\"flyout-content\">\n            <ul class=\"identification-result\" id=\"identification-result\">\n\n            </ul>\n        </div>\n    </div>\n</li>";
  },"useData":true});
templates['map-inspector-legend-item'] = template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
  var helper, functionType="function", helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression;
  return "<div id=\""
    + escapeExpression(((helper = (helper = helpers.id || (depth0 != null ? depth0.id : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"id","hash":{},"data":data}) : helper)))
    + "\">\n    <div class=\"header\">\n        <a href=\"javascript:void(0)\" class=\"title\">"
    + escapeExpression(((helper = (helper = helpers.title || (depth0 != null ? depth0.title : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"title","hash":{},"data":data}) : helper)))
    + " <i class=\"ion-ios7-arrow-down\"></i></a>\n    </div>\n    <table width=\"100%\" cellpadding=\"0\" cellspacing=\"0\" class=\"table-data\">\n        <tr>\n            <td><img data-url=\""
    + escapeExpression(((helper = (helper = helpers.image || (depth0 != null ? depth0.image : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"image","hash":{},"data":data}) : helper)))
    + "\" src=\""
    + escapeExpression(((helper = (helper = helpers.image || (depth0 != null ? depth0.image : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"image","hash":{},"data":data}) : helper)))
    + "\"></td>\n        </tr>\n    </table>\n<div>";
},"useData":true});
templates['map-inspector-legend'] = template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
  return "<li id=\"inspector-legend\">\n    <a href=\"#\" class=\"parent\"><i class=\"ion-bookmark\"></i> <span>Legenda</span></a>\n    <div class=\"flyout\">\n        <div class=\"flyout-header\"><h3>Legenda</h3></div>\n        <div class=\"flyout-content identification-result\">\n\n        </div>\n    </div>\n</li>";
  },"useData":true});
templates['map-inspector-ukur'] = template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
  return "<li id=\"inspector-ukur\">\n    <a href=\"#\" class=\"parent\"><i class=\"ion-code-working\"></i> <span>Ukur</span></a>\n    <div class=\"flyout\">\n        <div class=\"flyout-header\">\n            <h3>Ukur</h3>\n        </div>\n        <div class=\"flyout-content\">\n            <div class=\"measure\">\n                <form action=\"#\" method=\"post\" class=\"general-form\">\n                    <h3>Metode</h3>\n                    <span class=\"select-options full\">\n                        <select name=\"category\" class=\"ukur-category\">\n                            <option value=\"1\" selected>Length</option>\n                            <option value=\"2\">Area</option>\n                        </select>\n                        <i class=\"arrow ion-chevron-down\"></i>\n                    </span>\n                </form>\n                <div class=\"measure-result\">\n                    <h3>Hasil</h3>\n                    <div class=\"value\">-</div>\n                </div>\n            </div>\n        </div>\n    </div>\n</li>";
  },"useData":true});
templates['map-opacity-control'] = template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
  return "<li id=\"opacity-control\">\n    <a href=\"#\" class=\"parent\"><i class=\"ion-android-display\"></i> <span>Opacity</span></a>\n    <div class=\"flyout\">\n        <div class=\"flyout-header\"><h3>Opacity</h3></div>\n        <div class=\"flyout-content identification-result\">\n\n        </div>\n    </div>\n</li>\n\n";
  },"useData":true});
templates['peta-simpul'] = template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
  var helper, functionType="function", helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression;
  return "<article class=\"entry\">\n    <div class=\"thumbnail\"><a href=\""
    + escapeExpression(((helper = (helper = helpers.url || (depth0 != null ? depth0.url : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"url","hash":{},"data":data}) : helper)))
    + "\" target=\"_blank\"><img src=\""
    + escapeExpression(((helper = (helper = helpers.thumbnail || (depth0 != null ? depth0.thumbnail : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"thumbnail","hash":{},"data":data}) : helper)))
    + "\"></a></div>\n    <div class=\"content\">\n        <h3 class=\"title\"><a href=\""
    + escapeExpression(((helper = (helper = helpers.url || (depth0 != null ? depth0.url : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"url","hash":{},"data":data}) : helper)))
    + "\" target=\"_blank\">"
    + escapeExpression(((helper = (helper = helpers.judul || (depth0 != null ? depth0.judul : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"judul","hash":{},"data":data}) : helper)))
    + "</a></h3>\n        <p>"
    + escapeExpression(((helper = (helper = helpers.deskripsi || (depth0 != null ? depth0.deskripsi : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"deskripsi","hash":{},"data":data}) : helper)))
    + "</p>\n    </div>\n</article>";
},"useData":true});
templates['toolbar-base-layer'] = template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
  return "<li id=\"toolbar-peta-dasar\">\n    <a href=\"#\" class=\"parent\"><i class=\"ion-android-earth\"></i> Peta Dasar</a>\n    <div class=\"flyout\">\n        <div class=\"header\">\n            <a href=\"#\" class=\"btn-close\"><i class=\"ion-ios7-close-empty\"></i></a>\n        </div>\n        <div class=\"content\">\n            <ul class=\"list-peta-dasar\"></ul>\n        </div>\n    </div>\n</li>";
  },"useData":true});
templates['toolbar-layer'] = template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
  return "<li id=\"toolbar-layer\">\n    <a href=\"#\" class=\"parent\"><i class=\"ion-social-buffer\"></i> Layer</a>\n    <div class=\"flyout\">\n        <div class=\"header\">\n            <a href=\"#\" class=\"btn-close\"><i class=\"ion-ios7-close-empty\"></i></a>\n            <div id=\"addlayer\" class=\"addlayer\">\n                <div id=\"addlayer-button\" class=\"coach\">\n                    <a href=\"#add\" class=\"btn primary step-next\">Tambahkan Layer</a>\n                </div>\n\n                <div id=\"addlayer-list\" class=\"coach\">\n                    <form class=\"general-form\">\n                        <div class=\"input-wrapper\">\n                            <span class=\"select-options\">\n                                <select id=\"select-server\" name=\"category\">\n                                </select>\n                                <i class=\"arrow ion-chevron-down\"></i>\n                            </span>\n                        </div>\n                    </form>\n                    <div class=\"input-wrapper\">\n                        <a href=\"#\" class=\"btn step-done\">Selesai</a>\n                    </div>\n                </div>\n\n                <div id=\"addlayer-custom-url\" class=\"coach\">\n                    <form action=\"#\" method=\"post\" class=\"general-form\">\n                        <div class=\"input-wrapper\">\n                            <input type=\"text\" id=\"custom-url-server\" name=\"server-name\" class=\"input-text\" placeholder=\"http://\">\n                        </div>\n                        <div class=\"input-wrapper\">\n                            <a href=\"#go\" class=\"btn-add-wms btn primary step-next\">Go</a>\n                            <a href=\"#selesai\" class=\"btn-done btn step-done\">Selesai</a>\n                        </div>\n                    </form>\n                </div>\n            </div>\n        </div>\n        <div class=\"content\">\n            <ul id=\"available-layer\" class=\"list-layer active\" data-wms=\"\">\n            </ul>\n            <ul id=\"used-layer\" class=\"list-layer active\">\n            </ul>\n        </div>\n    </div>\n</li>";
},"useData":true});
})();
(function() {
  var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
templates['artikel-simpul'] = template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
  var helper, functionType="function", helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression;
  return "<article class=\"entry\">\n    <div class=\"meta\"><span class=\"date\">"
    + escapeExpression(((helper = (helper = helpers.date || (depth0 != null ? depth0.date : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"date","hash":{},"data":data}) : helper)))
    + "</span></div>\n    <header><h3 class=\"title\"><a href=\""
    + escapeExpression(((helper = (helper = helpers.href || (depth0 != null ? depth0.href : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"href","hash":{},"data":data}) : helper)))
    + "\" target=\"_blank\">"
    + escapeExpression(((helper = (helper = helpers.judul || (depth0 != null ? depth0.judul : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"judul","hash":{},"data":data}) : helper)))
    + "</a></h3></header>\n    <div class=\"content\"><p>"
    + escapeExpression(((helper = (helper = helpers.content || (depth0 != null ? depth0.content : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"content","hash":{},"data":data}) : helper)))
    + "</p></div>\n    <footer class=\"action\"><a href=\""
    + escapeExpression(((helper = (helper = helpers.href || (depth0 != null ? depth0.href : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"href","hash":{},"data":data}) : helper)))
    + "\" target=\"_blank\" class=\"more\">Selengkapnya <i class=\"ion-ios7-arrow-thin-right\"></i></a></footer>\n</article>";
},"useData":true});
templates['base-template'] = template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
  var helper, functionType="function", helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression;
  return "<li id=\""
    + escapeExpression(((helper = (helper = helpers.id || (depth0 != null ? depth0.id : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"id","hash":{},"data":data}) : helper)))
    + "\">\n    <a href=\"#\"><span class=\"thumbnail\"><img src=\""
    + escapeExpression(((helper = (helper = helpers.thumb || (depth0 != null ? depth0.thumb : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"thumb","hash":{},"data":data}) : helper)))
    + "\"></span> <span class=\"title\">"
    + escapeExpression(((helper = (helper = helpers.title || (depth0 != null ? depth0.title : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"title","hash":{},"data":data}) : helper)))
    + "</span></a>\n</li>";
},"useData":true});
templates['dokumen-simpul'] = template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
  var helper, functionType="function", helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression;
  return "<li>\n    <i class=\"ion-folder bullet\"></i>\n    <h3 class=\"title\"><a href=\""
    + escapeExpression(((helper = (helper = helpers.href || (depth0 != null ? depth0.href : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"href","hash":{},"data":data}) : helper)))
    + "\" target=\"_blank\">"
    + escapeExpression(((helper = (helper = helpers.judul || (depth0 != null ? depth0.judul : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"judul","hash":{},"data":data}) : helper)))
    + "</a></h3>\n</li>";
},"useData":true});
templates['form-cetak'] = template({"1":function(depth0,helpers,partials,data) {
  var stack1, lambda=this.lambda, escapeExpression=this.escapeExpression;
  return "    <input type=\"text\" name=\"layers["
    + escapeExpression(lambda((data && data.index), depth0))
    + "][params][LAYERS]\" value=\""
    + escapeExpression(lambda(((stack1 = (depth0 != null ? depth0.params : depth0)) != null ? stack1.LAYERS : stack1), depth0))
    + "\">\n    <input type=\"text\" name=\"layers["
    + escapeExpression(lambda((data && data.index), depth0))
    + "][title]\" value=\""
    + escapeExpression(lambda((depth0 != null ? depth0.title : depth0), depth0))
    + "\">\n    <input type=\"text\" name=\"layers["
    + escapeExpression(lambda((data && data.index), depth0))
    + "][url]\" value=\""
    + escapeExpression(lambda((depth0 != null ? depth0.url : depth0), depth0))
    + "\">\n";
},"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
  var stack1, helper, functionType="function", helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression, lambda=this.lambda, buffer = "<form action=\""
    + escapeExpression(((helper = (helper = helpers.url || (depth0 != null ? depth0.url : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"url","hash":{},"data":data}) : helper)))
    + "\" method=\"post\" style=\"display:none;\" id=\"form-cetak\">\n    <input type=\"text\" name=\"judul\" value=\""
    + escapeExpression(lambda(((stack1 = (depth0 != null ? depth0.info : depth0)) != null ? stack1.judul : stack1), depth0))
    + "\">\n    <input type=\"text\" name=\"scale\" value=\""
    + escapeExpression(((helper = (helper = helpers.scale || (depth0 != null ? depth0.scale : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"scale","hash":{},"data":data}) : helper)))
    + "\">\n    <input type=\"text\" name=\"extent[minx]\" value=\""
    + escapeExpression(lambda(((stack1 = (depth0 != null ? depth0.extent : depth0)) != null ? stack1.minx : stack1), depth0))
    + "\">\n    <input type=\"text\" name=\"extent[miny]\" value=\""
    + escapeExpression(lambda(((stack1 = (depth0 != null ? depth0.extent : depth0)) != null ? stack1.miny : stack1), depth0))
    + "\">\n    <input type=\"text\" name=\"extent[maxx]\" value=\""
    + escapeExpression(lambda(((stack1 = (depth0 != null ? depth0.extent : depth0)) != null ? stack1.maxx : stack1), depth0))
    + "\">\n    <input type=\"text\" name=\"extent[maxy]\" value=\""
    + escapeExpression(lambda(((stack1 = (depth0 != null ? depth0.extent : depth0)) != null ? stack1.maxy : stack1), depth0))
    + "\">\n\n";
  stack1 = helpers.each.call(depth0, (depth0 != null ? depth0.layers : depth0), {"name":"each","hash":{},"fn":this.program(1, data),"inverse":this.noop,"data":data});
  if (stack1 != null) { buffer += stack1; }
  return buffer + "</form>";
},"useData":true});
templates['index-dokumen'] = template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
  var helper, functionType="function", helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression;
  return "<li>\n    <a href=\""
    + escapeExpression(((helper = (helper = helpers.url || (depth0 != null ? depth0.url : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"url","hash":{},"data":data}) : helper)))
    + "\" class=\"source\" target=\"_blank\">"
    + escapeExpression(((helper = (helper = helpers.kategori || (depth0 != null ? depth0.kategori : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"kategori","hash":{},"data":data}) : helper)))
    + "</a>\n    <h3 class=\"title\"><a href=\""
    + escapeExpression(((helper = (helper = helpers.href || (depth0 != null ? depth0.href : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"href","hash":{},"data":data}) : helper)))
    + "\" target=\"_blank\">"
    + escapeExpression(((helper = (helper = helpers.judul || (depth0 != null ? depth0.judul : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"judul","hash":{},"data":data}) : helper)))
    + "</a></h3>\n    <div class=\"excerpt\">\n        "
    + escapeExpression(((helper = (helper = helpers.content || (depth0 != null ? depth0.content : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"content","hash":{},"data":data}) : helper)))
    + "\n    </div>\n</li>";
},"useData":true});
templates['info-template'] = template({"1":function(depth0,helpers,partials,data) {
  var lambda=this.lambda, escapeExpression=this.escapeExpression;
  return "  <li>"
    + escapeExpression(lambda(depth0, depth0))
    + "</li>\n";
},"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
  var stack1, helper, functionType="function", helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression, buffer = "<h3>"
    + escapeExpression(((helper = (helper = helpers.title || (depth0 != null ? depth0.title : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"title","hash":{},"data":data}) : helper)))
    + "</h3>\n<ul>\n";
  stack1 = helpers.each.call(depth0, (depth0 != null ? depth0.data : depth0), {"name":"each","hash":{},"fn":this.program(1, data),"inverse":this.noop,"data":data});
  if (stack1 != null) { buffer += stack1; }
  return buffer + "</ul>";
},"useData":true});
templates['layer-template-custom'] = template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
  var helper, functionType="function", helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression;
  return "<li>\n    <span class=\"title\">\n        <span class=\"name\">"
    + escapeExpression(((helper = (helper = helpers.title || (depth0 != null ? depth0.title : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"title","hash":{},"data":data}) : helper)))
    + "</span>\n    </span>\n    <div class=\"action\">\n        <a href=\"#addLayer\" data-layer=\""
    + escapeExpression(((helper = (helper = helpers.layer || (depth0 != null ? depth0.layer : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"layer","hash":{},"data":data}) : helper)))
    + "\" data-identifier=\""
    + escapeExpression(((helper = (helper = helpers.identifier || (depth0 != null ? depth0.identifier : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"identifier","hash":{},"data":data}) : helper)))
    + "\" class=\"btn-add\"><i class=\"ion-ios7-plus-outline\"></i></a>\n    </div>\n</li>";
},"useData":true});
templates['layer-template'] = template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
  var helper, functionType="function", helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression;
  return "<li id=\""
    + escapeExpression(((helper = (helper = helpers.id || (depth0 != null ? depth0.id : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"id","hash":{},"data":data}) : helper)))
    + "\" class=\"info-active\">\n    <span class=\"title active\">\n        <a href=\"#\" class=\"ico-checkmark\"></a>\n        <span class=\"layer-name\">"
    + escapeExpression(((helper = (helper = helpers.title || (depth0 != null ? depth0.title : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"title","hash":{},"data":data}) : helper)))
    + "</span>\n    </span>\n    <div class=\"action\">\n        <a href=\"#\" class=\"ico-wrapper layer-info active\">\n            <span class=\"ico-info\"></span>\n        </a>\n        <a href=\"#\" class=\"ico-wrapper layer-remove\">\n            <span class=\"ico-remove\"></span>\n        </a>\n        <a href=\"#\" class=\"ico-wrapper layer-drag\">\n            <span class=\"ico-drag\"></span>\n        </a>\n    </div>\n</li>";
},"useData":true});
templates['map-control'] = template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
  return "<div class=\"controller\">\n    <ul>\n        <li>\n            <a href=\"#\" data-action='zoom-in' class=\"parent\"><i class=\"ion-plus\"></i> <span>Zoom In</span></a>\n        </li>\n        <li>\n            <a href=\"#\" data-action='zoom-out' class=\"parent\"><i class=\"ion-minus\"></i> <span>Zoom Out</span></a>\n        </li>\n    </ul>\n    <ul>\n        <li>\n            <a href=\"#\" data-action='full-extent' class=\"parent\"><i class=\"ion-qr-scanner\"></i> <span>Full Extent</span></a>\n        </li>\n    </ul>\n</div>";
  },"useData":true});
templates['map-inspector-identify-result'] = template({"1":function(depth0,helpers,partials,data) {
  var lambda=this.lambda, escapeExpression=this.escapeExpression;
  return "            <tr>\n                <td>"
    + escapeExpression(lambda((depth0 != null ? depth0.name : depth0), depth0))
    + "</td>\n                <td>"
    + escapeExpression(lambda((depth0 != null ? depth0.value : depth0), depth0))
    + "</td>\n            </tr>\n";
},"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
  var stack1, helper, functionType="function", helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression, buffer = "<li class=\"item\">\n    <div class=\"header\">\n        <a href=\"#\" class=\"title\">"
    + escapeExpression(((helper = (helper = helpers.title || (depth0 != null ? depth0.title : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"title","hash":{},"data":data}) : helper)))
    + " <i class=\"ion-ios7-arrow-down\"></i></a>\n    </div>\n    <div class=\"collapse\">\n        <table width=\"100%\" cellpadding=\"0\" cellspacing=\"0\" class=\"table-data\">\n            <tbody><tr>\n                <th>Name</th>\n                <th>Value</th>\n            </tr>\n";
  stack1 = helpers.each.call(depth0, (depth0 != null ? depth0.data : depth0), {"name":"each","hash":{},"fn":this.program(1, data),"inverse":this.noop,"data":data});
  if (stack1 != null) { buffer += stack1; }
  return buffer + "        </tbody></table>\n    </div>\n</li>";
},"useData":true});
templates['map-inspector-identify'] = template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
  return "<li id=\"inspector-identify\">\n    <a href=\"#\" class=\"parent\"><i class=\"ion-ios7-information\"></i> <span>Identifikasi</span></a>\n    <div class=\"flyout\">\n        <div class=\"flyout-header\">\n            <h3>Identifikasi</h3>\n        </div>\n        <div class=\"flyout-content\">\n            <ul class=\"identification-result\" id=\"identification-result\">\n\n            </ul>\n        </div>\n    </div>\n</li>";
  },"useData":true});
templates['map-inspector-legend-item'] = template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
  var helper, functionType="function", helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression;
  return "<div id=\""
    + escapeExpression(((helper = (helper = helpers.id || (depth0 != null ? depth0.id : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"id","hash":{},"data":data}) : helper)))
    + "\">\n    <div class=\"header\">\n        <a href=\"javascript:void(0)\" class=\"title\">"
    + escapeExpression(((helper = (helper = helpers.title || (depth0 != null ? depth0.title : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"title","hash":{},"data":data}) : helper)))
    + " <i class=\"ion-ios7-arrow-down\"></i></a>\n    </div>\n    <table width=\"100%\" cellpadding=\"0\" cellspacing=\"0\" class=\"table-data\">\n        <tr>\n            <td><img data-url=\""
    + escapeExpression(((helper = (helper = helpers.image || (depth0 != null ? depth0.image : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"image","hash":{},"data":data}) : helper)))
    + "\" src=\""
    + escapeExpression(((helper = (helper = helpers.image || (depth0 != null ? depth0.image : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"image","hash":{},"data":data}) : helper)))
    + "\"></td>\n        </tr>\n    </table>\n<div>";
},"useData":true});
templates['map-inspector-legend'] = template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
  return "<li id=\"inspector-legend\">\n    <a href=\"#\" class=\"parent\"><i class=\"ion-bookmark\"></i> <span>Legenda</span></a>\n    <div class=\"flyout\">\n        <div class=\"flyout-header\"><h3>Legenda</h3></div>\n        <div class=\"flyout-content identification-result\">\n\n        </div>\n    </div>\n</li>";
  },"useData":true});
templates['map-inspector-ukur'] = template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
  return "<li id=\"inspector-ukur\">\n    <a href=\"#\" class=\"parent\"><i class=\"ion-code-working\"></i> <span>Ukur</span></a>\n    <div class=\"flyout\">\n        <div class=\"flyout-header\">\n            <h3>Ukur</h3>\n        </div>\n        <div class=\"flyout-content\">\n            <div class=\"measure\">\n                <form action=\"#\" method=\"post\" class=\"general-form\">\n                    <h3>Metode</h3>\n                    <span class=\"select-options full\">\n                        <select name=\"category\" class=\"ukur-category\">\n                            <option value=\"1\" selected>Length</option>\n                            <option value=\"2\">Area</option>\n                        </select>\n                        <i class=\"arrow ion-chevron-down\"></i>\n                    </span>\n                </form>\n                <div class=\"measure-result\">\n                    <h3>Hasil</h3>\n                    <div class=\"value\">-</div>\n                </div>\n            </div>\n        </div>\n    </div>\n</li>";
  },"useData":true});
templates['map-opacity-control'] = template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
  return "<li id=\"opacity-control\">\n    <a href=\"#\" class=\"parent\"><i class=\"ion-android-display\"></i> <span>Opacity</span></a>\n    <div class=\"flyout\">\n        <div class=\"flyout-header\"><h3>Opacity</h3></div>\n        <div class=\"flyout-content opacity-list\"></div>\n    </div>\n</li>\n\n";
  },"useData":true});
templates['peta-simpul'] = template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
  var helper, functionType="function", helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression;
  return "<article class=\"entry\">\n    <div class=\"thumbnail\"><a href=\""
    + escapeExpression(((helper = (helper = helpers.url || (depth0 != null ? depth0.url : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"url","hash":{},"data":data}) : helper)))
    + "\" target=\"_blank\"><img src=\""
    + escapeExpression(((helper = (helper = helpers.thumbnail || (depth0 != null ? depth0.thumbnail : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"thumbnail","hash":{},"data":data}) : helper)))
    + "\"></a></div>\n    <div class=\"content\">\n        <h3 class=\"title\"><a href=\""
    + escapeExpression(((helper = (helper = helpers.url || (depth0 != null ? depth0.url : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"url","hash":{},"data":data}) : helper)))
    + "\" target=\"_blank\">"
    + escapeExpression(((helper = (helper = helpers.judul || (depth0 != null ? depth0.judul : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"judul","hash":{},"data":data}) : helper)))
    + "</a></h3>\n        <p>"
    + escapeExpression(((helper = (helper = helpers.deskripsi || (depth0 != null ? depth0.deskripsi : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"deskripsi","hash":{},"data":data}) : helper)))
    + "</p>\n    </div>\n</article>";
},"useData":true});
templates['toolbar-base-layer'] = template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
  return "<li id=\"toolbar-peta-dasar\">\n    <a href=\"#\" class=\"parent\"><i class=\"ion-android-earth\"></i> Peta Dasar</a>\n    <div class=\"flyout\">\n        <div class=\"header\">\n            <a href=\"#\" class=\"btn-close\"><i class=\"ion-ios7-close-empty\"></i></a>\n        </div>\n        <div class=\"content\">\n            <ul class=\"list-peta-dasar\"></ul>\n        </div>\n    </div>\n</li>";
  },"useData":true});
templates['toolbar-layer'] = template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
  return "<li id=\"toolbar-layer\">\n    <a href=\"#\" class=\"parent\"><i class=\"ion-social-buffer\"></i> Layer</a>\n    <div class=\"flyout\">\n        <div class=\"header\">\n            <a href=\"#\" class=\"btn-close\"><i class=\"ion-ios7-close-empty\"></i></a>\n            <div id=\"addlayer\" class=\"addlayer\">\n                <div id=\"addlayer-button\" class=\"coach\">\n                    <a href=\"#add\" class=\"btn primary step-next\">Tambahkan Layer</a>\n                </div>\n\n                <div id=\"addlayer-list\" class=\"coach\">\n                    <form class=\"general-form\">\n                        <div class=\"input-wrapper\">\n                            <span class=\"select-options\">\n                                <select id=\"select-server\" name=\"category\">\n                                </select>\n                                <i class=\"arrow ion-chevron-down\"></i>\n                            </span>\n                        </div>\n                    </form>\n                    <div class=\"input-wrapper\">\n                        <a href=\"#\" class=\"btn step-done\">Selesai</a>\n                    </div>\n                </div>\n\n                <div id=\"addlayer-custom-url\" class=\"coach\">\n                    <form action=\"#\" method=\"post\" class=\"general-form\">\n                        <div class=\"input-wrapper\">\n                            <input type=\"text\" id=\"custom-url-server\" name=\"server-name\" class=\"input-text\" placeholder=\"http://\">\n                        </div>\n                        <div class=\"input-wrapper\">\n                            <a href=\"#go\" class=\"btn-add-wms btn primary step-next\">Ok</a>\n                            <a href=\"#selesai\" class=\"btn-done btn step-done\">Selesai</a>\n                        </div>\n                    </form>\n                </div>\n            </div>\n        </div>\n        <div class=\"content\">\n            <ul id=\"available-layer\" class=\"list-layer active\" data-wms=\"\">\n            </ul>\n            <ul id=\"used-layer\" class=\"list-layer active\">\n            </ul>\n        </div>\n    </div>\n</li>";
},"useData":true});
})();
