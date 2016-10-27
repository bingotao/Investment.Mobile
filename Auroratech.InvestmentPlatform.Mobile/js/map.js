var _g = {
    map: null,
    symbols: null,
    graphicsLayer: null,

    layers:     //地图服务集
        {
            DXT: { url: djConfig.mapServiceIP + 'XQ_TDTDT2/MapServer' },
            DXT_ZJ: { url: djConfig.mapServiceIP + 'XQ_TDTDTZJ/MapServer' },
            WX2013: { url: djConfig.mapServiceIP + 'XQ_IMAGE2013/MapServer' },
            WX2014: { url: djConfig.mapServiceIP + 'XQ_IMAGE2014/MapServer' },

            City: { url: djConfig.mapServiceIP + 'mobile/QY/MapServer/0' },
            Park: { url: djConfig.mapServiceIP + 'mobile/QY/MapServer/2' },
            Town: { url: djConfig.mapServiceIP + 'mobile/QY/MapServer/1' },

            PEWG: { url: djConfig.mapServiceIP + 'mobile/KYDK_CF/MapServer/1' },
            GHDK: { url: djConfig.mapServiceIP + 'mobile/ZSDATA2/MapServer/1' },
            CQ: { url: djConfig.mapServiceIP + 'mobile/ZSDATA2/MapServer/2' },
            CF: { url: djConfig.mapServiceIP + 'mobile/KYDK_CF/MapServer/0' },
            ZT: { url: djConfig.mapServiceIP + 'mobile/ZSDATA2/MapServer/4' },
            ZTLD: { url: djConfig.mapServiceIP + 'mobile/ZTLD/MapServer/0' }
        },
    baseLayers: {
        image: null,
        vector: null,
        anno: null
    },
    baseMaps:       //底图
        {
            imageMap:
                {
                    layers: [],
                    imgUrl: 'css/image/WX2014.png',
                    title: '卫星',
                    current: false
                },
            vectorMap:
                {
                    layers: [],
                    imgUrl: 'css/image/DXT.png',
                    title: '地图',
                    current: false
                }
        },
    fields:     //字段配置
        {
            PEWG: {
                fields: { KLYZT: '可利用状态', TDYT: '土地用途', TDZL: '土地坐落', TDMJ_M: '土地面积（亩）', XZMJ_M: '闲置面积（亩）', ZKGLBM: '扎口管理部门', GHJRDSJ: '规划局认定时间', GHJYJ: '规划局意见', TDLYJY: '土地利用建议' },
                displayField: 'TDID'
            },
            GHDK: {
                fields: { DKBH: "地块编号", TDMJ_M: "土地面积_亩", TDYT: "土地用途", },
                displayField: 'DKBH'
            },
            CF: {
                fields: {
                    CFMC: '厂房名称', QRSJ: '调查时间', ZH: '幢号', SYQR: '所有权人', FWCQZH: '房屋权证号', JZMJ: '建筑面积', XZMJ: '闲置面积', FWJG: '房屋结构', YT: '用途', CS: '层数（主体/局部）', KD: '跨度（m）', KS: '跨数', DTHT: '电梯、货梯', SFZX: '是否装修', CG: '层高(m) （主体/局部）', YWHC: '有无行车', CZ: '承重', HYLB: '行业类别'
                },
                displayField: 'CFMC'
            },
            ZT: {
                fields: { "YQMC": "名称", "GLDW": "管理单位", "DZ": "地址", "BH": "编号", "JZMJ_W": "建筑面积_万平方米", "XZMJ_W": "闲置面积_万平方米" },
                displayField: 'YQMC'
            },
            CQ: {
                fields: { YQMC: '厂区名称', SZ: '四至', ZJZMJ: '总建筑面积', JZXT: '建筑形态', YYMS: '运营模式', HYFL: '行业分类', PS_PSFS: '排水方式', PS_PSZK: '排水状况', PS_SFPBWSCLZ: '是否配备污水处理站', GD_GDBZL: '供电保证率', GD_RL: '供电容量', GD_GL: '供电功率', GQ_GQBZL: '供气保证率' },
                displayField: 'YQMC'
            },
            ZTLD: {
                fields: { 'ZTMC': '载体名称', 'QY': '区域', 'LDH': '楼栋号', 'ZJZMJ': '总建筑面积', 'YSYMJ': '已使用面积', 'XZMJ': '闲置面积', 'RZQYS': '入驻企业数', 'BZ': '备注' },
                displayField: 'LDH'
            }
        },
    extent: {
        oExtent: {
            xmax: 120.66200844248038,
            xmin: 120.19302956064445,
            ymax: 31.623910184604977,
            ymin: 31.40315365384326,
            spatialReference:
                {
                    wkid: 4326
                }
        },
        obj: null
    },
    center:
		{
		    point: {
		        //天地图
		        x: 120.40583826946059,
		        y: 31.510085558389342
		        //百度
		        //x: 8003237.451452244,
		        //y: 2195186.4968939973
		    },
		    level: 12
		    //level: 14
		},
    featureSet: null,   //当前结果集（featureSet）
    type: null,         //当前类型
    empty: '',
    $:                  //全局DOM对象
    {
        CF: {
            $datagrid: null,
            $title: null
        },
        CQ: {
            $datagrid: null,
            $title: null
        },
        COM: {}
    },
    photoPath: 'images/pictures/'
};

