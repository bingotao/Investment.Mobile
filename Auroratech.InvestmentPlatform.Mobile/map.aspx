<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="map.aspx.cs" Inherits="Auroratech.InvestmentPlatform.Mobile.map" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head>
    <%--<meta http-equiv="Content-Type" content="text/html; charset=GB2312;" />--%>
    <meta name="viewport" content="width=device-width,initial-scale=1, maximum-scale=1,user-scalable=no" />
    <title>map</title>
    <script>
        djConfig = {
            locale: 'zh-cn',
            serverIP: '221.228.242.3:1080/3.15compact',
            //serverIP: '127.0.0.1/3.15compact/',
            mapServiceIP: 'http://221.228.242.3:6080/arcgis/rest/services/'
        };
        document.write('<link href="http://' + djConfig.serverIP + '/dijit/themes/claro/claro.css" rel="stylesheet" />');
        document.write('<link href="http://' + djConfig.serverIP + '/esri/css/esri.css" rel="stylesheet" />');
        document.write('<script type="text/javascript" src="http://' + djConfig.serverIP + '/init.js"></sc' + 'ript>');
    </script>
    <!--style-->

    <link href="css/Font-Awesome-3.2.1/css/font-awesome.min.css" rel="stylesheet" />
    <link href="js/ref/jquery-easyui-1.4.4/themes/metro/easyui.css" rel="stylesheet" />
    <link href="js/ref/pgwslideshow/pgwslideshow.min.css" rel="stylesheet" />
    <link href="css/map.css" rel="stylesheet" />
    <link href="css/cover-arcgis-style.css" rel="stylesheet" />
    <!--js-->

    <script src="js/ref/jquery-easyui-1.4.4/jquery.min.js"></script>
    <script src="js/ref/jquery-easyui-1.4.4/jquery.easyui.min.js"></script>
    <script src="js/ref/jquery-easyui-1.4.4/datagrid-scrollview.js"></script>
    <script src="js/ref/jquery-easyui-1.4.4/datagrid-groupview.js"></script>

    <script src="js/ref/pgwslideshow/pgwslideshow.min.js"></script>
    <script src="js/map.js"></script>
    <script src="js/pictures.js"></script>
