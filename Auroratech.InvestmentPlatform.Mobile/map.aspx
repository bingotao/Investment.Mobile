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
            ���ȣ�<span class="measure-text-length"></span>ǧ��
            <br />
            �����<span class="measure-text-area"></span>Ķ
        </div>
        <span class="ct-btn-measure-compelte">�� ��</span>
        <span class="ct-btn-measure-close icon-remove-sign"></span>
    </div>
    <div id="locateButton"></div>
    <div class="ct-btn-areas">
        <span class="ct-btn-areas-text" data-info='{"type":"xzq","code":"320292","name":"����"}'>�� ��</span>
        <span class="ct-btn-areas-slider icon-sort-down"></span>
    </div>
    <div class="ct-areas-container">
        <div class="ct-areas-county">
            <span style="font-size: 16px; width: 390px; letter-spacing: 6px;" data-info='{"type":"xzq","code":"320292","name":"����"}'>�� ��</span>
        </div>
        <div class="ct-areas-slider"></div>
        <div class="ct-areas-town">
            <span data-info='{"type":"jd","code":"001","name":"��ׯ�ֵ�"}'>��ׯ�ֵ�</span>
            <span data-info='{"type":"jd","code":"002","name":"˶�Žֵ�"}'>˶�Žֵ�</span>
            <span data-info='{"type":"jd","code":"003","name":"��Ϫ�ֵ�"}'>��Ϫ�ֵ�</span>
            <span data-info='{"type":"jd","code":"004","name":"�°��ֵ�"}'>�°��ֵ�</span>
            <span data-info='{"type":"jd","code":"005","name":"÷��ֵ�"}'>÷��ֵ�</span>
            <span data-info='{"type":"jd","code":"006","name":"��ɽ�ֵ�"}'>��ɽ�ֵ�</span>
        </div>
        <div class="ct-areas-slider"></div>
        <div class="ct-areas-park">
            <span data-info='{"type":"yq","code":"320292KG01","name":"�������¼�����ҵ������"}'>���¼���������</span>
            <span data-info='{"type":"yq","code":"320292KG02","name":"�����������ۺϱ�˰��"}'>�������ۺϱ�˰��</span>
            <span data-info='{"type":"yq","code":"320292KS03","name":"˶�Ź�ҵ԰��"}'>˶�Ź�ҵ԰��</span>
            <span data-info='{"type":"yq","code":"320292JX04","name":"������������ɽ��ҵ������"}'>��ɽ��ҵ������</span>
            <span data-info='{"type":"yq","code":"320292JX05","name":"������������ׯ��ҵ������"}'>��ׯ��ҵ������</span>
            <span data-info='{"type":"yq","code":"320292JX06","name":"�����ո۲�ҵ԰"}'>�ո۲�ҵ԰</span>
            <span data-info='{"type":"yq","code":"320292JX07","name":"����������÷�幤ҵ������"}'>÷�幤ҵ������</span>
            <span data-info='{"type":"yq","code":"320292JX08","name":"������������Ϫ��ҵ������"}'>��Ϫ��ҵ������</span>
            <span data-info='{"type":"yq","code":"320292JX09","name":"������̫�������ʿƼ�԰"}'>̫�����ʿƼ�԰</span>
            <span data-info='{"type":"yq","code":"320292JX10","name":"�����¼��¹�ҵ԰"}'>�¼��¹�ҵ԰</span>
        </div>
    </div>

    <div id="map">
    </div>
    <div class="ct-nav-bar left-480">
        <span class="ct-nav-bar-btn ct-btn" data-info='{"type":"pewg","target":".pewg"}'>���õؿ�</span>
        <span class="ct-nav-bar-btn ct-btn" data-info='{"type":"ghdk","target":".ghdk"}'>�滮�ؿ�</span>
        <span class="ct-nav-bar-btn ct-btn" data-info='{"type":"cf","target":".cf"}'>��&nbsp;&nbsp;��</span>
        <span class="ct-nav-bar-btn ct-btn" data-info='{"type":"zt","target":".zt"}'>��&nbsp;&nbsp��</span>
        <span class="ct-nav-bar-btn ct-btn" data-info='{"type":"ztld","target":".ztld"}'>����¥��</span>
        <span class="ct-btn-nav-slider ct-nav-bar-btn icon-chevron-right"></span>
    </div>
    <div class="ct-results-panel left-330">
        <span class="ct-btn-results-panel-close icon-remove"></span>
        <div class="ct-results pewg">
            <div class="ct-results-header">���õؿ�</div>
            <div class="ct-results-container">
                <div class="ct-query-results">
                    <table style="height: 100%;"></table>
                </div>
                <div class="ct-query-conditions">
                    <table>
                        <tr>
                            <th style="width: 30%;">�ؿ����</th>
                            <td style="width: 70%;">
                                <input type="text" class="text-area text-dkmj-min" />~
                                <input type="text" class="text-area text-dkmj-max" />&nbsp;Ķ
                            </td>
                        </tr>
                        <tr>
                            <td colspan="2" style="padding-top: 10px; height: 30px; text-align: center;">
                                <span class="klyzt" data-type="��ֱ������">��ֱ������</span>
                                <span class="klyzt" data-type="������滮">������滮</span>
                                <span class="klyzt" data-type="���Ǩ">���Ǩ</span>
                            </td>
                        </tr>
                        <tr>
                            <th colspan="2" style="height: 60px;">
                                <span class="ct-query-btn ct-query-search">��&nbsp;&nbsp;��</span>
                                &nbsp;&nbsp;
                                <span class="ct-query-btn ct-query-clear">��&nbsp;&nbsp;��</span>
                            </th>
                        </tr>
                    </table>
                </div>
            </div>
        </div>
        <div class="ct-results ghdk">
            <div class="ct-results-header">�滮�ؿ�</div>
            <div class="ct-results-container">
                <div class="ct-query-results">
                    <table style="height: 100%;"></table>
                </div>
                <div class="ct-query-conditions">
                    <table>
                        <tr>
                            <th style="width: 30%;">�ؿ���</th>
                            <td style="width: 70%;">
                                <input type="text" class="text-normal text-dkbh" />
                            </td>
                        </tr>
                        <tr>
                            <th>�ؿ����</th>
                            <td>
                                <input type="text" class="text-area text-dkmj-min" />~
                                <input type="text" class="text-area text-dkmj-max" />&nbsp;Ķ
                            </td>
                        </tr>
                        <tr>
                            <th colspan="2" style="height: 60px;">
                                <span class="ct-query-btn ct-query-search">��&nbsp;&nbsp;��</span>
                                &nbsp;&nbsp;
                                <span class="ct-query-btn ct-query-clear">��&nbsp;&nbsp;��</span>
                            </th>
                        </tr>
                    </table>
                </div>
            </div>
        </div>
        <div class="ct-results cf">
            <div class="ct-results-header">��&nbsp;��</div>
            <div class="ct-results-container">
                <div class="ct-query-results">
                    <table style="height: 100%;">
                    </table>
                </div>
                <div class="ct-query-conditions">
                    <table>
                        <%--<tr>
                            <th style="width: 30%;">�������</th>
                            <td style="width: 70%;">
                                <input type="text" class="text-area text-jzmj-min" />~
                                <input type="text" class="text-area text-jzmj-max" />&nbsp;�O
                            </td>
                        </tr>--%>
                        <tr>
                            <th style="width: 30%;">�������</th>
                            <td style="width: 70%;">
                                <input type="text" class="text-area text-xzmj-min" />~
                                <input type="text" class="text-area text-xzmj-max" />&nbsp;�O
                            </td>
                        </tr>
                        <tr>
                            <td colspan="2" style="padding-left: 30px; padding-top: 10px;">
                                <span class="hylb" data-type='����'>��&nbsp;&nbsp;��</span>
                                <span class="hylb" data-type='����'>��&nbsp;&nbsp;��</span>
                                <span class="hylb" data-type='��е'>��&nbsp;&nbsp;е</span>
                                <span class="hylb" data-type='����'>��&nbsp;&nbsp;��</span>
                                <span class="hylb" data-type='����'>��&nbsp;&nbsp;��</span>
                                <span class="hylb" data-type='װ��'>װ&nbsp;&nbsp;��</span>
                                <span class="hylb" data-type='��װ'>��&nbsp;&nbsp;װ</span>
                                <span class="hylb" data-type='�칫'>��&nbsp;&nbsp;��</span>
                            </td>
                        </tr>
                        <tr>
                            <th colspan="2" style="height: 60px;">
                                <span class="ct-query-btn ct-query-search">��&nbsp;&nbsp;��</span>
                                &nbsp;&nbsp;
                                <span class="ct-query-btn ct-query-clear">��&nbsp;&nbsp;��</span>
                            </th>
                        </tr>
                    </table>
                </div>
            </div>
        </div>
        <div class="ct-results zt">
            <div class="ct-results-header">��&nbsp��</div>
            <div class="ct-results-container">
                <div class="ct-query-results">
                    <table style="height: 100%;"></table>
                </div>
                <div class="ct-query-conditions">
                    <table>
                        <tr>
                            <th>�������</th>
                            <td>
                                <input type="text" class="text-area text-xzmj-min" />~
                                <input type="text" class="text-area text-xzmj-max" />&nbsp;�O
                            </td>
                        </tr>
                        <tr>
                            <th>�������</th>
                            <td>
                                <input type="text" class="text-area text-jzmj-min" />~
                                <input type="text" class="text-area text-jzmj-max" />&nbsp;�O
                            </td>
                        </tr>
                        <tr>
                            <th style="width: 30%;">԰������</th>
                            <td style="width: 70%;">
                                <input type="text" class="text-normal text-yqmc" />
                            </td>
                        </tr>
                        <tr>
                            <th colspan="2" style="height: 60px;">
                                <span class="ct-query-btn ct-query-search">��&nbsp;&nbsp;��</span>
                                &nbsp;&nbsp;
                                <span class="ct-query-btn ct-query-clear">��&nbsp;&nbsp;��</span>
                            </th>
                        </tr>
                    </table>
                </div>
            </div>
        </div>

        <div class="ct-results ztld">
            <div class="ct-results-header">����¥��</div>
            <div class="ct-results-container">
                <div class="ct-query-results">
                    <table style="height: 100%;">
                    </table>
                </div>
                <div class="ct-query-conditions">
                    <table>
                        <tr>
                            <th style="width: 30%;">�������</th>
                            <td style="width: 70%;">
                                <input type="text" class="text-area text-xzmj-min" />~
                                <input type="text" class="text-area text-xzmj-max" />&nbsp;�O
                            </td>
                        </tr>
                        <tr>
                            <td colspan="2" style="padding-left: 20px; padding-top: 10px;">
                                <span class="ztmc" data-type='�ƴ���˾����ѧ�Ƽ�԰��'>�ƴ���˾</span>
                                <span class="ztmc" data-type='���԰'>���԰</span>
                                <span class="ztmc" data-type='΢��԰'>΢��԰</span>
                                <span class="ztmc" data-type='IC԰'>IC԰</span>
                            </td>
                        </tr>
                        <tr>
                            <th colspan="2" style="height: 60px;">
                                <span class="ct-query-btn ct-query-search">��&nbsp;&nbsp;��</span>
                                &nbsp;&nbsp;
                                <span class="ct-query-btn ct-query-clear">��&nbsp;&nbsp;��</span>
                            </th>
                        </tr>
                    </table>
                </div>
            </div>
        </div>
        <div class="ct-results details-panel">
            <span class="ct-btn-details-fallback">��&nbsp;&nbsp��</span>
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
        <div class="ct-loading-message">�����У����Ժ�...</div>
    </div>


    <div class="ct-cf-detail">
        <div class="ct-cf-detail-close icon-remove-sign"></div>
        <div class="cf-details">
            <div class="nav-legend">
                <ul>
                    <li data-target="cf-ptss">������ʩ</li>
                    <li data-target="cf-syqk">ʹ�����</li>
                </ul>
            </div>
            <div class="nav-body">
                <div class="cf-ptss">
                    <table class="cf-ptss-details">
                        <tr>
                            <th class="ct-cf-detail-th" style="width: 12%;" rowspan="5">������Ϣ</th>
                            <th style="width: 12%;">԰������</th>
                            <td style="width: 17%;" class="field" data-field="YQMC"></td>
                            <th style="width: 12%;">��������</th>
                            <td style="width: 17%;" class="field" data-field="CQMC"></td>
                            <th style="width: 12%;">����</th>
                            <td style="width: 17%;" class="field" data-field="SZ"></td>
                        </tr>
                        <tr>
                            <th>�����ֵ�</th>
                            <td class="field" data-field="SSJD"></td>
                            <th>��ϵ��</th>
                            <td class="field" data-field="SSJD_LXR"></td>
                            <th>��ϵ�绰</th>
                            <td class="field" data-field="SSJD_LXDH"></td>
                        </tr>
                        <tr>
                            <th>����λ</th>
                            <td class="field" data-field="GLDW"></td>
                            <th>��ϵ��</th>
                            <td class="field" data-field="GLDW_LXR"></td>
                            <th>��ϵ�绰</th>
                            <td class="field" data-field="GLDW_LXDH"></td>
                        </tr>
                        <tr>
                            <th>��������</th>
                            <td class="field" data-field="JCRQ"></td>
                            <th>�ܽ������</th>
                            <td class="field" data-field="JZMJ"></td>
                            <th>������̬</th>
                            <td class="field" data-field="JZXT"></td>
                        </tr>
                        <tr>
                            <th>��Ӫģʽ</th>
                            <td class="field" data-field="YYMS"></td>
                            <th>��ҵ����</th>
                            <td class="field"></td>
                            <td colspan="2" data-field="HYFL"></td>
                        </tr>
                        <tr>
                            <th class="ct-cf-detail-th" rowspan="2">��ˮ���</th>
                            <th>��ˮ��ʽ</th>
                            <td class="field" data-field="PS_PSFS"></td>
                            <th>����ˮ�ܾ�</th>
                            <td class="field" data-field="PS_ZPSGJ"></td>
                            <th>���۹ܾ�</th>
                            <td class="field" data-field="PS_PWGJ"></td>
                        </tr>
                        <tr>
                            <th>��ˮ״��</th>
                            <td class="field" data-field="PS_PSZK"></td>
                            <th>�Ƿ��䱸��ˮ����վ</th>
                            <td class="field" data-field="PS_SFPBWSCLZ"></td>
                            <th>�մ�������</th>
                            <td class="field" data-field="PS_RCLNL"></td>
                        </tr>
                        <tr>
                            <th class="ct-cf-detail-th" rowspan="3">��ˮ���</th>
                            <th>�Թ�ˮ</th>
                            <td class="field" data-field="GS_ZGS"></td>
                            <th>��ˮ����</th>
                            <td class="field" data-field="GS_GSBM"></td>
                            <th>����ˮ�ܾ�</th>
                            <td class="field" data-field="GS_ZGSGJ"></td>
                        </tr>
                        <tr>
                            <th>��ˮ��֤��</th>
                            <td class="field" data-field="GS_GSBZL"></td>
                            <th>ѹ��</th>
                            <td class="field" data-field="GS_YL"></td>
                            <th>ˮ��</th>
                            <td class="field" data-field="GS_SBJ"></td>
                        </tr>
                        <tr>
                            <th>��ע</th>
                            <td colspan="5" class="field" data-field="GS_BZ"></td>
                        </tr>
                        <tr>
                            <th class="ct-cf-detail-th" rowspan="4">�������</th>
                            <th>���粿��</th>
                            <td class="field" data-field="GD_GDBM"></td>
                            <th>�Ǹ������·</th>
                            <td class="field" data-field="GD_GGSDXL"></td>
                            <th>���籣֤��</th>
                            <td class="field" data-field="GD_GDBZL"></td>
                        </tr>
                        <tr>
                            <th>��ѹ��̨��</th>
                            <td class="field" data-field="GD_BYQTS"></td>
                            <th>����</th>
                            <td class="field" data-field="GD_RL"></td>
                            <th>���ߵ�ѹ</th>
                            <td class="field" data-field="GD_CXDY"></td>
                        </tr>
                        <tr>
                            <th>������̨��</th>
                            <td class="field" data-field="GD_FDJTS"></td>
                            <th>����</th>
                            <td class="field" data-field="GD_GL"></td>
                            <th>���õ���</th>
                            <td class="field" data-field="GD_NYDL"></td>
                        </tr>
                        <tr>
                            <th>�⹩��</th>
                            <td class="field" data-field="GD_WGD"></td>
                            <th>�Է���</th>
                            <td class="field" data-field="GD_ZFD"></td>
                            <th>��ע</th>
                            <td class="field" data-field="GD_BZ"></td>
                        </tr>
                        <tr>
                            <th class="ct-cf-detail-th" rowspan="2">�������</th>
                            <th>��������</th>
                            <td class="field" data-field="GQ_GQBM"></td>
                            <th>�ܾ�</th>
                            <td class="field" data-field="GQ_GJ"></td>
                            <th>��������</th>
                            <td class="field" data-field="GQ_NYQL"></td>
                        </tr>
                        <tr>
                            <th>������֤��</th>
                            <td class="field" data-field="GQ_GQBZL"></td>
                            <td colspan="4">&nbsp;</td>
                        </tr>
                        <tr>
                            <th class="ct-cf-detail-th">�������</th>
                            <th>���Ȳ���</th>
                            <td class="field" data-field="GR_GRBM"></td>
                            <th>�ܾ�</th>
                            <td class="field" data-field="GR_GJ"></td>
                            <td colspan="2"></td>
                        </tr>
                    </table>
                </div>
                <div class="cf-syqk">
                    <div class="cf-details-title">���ò��֣�</div>
                    <table class="cf-xzqk-details">
                        <tr>
                            <th style="width: 16%;">����������/�ֲ���</th>
                            <td class="field" data-field="XZ_CS" style="width: 17%;"></td>
                            <th style="width: 16%;">���</th>
                            <td class="field" data-field="XZ_MJ" style="width: 18%;"></td>
                        </tr>
                        <tr>
                            <th>����</th>
                            <td class="field" data-field="XZ_CX"></td>
                            <th>�Ƿ�װ��</th>
                            <td class="field" data-field="XZ_SFZX"></td>
                        </tr>
                        <tr>
                            <th>���(m)������/�ֲ���</th>
                            <td class="field" data-field="XZ_CG"></td>
                            <th>�����豸</th>
                            <td class="field" data-field="XZ_PTSS"></td>
                        </tr>
                        <tr>
                            <th>�Ƿ������</th>
                            <td class="field" data-field="XZ_SFKXS"></td>
                            <th>���ۼ۸�</th>
                            <td class="field" data-field="XZ_XSJG"></td>
                        </tr>
                        <tr>
                            <th>��ע</th>
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
                <li class="active">�����</li>
                <li>ƽ��ͼ</li>
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
                    <th style="width: 20%">����</th>
                    <td style="width: 30%" data-field="QY"></td>
                    <th style="width: 20%">��������</th>
                    <td style="width: 30%" data-field="ZTMC"></td>
                </tr>
                <tr>
                    <th>����</th>
                    <td data-field="DH"></td>
                    <th>�����</th>
                    <td data-field="FJH"></td>
                </tr>
                <tr>
                    <th>¥��</th>
                    <td data-field="LC"></td>
                    <th>���</th>
                    <td data-field="CG"></td>
                </tr>
                <tr>
                    <th>ʹ��״̬</th>
                    <td data-field="SYZT"></td>
                    <th>����</th>
                    <td data-field="CX"></td>
                </tr>
                <tr>
                    <th>��ҵ����</th>
                    <td data-field="QYMC"></td>
                    <th>��������</th>
                    <td data-field="FWLX"></td>
                </tr>
                <tr>
                    <th>��ͬ���</th>
                    <td data-field="HTMJ"></td>
                    <th>�������</th>
                    <td data-field="FWMJ"></td>
                </tr>
                <tr>
                    <th>����׼</th>
                    <td data-field="ZJBZ"></td>
                    <th>�������</th>
                    <td data-field="XZMJ"></td>
                </tr>
                <tr>
                    <th>�Ƿ���ҵ</th>
                    <td data-field="SFSY"></td>
                    <th>��ʼʱ��</th>
                    <td data-field="KSSJ"></td>
                </tr>
                <tr>
                    <th>װ�����</th>
                    <td data-field="ZXQK"></td>
                    <th>����ʱ��</th>
                    <td data-field="DQSJ"></td>
                </tr>
            </table>
        </div>
    </div>
</body>
</html>
