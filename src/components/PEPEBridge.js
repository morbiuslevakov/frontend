import React from "react";
import { Form as Card } from 'react-bootstrap';
import '../App.css';
import { connect } from "react-redux";
import './css/PEPEBridge.css';
import './css/trade.css'
import { BridgeWidget, IncomingMessageKind, OutgoingMessageKind } from "@pepe-team/bridge-widget-embedder";

class PEPEBridge extends React.Component {
    constructor(props) {
        super(props);
        this.widget = new BridgeWidget();
    }

    componentDidMount() {
        const { isLoggedIn } = this.props;

        if (isLoggedIn) {
            this.widget.on(IncomingMessageKind.GetAccount, (m) => {
                this.widget.sendMessage({
                    mid: m.mid,
                    kind: OutgoingMessageKind.Account,
                    payload: {
                        account: {
                            chainId: "W",
                            address: '3P2cjYPo4XbAeHRviCiuaKjwmEAVSy6esf7',
                            publicKey: 'D9fzeb3TUg41L3HiXqk1XL1SbAtU1XH4qerfaPa75PVn'
                        }
                    }
                });
            });
            this.widget.run({
                name: 'PEPEBridge',
                iframeUrl: 'https://bridge.pepe.team/iframe',
                host: document.getElementById("bridge"),
                token: 'WAVES',
                source_chain_id: 1,
                target_chain_id: 2,
                ext_signing_chains: [1],
                recipient: '',
                referrer: '3P9mTCpBtuAzMkHodb4XwgX4zKYAch2pgwa',
                activeTab: 'history'
            });
        } else {
            return;
        }
    }

    componentWillUnmount() {
        this.widget.destroy();
    }