</head>
<body class="claro">
    <div class="ct-btn-layers icon-reorder"></div>
    <div class="ct-btn-panel-toggle-out icon-chevron-right"></div>
    <div class="ct-btn-measure icon-pencil"></div>
    <div id="basemapGallery"></div>
    <div class="measure-result display-none">
        <div class="measure-text">
            长度：<span class="measure-text-length"></span>千米
            <br />
            面积：<span class="measure-text-area"></span>亩
        </div>
        <span class="ct-btn-measure-compelte">重 绘</span>
        <span class="ct-btn-measure-close icon-remove-sign"></span>
    </div>
    <div id="locateButton"></div>
    <div class="ct-btn-areas">
        <span class="ct-btn-areas-text" data-info='{"type":"xzq","code":"320292","name":"新区"}'>新 区</span>
        <span class="ct-btn-areas-slider icon-sort-down"></span>
    </div>
    <div class="ct-areas-container">
        <div class="ct-areas-county">
            <span style="font-size: 16px; width: 390px; letter-spacing: 6px;" data-info='{"type":"xzq","code":"320292","name":"新区"}'>新 区</span>
        </div>
        <div class="ct-areas-slider"></div>
        <div class="ct-areas-town">
            <span data-info='{"type":"jd","code":"001","name":"旺庄街道"}'>旺庄街道</span>
            <span data-info='{"type":"jd","code":"002","name":"硕放街道"}'>硕放街道</span>
            <span data-info='{"type":"jd","code":"003","name":"江溪街道"}'>江溪街道</span>
            <span data-info='{"type":"jd","code":"004","name":"新安街道"}'>新安街道</span>
            <span data-info='{"type":"jd","code":"005","name":"梅村街道"}'>梅村街道</span>
            <span data-info='{"type":"jd","code":"006","name":"鸿山街道"}'>鸿山街道</span>
        </div>
        <div class="ct-areas-slider"></div>
        <div class="ct-areas-park">
            <span data-info='{"type":"yq","code":"320292KG01","name":"无锡高新技术产业开发区"}'>高新技术开发区</span>
            <span data-info='{"type":"yq","code":"320292KG02","name":"无锡高新区综合保税区"}'>高新区综合保税区</span>
            <span data-info='{"type":"yq","code":"320292KS03","name":"硕放工业园区"}'>硕放工业园区</span>
            <span data-info='{"type":"yq","code":"320292JX04","name":"无锡市新区鸿山工业集中区"}'>鸿山工业集中区</span>
            <span data-info='{"type":"yq","code":"320292JX05","name":"无锡市新区旺庄工业集中区"}'>旺庄工业集中区</span>
            <span data-info='{"type":"yq","code":"320292JX06","name":"无锡空港产业园"}'>空港产业园</span>
            <span data-info='{"type":"yq","code":"320292JX07","name":"无锡市新区梅村工业集中区"}'>梅村工业集中区</span>
            <span data-info='{"type":"yq","code":"320292JX08","name":"无锡市新区江溪工业集中区"}'>江溪工业集中区</span>
            <span data-info='{"type":"yq","code":"320292JX09","name":"无锡（太湖）国际科技园"}'>太湖国际科技园</span>
            <span data-info='{"type":"yq","code":"320292JX10","name":"无锡新加坡工业园"}'>新加坡工业园</span>
        </div>
    </div>

    <div id="map">
    </div>
    <div class="ct-nav-bar left-480">
        <span class="ct-nav-bar-btn ct-btn" data-info='{"type":"pewg","target":".pewg"}'>可用地块</span>
        <span class="ct-nav-bar-btn ct-btn" data-info='{"type":"ghdk","target":".ghdk"}'>规划地块</span>
        <span class="ct-nav-bar-btn ct-btn" data-info='{"type":"cf","target":".cf"}'>厂&nbsp;&nbsp;房</span>
        <span class="ct-nav-bar-btn ct-btn" data-info='{"type":"zt","target":".zt"}'>载&nbsp;&nbsp体</span>
        <span class="ct-nav-bar-btn ct-btn" data-info='{"type":"ztld","target":".ztld"}'>载体楼栋</span>
        <span class="ct-btn-nav-slider ct-nav-bar-btn icon-chevron-right"></span>
    </div>
    <div class="ct-results-panel left-330">
        <span class="ct-btn-results-panel-close icon-remove"></span>
        <div class="ct-results pewg">
            <div class="ct-results-header">可用地块</div>
            <div class="ct-results-container">
                <div class="ct-query-results">
                    <table style="height: 100%;"></table>
                </div>
                <div class="ct-query-conditions">
                    <table>
                        <tr>
                            <th style="width: 30%;">地块面积</th>
                            <td style="width: 70%;">
                                <input type="text" class="text-area text-dkmj-min" />~
                                <input type="text" class="text-area text-dkmj-max" />&nbsp;亩
                            </td>
                        </tr>
                        <tr>
                            <td colspan="2" style="padding-top: 10px; height: 30px; text-align: center;">
                                <span class="klyzt" data-type="可直接利用">可直接利用</span>
                                <span class="klyzt" data-type="需调整规划">需调整规划</span>
                                <span class="klyzt" data-type="需拆迁">需拆迁</span>
                            </td>
                        </tr>
                        <tr>
                            <th colspan="2" style="height: 60px;">
                                <span class="ct-query-btn ct-query-search">搜&nbsp;&nbsp;索</span>
                                &nbsp;&nbsp;
                                <span class="ct-query-btn ct-query-clear">清&nbsp;&nbsp;除</span>
                            </th>
                        </tr>
                    </table>
                </div>
            </div>
        </div>
        <div class="ct-results ghdk">
            <div class="ct-results-header">规划地块</div>
            <div class="ct-results-container">
                <div class="ct-query-results">
                    <table style="height: 100%;"></table>
                </div>
                <div class="ct-query-conditions">
                    <table>
                        <tr>
                            <th style="width: 30%;">地块编号</th>
                            <td style="width: 70%;">
                                <input type="text" class="text-normal text-dkbh" />
                            </td>
                        </tr>
                        <tr>
                            <th>地块面积</th>
                            <td>
                                <input type="text" class="text-area text-dkmj-min" />~
                                <input type="text" class="text-area text-dkmj-max" />&nbsp;亩
                            </td>
                        </tr>
                        <tr>
                            <th colspan="2" style="height: 60px;">
                                <span class="ct-query-btn ct-query-search">搜&nbsp;&nbsp;索</span>
                                &nbsp;&nbsp;
                                <span class="ct-query-btn ct-query-clear">清&nbsp;&nbsp;除</span>
                            </th>
                        </tr>
                    </table>
                </div>
            </div>
        </div>
        <div class="ct-results cf">
            <div class="ct-results-header">厂&nbsp;房</div>
            <div class="ct-results-container">
                <div class="ct-query-results">
                    <table style="height: 100%;">
                    </table>
                </div>
                <div class="ct-query-conditions">
                    <table>
                        <%--<tr>
                            <th style="width: 30%;">建筑面积</th>
                            <td style="width: 70%;">
                                <input type="text" class="text-area text-jzmj-min" />~
                                <input type="text" class="text-area text-jzmj-max" />&nbsp;㎡
                            </td>
                        </tr>--%>
                        <tr>
                            <th style="width: 30%;">闲置面积</th>
                            <td style="width: 70%;">
                                <input type="text" class="text-area text-xzmj-min" />~
                                <input type="text" class="text-area text-xzmj-max" />&nbsp;㎡
                            </td>
                        </tr>
                        <tr>
                            <td colspan="2" style="padding-left: 30px; padding-top: 10px;">
                                <span class="hylb" data-type='电子'>电&nbsp;&nbsp;子</span>
                                <span class="hylb" data-type='电器'>电&nbsp;&nbsp;器</span>
                                <span class="hylb" data-type='机械'>机&nbsp;&nbsp;械</span>
                                <span class="hylb" data-type='化工'>化&nbsp;&nbsp;工</span>
                                <span class="hylb" data-type='物流'>物&nbsp;&nbsp;流</span>
                                <span class="hylb" data-type='装备'>装&nbsp;&nbsp;备</span>
                                <span class="hylb" data-type='包装'>包&nbsp;&nbsp;装</span>
                                <span class="hylb" data-type='办公'>办&nbsp;&nbsp;公</span>
                            </td>
                        </tr>
                        <tr>
                            <th colspan="2" style="height: 60px;">
                                <span class="ct-query-btn ct-query-search">搜&nbsp;&nbsp;索</span>
                                &nbsp;&nbsp;
                                <span class="ct-query-btn ct-query-clear">清&nbsp;&nbsp;除</span>
                            </th>
                        </tr>
                    </table>
                </div>
            </div>
        </div>
        <div class="ct-results zt">
            <div class="ct-results-header">载&nbsp体</div>
            <div class="ct-results-container">
                <div class="ct-query-results">
                    <table style="height: 100%;"></table>
                </div>
                <div class="ct-query-conditions">
                    <table>
                        <tr>
                            <th>闲置面积</th>
                            <td>
                                <input type="text" class="text-area text-xzmj-min" />~
                                <input type="text" class="text-area text-xzmj-max" />&nbsp;㎡
                            </td>
                        </tr>
                        <tr>
                            <th>建筑面积</th>
                            <td>
                                <input type="text" class="text-area text-jzmj-min" />~
                                <input type="text" class="text-area text-jzmj-max" />&nbsp;㎡
                            </td>
                        </tr>
                        <tr>
                            <th style="width: 30%;">园区名称</th>
                            <td style="width: 70%;">
                                <input type="text" class="text-normal text-yqmc" />
                            </td>
                        </tr>
                        <tr>
                            <th colspan="2" style="height: 60px;">
                                <span class="ct-query-btn ct-query-search">搜&nbsp;&nbsp;索</span>
                                &nbsp;&nbsp;
                                <span class="ct-query-btn ct-query-clear">清&nbsp;&nbsp;除</span>
                            </th>
                        </tr>
                    </table>
                </div>
            </div>
        </div>

        <div class="ct-results ztld">
            <div class="ct-results-header">载体楼栋</div>
            <div class="ct-results-container">
                <div class="ct-query-results">
                    <table style="height: 100%;">
                    </table>
                </div>
                <div class="ct-query-conditions">
                    <table>
                        <tr>
                            <th style="width: 30%;">闲置面积</th>
                            <td style="width: 70%;">
                                <input type="text" class="text-area text-xzmj-min" />~
                                <input type="text" class="text-area text-xzmj-max" />&nbsp;㎡
                            </td>
                        </tr>
                        <tr>
                            <td colspan="2" style="padding-left: 20px; padding-top: 10px;">
                                <span class="ztmc" data-type='科创公司（大学科技园）'>科创公司</span>
                                <span class="ztmc" data-type='软件园'>软件园</span>
                                <span class="ztmc" data-type='微纳园'>微纳园</span>
                                <span class="ztmc" data-type='IC园'>IC园</span>
                            </td>
                        </tr>
                        <tr>
                            <th colspan="2" style="height: 60px;">
                                <span class="ct-query-btn ct-query-search">搜&nbsp;&nbsp;索</span>
                                &nbsp;&nbsp;
                                <span class="ct-query-btn ct-query-clear">清&nbsp;&nbsp;除</span>
                            </th>
                        </tr>
                    </table>
                </div>
            </div>
        </div>
        <div class="ct-results details-panel">
            <span class="ct-btn-details-fallback">返&nbsp;&nbsp回</span>
            <div class="ct-results-header"></div>
            <div class="ct-results-container"></div>
        </div>
    </div>
    <div class="imgContainerBody display-none">
        <div class="ct-btn-img-close icon-remove-sign"></div>
        <div class="imgContainer">
        </div>
    </div>

    <div class="ct-loading">
        <div class="wave">
            <div class="rect1"></div>
            <div class="rect2"></div>
            <div class="rect3"></div>
            <div class="rect4"></div>
            <div class="rect5"></div>
        </div>
        <div class="ct-loading-message">加载中，请稍后...</div>
    </div>


    <div class="ct-cf-detail">
        <div class="ct-cf-detail-close icon-remove-sign"></div>
        <div class="cf-details">
            <div class="nav-legend">
                <ul>
                    <li data-target="cf-ptss">配套设施</li>
                    <li data-target="cf-syqk">使用情况</li>
                </ul>
            </div>
            <div class="nav-body">
                <div class="cf-ptss">
                    <table class="cf-ptss-details">
                        <tr>
                            <th class="ct-cf-detail-th" style="width: 12%;" rowspan="5">基本信息</th>
                            <th style="width: 12%;">园区名称</th>
                            <td style="width: 17%;" class="field" data-field="YQMC"></td>
                            <th style="width: 12%;">厂房名称</th>
                            <td style="width: 17%;" class="field" data-field="CQMC"></td>
                            <th style="width: 12%;">四至</th>
                            <td style="width: 17%;" class="field" data-field="SZ"></td>
                        </tr>
                        <tr>
                            <th>所属街道</th>
                            <td class="field" data-field="SSJD"></td>
                            <th>联系人</th>
                            <td class="field" data-field="SSJD_LXR"></td>
                            <th>联系电话</th>
                            <td class="field" data-field="SSJD_LXDH"></td>
                        </tr>
                        <tr>
                            <th>管理单位</th>
                            <td class="field" data-field="GLDW"></td>
                            <th>联系人</th>
                            <td class="field" data-field="GLDW_LXR"></td>
                            <th>联系电话</th>
                            <td class="field" data-field="GLDW_LXDH"></td>
                        </tr>
                        <tr>
                            <th>建成日期</th>
                            <td class="field" data-field="JCRQ"></td>
                            <th>总建筑面积</th>
                            <td class="field" data-field="JZMJ"></td>
                            <th>建筑形态</th>
                            <td class="field" data-field="JZXT"></td>
                        </tr>
                        <tr>
                            <th>运营模式</th>
                            <td class="field" data-field="YYMS"></td>
                            <th>行业分类</th>
                            <td class="field"></td>
                            <td colspan="2" data-field="HYFL"></td>
                        </tr>
                        <tr>
                            <th class="ct-cf-detail-th" rowspan="2">排水情况</th>
                            <th>排水方式</th>
                            <td class="field" data-field="PS_PSFS"></td>
                            <th>主排水管径</th>
                            <td class="field" data-field="PS_ZPSGJ"></td>
                            <th>排污管径</th>
                            <td class="field" data-field="PS_PWGJ"></td>
                        </tr>
                        <tr>
                            <th>排水状况</th>
                            <td class="field" data-field="PS_PSZK"></td>
                            <th>是否配备污水处理站</th>
                            <td class="field" data-field="PS_SFPBWSCLZ"></td>
                            <th>日处理能力</th>
                            <td class="field" data-field="PS_RCLNL"></td>
                        </tr>
                        <tr>
                            <th class="ct-cf-detail-th" rowspan="3">供水情况</th>
                            <th>自供水</th>
                            <td class="field" data-field="GS_ZGS"></td>
                            <th>供水部门</th>
                            <td class="field" data-field="GS_GSBM"></td>
                            <th>主供水管径</th>
                            <td class="field" data-field="GS_ZGSGJ"></td>
                        </tr>
                        <tr>
                            <th>供水保证率</th>
                            <td class="field" data-field="GS_GSBZL"></td>
                            <th>压力</th>
                            <td class="field" data-field="GS_YL"></td>
                            <th>水表径</th>
                            <td class="field" data-field="GS_SBJ"></td>
                        </tr>
                        <tr>
                            <th>备注</th>
                            <td colspan="5" class="field" data-field="GS_BZ"></td>
                        </tr>
                        <tr>
                            <th class="ct-cf-detail-th" rowspan="4">供电情况</th>
                            <th>供电部门</th>
                            <td class="field" data-field="GD_GDBM"></td>
                            <th>骨干输电线路</th>
                            <td class="field" data-field="GD_GGSDXL"></td>
                            <th>供电保证率</th>
                            <td class="field" data-field="GD_GDBZL"></td>
                        </tr>
                        <tr>
                            <th>变压器台数</th>
                            <td class="field" data-field="GD_BYQTS"></td>
                            <th>容量</th>
                            <td class="field" data-field="GD_RL"></td>
                            <th>出线电压</th>
                            <td class="field" data-field="GD_CXDY"></td>
                        </tr>
                        <tr>
                            <th>发动机台数</th>
                            <td class="field" data-field="GD_FDJTS"></td>
                            <th>功率</th>
                            <td class="field" data-field="GD_GL"></td>
                            <th>年用电量</th>
                            <td class="field" data-field="GD_NYDL"></td>
                        </tr>
                        <tr>
                            <th>外供电</th>
                            <td class="field" data-field="GD_WGD"></td>
                            <th>自发电</th>
                            <td class="field" data-field="GD_ZFD"></td>
                            <th>备注</th>
                            <td class="field" data-field="GD_BZ"></td>
                        </tr>
                        <tr>
                            <th class="ct-cf-detail-th" rowspan="2">供气情况</th>
                            <th>供气部门</th>
                            <td class="field" data-field="GQ_GQBM"></td>
                            <th>管径</th>
                            <td class="field" data-field="GQ_GJ"></td>
                            <th>年用气量</th>
                            <td class="field" data-field="GQ_NYQL"></td>
                        </tr>
                        <tr>
                            <th>供气保证率</th>
                            <td class="field" data-field="GQ_GQBZL"></td>
                            <td colspan="4">&nbsp;</td>
                        </tr>
                        <tr>
                            <th class="ct-cf-detail-th">供热情况</th>
                            <th>供热部门</th>
                            <td class="field" data-field="GR_GRBM"></td>
                            <th>管径</th>
                            <td class="field" data-field="GR_GJ"></td>
                            <td colspan="2"></td>
                        </tr>
                    </table>
                </div>
                <div class="cf-syqk">
                    <div class="cf-details-title">闲置部分：</div>
                    <table class="cf-xzqk-details">
                        <tr>
                            <th style="width: 16%;">层数（主体/局部）</th>
                            <td class="field" data-field="XZ_CS" style="width: 17%;"></td>
                            <th style="width: 16%;">面积</th>
                            <td class="field" data-field="XZ_MJ" style="width: 18%;"></td>
                        </tr>
                        <tr>
                            <th>朝向</th>
                            <td class="field" data-field="XZ_CX"></td>
                            <th>是否装修</th>
                            <td class="field" data-field="XZ_SFZX"></td>
                        </tr>
                        <tr>
                            <th>层高(m)（主体/局部）</th>
                            <td class="field" data-field="XZ_CG"></td>
                            <th>配套设备</th>
                            <td class="field" data-field="XZ_PTSS"></td>
                        </tr>
                        <tr>
                            <th>是否可销售</th>
                            <td class="field" data-field="XZ_SFKXS"></td>
                            <th>销售价格</th>
                            <td class="field" data-field="XZ_XSJG"></td>
                        </tr>
                        <tr>
                            <th>备注</th>
                            <td class="field" data-field="XZ_BZ" colspan="3"></td>
                        </tr>
                    </table>
                    <div class="cf-yczbf">
                    </div>
                </div>
            </div>
        </div>
    </div>

    <div class="ct-ld-detail">
        <span class="ct-ld-detail-close icon-remove-sign"></span>
        <div class="ct-ld-panel">
            <ul>
                <li class="active">房间表</li>
                <li>平面图</li>
            </ul>
            <div>
                <div class="active">
                    <table id="dg_ld" style="height: 100%; width: 100%;"></table>
                </div>
                <div class="ct-ld-pmt">
                    <img src="images/demo.png" />
                </div>
            </div>
        </div>
        <div class="ct-ld-list">
        </div>
        <div class="ct-ld-infos">
            <span class="ct-ld-detail-close icon-remove-sign"></span>
            <table>
                <tr>
                    <th style="width: 20%">区域</th>
                    <td style="width: 30%" data-field="QY"></td>
                    <th style="width: 20%">载体名称</th>
                    <td style="width: 30%" data-field="ZTMC"></td>
                </tr>
                <tr>
                    <th>栋号</th>
                    <td data-field="DH"></td>
                    <th>房间号</th>
                    <td data-field="FJH"></td>
                </tr>
                <tr>
                    <th>楼层</th>
                    <td data-field="LC"></td>
                    <th>层高</th>
                    <td data-field="CG"></td>
                </tr>
                <tr>
                    <th>使用状态</th>
                    <td data-field="SYZT"></td>
                    <th>朝向</th>
                    <td data-field="CX"></td>
                </tr>
                <tr>
                    <th>企业名称</th>
                    <td data-field="QYMC"></td>
                    <th>房屋类型</th>
                    <td data-field="FWLX"></td>
                </tr>
                <tr>
                    <th>合同面积</th>
                    <td data-field="HTMJ"></td>
                    <th>房屋面积</th>
                    <td data-field="FWMJ"></td>
                </tr>
                <tr>
                    <th>租金标准</th>
                    <td data-field="ZJBZ"></td>
                    <th>闲置面积</th>
                    <td data-field="XZMJ"></td>
                </tr>
                <tr>
                    <th>是否商业</th>
                    <td data-field="SFSY"></td>
                    <th>开始时间</th>
                    <td data-field="KSSJ"></td>
                </tr>
                <tr>
                    <th>装修情况</th>
                    <td data-field="ZXQK"></td>
                    <th>到期时间</th>
                    <td data-field="DQSJ"></td>
                </tr>
            </table>
        </div>
    </div>
</body>
</html>