require([
	'esri/map', 'esri/graphic',
	'esri/geometry/Extent', 'esri/geometry/Point', 'esri/geometry/Polyline', 'esri/geometry/Polygon', 'esri/geometry/geometryEngine',
	'esri/layers/ArcGISTiledMapServiceLayer', 'esri/layers/ArcGISDynamicMapServiceLayer', 'esri/layers/FeatureLayer', 'esri/layers/GraphicsLayer',
	'esri/symbols/SimpleMarkerSymbol', 'esri/symbols/SimpleLineSymbol', 'esri/symbols/SimpleFillSymbol',
	'esri/tasks/query', 'esri/tasks/QueryTask',
    'esri/toolbars/draw',
	//'esri/dijit/Scalebar',
    'esri/dijit/LocateButton',
    'lib/tianditu/TDTLayer',
	'dojo/domReady!'
], function (
	Map, Graphic,
	Extent, Point, Polyline, Polygon, geometryEngine,
	ArcGISTiledMapServiceLayer, ArcGISDynamicMapServiceLayer, FeatureLayer, GraphicsLayer,
	SimpleMarkerSymbol, SimpleLineSymbol, SimpleFillSymbol,
	Query, QueryTask,
    Draw,
	//Scalebar,
    LocateButton,
    TDTLayer
	) {
    var layers = _g.layers;
    var symbols = GetInitSymbols();
    var graphicsLayer = null;
    var flashGraphicsLayer = null;
    _g.symbols = symbols;

    var drawToolOn = false;
    _g.extent.obj = new Extent(_g.extent.oExtent);
    var map = new Map('map', {
        logo: false, slider: false, fadeOnZoom: true, force3DTransforms: true, navigationMode: "css-transforms",
        extent: _g.extent.obj
    });
    _g.map = map;

    var locateButton = new LocateButton({
        map: map,
        symbol: symbols.flashPoint
    }, 'locateButton');

    locateButton.on('locate', function (evt) {
        var graphicSmall = new Graphic(evt.graphic.geometry, symbols.flashPointSmall);
        var graphicBig = new Graphic(evt.graphic.geometry, symbols.flashPointBig);
        flashGraphicsLayer.clear();
        flashGraphicsLayer.add(graphicBig);
        flashGraphicsLayer.add(graphicSmall);
        var node = graphicBig.getNode();
        node.setAttribute('flash', 'scaleout');
        locateButton.clear();
    });

    //var scalebar = new Scalebar({ map: map, attachTo: 'bottom-right', scalebarStyle: 'line', scalebarUnit: 'dual' });

    InitDom();
    InitMap();
    InitBasemapGallery('basemapGallery');
    InitNavBar();
    InitMeasureTool();

    function InitMap() {
        function Init() {
            graphicsLayer = new GraphicsLayer({ id: 'featureContainer' });
            _g.graphicsLayer = graphicsLayer;

            flashGraphicsLayer = new GraphicsLayer({ id: 'flashGraphicsLayer' });
            _g.flashGraphicsLayer = flashGraphicsLayer;

            map.addLayer(flashGraphicsLayer);
            graphicsLayer.on('click', function (evt) {
                if (!drawToolOn) {
                    map.graphics.clear();
                    var graphic = new Graphic(evt.graphic.geometry, symbols.lineSymbolSelected, evt.graphic.attributes);
                    map.graphics.add(graphic);
                    ShowFeatureDetail(evt.graphic, evt.mapPoint, _g.type);
                }
            });
            map.addLayer(graphicsLayer);
        }
        if (map.loaded) {
            Init();
        } else {
            map.on('load', Init);
        }
    }

    function InitDom() {
        var $basemapContainer = $('#basemapGallery');
        var $btnLayers = $('.ct-btn-layers');
        var $btnAreasText = $('.ct-btn-areas-text');
        var $btnAreasSlider = $('.ct-btn-areas-slider');
        var $btnAreas = $('.ct-btn-areas');
        var $areasContainer = $('.ct-areas-container');
        _g.$.COM.$panelOut = $('.ct-btn-panel-toggle-out');

        $('#map').on('click', function () {
            if ($areasContainer.hasClass('display-block')) {
                $btnAreasSlider.click();
            }
            if ($basemapContainer.hasClass('display-block')) {
                $btnLayers.click();
            }
        });

        $btnLayers.on('click', function (evt) {
            $basemapContainer.toggleClass('display-block');
            $btnLayers.toggleClass('icon-reorder');
            $btnLayers.toggleClass('icon-remove');
        });

        $btnAreasSlider.on('click', function (evt) {
            $btnAreasSlider.toggleClass('icon-sort-down');
            $btnAreasSlider.toggleClass('icon-sort-up');
            $areasContainer.toggleClass('display-block');
        });

        $('.ct-areas-container span').on('click', function () {
            var $this = $(this);
            var info = $this.data('info');
            var text = $this.html();
            $btnAreasText.html(text);
            $btnAreasText.data('info', info);
            var code = info.code;
            var type = info.type;
            CenterArea(code, type);
        });

        $btnAreasText.click(function () {
            var info = $btnAreasText.data('info');
            if (info) {
                CenterArea(info.code, info.type);
            }
        });

        $('.ct-btn-img-close').click(function () {
            var $this = $(this);
            $this.parent().addClass('display-none');
        });

        $('.ct-cf-detail-close').click(function () {
            var $this = $(this);
            $this.parent().css('display', 'none');
        });
    }

    function CenterArea(code, type) {
        switch (type) {
            case 'jd':
                var url = layers.Town.url;
                var whereCause = "XZQDM='320292" + code + "'";
                QueryLayer(url, whereCause, map.spatialReference, null, function (featureSet) {
                    if (featureSet.features.length) {
                        var feature = featureSet.features[0];
                        CenterAndFlashFeature(map, feature, false, true, 3000);
                    }
                });
                break;
            case 'yq':
                var url = layers.Park.url;
                var whereCause = "YQDM='" + code + "'";
                QueryLayer(url, whereCause, map.spatialReference, null, function (featureSet) {
                    if (featureSet.features.length) {
                        var feature = featureSet.features[0];
                        CenterAndFlashFeature(map, feature, false, true, 3000);
                    }
                });
                break;
            case 'xzq':
                var url = layers.City.url;
                var whereCause = "XZQDM='" + code + "'";
                QueryLayer(url, whereCause, map.spatialReference, null, function (featureSet) {
                    if (featureSet.features.length) {
                        var feature = featureSet.features[0];
                        CenterAndFlashFeature(map, feature, false, true, 3000);
                    }
                });
                break;
            default:
                break;
        }
    }

    function CenterMap() {
        map.setExtent(_g.extent.obj);
    }

    function ShowFeatureDetail(feature, point, type) {
        var attributes = feature.attributes;
        point = point ? point : feature.geometry.getExtent().getCenter();
        var fields = _g.fields.current.fields;
        var html = _g.empty;
        for (var name in fields) {
            var item = fields[name];
            var val = attributes[name];
            val = val ? val : '';
            val = typeof (val) == 'number' ? (val.toFixed(2) - 0) : val;
            html += '<tr><th>' + item + '</th><td>' + (val ? val : '') + '</td>';
        }

        var btnHmtl = _g.empty;
        if (type == '厂房') {
            btnHmtl = '<span class="ct-btn-view-cq">厂房详情</span>'
        }
        //else if (type == '厂区') {
        //    btnHmtl = '<span class="ct-btn-view-cf">厂房</span>'
        //}
        html = '<span class="ct-btn-view-picture">照片</span>' + btnHmtl + '<table class="ct-table-container">' + html + '</table>';
        _g.$.COM.$detailPanelDetail.html(html);
        _g.$.COM.$detailPanelTitle.html(attributes[_g.fields.current.displayField]);
        _g.$.COM.$panelOut.click();
        _g.$.COM.$detailPanel.addClass('z-index9');
        //查看照片按钮
        $('.ct-btn-view-picture').data('BSM', attributes.BSM).click(function () {
            var $this = $(this);
            var bsm = $this.data('BSM');
            InitPhoto(bsm);
            return false;
        });

        //查看厂房详情按钮
        $('.ct-btn-view-cq').data('BSM', attributes.BSM).click(function () {
            var $this = $(this);
            var bsm = $this.data('BSM');

            //后台查询厂房详情
            $.post('service/CommonHandler.ashx?action=GetCFXQ&BSM=' + bsm, function (data) {
                if (data.ErrorMessage) {
                    alert(data.ErrorMessage);
                } else {
                    SetData(data.Data);
                    var $tb = $('.ct-cf-detail');
                    $tb.css('display', 'block');
                }
            }, 'json');
            return false;
        });

        InitNav();

        if (type == '载体楼栋') {
            $.post('service/CommonHandler.ashx?action=GetRooms&BSM=' + attributes.BSM, function (rt) {
                if (rt.ErrorMessage) {
                    alert(rt.ErrorMessage);
                } else {
                    var rooms = rt.Data.rooms;
                    ldPanel.loadData(rooms);
                    ldPanel.show();
                }
            }, 'json');
        }
    }

    function InitBasemapGallery(id) {
        var bl_image = new TDTLayer('img');
        var bl_img_anno = new TDTLayer('imganno');
        bl_img_anno.anno = true;
        var bl_vector = new TDTLayer('vec');
        var bl_vec_anno = new TDTLayer('vecanno');
        bl_vec_anno.anno = true;

        _g.baseLayers.image = bl_image;
        _g.baseLayers.vector = bl_vector;
        _g.baseLayers.anno_vec = bl_vec_anno;
        _g.baseLayers.anno_img = bl_img_anno;

        _g.baseMaps.imageMap.layers.push(bl_image);
        _g.baseMaps.imageMap.layers.push(bl_img_anno);

        _g.baseMaps.vectorMap.layers.push(bl_vector);
        _g.baseMaps.vectorMap.layers.push(bl_vec_anno);
        var $basemapGallery = $('#' + id);

        for (var name in _g.baseMaps) {
            var item = _g.baseMaps[name];
            var html = '<div><img src="' + item.imgUrl + '"><span>' + item.title + '</span></div>';
            $(html).data('info', item).appendTo($basemapGallery).click(SelectBaseMap);
        }

        var $switchBtnContainer = $('<div><div class="ct-switch-btn"><div><span>ON</span><span>注 记</span><span>OFF</span></div></div></div>').appendTo($basemapGallery);
        var $switchBtn = $switchBtnContainer.find('.ct-switch-btn');
        var $switchPanel = $switchBtn.find('div');
        $switchBtn.data('on', true);

        $switchBtn.click(function () {
            var on = $switchBtn.data('on');
            on = !on;
            $switchBtn.data('on', on);
            if (on) {
                $switchPanel.css('left', 0);
            } else {
                $switchPanel.css('left', -50);
            }
            SetAnnoLayerVisible(on);
        });

        function SetAnnoLayerVisible(visible) {
            var layerIds = map.layerIds;
            for (var i = 0; i < layerIds.length; i++) {
                var layer = map.getLayer(layerIds[i]);
                if (layer.anno) {
                    layer.setVisibility(visible);
                }
            }
        }

        $basemapGallery.find('div').first().click();

        function SelectBaseMap() {
            var $this = $(this);
            if (!$this.find('img').hasClass('selected-on')) {
                var info = $this.data('info');
                $basemapGallery.find('img').removeClass('selected-on');
                $this.find('img').addClass('selected-on');
                for (var name in _g.baseMaps) {
                    var item = _g.baseMaps[name];
                    if (item.current) {
                        var layers = item.layers;
                        for (var i = 0; i < layers.length; i++) {
                            var layer = layers[i];
                            map.removeLayer(layer);
                        }
                        item.current = false;
                    }
                }
                var layers = info.layers;
                $this.data('info').current = true;
                for (var i = 0; i < layers.length; i++) {
                    var layer = layers[i];
                    map.addLayer(layer, i);
                }
                SetAnnoLayerVisible($switchBtn.data('on'));
            }
        }
    }

    function QueryLayer(url, where, outSpatialReference, geometry, callback, outFields, orderByFields) {
        var query = new Query();
        query.returnGeometry = true;
        if (outSpatialReference)
            query.outSpatialReference = outSpatialReference;
        if (where) {
            query.where = where
        }
        else {
            query.where = '1=1';
        }
        if (orderByFields) query.orderByFields = orderByFields;

        if (outFields) query.outFields = outFields;
        if (geometry) query.geometry = geometry;
        var queryTask = new QueryTask(url);
        queryTask.execute(query,
            function (featureSet) {
                if (callback) callback(featureSet);
                HideLoading();
            },
            function (msg) {
                console.error(msg);
                HideLoading();
            });
    }

    function GetInitSymbols() {
        var symbols = {};
        var colorBorderRed = esri.Color([255, 0, 0]);
        var colorBorderGreen = esri.Color([51, 255, 51]);
        var colorFillColorRed = esri.Color([255, 0, 0, 0.01]);
        var colorBorderHighlight = esri.Color([0, 255, 255]);
        var colorBorderYellow = esri.Color([255, 255, 0]);

        symbols.lineSymbol = new SimpleLineSymbol(SimpleLineSymbol.STYLE_SOLID, colorBorderRed, 6);
        symbols.lineSymbolOn = new SimpleLineSymbol(SimpleLineSymbol.STYLE_SOLID, colorBorderRed, 6);
        symbols.lineSymbolSelected = new SimpleLineSymbol(SimpleLineSymbol.STYLE_SOLID, colorBorderGreen, 6);

        symbols.lineSymbolYellow = new SimpleLineSymbol(SimpleLineSymbol.STYLE_SOLID, colorBorderYellow, 6);

        symbols.lineSymbolSelectedRed = new SimpleLineSymbol(SimpleLineSymbol.STYLE_DASH, colorBorderRed, 4);
        symbols.lineSymbolSelectedGreen = new SimpleLineSymbol(SimpleLineSymbol.STYLE_SOLID, colorBorderGreen, 4);

        symbols.lineSymbolHightlight = new SimpleLineSymbol(SimpleLineSymbol.STYLE_SOLID, colorBorderHighlight, 4);

        symbols.fillSymbol = new SimpleFillSymbol(SimpleFillSymbol.STYLE_SOLID, symbols.lineSymbol, colorFillColorRed);
        symbols.fillSymbolSelected = new SimpleFillSymbol(SimpleFillSymbol.STYLE_SOLID, symbols.lineSymbolSelected, esri.Color([255, 0, 0, 0]));

        symbols.flashPointSmall = new SimpleMarkerSymbol(SimpleMarkerSymbol.STYLE_CIRCLE, 16, new SimpleLineSymbol(SimpleLineSymbol.STYLE_SOLID, new dojo.Color([255, 255, 255]), 3), new dojo.Color([0, 145, 255]));
        symbols.flashPointBig = new SimpleMarkerSymbol(SimpleMarkerSymbol.STYLE_CIRCLE, 40, new SimpleLineSymbol(SimpleLineSymbol.STYLE_SOLID, new dojo.Color([0, 145, 255]), 1), new dojo.Color([0, 145, 255, 0.4]));

        symbols.drawPointSymbol = new SimpleMarkerSymbol(SimpleMarkerSymbol.STYLE_CIRCLE, 6, new SimpleLineSymbol(SimpleLineSymbol.STYLE_SOLID, new dojo.Color([238, 59, 59]), 2), new dojo.Color([255, 255, 255]));
        symbols.drawPolygonSymbol = new SimpleFillSymbol(SimpleFillSymbol.STYLE_SOLID, new SimpleLineSymbol(SimpleLineSymbol.STYLE_SOLID, new dojo.Color([238, 59, 59]), 2), new dojo.Color([255, 255, 0, 0.3]));
        return symbols;
    }

    function CenterAndFlashFeature(map, feature, bClear, bFlash, flashTime) {
        map.graphics.clear();
        var extent = feature.geometry.getExtent().expand(1.8);
        var mapExtentChange = map.on("extent-change", function () {
            feature.setSymbol(symbols.lineSymbolYellow);
            map.graphics.add(feature);
            var node = feature.getNode();
            if (bClear) {
                node.setAttribute('flash-clear', flashTime + '');
                setTimeout(
                    function (feature) {
                        return function () {
                            map.graphics.remove(feature);
                        };
                    }(feature)
                , flashTime);
            } else {
                node.setAttribute('flash-remain', flashTime + '');
            }
            mapExtentChange.remove();
        });
        map.setExtent(extent);
    }

    function LoadData($resultGrid, $title, name, sumField, sumUnit, sumMulti, countUnit) {
        return function (ftSet) {
            //map.infoWindow.hide();
            _g.graphicsLayer.clear();
            map.graphics.clear();
            var sumArea = 0;
            _g.featureSet = ftSet;
            _g.type = name;
            var fts = ftSet.features;
            var rows = [];
            for (var i = 0; i < fts.length; i++) {
                var ft = fts[i];
                ft.setSymbol(symbols.fillSymbol);
                _g.graphicsLayer.add(ft);
                ft.attributes.INDEX = i + 1;
                rows.push(ft.attributes);
                var mj = ft.attributes[sumField];
                sumArea += (mj ? mj : 0);
            }
            $title.html(name + '<br/><span class="sum-text">（' + ftSet.features.length + countUnit + '、' + ((sumArea * sumMulti).toFixed(2) - 0) + sumUnit + '）</span>');
            $resultGrid.datagrid('loadData', rows);
        }
    }

    function InitNavBar() {
        var $slider = $('.ct-btn-nav-slider');
        var $navBar = $('.ct-nav-bar');

        var $detailPanel = $('.details-panel');
        _g.$.COM.$detailPanel = $detailPanel;
        _g.$.COM.$detailPanelDetail = $detailPanel.find('.ct-results-container');
        _g.$.COM.$detailPanelTitle = $('.details-panel .ct-results-header');

        _g.$.COM.$panelOut.click(function () {
            $resultPanel.removeClass('left-330');
        });

        var $fallback = $('.ct-btn-details-fallback');
        _g.$.COM.$fallback = $fallback;
        $fallback.click(function () {
            $fallback.parent().removeClass('z-index9');
        });

        $slider.click(function () {
            if ($slider.hasClass('rotate-180')) {
                $slider.insertAfter($btnLast);
            }
            else {
                $slider.insertBefore($btnFirst);
            }
            $slider.toggleClass('rotate-180');
            $navBar.toggleClass('left-480');
        });
        var $btnClose = $('.ct-btn-results-panel-close');
        var $resultPanel = $('.ct-results-panel');
        $btnClose.click(function () {
            $resultPanel.addClass('left-330');
        });

        var $results = $('.ct-results');
        _g.$.COM.$results = $results;
        var $navBarbtns = $navBar.find('.ct-nav-bar-btn.ct-btn');
        var $btnFirst = $($navBarbtns[0]);
        var $btnLast = $($navBarbtns[4]);
        $navBarbtns.click(function () {
            var $this = $(this);
            $this.siblings().removeClass('active');
            $this.addClass('active');
            var info = $this.data('info');
            if (info) {
                $results.removeClass('z-index1');
                $fallback.parent().removeClass('z-index9');
                $(info.target).addClass('z-index1').find('.ct-query-search').click();
            }
        });

        $('.ct-results input[type="text"]').focus(function () {
            $(this).select();
        });

        InitPEWG();
        InitGHDK();
        InitCF();
        InitZT();
        InitCQ();
        InitZTLD();

        function CenterFeature(index, showInfoWindow) {
            var fts = _g.featureSet.features;
            if (fts && fts.length && fts[index]) {
                var ft = fts[index];
                map.graphics.clear();
                var graphic = new Graphic(ft.geometry, symbols.lineSymbolSelected, ft.attributes);
                map.graphics.add(graphic);
                var extent = ft.geometry.getExtent();
                map.setExtent(extent.expand(1.8));
                if (showInfoWindow)
                    ShowFeatureDetail(graphic, null, _g.type);
            }
        }

        function CenterFeature2(objId, showInfoWindow) {
            var fts = _g.featureSet.features;
            if (fts && fts.length) {
                for (var i = 0, l = fts.length; i < l; i++) {
                    var ft = fts[i];
                    if (ft.attributes['OBJECTID'] == objId) {
                        map.graphics.clear();
                        var graphic = new Graphic(ft.geometry, symbols.lineSymbolSelected, ft.attributes);
                        map.graphics.add(graphic);
                        var extent = ft.geometry.getExtent();
                        map.setExtent(extent.expand(1.8));
                        if (showInfoWindow)
                            ShowFeatureDetail(graphic, null, _g.type);
                    }
                }
            }
        }

        function InitPEWG() {
            var $container = $('.pewg');
            var $btnClear = $container.find('.ct-query-clear');
            var $btnSearch = $container.find('.ct-query-search');
            var $textMJMin = $container.find('.text-dkmj-min');
            var $textMJMax = $container.find('.text-dkmj-max');
            var $title = $container.find('.ct-results-header');

            $container.find('.klyzt').click(function () {
                var $this = $(this);
                $this.toggleClass('klyzt-on');
            });

            $btnClear.click(function () {
                $container.find('input').val(_g.empty);
            });

            $btnSearch.click(function () {
                var condition = GetWhere();
                var url = _g.layers.PEWG.url;
                _g.fields.current = _g.fields.PEWG;
                ShowLoading();
                QueryLayer(url, condition, map.spatialReference, null,
                    LoadData($resultGrid, $title, '可用地块', 'TDMJ_M', '亩', '1', '宗'), ['*'], ['TDMJ_M DESC']);
                CenterMap();
            });
            var dgConfig = {
                view: scrollview,
                pageSize: 30,
                rownumbers: false,
                fitColumns: true,
                singleSelect: true,
                columns: [
                    [
                        { field: 'INDEX', title: '序号', halign: 'center', align: 'center', width: 40 },
                        { field: 'KLYZT', title: '可利用状态', halign: 'center', align: 'center', width: 100 },
                        { field: 'TDLYJY', title: '土地利用建议', halign: 'center', align: 'center', width: 120 },
                        {
                            field: 'TDMJ_M', title: '面积（亩）', halign: 'center', align: 'right', width: 80, formatter: function (value, row, index) {
                                return value.toFixed(2) - 0;
                            }
                        }
                    ]
                ],
                onClickRow: function (index, row) {
                    CenterFeature(index);
                }
            };
            var $resultGrid = $('.pewg .ct-query-results table').datagrid(dgConfig).datagrid('loadData', []);

            function GetWhere() {
                var condition = _g.empty;
                var klyzts = GetSelectedKLYZT();
                if (klyzts) {
                    condition += klyzts;
                }
                var mjMin = $textMJMin.val();
                if (mjMin) {
                    var mjMin = Number(mjMin);
                    if (mjMin >= 0) {
                        condition += ' and tdmj_m>=' + mjMin;
                    } else {
                        alert('填写数据有误！');
                        $textMJMin.focus();
                        return false;
                    }
                }
                var mjMax = $textMJMax.val();
                if (mjMax) {
                    var mjMax = Number(mjMax);
                    if (mjMax >= 0) {
                        condition += ' and tdmj_m<=' + mjMax;
                    } else {
                        alert('填写数据有误！');
                        $textMJMax.focus();
                        return false;
                    }
                }
                condition = condition.substr(4, condition.length - 4);
                return condition;
            }

            function GetSelectedKLYZT() {
                var klyzts = _g.empty;
                var $klyzts = $container.find('.klyzt-on');
                if ($klyzts.length) {
                    $klyzts.each(function (i, dom) {
                        var type = $(dom).data('type');
                        klyzts += "'" + type + "',";
                    });
                    klyzts = ' and klyzt in (' + klyzts.substr(0, klyzts.length - 1) + ')';
                }
                return klyzts;
            }
        }

        function InitGHDK() {
            var $container = $('.ghdk');
            var $btnClear = $container.find('.ct-query-clear');
            var $btnSearch = $container.find('.ct-query-search');
            var $textMJMin = $container.find('.text-dkmj-min');
            var $textMJMax = $container.find('.text-dkmj-max');
            var $textDKBH = $container.find('.text-dkbh');
            var $title = $container.find('.ct-results-header');

            $btnClear.click(function () {
                $container.find('input').val(_g.empty);
            });

            $btnSearch.click(function () {
                var condition = GetWhere();
                var url = layers.GHDK.url;
                _g.fields.current = _g.fields.GHDK;
                ShowLoading();
                QueryLayer(url, condition, map.spatialReference, null,
                    LoadData($resultGrid, $title, '规划地块', 'TDMJ_M', '亩', '1', '宗'), ['*'], ['TDMJ_M DESC']);
                CenterMap();
            });

            function GetWhere() {
                var condition = _g.empty;
                var textDKBH = $textDKBH.val();
                if (textDKBH) {
                    condition += " and dkbh like '%" + textDKBH + "%'";
                }
                var mjMin = $textMJMin.val();
                if (mjMin) {
                    var mjMin = Number(mjMin);
                    if (mjMin >= 0) {
                        condition += ' and tdmj_m>=' + mjMin;
                    } else {
                        alert('填写数据有误！');
                        $textMJMin.focus();
                        return false;
                    }
                }
                var mjMax = $textMJMax.val();
                if (mjMax) {
                    var mjMax = Number(mjMax);
                    if (mjMax >= 0) {
                        condition += ' and tdmj_m<=' + mjMax;
                    } else {
                        alert('填写数据有误！');
                        $textMJMax.focus();
                        return false;
                    }
                }
                condition = condition.substr(4, condition.length - 4);
                return condition;
            }

            var dgConfig = {
                view: scrollview,
                pageSize: 30,
                rownumbers: false,
                fitColumns: true,
                singleSelect: true,
                columns: [
                    [
                        { field: 'INDEX', title: '序号', halign: 'center', align: 'center', width: 40 },
                        { field: 'DKBH', title: '地块编号', halign: 'center', align: 'center', width: 80 },
                        { field: 'TDYT', title: '土地用途', halign: 'center', align: 'center', width: 120 },
                        {
                            field: 'TDMJ_M', title: '面积（亩）', halign: 'center', align: 'right', width: 80, formatter: function (value, row, index) {
                                return value.toFixed(2) - 0;
                            }
                        }
                    ]
                ],
                onClickRow: function (index, row) {
                    CenterFeature(index);
                }
            };
            var $resultGrid = $('.ghdk .ct-query-results table').datagrid(dgConfig).datagrid('loadData', []);
        }

        function InitCF() {
            var $container = $('.cf');
            var $btnClear = $container.find('.ct-query-clear');
            var $btnSearch = $container.find('.ct-query-search');
            var $hylbs = $container.find('.hylb');
            var $jzmjMin = $container.find('.text-jzmj-min');
            var $jzmjMax = $container.find('.text-jzmj-max');
            var $xzmjMin = $container.find('.text-xzmj-min');
            var $xzmjMax = $container.find('.text-xzmj-max');
            var $title = $container.find('.ct-results-header');


            $hylbs.click(function () {
                var $this = $(this);
                $this.toggleClass('hylb-on');
            });

            $btnClear.click(function () {
                $container.find('input').val(_g.empty);
            });

            $btnSearch.click(function () {
                var condition = GetWhere();
                var url = layers.CF.url;
                _g.fields.current = _g.fields.CF;
                ShowLoading();
                QueryLayer(url, condition, map.spatialReference, null,
                    LoadData($resultGrid, $title, '厂房', 'XZMJ', '万平米(闲置)', '0.0001', '幢'), ['*'], ['XZMJ DESC']);
                CenterMap();

            });

            function GetWhere() {
                var condition = _g.empty;
                var hylbs = GetSelectedHYLB();
                if (hylbs) {
                    condition += hylbs;
                }
                var jzmjMin = $jzmjMin.val();
                if (jzmjMin) {
                    var jzmjMin = Number(jzmjMin);
                    if (jzmjMin >= 0) {
                        condition += ' and jzmj>=' + jzmjMin;
                    } else {
                        alert('填写数据有误！');
                        $jzmjMin.focus();
                        return false;
                    }
                }
                var jzmjMax = $jzmjMax.val();
                if (jzmjMax) {
                    var jzmjMax = Number(jzmjMax);
                    if (jzmjMax >= 0) {
                        condition += ' and jzmj<=' + jzmjMax;
                    } else {
                        alert('填写数据有误！');
                        $jzmjMax.focus();
                        return false;
                    }
                }
                var xzmjMin = $xzmjMin.val();
                if (xzmjMin) {
                    var xzmjMin = Number(xzmjMin);
                    if (xzmjMin >= 0) {
                        condition += ' and xzmj>=' + xzmjMin;
                    } else {
                        alert('填写数据有误！');
                        $xzmjMin.focus();
                        return false;
                    }
                }
                var xzmjMax = $xzmjMax.val();
                if (xzmjMax) {
                    var xzmjMax = Number(xzmjMax);
                    if (xzmjMax >= 0) {
                        condition += ' and xzmj<=' + xzmjMax;
                    } else {
                        alert('填写数据有误！');
                        $xzmjMax.focus();
                        return false;
                    }
                }
                condition = condition.substr(4, condition.length - 4);
                return condition;
            }

            function GetSelectedHYLB() {
                var hylbs = _g.empty;
                var $hylbs = $container.find('.hylb-on');
                if ($hylbs.length) {
                    $hylbs.each(function (i, dom) {
                        var type = $(dom).data('type');
                        hylbs += " or hylb like '%" + type + "%' ";
                    });
                    hylbs = ' and  (' + hylbs.substr(3, hylbs.length - 1) + ')';
                }
                return hylbs;
            }

            var dgConfig = {
                view: scrollview,
                pageSize: 30,
                rownumbers: false,
                fitColumns: true,
                singleSelect: true,
                columns: [
                    [
                        { field: 'INDEX', title: '序号', halign: 'center', align: 'center', width: 40 },
                        { field: 'HYLB', title: '行业', halign: 'center', align: 'center', width: 80 },
                        {
                            field: 'JZMJ', title: '建筑面积㎡', halign: 'center', align: 'right', width: 80, formatter: function (value, row, index) {
                                return value.toFixed(2) - 0;
                            }
                        },
                        {
                            field: 'XZMJ', title: '闲置面积㎡', halign: 'center', align: 'right', width: 80, formatter: function (value, row, index) {
                                return value.toFixed(2) - 0;
                            }
                        }
                    ]
                ],
                onClickRow: function (index, row) {
                    CenterFeature(index);
                }
            };
            var $resultGrid = $('.cf .ct-query-results table').datagrid(dgConfig).datagrid('loadData', []);

            _g.$.CF.$datagrid = $resultGrid;
            _g.$.CF.$title = $title;
        }

        function InitZT() {
            var $container = $('.zt');
            var $btnClear = $container.find('.ct-query-clear');
            var $btnSearch = $container.find('.ct-query-search');
            var $textYQMC = $container.find('.text-yqmc');
            var $jzmjMin = $container.find('.text-jzmj-min');
            var $jzmjMax = $container.find('.text-jzmj-max');
            var $xzmjMin = $container.find('.text-xzmj-min');
            var $xzmjMax = $container.find('.text-xzmj-max');
            var $title = $container.find('.ct-results-header');

            $btnClear.click(function () {
                $container.find('input').val(_g.empty);
            });

            $btnSearch.click(function () {
                var condition = GetWhere();
                var url = layers.ZT.url;
                _g.fields.current = _g.fields.ZT;
                ShowLoading();
                QueryLayer(url, condition, map.spatialReference, null,
                    LoadData($resultGrid, $title, '载体', 'XZMJ', '万平米(闲置)', '0.0001', '个'), ['*'], ['XZMJ DESC']);
                CenterMap();

            });

            function GetWhere() {
                var condition = _g.empty;
                var textYQMC = $textYQMC.val();
                if (textYQMC) {
                    condition += " and yqmc like '%" + textYQMC + "%'";
                }
                var jzmjMin = $jzmjMin.val();
                if (jzmjMin) {
                    var jzmjMin = Number(jzmjMin);
                    if (jzmjMin >= 0) {
                        condition += ' and jzmj>=' + jzmjMin;
                    } else {
                        alert('填写数据有误！');
                        $jzmjMin.focus();
                        return false;
                    }
                }
                var jzmjMax = $jzmjMax.val();
                if (jzmjMax) {
                    var jzmjMax = Number(jzmjMax);
                    if (jzmjMax >= 0) {
                        condition += ' and jzmj<=' + jzmjMax;
                    } else {
                        alert('填写数据有误！');
                        $jzmjMax.focus();
                        return false;
                    }
                }

                var xzmjMin = $xzmjMin.val();
                if (xzmjMin) {
                    var xzmjMin = Number(xzmjMin);
                    if (xzmjMin >= 0) {
                        condition += ' and xzmj>=' + xzmjMin;
                    } else {
                        alert('填写数据有误！');
                        $xzmjMin.focus();
                        return false;
                    }
                }
                var xzmjMax = $xzmjMax.val();
                if (xzmjMax) {
                    var xzmjMax = Number(xzmjMax);
                    if (xzmjMax >= 0) {
                        condition += ' and xzmj<=' + xzmjMax;
                    } else {
                        alert('填写数据有误！');
                        $xzmjMax.focus();
                        return false;
                    }
                }

                return condition.substr(4, condition.length - 4);
            }

            var dgConfig = {
                view: scrollview,
                pageSize: 30,
                rownumbers: false,
                fitColumns: true,
                singleSelect: true,
                columns: [
                    [
                        { field: 'INDEX', title: '序号', halign: 'center', align: 'center', width: 40 },
                        { field: 'YQMC', title: '园区名称', halign: 'center', align: 'center', width: 80 },
                        {
                            field: 'JZMJ', title: '建筑面积㎡', halign: 'center', align: 'right', width: 80, formatter: function (value, row, index) {
                                return value.toFixed(2) - 0;
                            }
                        },
                        {
                            field: 'XZMJ', title: '闲置面积㎡', halign: 'center', align: 'right', width: 80, formatter: function (value, row, index) {
                                return value.toFixed(2) - 0;
                            }
                        }
                    ]
                ],
                onClickRow: function (index, row) {
                    CenterFeature(index);
                }
            };
            var $resultGrid = $('.zt .ct-query-results table').datagrid(dgConfig).datagrid('loadData', []);
        }

        function InitZTLD() {
            var $container = $('.ztld');
            var $btnClear = $container.find('.ct-query-clear');
            var $btnSearch = $container.find('.ct-query-search');
            var $ztmcs = $container.find('.ztmc');

            var $xzmjMin = $container.find('.text-xzmj-min');
            var $xzmjMax = $container.find('.text-xzmj-max');
            var $title = $container.find('.ct-results-header');

            $ztmcs.click(function () {
                var $this = $(this);
                $this.toggleClass('ztmc-on');
            });

            $btnClear.click(function () {
                $container.find('input').val(_g.empty);
            });

            $btnSearch.click(function () {
                var condition = GetWhere();
                var url = layers.ZTLD.url;
                _g.fields.current = _g.fields.ZTLD;
                ShowLoading();
                QueryLayer(url, condition, map.spatialReference, null,
                    LoadData($resultGrid, $title, '载体楼栋', 'XZMJ', '万平米(闲置)', '0.0001', '栋'), ['*'], ['QY,LDH']);
                CenterMap();
            });

            function GetWhere() {
                var condition = _g.empty;
                var ztmcs = GetSelectedZTMC();
                if (ztmcs) {
                    condition += ztmcs;
                }

                var xzmjMin = $xzmjMin.val();
                if (xzmjMin) {
                    var xzmjMin = Number(xzmjMin);
                    if (xzmjMin >= 0) {
                        condition += ' and xzmj>=' + xzmjMin;
                    } else {
                        alert('填写数据有误！');
                        $xzmjMin.focus();
                        return false;
                    }
                }
                var xzmjMax = $xzmjMax.val();
                if (xzmjMax) {
                    var xzmjMax = Number(xzmjMax);
                    if (xzmjMax >= 0) {
                        condition += ' and xzmj<=' + xzmjMax;
                    } else {
                        alert('填写数据有误！');
                        $xzmjMax.focus();
                        return false;
                    }
                }
                condition = condition.substr(4, condition.length - 4);
                return condition;
            }

            function GetSelectedZTMC() {
                var ztmcs = _g.empty;
                var $ztmcs = $container.find('.ztmc-on');
                if ($ztmcs.length) {
                    $ztmcs.each(function (i, dom) {
                        var type = $(dom).data('type');
                        ztmcs += " or ZTMC like '%" + type + "%' ";
                    });
                    ztmcs = ' and  (' + ztmcs.substr(3, ztmcs.length - 1) + ')';
                }
                return ztmcs;
            }

            var dgConfig = {
                view: groupview,
                pageSize: 30,
                rownumbers: true,
                fitColumns: true,
                singleSelect: true,
                groupField: 'ZTMC',
                groupFormatter: function (value, rows) {
                    var xzmj = 0;
                    for (var i = 0, l = rows.length; i < l; i++) {
                        xzmj += rows[i]['XZMJ'];
                    }
                    xzmj = (xzmj / 10000).toFixed(2) - 0;
                    return value + '（' + rows.length + '栋' + '，闲置：' + xzmj + '万平米）';
                },
                columns: [
                    [
                        { field: 'QY', title: '区域', halign: 'center', align: 'center', width: 80 },
                        { field: 'LDH', title: '楼栋号', halign: 'center', align: 'center', width: 80 },
                        {
                            field: 'ZJZMJ', title: '建筑面积㎡', halign: 'center', align: 'right', width: 80, formatter: function (value, row, index) {
                                return value ? value.toFixed(2) - 0 : 0;
                            }
                        },
                        {
                            field: 'XZMJ', title: '闲置面积㎡', halign: 'center', align: 'right', width: 80, formatter: function (value, row, index) {
                                return value ? value.toFixed(2) - 0 : 0;
                            }
                        }
                    ]
                ],
                onClickRow: function (index, row) {
                    var objId = row['OBJECTID'];
                    CenterFeature2(objId);
                },
                onLoadSuccess: function () {
                    $resultGrid.datagrid('collapseGroup');
                }
            };
            var $resultGrid = $('.ztld .ct-query-results table').datagrid(dgConfig)
            $resultGrid.datagrid('loadData', []);
        }


        function InitCQ() {
            var $container = $('.cq');
            var $btnClear = $container.find('.ct-query-clear');
            var $btnSearch = $container.find('.ct-query-search');
            var $textMJMin = $container.find('.text-zjzmj-min');
            var $textMJMax = $container.find('.text-zjzmj-max');
            var $textCQMC = $container.find('.text-cqmc');
            var $title = $container.find('.ct-results-header');

            $btnClear.click(function () {
                $container.find('input').val(_g.empty);
            });

            $btnSearch.click(function () {
                var condition = GetWhere();
                var url = layers.CQ.url;
                _g.fields.current = _g.fields.CQ;
                ShowLoading();
                QueryLayer(url, condition, map.spatialReference, null,
                    LoadData($resultGrid, $title, '厂区'), ['*'], ['ZJZMJ DESC']);
                CenterMap();
            });

            function GetWhere() {
                var condition = _g.empty;
                var textCQMC = $textCQMC.val();
                if (textCQMC) {
                    condition += " and yqmc like '%" + textCQMC + "%'";
                }
                var mjMin = $textMJMin.val();
                if (mjMin) {
                    var mjMin = Number(mjMin);
                    if (mjMin >= 0) {
                        condition += ' and zjzmj>=' + mjMin;
                    } else {
                        alert('填写数据有误！');
                        $textMJMin.focus();
                        return false;
                    }
                }
                var mjMax = $textMJMax.val();
                if (mjMax) {
                    var mjMax = Number(mjMax);
                    if (mjMax >= 0) {
                        condition += ' and zjzmj<=' + mjMax;
                    } else {
                        alert('填写数据有误！');
                        $textMJMax.focus();
                        return false;
                    }
                }
                condition = condition.substr(4, condition.length - 4);
                return condition;
            }

            var dgConfig = {
                view: scrollview,
                pageSize: 30,
                rownumbers: false,
                fitColumns: true,
                singleSelect: true,
                columns: [
                    [
                        { field: 'INDEX', title: '序号', halign: 'center', align: 'center', width: 40 },
                        { field: 'YQMC', title: '厂区名称', halign: 'center', align: 'center', width: 80 },
                        { field: 'HYFL', title: '行业分类', halign: 'center', align: 'right', width: 120 },
                        {
                            field: 'ZJZMJ', title: '建筑总面积㎡', halign: 'center', align: 'center', width: 80, formatter: function (value, row, index) {
                                return value.toFixed(2) - 0;
                            }
                        }
                    ]
                ],
                onClickRow: function (index, row) {
                    CenterFeature(index);
                }
            };
            var $resultGrid = $('.cq .ct-query-results table').datagrid(dgConfig).datagrid('loadData', []);
            _g.$.CQ.$datagrid = $resultGrid;
            _g.$.CQ.$title = $title;
        }
    }

    function InitMeasureTool() {
        var $btnMeasure = $('.ct-btn-measure');
        var points = [];
        var markerSymbol = _g.symbols.drawPointSymbol;
        var fillSymbol = _g.symbols.drawPolygonSymbol;

        var $msResult = $('.measure-result');
        var $msTxt = $msResult.find('.measure-text');

        var $txt_l = $msResult.find('.measure-text-length');
        var $txt_a = $msResult.find('.measure-text-area');
        var $btnClose = $msResult.find('.ct-btn-measure-close');
        var $btnComplete = $msResult.find('.ct-btn-measure-compelte');

        $btnComplete.click(function () {
            //toolMultiPoint.finishDrawing();
            //toolPolygon.finishDrawing();
            ActiveMeasureTool();
        });

        $btnClose.click(function () {
            $msResult.addClass('display-none');
            if ($btnMeasure.hasClass('ct-btn-measure-on')) {
                $btnMeasure.click();
            }

        });

        var toolMultiPoint = new Draw(map, { showTooltips: false });
        toolMultiPoint.setMarkerSymbol(markerSymbol);
        var toolPolygon = new Draw(map, { showTooltips: false });
        toolPolygon.setFillSymbol(fillSymbol);
        var mapClickHandle = null;

        toolPolygon.on('draw-complete', function (evt) {
            if (mapClickHandle) {
                mapClickHandle.remove()
            }
            //$btnMeasure.click();

            map.graphics.clear();
            var graphic = new Graphic(evt.geometry, _g.symbols.lineSymbolHightlight);
            map.graphics.add(graphic);

            toolMultiPoint.deactivate();
            toolPolygon.deactivate();
        });

        $btnMeasure.click(function () {
            $btnMeasure.toggleClass('ct-btn-measure-on');
            if ($btnMeasure.hasClass('ct-btn-measure-on')) {
                $msResult.removeClass('display-none');
                ActiveMeasureTool();
            } else {
                $msResult.addClass('display-none');
                DeactiveMeasureTool();
            }
            map.graphics.clear();
        });

        function ActiveMeasureTool() {
            $msTxt.html('长度：&nbsp;&nbsp;<span class="measure-text-length">0</span>&nbsp;&nbsp;米<br/>面积：&nbsp;&nbsp;<span class="measure-text-area">0</span>&nbsp;&nbsp;平方米');
            drawToolOn = true;
            toolPolygon.activate(Draw.POLYGON);
            toolMultiPoint.activate(Draw.MULTI_POINT);
            points = [];
            mapClickHandle = map.on('click', function (evt) {
                points.push([evt.mapPoint.x, evt.mapPoint.y]);
                var polyline = ConstructLine(points);
                var geometry = ConstructPolygon(points);
                var mr = Measure(polyline, geometry);
                $msTxt.html(mr);
            });
        }

        function DeactiveMeasureTool() {
            points = [];
            toolMultiPoint.deactivate();
            toolPolygon.deactivate();
            mapClickHandle.remove();
            mapClickHandle = null;
            drawToolOn = false;
        }

        function ConstructLine(points) {
            var polyline = new Polyline(points);
            return polyline.setSpatialReference(map.spatialReference);
        }

        function ConstructPolygon(points) {
            var polygon = new Polygon(points)
            return polygon.setSpatialReference(map.spatialReference);
        }

        function Measure(polyline, polygon) {
            var length = 0;
            var area = 0;
            var unit_l = '米';
            var unit_a = '平方米';
            area = geometryEngine.geodesicArea(polygon, 'square-meters');
            length = geometryEngine.geodesicLength(polyline, 'meters');

            length = length.toFixed(2) - 0;
            var transbase_l = 1000;//长度单位转换底数
            if (length > transbase_l) {
                length = (length / transbase_l).toFixed(2) - 0;
                unit_l = '千米';
            }

            area = Math.abs(area).toFixed(2) - 0;
            var transbase_a = 666.6666667;//面积单位转换底数
            if (area > transbase_a) {
                area = (area / transbase_a).toFixed(2) - 0;
                unit_a = '亩';
            }
            return '长度：&nbsp;&nbsp;<span class="measure-text-length">' + length + '</span>&nbsp;&nbsp;' + unit_l + '<br>面积：&nbsp;&nbsp;<span class="measure-text-area">' + area + '</span>&nbsp;&nbsp;' + unit_a;
        }
    }

    function InitPhoto(bsm) {
        var imgs = pictures[bsm];
        if (imgs) {
            var $imgContainer = $('.imgContainer');
            $imgContainer.html('');
            var html = '<ul class="pgwSlideshow">';
            for (var i = 0; i < imgs.length; i++) {
                var img = imgs[i];
                html += '<li><img src="' + _g.photoPath + bsm + '/' + img.src + '" alt=""></li>';
            }
            html += '</ul>';
            $imgContainer.html(html);
            $('.imgContainerBody').removeClass('display-none');
            $imgContainer.find('.pgwSlideshow').pgwSlideshow();
        }
        else {
            alert('未找到对应照片！');
        }
    }

    var $loading = $('.ct-loading');
    var $loadingMessage = $loading.find('.ct-loading-message');
    _g.$.COM.$loading = $loading;

    function ShowLoading(msg) {
        $loadingMessage.html(msg ? msg : '加载中，请稍后...');
        $loading.css('display', 'block');
    }

    function HideLoading() {
        $loading.css('display', 'none');
    }

    function BindAttributes(attributes) {
        var $tb = $('.ct-cf-detail table');
        var $attributes = $tb.find('.field');
        for (var i = 0; i < $attributes.length; i++) {
            var $attr = $($attributes[i]);
            var field = $attr.data('field');
            if (field) {
                var val = attributes[field];
                val = val ? val : '/';
                $attr.html(val);
            }
        }
        $tb.parent().css('display', 'block');
    }

    function InitNav() {
        var activeCls = 'active';
        var targetCls = 'target';
        var $navlegends = $('.nav-legend li');
        var $navItems = $('.nav-body>div');
        $navlegends.click(function () {
            var $this = $(this);
            if (!$this.hasClass(activeCls)) {
                $navlegends.removeClass(activeCls);
                $this.addClass(activeCls);
                $navItems.removeClass(activeCls);
                var $target = $('.' + $this.data(targetCls));
                $target.addClass(activeCls);
            }
        });
        $navlegends.first().click();
    }

    function SetData(data) {
        $('.cf-yczbf').html('');
        $('.nav-body .field').html('');
        $('.nav-legend li').first().click();

        var syqk = data.SYQK;
        var ptss = data.PTSS;
        var xzqk = data.XZQK;
        SetDataToPage($('.cf-ptss-details'), ptss);
        SetDataToPage($('.cf-xzqk-details'), xzqk);

        var l = syqk.length;
        if (l) {
            var $syqkContainer = $('.cf-yczbf');

            var hd = '<div class="cf-details-title">已租部分：</div>';
            var body = '<table><tr><th class="ct-cf-detail-th">承租单位</th>' +
            '<td class="field" data-field="SY_CZDW" colspan="3"></td></tr><tr><th style="width: 16%;">层数（主体/局部）</th>' +
            '<td class="field" data-field="SY_CS" style="width: 17%;"></td><th style="width: 16%;">面积（㎡）</th>' +
            '<td class="field" data-field="SY_MJ" style="width: 18%;"></td></tr><tr><th>租金（元/㎡*月）</th>' +
            '<td class="field" data-field="SY_ZJ"></td><th>租期</th>' +
            '<td class="field" data-field="SY_ZQ"></td></tr><tr><th>租金增长</th>' +
            '<td class="field" data-field="SY_ZJZZ"></td><th>免租期</th>' +
            '<td class="field" data-field="SY_MZQ"></td></tr><tr><th>费用承担</th>' +
            '<td class="field" data-field="SY_FYCD"></td><th>物业管理费（元/㎡*月）</th>' +
            '<td class="field" data-field="SY_WYGLF"></td></tr><tr><th>备注</th>' +
            '<td class="field" data-field="SY_BZ" colspan="3"></td></tr></table>';

            var $head = $(hd);
            $head.appendTo($syqkContainer);
            for (var i = 0; i < l ; i++) {
                var d = syqk[i];
                var $dom = $(body);
                SetDataToPage($dom, d);
                $dom.appendTo($syqkContainer);
            }
        }
    }

    function SetDataToPage($dom, data) {
        $dom.find('.field').each(function () {
            var $this = $(this);
            var field = $this.data('field');
            var value = data[field] ? data[field] : '';
            $this.html(value);
        });
    }

    var aCls = 'active';

    var ldPanel = {
        dgConfig: {
            rownumbers: true,
            fitColumns: true,
            singleSelect: true,
            columns: [
                [
                    { field: 'LC', title: '楼层', halign: 'center', align: 'center', width: 80 },
                    { field: 'FJH', title: '房间号', halign: 'center', align: 'center', width: 80 },
                    { field: 'SYZT', title: '使用状态', halign: 'center', align: 'center', width: 80 },
                    { field: 'FWLX', title: '房屋类型', halign: 'center', align: 'center', width: 80 },
                    { field: 'FWMJ', title: '房屋面积㎡', halign: 'center', align: 'right', width: 80 }
                ]
            ],
            onClickRow: function (index, row) {
                ldPanel.showDetails(row);
            }
        },
        init: function () {
            var $root = $('.ct-ld-detail');
            var $close = $root.find('.ct-ld-detail-close');
            var $navLi = $root.find('.ct-ld-panel>ul>li');
            var $panel = $root.find('.ct-ld-panel>div>div');
            var $dg = $root.find('#dg_ld');
            $dg.datagrid(this.dgConfig).datagrid('loadData', []);
            var $floorList = $root.find('.ct-ld-list');
            var $infos = $root.find('.ct-ld-infos');
            var $detailTable = $infos.find('table');
            var $fields = $detailTable.find('td');
            $close.on('click', function () {
                $(this).parent().removeClass(aCls);
            });

            $navLi.on('click', function () {
                var $this = $(this);
                $navLi.removeClass(aCls);
                $this.addClass(aCls);
                $panel.removeClass(aCls);
                var index = $navLi.index($this);
                $($panel.get(index)).addClass(aCls);
            });

            this.$dom = {
                $root: $root,
                $close: $close,
                $navLi: $navLi,
                $panel: $panel,
                $dg: $dg,
                $floorList: $floorList,
                $infos: $infos,
                $detailTable: $detailTable,
                $fields: $fields
            };
        },
        loadData: function (data) {
            //this.rooms = data;
            //this.rooms = data;
            this.rooms = data.sort(function (a, b) {
                return a.LC - b.LC;
            });

            var lcList = [];
            var lch = null;
            for (var i = 0, l = data.length; i < l; i++) {
                var room = data[i];
                if (room.LC != lch) {
                    lch = room.LC;
                    lcList.push(lch);
                }
            }

            var $floorList = this.$dom.$floorList;

            $floorList.html('');

            $('<span data-code="ALL">全部</span>').on('click', loadRooms).appendTo($floorList);

            for (var i = 0, l = lcList.length; i < l ; i++) {
                $('<span data-code="' + lcList[i] + '">' + lcList[i] + '</span>').on('click', loadRooms).appendTo($floorList);
            }

            function loadRooms() {
                var $lcs = $floorList.find('>span');
                $lcs.removeClass(aCls);
                $(this).addClass(aCls);

                var code = $(this).data('code');
                ldPanel.loadRooms(code);
            }
            $floorList.find('>span').first().click();
        },
        loadRooms: function (code) {
            var rooms = ldPanel.rooms;
            var newRoom = [];
            if (code == 'ALL') {
                newRoom = rooms;
            }
            else {
                for (var i = 0, l = rooms.length; i < l; i++) {
                    var LC = rooms[i].LC;
                    if (LC == code)
                        newRoom.push(rooms[i]);
                }
            }
            ldPanel.$dom.$dg.datagrid('loadData', newRoom);
        },
        showDetails: function (room) {
            ldPanel.clearDetails();
            ldPanel.bindDetails(room);
            this.$dom.$infos.addClass(aCls);
        },
        bindDetails: function (room) {
            for (var i = 0, l = this.$dom.$fields.length; i < l ; i++) {
                var $field = $(this.$dom.$fields[i]);
                var field = $field.data('field');
                var value = room[field];
                if (value != null || value != undefined) {
                    $field.html(value);
                }
            }
        },
        clearDetails: function () {
            this.$dom.$fields.html('');
        },
        show: function () {
            this.$dom.$infos.removeClass(aCls);
            this.$dom.$root.addClass(aCls);
        }
    };

    ldPanel.init();
});