    render() {
        const { isLoggedIn } = this.props;

        return (
            <div className="content-container" style={{ "height": "100%" }}>
                <div id="bridge" className="bridge" style={{ "height": "100%" }}>
                    <h1 className="pepe-zone">
                        PEPE Team Zone
                    </h1>
                    {!isLoggedIn &&
                        <Card className="service-card">
                            <svg className="exchange-svg" width="100%" viewBox="0 0 2759 1653" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <mask id="mask0_3_486" maskUnits="userSpaceOnUse" x="0" y="864" width="1365" height="789">
                                    <rect width="787.681" height="787.681" transform="matrix(0.866025 0.5 -0.866025 0.5 682.22 864.874)" fill="#D9D9D9" />
                                </mask>
                                <g mask="url(#mask0_3_486)">
                                    <rect width="787.681" height="787.681" transform="matrix(0.866025 0.5 0 1 682.22 864.874)" fill="url(#paint0_linear_3_486)" />
                                    <rect width="787.681" height="787.681" transform="matrix(0.866025 -0.5 0 1 0.0686035 1258.71)" fill="url(#paint1_linear_3_486)" />
                                </g>
                                <mask id="mask1_3_486" maskUnits="userSpaceOnUse" x="1393" y="479" width="1366" height="789">
                                    <rect width="787.681" height="787.681" transform="matrix(0.866025 0.5 -0.866025 0.5 2076.13 479.903)" fill="#D9D9D9" />
                                </mask>
                                <g mask="url(#mask1_3_486)">
                                    <rect width="787.681" height="787.681" transform="matrix(0.866025 0.5 0 1 2076.13 479.903)" fill="url(#paint2_linear_3_486)" />
                                    <rect width="787.681" height="787.681" transform="matrix(0.866025 -0.5 0 1 1393.97 873.743)" fill="url(#paint3_linear_3_486)" />
                                </g>
                                <path fill-rule="evenodd" clip-rule="evenodd" d="M1288.2 1215.08L1339.74 1244.83C1341.21 1249.62 1342.02 1254.43 1342.02 1258.98C1342.02 1276.88 1329.46 1284.13 1313.97 1275.18C1298.48 1266.24 1285.92 1244.48 1285.92 1226.59C1285.92 1222.03 1286.73 1218.16 1288.2 1215.08Z" fill="url(#paint4_linear_3_486)" />
                                <path d="M1288.19 1215.08L1636.4 1014.04L1687.94 1043.81L1660.95 1059.38L1345.13 1241.71L1339.73 1244.83L1288.19 1215.08Z" fill="url(#paint5_linear_3_486)" />
                                <path fill-rule="evenodd" clip-rule="evenodd" d="M1636.65 1013.85L1688.18 1043.6L1651.33 1064.93C1641.35 1054.2 1634.36 1038.71 1634.36 1025.36C1634.36 1020.8 1635.17 1016.94 1636.65 1013.85Z" fill="url(#paint6_linear_3_486)" />
                                <path fill-rule="evenodd" clip-rule="evenodd" d="M1164.4 1143.41L1215.93 1173.16C1217.4 1177.95 1218.22 1182.76 1218.22 1187.32C1218.22 1205.21 1205.66 1212.46 1190.16 1203.52C1174.67 1194.57 1162.11 1172.81 1162.11 1154.92C1162.11 1150.36 1162.92 1146.5 1164.4 1143.41Z" fill="url(#paint7_linear_3_486)" />
                                <path d="M1164.39 1143.41L1512.59 942.377L1564.14 972.141L1537.15 987.708L1221.33 1170.05L1215.93 1173.16L1164.39 1143.41Z" fill="url(#paint8_linear_3_486)" />
                                <path fill-rule="evenodd" clip-rule="evenodd" d="M1512.69 942.28L1564.23 972.033L1527.38 993.359C1517.4 982.633 1510.41 967.138 1510.41 953.792C1510.41 949.233 1511.22 945.365 1512.69 942.28Z" fill="url(#paint9_linear_3_486)" />
                                <path fill-rule="evenodd" clip-rule="evenodd" d="M1045.94 1074.71L1097.47 1104.46C1098.95 1109.25 1099.76 1114.06 1099.76 1118.62C1099.76 1136.51 1087.2 1143.76 1071.71 1134.82C1056.21 1125.87 1043.65 1104.11 1043.65 1086.22C1043.65 1081.66 1044.47 1077.8 1045.94 1074.71Z" fill="url(#paint10_linear_3_486)" />
                                <path d="M1045.93 1074.71L1394.13 873.677L1445.68 903.441L1418.69 919.008L1102.87 1101.35L1097.47 1104.46L1045.93 1074.71Z" fill="url(#paint11_linear_3_486)" />
                                <path fill-rule="evenodd" clip-rule="evenodd" d="M1394.13 873.684L1445.67 903.437L1408.82 924.762C1398.84 914.037 1391.85 898.542 1391.85 885.196C1391.85 880.637 1392.66 876.769 1394.13 873.684Z" fill="url(#paint12_linear_3_486)" />
                                <circle cx="297.884" cy="297.884" r="297.884" transform="matrix(0.866025 0.5 -0.866025 0.5 681.881 510.185)" fill="#FFCD00" />
                                <path d="M317.051 808.068C317.051 866.234 357.886 918.893 423.908 957.01V1016.59C357.886 978.469 317.051 925.811 317.051 867.645V808.068Z" fill="#EDAF02" />
                                <path d="M423.909 957.01C566.385 1039.27 797.383 1039.27 939.859 957.01V1016.59C797.383 1098.85 566.385 1098.85 423.909 1016.59V957.01Z" fill="#AE7F00" />
                                <path d="M1046.71 808.068C1046.71 866.234 1005.88 918.893 939.856 957.01V1016.59C1005.88 978.469 1046.71 925.811 1046.71 867.645V808.068Z" fill="#936003" />
                                <circle cx="297.884" cy="297.884" r="297.884" transform="matrix(0.866025 0.5 -0.866025 0.5 2076.13 122.475)" fill="#FFCD00" />
                                <path d="M1711.29 420.359C1711.29 478.525 1752.13 531.183 1818.15 569.301V628.878C1752.13 590.76 1711.29 538.101 1711.29 479.936V420.359Z" fill="#EDAF02" />
                                <path d="M1818.15 569.301C1960.63 651.559 2191.62 651.559 2334.1 569.301V628.878C2191.62 711.136 1960.63 711.136 1818.15 628.878V569.301Z" fill="#AE7F00" />
                                <path d="M2440.96 420.359C2440.96 478.525 2400.12 531.183 2334.1 569.301V628.878C2400.12 590.76 2440.96 538.101 2440.96 479.936V420.359Z" fill="#936003" />
                                <path fill-rule="evenodd" clip-rule="evenodd" d="M691.881 632.898C685.693 629.326 678.069 629.326 671.881 632.898L546.043 705.551C539.855 709.124 536.043 715.726 536.043 722.871V735.241L681.881 651.041L681.875 674.836L536.043 759.034V782.721L597.875 747.023L681.881 698.522L765.887 747.023V844.025L681.881 892.526L681.881 795.524L597.875 747.023L597.869 770.818L536.043 806.514V830.669L597.875 794.971L597.869 818.766L536.043 854.462V868.176C536.043 875.322 539.855 881.924 546.043 885.497L558.117 892.467L620.016 856.73L640.595 868.698L578.757 904.384L599.393 916.298L661.218 880.603L681.797 892.572L620.033 928.215L640.678 940.134L786.448 855.974L807.003 867.901L661.252 952.012L671.881 958.149C678.069 961.722 685.693 961.722 691.881 958.149L817.719 885.497C823.907 881.924 827.719 875.322 827.719 868.176V722.871C827.719 715.726 823.907 709.124 817.719 705.551L691.881 632.898Z" fill="url(#paint13_linear_3_486)" />
                                <path fill-rule="evenodd" clip-rule="evenodd" d="M1045.89 820.862C1034.7 747.601 1003.46 693.563 881.865 646.464C775.398 609.174 625.397 584.551 459.068 656.679C373.61 688.726 323.461 749.354 317.349 816.278C311.212 722.89 404.679 667.194 455.786 642.31C612.373 572.554 789.735 595.252 885.262 632.741C1025.16 688.156 1049.97 767.335 1045.89 820.862Z" fill="#87702D" />
                                <path fill-rule="evenodd" clip-rule="evenodd" d="M2440.16 433.331C2428.97 360.07 2397.73 306.033 2276.14 258.933C2169.67 221.643 2019.67 197.02 1853.34 269.149C1767.88 301.195 1717.73 361.823 1711.62 428.748C1705.48 335.359 1798.95 279.663 1850.06 254.779C2006.64 185.023 2184.01 207.721 2279.53 245.21C2419.43 300.625 2444.24 379.804 2440.16 433.331Z" fill="#87702D" />
                                <path fill-rule="evenodd" clip-rule="evenodd" d="M2065.42 268.982H2095.82V295.617C2110.76 296.35 2123.14 298.876 2134.03 303.193C2147.23 308.394 2158.09 315.741 2164.77 325.235C2171.54 334.729 2174.46 345.915 2174.46 358.794C2174.46 368.122 2172.86 376.625 2168.73 384.303C2164.69 391.981 2158.08 398.42 2150.74 403.621C2143.4 408.739 2135.73 412.289 2125.91 414.271V416.747C2136.8 417.16 2146.7 419.926 2155.62 425.044C2164.53 430.08 2171.62 437.056 2176.9 445.972C2182.18 454.805 2184.82 465.207 2184.82 477.178C2184.82 491.047 2181.19 503.389 2173.93 514.204C2166.75 525.018 2156.52 533.522 2143.24 539.713C2130.02 545.875 2114.27 548.971 2095.99 549V571.736H2065.59V549.001H2039.17V571.736H2008.78V549.001H1976.42V295.391H2008.61V268.982H2039V295.391H2065.42V268.982ZM2031.93 494.019H2077.4C2088.95 494.019 2097.62 491.872 2103.39 487.58C2109.17 483.204 2112.05 476.765 2112.05 468.262C2112.05 462.318 2110.69 457.282 2107.97 453.154C2105.25 449.026 2101.37 445.889 2096.34 443.743C2091.39 441.596 2085.41 440.523 2078.39 440.523H2031.93V494.019ZM2031.93 397.925H2073.44C2079.47 397.925 2084.79 396.975 2089.41 395.077C2094.03 393.178 2097.62 390.453 2100.17 386.904C2102.81 383.271 2104.13 378.854 2104.13 373.653C2104.13 365.811 2101.33 359.826 2095.72 355.698C2090.11 351.487 2083.01 349.382 2074.43 349.382H2031.93V397.925Z" fill="url(#paint14_linear_3_486)" />
                                <defs>
                                    <linearGradient id="paint0_linear_3_486" x1="393.841" y1="0" x2="393.841" y2="787.681" gradientUnits="userSpaceOnUse">
                                        <stop stop-color="#667DEA" />
                                        <stop offset="1" stop-color="#764BA2" stop-opacity="0.68" />
                                    </linearGradient>
                                    <linearGradient id="paint1_linear_3_486" x1="393.841" y1="0" x2="393.841" y2="787.681" gradientUnits="userSpaceOnUse">
                                        <stop stop-color="#667DEA" />
                                        <stop offset="1" stop-color="#764BA2" stop-opacity="0.28" />
                                    </linearGradient>
                                    <linearGradient id="paint2_linear_3_486" x1="393.841" y1="0" x2="393.841" y2="787.681" gradientUnits="userSpaceOnUse">
                                        <stop stop-color="#667DEA" />
                                        <stop offset="1" stop-color="#764BA2" stop-opacity="0.68" />
                                    </linearGradient>
                                    <linearGradient id="paint3_linear_3_486" x1="393.841" y1="0" x2="393.841" y2="787.681" gradientUnits="userSpaceOnUse">
                                        <stop stop-color="#667DEA" />
                                        <stop offset="1" stop-color="#764BA2" stop-opacity="0.28" />
                                    </linearGradient>
                                    <linearGradient id="paint4_linear_3_486" x1="1288.23" y1="1215.1" x2="1339.72" y2="1244.84" gradientUnits="userSpaceOnUse">
                                        <stop stop-color="#93AAFC" />
                                        <stop offset="1" stop-color="#516096" />
                                    </linearGradient>
                                    <linearGradient id="paint5_linear_3_486" x1="1475.18" y1="1107.12" x2="1500.96" y2="1151.77" gradientUnits="userSpaceOnUse">
                                        <stop stop-color="#93AAFC" />
                                        <stop offset="1" stop-color="#516096" />
                                    </linearGradient>
                                    <linearGradient id="paint6_linear_3_486" x1="1636.68" y1="1014.32" x2="1685.21" y2="1042.85" gradientUnits="userSpaceOnUse">
                                        <stop stop-color="#5857A2" />
                                        <stop offset="1" stop-color="#545095" />
                                    </linearGradient>
                                    <linearGradient id="paint7_linear_3_486" x1="1164.42" y1="1143.43" x2="1215.92" y2="1173.17" gradientUnits="userSpaceOnUse">
                                        <stop stop-color="#93AAFC" />
                                        <stop offset="1" stop-color="#516096" />
                                    </linearGradient>
                                    <linearGradient id="paint8_linear_3_486" x1="1351.38" y1="1035.45" x2="1377.15" y2="1080.1" gradientUnits="userSpaceOnUse">
                                        <stop stop-color="#93AAFC" />
                                        <stop offset="1" stop-color="#516096" />
                                    </linearGradient>
                                    <linearGradient id="paint9_linear_3_486" x1="1512.73" y1="942.754" x2="1561.26" y2="971.282" gradientUnits="userSpaceOnUse">
                                        <stop stop-color="#5F69C4" />
                                        <stop offset="1" stop-color="#5D63B9" />
                                    </linearGradient>
                                    <linearGradient id="paint10_linear_3_486" x1="1045.96" y1="1074.73" x2="1097.46" y2="1104.47" gradientUnits="userSpaceOnUse">
                                        <stop stop-color="#93AAFC" />
                                        <stop offset="1" stop-color="#516096" />
                                    </linearGradient>
                                    <linearGradient id="paint11_linear_3_486" x1="1232.92" y1="966.754" x2="1258.69" y2="1011.4" gradientUnits="userSpaceOnUse">
                                        <stop stop-color="#93AAFC" />
                                        <stop offset="1" stop-color="#516096" />
                                    </linearGradient>
                                    <linearGradient id="paint12_linear_3_486" x1="1394.17" y1="874.158" x2="1442.7" y2="902.685" gradientUnits="userSpaceOnUse">
                                        <stop stop-color="#667DE9" />
                                        <stop offset="1" stop-color="#6375DB" />
                                    </linearGradient>
                                    <linearGradient id="paint13_linear_3_486" x1="681.881" y1="630.219" x2="681.881" y2="960.829" gradientUnits="userSpaceOnUse">
                                        <stop stop-color="#EDAF02" />
                                        <stop offset="1" stop-color="#AE7F00" />
                                    </linearGradient>
                                    <linearGradient id="paint14_linear_3_486" x1="2090.05" y1="249.335" x2="2090.05" y2="569.293" gradientUnits="userSpaceOnUse">
                                        <stop stop-color="#EDAF02" />
                                        <stop offset="1" stop-color="#AE7F00" />
                                    </linearGradient>
                                </defs>
                            </svg>
                            <Card.Body>
                                <Card.Title className="service-title">PEPE Bridge</Card.Title>
                                <Card.Text className="service-text">
                                    Чтобы продолжить необходимо выполнить <a href="/login">вход</a>
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    }
                </div>
            </div>
        )
    }
}

function mapStateToProps(state) {
    const { isLoggedIn } = state.auth;
    const { message } = state.message;
    return {
        isLoggedIn,
        message
    };
}

export default connect(mapStateToProps)(PEPEBridge);