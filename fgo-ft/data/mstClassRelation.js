let mstClassNp = {
    "class": {
        "Rider": 1.1,
        "Caster": 1.2,
        "Assassin": 0.9,
        "Berserker": 0.8,
        "MoonCancer": 1.2,
    },
    "feature": {
        "Spirit": 1.2,
    }

};

let mstClass = {
    "Saber":
    {
        "id":1,
        "name":"Saber",
        "attackRate":1000,
        "imageId":1
    },
    "Archer":
    {
        "id":2,
        "name":"Archer",
        "attackRate":950,
        "imageId":2
    },
    "Lancer":
    {
        "id":3,
        "name":"Lancer",
        "attackRate":1050,
        "imageId":3
    },
    "Rider":
    {
        "id":4,
        "name":"Rider",
        "attackRate":1000,
        "imageId":4
    },
    "Caster":
    {
        "id":5,
        "name":"Caster",
        "attackRate":900,
        "imageId":5
    },
    "Assassin":
    {
        "id":6,
        "name":"Assassin",
        "attackRate":900,
        "imageId":6
    },
    "Berserker":
    {
        "id":7,
        "name":"Berserker",
        "attackRate":1100,
        "imageId":7
    },
    "Shielder":
    {
        "id":8,
        "name":"Shielder",
        "attackRate":1000,
        "imageId":8
    },
    "Ruler":
    {
        "id":9,
        "name":"Ruler",
        "attackRate":1100,
        "imageId":9
    },
    "Alterego":
    {
        "id":10,
        "name":"Alterego",
        "attackRate":1000,
        "imageId":10
    },
    "Avenger":
    {
        "id":11,
        "name":"Avenger",
        "attackRate":1100,
        "imageId":11
    },
    "MoonCancer":
    {
        "id":12,
        "name":"MoonCancer",
        "attackRate":1000,
        "imageId":12
    },
    "Foreigner":
    {
        "id":25,
        "name":"Foreigner",
        "attackRate":1000,
        "imageId":25
    }
};

let mstClassRelation = {
    "Saber": {
        "Archer": 500,
        "Lancer": 2000,
        "Berserker": 2000,
        "Ruler": 500,
        "Unknown": 1000
    },
    "Archer": {
        "Saber": 2000,
        "Lancer": 500,
        "Berserker": 2000,
        "Ruler": 500,
        "Unknown": 1000
    },
    "Lancer": {
        "Saber": 500,
        "Archer": 2000,
        "Berserker": 2000,
        "Ruler": 500,
        "Unknown": 1000
    },
    "Rider": {
        "Caster": 2000,
        "Assassin": 500,
        "Berserker": 2000,
        "Ruler": 500,
        "BeastI": 2000,
        "Unknown": 1000
    },
    "Caster": {
        "Rider": 500,
        "Assassin": 2000,
        "Berserker": 2000,
        "Ruler": 500,
        "BeastI": 2000,
        "Unknown": 1000
    },
    "Assassin": {
        "Rider": 2000,
        "Caster": 500,
        "Berserker": 2000,
        "Ruler": 500,
        "BeastI": 2000,
        "Unknown": 1000
    },
    "Berserker": {
        "Saber": 1500,
        "Archer": 1500,
        "Lancer": 1500,
        "Rider": 1500,
        "Caster": 1500,
        "Assassin": 1500,
        "Berserker": 1500,
        "Ruler": 1500,
        "Avenger": 1500,
        "Alterego": 1500,
        "MoonCancer": 1500,
        "Foreigner": 500,
        "BeastI": 1500,
        "Unknown": 1500
    },
    "Shielder": {
        "Unknown": 1000
    },
    "Ruler": {
        "Berserker": 2000,
        "Avenger": 500,
        "MoonCancer": 2000,
        "Unknown": 1000
    },
    "Avenger": {
        "Berserker": 2000,
        "Ruler": 2000,
        "MoonCancer": 500,
        "Unknown": 1000
    },
    "Alterego": {
        "Saber": 500,
        "Archer": 500,
        "Lancer": 500,
        "Rider": 1500,
        "Caster": 1500,
        "Assassin": 1500,
        "Berserker": 2000,
        "BeastIII": 1200,
        "Unknown": 1000
    },
    "MoonCancer": {
        "Berserker": 2000,
        "Ruler": 500,
        "Avenger": 2000,
        "BeastIII": 1200,
        "Unknown": 1000
    },
    "Foreigner": {
        "Berserker": 2000,
        "Alterego": 500,
        "Foreigner": 2000,
        "Unknown": 1000
    }
};