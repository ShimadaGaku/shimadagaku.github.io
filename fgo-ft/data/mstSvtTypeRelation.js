let mstSvtTypeRelation = {
    "God": {
        "Human": 900,
        "Earth": 1100
    },
    "Earth": {
        "God": 900,
        "Human": 1100
    },
    "Human": {
        "Earth": 900,
        "God": 1100
    },
    "Star": {
        "Beast": 1100
    },
    "Beast": {
        "Star": 1100
    }

}


let numToColor = {
    1: 'A',
    2: 'B',
    3: 'Q',
    4: 'EX'
}

let numToAttri = {
    1: 'Human',
    2: 'God',
    3: 'Earth',
    4: 'Star',
    5: 'Beast'
}

//individuality表達擁有的屬性
let individualityList = {
    100: {
        'name': 'Saber',
        'type': 'Saber'
    },
    101: {
        'name': 'Lancer',
        'type': 'Lancer'
    },
    102: {
        'name': 'Archer',
        'type': 'Archer'
    },
    103: {
        'name': 'Rider',
        'type': 'Rider'
    },
    104: {
        'name': 'Caster',
        'type': 'Caster'
    },
    105: {
        'name': 'Assassin',
        'type': 'Assassin'
    },
    106: {
        'name': 'Berserker',
        'type': 'Berserker'
    },
    107: {
        'name': 'Shielder',
        'type': 'Shielder'
    },
    108: {
        'name': 'Ruler',
        'type': 'Ruler'
    },
    110: {
        'name': 'Avenger',
        'type': 'Avenger'
    },
    109: {
        'name': 'Alterego',
        'type': 'Alterego'
    },
    115: {
        'name': 'MoonCancer',
        'type': 'MoonCancer'
    },
    117: {
        'name': 'Foreigner',
        'type': 'Foreigner'
    },
    202: {
        'name': '人',
        'type': 'Human'
    },
    200: {
        'name': '天',
        'type': 'God'
    },
    201: {
        'name': '地',
        'type': 'Earth'
    },
    203: {
        'name': '星',
        'type': 'Star'
    },
    204: {
        'name': '獸',
        'type': 'Beast'
    },
    1: {
        'name': '男性',
        'type': 'Male'
    },
    2: {
        'name': '女性',
        'type': 'Female'
    },
    3: {
        'name': '不明',
        'type': 'Unknown'
    },
    300: {
        'name': '秩序',
        'type': 'Order'
    },
    301: {
        'name': '混沌',
        'type': 'Chaos'
    },
    302: {
        'name': '中立',
        'type': 'Neutral'
    },
    303: {
        'name': '善',
        'type': 'Good'
    },
    304: {
        'name': '惡',
        'type': 'Evil'
    },
    305: {
        'name': '中庸',
        'type': 'Moderate'
    },
    308: {
        'name': '夏',
        'type': 'Summer'
    },
    1000: {
        'name': 'Servant',
        'type': 'Servant'
    },
    1001: {
        'name': '人類',
        'type': 'Humanity'
    },
    1002: {
        'name': '死靈',
        'type': 'Necromancer'
    },
    1119: {
        'name': '惡魔',
        'type': 'Demon'
    },
    2000: {
        'name': '神性',
        'type': 'Divine'
    },
    2001: {
        'name': '人型',
        'type': 'HumanType'
    },
    2002: {
        'name': '龍',
        'type': 'Dragon'
    },
    2004: {
        'name': '羅馬',
        'type': 'Rome'
    },
    2005: {
        'name': '猛獸',
        'type': 'Brute'
    },
    2007: {
        'name': '阿爾托莉亞臉',
        'type': 'AertoliaFace'
    },
    2008: {
        'name': '被天地乖離開辟之星所剋',
        'type': 'cno12counter'
    },
    2009: {
        'name': '騎乘',
        'type': 'Riding'
    },
    2010: {
        'name': '亞瑟',
        'type': 'Arthur'
    },
    2011: {
        'name': '被人類神話・雷電降臨所剋',
        'type': 'cno77counter'
    },
    2012: {
        'name': '愛人',
        'type': 'Lover'
    },
    2018: {
        'name': '死靈與惡魔',
        'type': '1002and1119'
    },
    2019: {
        'name': '魔性',
        'type': 'Magic'
    },
    2037: {
        'name': '被神秘殺し所剋',
        'type': 'cno114counter'
    },
    2040: {
        'name': '神性與惡魔與死靈',
        'type': '2000and1002and1119'
    },
    2076: {
        'name': '超巨大',
        'type': 'SuperHuge'
    },
    2113: {
        'name': '王',
        'type': 'King'
    },
    2114: {
        'name': '希臘神話系男性',
        'type': 'GreekMale'
    }
}

// 特攻表
let superAtkList = {
    'all': 99999,
    '持有人之力敵人': 202,
    '魔性': 2019,
    '神性': 2000,
    '王': 2113,
    'Saber職階Servant': 100,
    'Saber': 100,
    '男性': 1,
    '愛人': 2012,
    '阿爾托莉亞臉': 2007,
    '持有天或地之力的Servant': 2011,
    '亞瑟': 2010,
    '女性': 2,
    '騎乘技能': 2009,
    'Servant': 2008,
    '龍': 2002,
    '神性與惡魔與死靈': 2040,
    '持有天或地之力的Servant(擬似Servant、半Servant除外)': 2037,
    '人型': 2001,
    'Saber': 100,
    '死靈': 1002,
    '羅馬': 2004,
    '人類': 1001,
    'Ruler': 108,
    '惡': 304,
    '猛獸': 2005,
    '超巨大': 2076,
    //
    '毒': 99990,
    '陽光': 99991,
    '水邊': 99991,
    '森林': 99991,
    '燃燒': 99991,
    '冥界加護': 99991,
    '希臘神話系男性': 2114
}

let numToClass = {
    1: 'Saber',
    2: 'Archer',
    3: 'Lancer',
    4: 'Rider',
    5: 'Caster',
    6: 'Assassin',
    7: 'Berserker',
    8: 'Shielder',
    9: 'Ruler',
    10: 'Alterego',
    11: 'Avenger',
    23: 'MoonCancer',
    25: 'Foreigner'
}