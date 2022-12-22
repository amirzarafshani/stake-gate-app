const coins = [
  {
    symbol: "SRM",
    id: "6187",
  },
  {
    symbol: "APE",
    id: "18876",
  },
  {
    symbol: "ELON",
    id: "9436",
  },
  {
    symbol: "ETC",
    id: "1321",
  },
  {
    symbol: "REP",
    id: "1104",
  },
  {
    symbol: "SOUL",
    id: "2827",
  },
  {
    symbol: "WAVES",
    id: "1274",
  },
  {
    symbol: "BTC",
    id: "1",
  },
  {
    symbol: "AAVE",
    id: "7278",
  },
  {
    symbol: "MKR",
    id: "1518",
  },
  {
    symbol: "XMR",
    id: "328",
  },
  {
    symbol: "COMP",
    id: "5692",
  },
  {
    symbol: "LINK",
    id: "1975",
  },
  {
    symbol: "GMT",
    id: "18069",
  },
  {
    symbol: "CELO",
    id: "5567",
  },
  {
    symbol: "XTZ",
    id: "2011",
  },
  {
    symbol: "EOS",
    id: "1765",
  },
  {
    symbol: "IOI",
    id: "10295",
  },
  {
    symbol: "DSLA",
    id: "5423",
  },
  {
    symbol: "ZEC",
    id: "1437",
  },
  {
    symbol: "XLM",
    id: "512",
  },
  {
    symbol: "DOT",
    id: "6636",
  },
  {
    symbol: "HBAR",
    id: "4642",
  },
  {
    symbol: "EGLD",
    id: "6892",
  },
  {
    symbol: "ADA",
    id: "2010",
  },
  {
    symbol: "SAND",
    id: "6210",
  },
  {
    symbol: "THETA",
    id: "2416",
  },
  {
    symbol: "ETH",
    id: "1027",
  },
  {
    symbol: "ALPHA",
    id: "7232",
  },
  {
    symbol: "SXP",
    id: "4279",
  },
  {
    symbol: "XAVA",
    id: "9797",
  },
  {
    symbol: "OCEAN",
    id: "3911",
  },
  {
    symbol: "XCH",
    id: "9258",
  },
  {
    symbol: "DASH",
    id: "131",
  },
  {
    symbol: "NFT",
    id: "9816",
  },
  {
    symbol: "XNO",
    id: "1567",
  },
  {
    symbol: "YFI",
    id: "5864",
  },
  {
    symbol: "NEO",
    id: "1376",
  },
  {
    symbol: "GRT",
    id: "6719",
  },
  {
    symbol: "BAND",
    id: "4679",
  },
  {
    symbol: "DGB",
    id: "109",
  },
  {
    symbol: "ENS",
    id: "13855",
  },
  {
    symbol: "SUSHI",
    id: "6758",
  },
  {
    symbol: "UNI",
    id: "7083",
  },
  {
    symbol: "DOGE",
    id: "74",
  },
  {
    symbol: "USDT",
    id: "825",
  },
  {
    symbol: "USDC",
    id: "3408",
  },
  {
    symbol: "STETH",
    id: "8085",
  },
  {
    symbol: "BUSD",
    id: "4687",
  },
  {
    symbol: "BAT",
    id: "1697",
  },
  {
    symbol: "CHZ",
    id: "4066",
  },
  {
    symbol: "FLAME",
    id: "12678",
  },
  {
    symbol: "VET",
    id: "3077",
  },
  {
    symbol: "HERO",
    id: "10778",
  },
  {
    symbol: "C98",
    id: "10903",
  },
  {
    symbol: "COTI",
    id: "3992",
  },
  {
    symbol: "GALA",
    id: "7080",
  },
  {
    symbol: "AXS",
    id: "6783",
  },
  {
    symbol: "ICX",
    id: "2099",
  },
  {
    symbol: "RNDR",
    id: "5690",
  },
  {
    symbol: "SLIM",
    id: "9741",
  },
  {
    symbol: "ZRX",
    id: "1896",
  },
  {
    symbol: "INJ",
    id: "7226",
  },
  {
    symbol: "VRA",
    id: "3816",
  },
  {
    symbol: "ZIL",
    id: "2469",
  },
  {
    symbol: "ATOM",
    id: "3794",
  },
  {
    symbol: "ONE",
    id: "3945",
  },
  {
    symbol: "CHR",
    id: "3978",
  },
  {
    symbol: "ICP",
    id: "8916",
  },
  {
    symbol: "MATIC",
    id: "3890",
  },
  {
    symbol: "OMG",
    id: "1808",
  },
  {
    symbol: "FLOW",
    id: "4558",
  },
  {
    symbol: "SHIB",
    id: "5994",
  },
  {
    symbol: "BABYDOGE",
    id: "10407",
  },
  {
    symbol: "QTUM",
    id: "1684",
  },
  {
    symbol: "SENSO",
    id: "5522",
  },
  {
    symbol: "UNFI",
    id: "7672",
  },
  {
    symbol: "ONT",
    id: "2566",
  },
  {
    symbol: "FTT",
    id: "4195",
  },
  {
    symbol: "KAVA",
    id: "4846",
  },
  {
    symbol: "OGN",
    id: "5117",
  },
  {
    symbol: "SLP",
    id: "5824",
  },
  {
    symbol: "FIL",
    id: "2280",
  },
  {
    symbol: "ALGO",
    id: "4030",
  },
  {
    symbol: "TOWER",
    id: "8620",
  },
  {
    symbol: "CRV",
    id: "6538",
  },
  {
    symbol: "BLOK",
    id: "11206",
  },
  {
    symbol: "HNT",
    id: "5665",
  },
  {
    symbol: "HOT",
    id: "2682",
  },
  {
    symbol: "DIVI",
    id: "3441",
  },
  {
    symbol: "KNC",
    id: "9444",
  },
  {
    symbol: "KISHU",
    id: "9386",
  },
  {
    symbol: "LPOOL",
    id: "8545",
  },
  {
    symbol: "DODO",
    id: "7224",
  },
  {
    symbol: "CAKE",
    id: "1",
  },
  {
    symbol: "CTK",
    id: "4807",
  },
  {
    symbol: "RUNE",
    id: "4157",
  },
  {
    symbol: "DUSK",
    id: "4092",
  },
  {
    symbol: "BETA",
    id: "11307",
  },
  {
    symbol: "PYR",
    id: "9308",
  },
  {
    symbol: "FLUX",
    id: "3029",
  },
  {
    symbol: "DAI",
    id: "4943",
  },
  {
    symbol: "TWT",
    id: "5964",
  },
  {
    symbol: "TOMO",
    id: "2570",
  },
  {
    symbol: "XVS",
    id: "7288",
  },
  {
    symbol: "BAKE",
    id: "7064",
  },
  {
    symbol: "BNB",
    id: "1839",
  },
  {
    symbol: "BTTC",
    id: "3718",
  },
  {
    symbol: "XRP",
    id: "52",
  },
  {
    symbol: "kp3r",
    id: "7535",
  },
  {
    symbol: "CELR",
    id: "3814",
  },
  {
    symbol: "BCH",
    id: "1831",
  },
  {
    symbol: "NEAR",
    id: "6535",
  },
  {
    symbol: "LUNA",
    id: "4172",
  },
  {
    symbol: "KDA",
    id: "5647",
  },
  {
    symbol: "LTC",
    id: "2",
  },
  {
    symbol: "AVAX",
    id: "5805",
  },
  {
    symbol: "TRX",
    id: "1958",
  },
  {
    symbol: "AR",
    id: "5632",
  },
  {
    symbol: "MANA",
    id: "1966",
  },
  {
    symbol: "ENJ",
    id: "2130",
  },
  {
    symbol: "SNX",
    id: "2586",
  },
  {
    symbol: "IOTA",
    id: "1720",
  },
  {
    symbol: "CLV",
    id: "8384",
  },
  {
    symbol: "ROSE",
    id: "7653",
  },
  {
    symbol: "FTM",
    id: "3513",
  },
  {
    symbol: "MBOX",
    id: "9175",
  },
  {
    symbol: "DYDX",
    id: "11156",
  },
  {
    symbol: "ANT",
    id: "1680",
  },
  {
    symbol: "WIN",
    id: "4206",
  },
  {
    symbol: "PUNDIX",
    id: "9040",
  },
  {
    symbol: "SOL",
    id: "5426",
  },
  {
    symbol: "1INCH",
    id: "8104",
  },
  {
    symbol: "LEO",
    id: "15990",
  },
  {
    symbol: "OKB",
    id: "3897",
  },
  {
    symbol: "CRO",
    id: "3635",
  },
];

export default coins;
